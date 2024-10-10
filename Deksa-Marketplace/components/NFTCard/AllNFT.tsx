import React, { useEffect, useState } from "react";
import NFTCard from "../NFTCard/NFTCard";
import { ethers } from "ethers";
import myTokenAbi from "../../contractAbi/myTokenAbi";
import myNFTAbi from "../../contractAbi/myNFT";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSigner, useProvider } from "wagmi";
import { RotatingLines } from "react-loader-spinner";

interface NFTItem {
  listingId: number;
  price: string;
  tokenId: number;
  seller: string;
  owner: string;
  image: string;
  title: string;
  desc: string;
  likes?: string;
}

const getImageUrl = (meta: any) => {
  if (meta.data?.image) {
    return meta.data.image.startsWith("ipfs://")
      ? `https://ipfs.io/ipfs/${meta.data.image.substring(7)}`
      : meta.data.image;
  }
  if (meta.data.media && meta.data.media.length > 0) {
    return meta.data.media[0].gateway;
  }
  if (meta.data.image?.cachedUrl) {
    return meta.data.image.cachedUrl;
  }
  return "";
};

const processNFTData = async (data: any, tokenContract: any) => {
  return await Promise.all(
    data.map(async (d: any, index: number) => {
      try {
        const tokenId = d.tokenId || d[1];
        const tokenUri = (await tokenContract.tokenURI(tokenId)).replace(
          "ipfs://",
          "https://ipfs.io/ipfs/"
        );
        const meta = await axios.get(tokenUri);

        let price = "0";
        const pricePerToken = d.pricePerToken || d[3];
        if (pricePerToken && ethers.BigNumber.isBigNumber(pricePerToken)) {
          price = ethers.utils.formatUnits(pricePerToken, "ether");
        }

        const listingId = parseInt(d.listingId, 16);

        const image = getImageUrl(meta);

        return {
          listingId,
          price,
          tokenId: tokenId ? tokenId.toNumber() : 0,
          seller: d[6] || "",
          owner: d[7] || "",
          image,
          title: meta.data.metadata?.name || `NFT ${index}`,
          desc: meta.data.metadata?.description || "",
        };
      } catch (itemError) {
        console.error(`Error processing item ${index}:`, itemError);
        return null;
      }
    })
  );
};

function AllNFT() {
  const { data: signer } = useSigner();
  const provider = useProvider();
  const [NFTData, setNFTData] = useState<NFTItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Max 20 NFT per page

  // Get the current items based on currentPage and itemsPerPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = NFTData?.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = NFTData ? Math.ceil(NFTData.length / itemsPerPage) : 1;

  const getItems = async () => {
    try {
      setIsLoading(true);
      const marketplaceContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_MYNFT_ADDRESS || "",
        myNFTAbi,
        signer || provider
      );
      const tokenContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_MYTOKEN_ADDRESS || "",
        myTokenAbi,
        signer || provider
      );

      const totalListings = await marketplaceContract.totalListings();
      const data = await marketplaceContract.getAllValidListings(0, totalListings.sub(1));

      const newItems: NFTItem[] = await processNFTData(data, tokenContract);
      const validItems = newItems.filter((item): item is NFTItem => item !== null);
      setNFTData(validItems);
    } catch (error) {
      console.error("Error fetching NFT data:", error);
      toast.error(
        "Terjadi kesalahan saat mengambil data NFT. Pastikan dompet Anda terhubung dan kontrak berfungsi dengan benar.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, [signer, provider]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-white text-3xl font-bold mb-8">All NFT</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : NFTData && NFTData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems?.map((NFTCardData) => (
              <NFTCard key={NFTCardData.tokenId} {...NFTCardData} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`mr-4 px-4 py-2 bg-sky-500 text-white rounded ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <span className="text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`ml-4 px-4 py-2 bg-sky-500 text-white rounded ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-white text-center">No NFT Found.</p>
      )}
      <ToastContainer />
    </div>
  );
}

export default AllNFT;
