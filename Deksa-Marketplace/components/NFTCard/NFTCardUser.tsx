import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import AOS from "aos";
import { useAccount, useProvider, useSigner } from "wagmi";
import { ethers } from "ethers";
import marketplaceAbi from "../../contractAbi/myNFT";
import collectionAbi from "../../contractAbi/myTokenAbi";
import "aos/dist/aos.css";

interface NFTCardStrut {
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
  const [price, setPrice] = useState("");
  const { address } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const handleCreateListing = async () => {
    if (!signer || !address) {
      alert("Please connect your wallet");
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      alert("Please enter a valid price");
      return;
    }
    
    setIsLoading(true);
    try {
      const collectionAddress = process.env.NEXT_PUBLIC_MYTOKEN_ADDRESS!;
      const marketplaceAddress = process.env.NEXT_PUBLIC_MYNFT_ADDRESS!;
      
      const collectionContract = new ethers.Contract(collectionAddress, collectionAbi, signer);
      const marketplaceContract = new ethers.Contract(marketplaceAddress, marketplaceAbi, signer);
      
      // Check NFT ownership
      const owner = await collectionContract.ownerOf(data.tokenId);
      if (owner.toLowerCase() !== address.toLowerCase()) {
        throw new Error("You don't own this NFT");
      }
      
      // Check and set approval if needed
      const isApproved = await collectionContract.isApprovedForAll(address, marketplaceAddress);
      if (!isApproved) {
        const approveTx = await collectionContract.setApprovalForAll(marketplaceAddress, true);
        await approveTx.wait();
        console.log("Approval granted to marketplace contract");
      }

      // Convert price to Wei
      const priceInWei = ethers.utils.parseUnits(price, 18);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      
      // Validate timestamps
      const startTimestamp = currentTimestamp; // Start now
      const endTimestamp = startTimestamp + 30 * 24 * 60 * 60; // 30 days from now

      if (endTimestamp <= startTimestamp) {
        throw new Error("End time must be after start time.");
      }

      // Prepare listing parameters
      const listingParameters = {
        assetContract: collectionAddress,
        tokenId: data.tokenId,
        quantity: 1,
        currency: nativeToken,
        pricePerToken: priceInWei,
        startTimestamp: startTimestamp,
        endTimestamp: endTimestamp,
        reserved: false
      };

      // Log listing parameters for debugging
      console.log("Creating listing with parameters:", listingParameters);

      // Create listing
      const createListingTx = await marketplaceContract.createListing(listingParameters);
      await createListingTx.wait();
      alert("Listing created successfully");
    } catch (error: any) {
      console.error("Error creating listing:", error);
      alert(`Failed to create listing: ${error.message || "Unknown error occurred"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div data-aos="fade-up" className="bg-[#242435] p-4 rounded-lg hover:shadow-2xl hover:shadow-[#00a3ff]">
      <Image
        src={data.image}
        height={330}
        width={330}
        alt={data.title}
        className="transform mx-auto transition duration-500 hover:scale-110"
      />
      <Link href={`/NFT/${data.tokenId}`}>
        <h4 className="text-white text-2xl font-bold cursor-pointer mt-2">
          {data.title}
        </h4>
      </Link>
      <div className="flex justify-between">
        <span className="text-[#00a3ff]">Token ID: {data.tokenId}</span>
        <span className="text-white flex">
          <FaHeart className="mt-1 mr-1" />
          {data.likes && <span>{data.likes}</span>}
        </span>
      </div>
      
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter price in ETH"
        className="w-full p-2 mb-4 bg-[#2c2c43] text-white rounded mt-4"
      />
      
      <button
        onClick={handleCreateListing}
        disabled={isLoading}
        className={`w-full bg-[#00a3ff] text-white py-2 rounded-lg font-semibold ${
          isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#008ccd]"
        }`}
      >
        {isLoading ? "Creating Listing..." : "Create Listing"}
      </button>
    </div>
  );
}

export default NFTCard;
