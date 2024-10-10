import React, { useEffect, useState } from "react";
import NFTCardUser from "./NFTCardUser";
import { ethers } from "ethers";
import myTokenAbi from "../../contractAbi/myTokenAbi";
import myNFTAbi from "../../contractAbi/myNFT";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSigner, useProvider } from "wagmi";
import { RotatingLines } from "react-loader-spinner";
import NFTCard from "./NFTCardUser";

interface NFTItem {
  price: string;
  tokenId: number; // Mengubah kembali ke number
  seller: string;
  owner: string;
  image: string;
  title: string;
  desc: string;
  likes?: string;
}

function MyNFT() {
  const { data: signer } = useSigner();
  const provider = useProvider();
  const [NFTData, setNFTData] = useState<NFTItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getMyAllNFT = async () => {
    try {
      setIsLoading(true);
      console.log("Ethereum provider:", window.ethereum);

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

      // Fetch NFTs menggunakan Alchemy API
      const apiKey = "RSzS40KNSgz1TM1Q2SlmSLdPXee_ywRT"; // This is temporary, should be stored in .env
      const owner = await signer?.getAddress();
      const contractAddress = process.env.NEXT_PUBLIC_MYTOKEN_ADDRESS as string;
      if (!owner) throw new Error("No signer available");
      // https://base-sepolia.g.alchemy.com/nft/v3/RSzS40KNSgz1TM1Q2SlmSLdPXee_ywRT/getNFTsForOwner?owner=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045&withMetadata=true&pageSize=100
      const response = await fetch(
        `https://base-sepolia.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?owner=${owner}&contractAddresses[]=${contractAddress}&withMetadata=true&pageSize=50`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        }
      );
      const alchemyData = await response.json();
      console.log("Alchemy API response:", alchemyData);

      // Pastikan data yang diterima valid
      if (!alchemyData.ownedNfts || !Array.isArray(alchemyData.ownedNfts)) {
        throw new Error("Invalid Alchemy API response");
      }

      // Proses data Alchemy
      const newItems: NFTItem[] = await Promise.all(
        alchemyData.ownedNfts.map(async (nft: any) => {
          // Tangani tokenId sebagai number
          const tokenId = parseInt(nft.tokenId); // Ubah menjadi number

          // Ambil data listing dari kontrak marketplace
          let price = "0";
          let seller = "0x0000000000000000000000000000000000000000";
          try {
            const listingData = await marketplaceContract.getListing(tokenId);
            price = ethers.utils.formatUnits(listingData.price.toString(), "ether");
            seller = listingData.seller;
          } catch (err) {
            console.warn(`Listing data not found for tokenId ${tokenId}:`, err);
          }

          // Pilih URL gambar yang tersedia
          const image =
            nft.metadata?.image ||
            nft.media?.[0]?.gateway ||
            nft.image?.cachedUrl ||
            "";

          return {
            price,
            tokenId, // TokenId sekarang berupa number
            seller,
            owner: nft.owner || "0x0000000000000000000000000000000000000000",
            image,
            title: nft.metadata?.name || nft.name || "No Title",
            desc: nft.metadata?.description || nft.description || "No Description",
          };
        })
      );

      console.log("Processed NFT data:", newItems);
      setNFTData(newItems);
    } catch (error) {
      console.error("Error fetching NFT data:", error);
      // toast.error(
      //   "Terjadi kesalahan saat mengambil data NFT. Pastikan dompet Anda terhubung dan kontrak berfungsi dengan benar.",
      //   {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   }
      // );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (signer || provider) {
      getMyAllNFT();
    }
  }, [signer, provider]);

  return (
    <div className="container mx-auto px-4 ">
      <h1 className="text-white text-3xl font-bold mb-8 ">My NFTs</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NFTData.map((NFTCardData) => (
            <NFTCardUser key={NFTCardData.tokenId} {...NFTCardData} />
          ))}
        </div>
      ) : (
        <p className="text-white text-center">
          You don't own an NFT yet. Please purchase or mint the NFT first.
        </p>
      )}
      {/* <ToastContainer /> */}
    </div>
  );
}

export default MyNFT;
