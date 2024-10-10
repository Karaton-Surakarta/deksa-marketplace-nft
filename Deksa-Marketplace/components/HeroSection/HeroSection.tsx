import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import pandawaNft from "../../public/images/asset_hero.png";

function HeroSection() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <section className="container py-3 md:py-16 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-6" data-aos="fade-right">
          <h2 className="text-white text-3xl md:text-5xl leading-normal mx-4 lg:mx-0 mt-10 lg:mt-0">
            Welcome to DEKSA NFT Marketplace
          </h2>
          <div
            className="relative w-full h-[140px] md:h-[500px] block lg:hidden "
            data-aos="fade-left"
          >
            <Image
              src={pandawaNft}
              alt="DEKSA NFT"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
          <p className="mx-4 lg:mx-0 text-xl md:text-2xl text-[#acacac]">
            Explore, Buy, and Sell your NFT.
          </p>
          <div className="flex items-center justify-center sm:flex-row gap-4 sm:gap-6 lg:justify-start lg:items-start">
            <Link href="/allnft">
              <button className="py-3 px-4 md:py-4 md:px-6 bg-[#00a3ff] hover:bg-[#212e48] text-white rounded-md w-md sm:w-40 duration-300 flex items-center justify-center">
                Explore NFT
              </button>
            </Link>
            <Link href="/mynft">
              <button className="py-3 px-4 md:py-4 md:px-6 bg-[#212e48] hover:bg-[#00a3ff] text-white rounded-md w-full sm:w-40 duration-300">
                My NFT
              </button>
            </Link>
          </div>
        </div>
        <div
          className="relative w-full h-[300px] md:h-[500px] hidden lg:block"
          data-aos="fade-left"
        >
          <Image
            src={pandawaNft}
            alt="DEKSA NFT"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
