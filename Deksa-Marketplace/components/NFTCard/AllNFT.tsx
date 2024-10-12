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

interface NFTMetadata {
  name?: string;
  description?: string;
  image?: string;
  media?: Array<{ gateway: string }>;
}

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

interface RawListingData {
  listingId: ethers.BigNumber | string | number;
  tokenId: ethers.BigNumber;
  pricePerToken?: ethers.BigNumber;
  seller?: string;
  owner?: string;
}

const getImageUrl = (meta: { data: NFTMetadata }): string => {
  if (meta.data?.image) {
    return meta.data.image.startsWith("ipfs://")
      ? `https://ipfs.io/ipfs/${meta.data.image.substring(7)}`
      : meta.data.image;
  }
  if (meta.data.media && meta.data.media.length > 0) {
    return meta.data.media[0].gateway;
  }
  return "";
};

const processListingId = (rawListingId: ethers.BigNumber | string | number): number => {
  console.log('Processing raw listingId:', rawListingId);
  
  let processedListingId: number;
  
  if (ethers.BigNumber.isBigNumber(rawListingId)) {
    processedListingId = rawListingId.toNumber();
  } else if (typeof rawListingId === 'string') {
    if (rawListingId.startsWith('0x')) {
      processedListingId = parseInt(rawListingId.substring(2), 16);
    } else {
      processedListingId = parseInt(rawListingId, 10);
    }
  } else {
    processedListingId = Number(rawListingId);
  }
  
  console.log('Processed listingId:', processedListingId);
  return processedListingId;
};

const processNFTData = async (
  data: RawListingData[], 
  tokenContract: ethers.Contract
): Promise<NFTItem[]> => {
  return (await Promise.all(
    data.map(async (d: RawListingData, index: number) => {
      try {
        const listingId = processListingId(d.listingId);
        const tokenId = d.tokenId.toNumber();

        console.log(`Processing NFT ${index}:`, {
          listingId,
          tokenId,
          rawListingId: d.listingId
        });

        const tokenUri = (await tokenContract.tokenURI(tokenId)).replace(
          "ipfs://",
          "https://ipfs.io/ipfs/"
        );
        const meta = await axios.get(tokenUri);

        let price = "0";
        if (d.pricePerToken && ethers.BigNumber.isBigNumber(d.pricePerToken)) {
          price = ethers.utils.formatUnits(d.pricePerToken, "ether");
        }

        const image = getImageUrl(meta);

        return {
          listingId,
          price,
          tokenId,
          seller: d.seller || "",
          owner: d.owner || "",
          image,
          title: meta.data.name || `NFT ${index}`,
          desc: meta.data.description || "",
        };
      } catch (itemError) {
        console.error(`Error processing item ${index}:`, itemError);
        return null;
      }
    })
  )).filter((item): item is NFTItem => item !== null);
};

function AllNFT() {
  const { data: signer } = useSigner();
  const provider = useProvider();
  const [NFTData, setNFTData] = useState<NFTItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = NFTData?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = NFTData ? Math.ceil(NFTData.length / itemsPerPage) : 1;

  const getItems = async () => {
    try {
      setIsLoading(true);
      setError(null);

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

      console.log('Raw data from contract:', data);

      const processedData = await processNFTData(data, tokenContract);
      setNFTData(processedData);

    } catch (error) {
      console.error("Error fetching NFT data:", error);
      setError("Failed to fetch NFT data. Please ensure your wallet is connected and the contract is working correctly.");
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

  const handleNFTSelection = (listingId: number) => {
    console.log('Selected NFT with listingId:', listingId);
    // Implement your NFT selection logic here
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-white text-3xl font-bold mb-8">All NFT</h1>
      
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      
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
              <NFTCard 
                key={`${NFTCardData.listingId}-${NFTCardData.tokenId}`}
                {...NFTCardData}
                // onClick={() => handleNFTSelection(NFTCardData.listingId)}
              />
            ))}
          </div>

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
      
      {/* <ToastContainer /> */}
    </div>
  );
}

export default AllNFT;