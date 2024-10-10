import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Pagination } from "swiper";
import AOS from 'aos';
import 'aos/dist/aos.css';

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

function Slider() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const SliderImageList : string[] = [
    "/Arjuna NFT Final.png",
    "/Werkudara NFT Final.png",
    "/Puntadewa NFT Final.png",
    "/Nakula NFT Final.png",
    "/Sadewa NFT Final.png",
  ];

  return (
    <div className="container py-20" data-aos="zoom-in-down">
      <div className="w-full">
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 4,
              spaceBetween: 40
            }
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {SliderImageList.map((NFTImage, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="w-[200px] h-[300px] mx-2 lg:w-full lg:h-[500px] aspect-square relative ">
                  <Image 
                    src={NFTImage} 
                    alt={`NFT Image ${index + 1}`} 
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default Slider;