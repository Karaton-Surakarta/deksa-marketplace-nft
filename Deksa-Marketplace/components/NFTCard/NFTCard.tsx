import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import AOS from "aos";
import { useAccount, useProvider, useSigner } from "wagmi";
import { ethers } from "ethers";
import marketplaceAbi from "../../contractAbi/myNFT";
import "aos/dist/aos.css";

interface NFTCardStrut {
  listingId: number;
  price: string;
  title: string;
  tokenId: number;
  likes?: string;
  image: string;
  seller: string;
  owner: string;
  desc: string;
}

const nativeToken = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

function NFTCard(data: NFTCardStrut) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(data.price);
  // const [isListingActive, setIsListingActive] = useState(true);
  // const [refreshKey, setRefreshKey] = useState(0); 

  const { address } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    updateListing();
  }, []); 

  const updateListing = async () => {
    if (!provider) return;

    try {
      setIsLoading(true);
      const contractAddress = process.env.NEXT_PUBLIC_MYNFT_ADDRESS!;
      const marketplaceContract = new ethers.Contract(
        contractAddress,
        marketplaceAbi,
        provider
      );

      // Fetch listing details
      const listing = await marketplaceContract.getListing(data.listingId);
      
      // Update UI with new data
      setCurrentPrice(ethers.utils.formatEther(listing.price));
      // setIsListingActive(listing.isActive);
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating listing:", error);
      setIsLoading(false);
    }
  };

  const handleBuy = async () => {
    if (!signer) {
      alert("Please connect your wallet to buy NFT");
      return;
    }

    try {
      setIsLoading(true);
      const contractAddress = process.env.NEXT_PUBLIC_MYNFT_ADDRESS!;
      const marketplaceContract = new ethers.Contract(
        contractAddress,
        marketplaceAbi,
        signer
      );
      
      const expectedTotalPrice = ethers.utils.parseUnits(currentPrice, 18);

      const transaction = await marketplaceContract.buyFromListing(
        data.listingId,
        await signer.getAddress(),
        1,
        nativeToken,
        expectedTotalPrice,
        {
          value: expectedTotalPrice,
          gasLimit: 500000,
        }
      );

      await transaction.wait();
      setIsLoading(false);
      alert("NFT bought successfully");
      
      // Force refresh after successful purchase
      // setRefreshKey(oldKey => oldKey + 1);
    } catch (error: any) {
      setIsLoading(false);
      if (error.data?.message) {
        alert(`Transaction failed: ${error.data.message}`);
      } else {
        alert(`Failed to buy NFT: ${error.message || "Unknown error occurred"}`);
      }
    }
  };

  // if (!isListingActive) {
  //   return null; // Don't render inactive listings
  // }

  return (
    <div
      data-aos="fade-up"
      className="flex flex-col justify-between w-full bg-[#242435] rounded-lg shadow-lg hover:shadow-2xl hover:shadow-[#00a3ff] transition-shadow duration-300 p-4"
    >
      <div className="flex-1 mb-4">
        <div className="w-full h-[250px] overflow-hidden">
          <Image
            src={data.image}
            alt={data.title}
            width={330}
            height={330}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-110 rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <Link href={`/NFT/${data.tokenId}`}>
          <h4 className="text-white text-xl font-bold cursor-pointer mb-2 transition-colors hover:text-[#00a3ff]">
            {data.title}
          </h4>
        </Link>
        <div className="flex justify-between items-center mb-4">
          <span className="text-[#00a3ff] font-semibold">
            Token ID: {data.tokenId}
          </span>
          <span className="text-white flex items-center">
            <FaHeart className="mr-1" />
            {data.likes && <span>{data.likes}</span>}
          </span>
        </div>
        <div className="text-white mb-4">
          Current Price: {currentPrice} ETH
        </div>

        <button
          onClick={handleBuy}
          disabled={isLoading}
          className={`mt-auto w-full bg-[#00a3ff] text-white py-2 rounded-lg font-semibold transition-transform duration-300 transform hover:scale-105 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Loading..." : "Buy NFT"}
        </button>
      </div>
    </div>
  );
}

export default NFTCard;