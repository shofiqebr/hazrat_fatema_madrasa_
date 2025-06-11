"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { IoMenuOutline } from "react-icons/io5";
import Link from "next/link";
import Heading from "./Heading";
import { useNotices } from "@/hooks/useNoticeCrud";


const Slider2 = () => {
  const { data: notices, isLoading } = useNotices();

  return (
    <div className="lg:pl-10 mx-2 lg:mx-0">
      <Heading title="নোটিশ বোর্ড" />

      {isLoading ? (
        <p>লোড হচ্ছে...</p>
      ) : (
        <Swiper
          direction="vertical"
          spaceBetween={0}
          slidesPerView={4}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper h-[350px] overflow-y-scroll"
        >
          {notices?.map((notice) => {
            const date = new Date(notice.date);
            const day = date.getDate().toString().padStart(2, "0");
            const month = date.toLocaleString("bn-BD", { month: "short" }); // Bangla month

            return (
              <SwiperSlide key={notice._id}>
                <Link href={`/notices/${notice._id}`}>
                  <div className="flex gap-3 border border-[#f1f1f0] px-3 py-2 cursor-pointer hover:bg-gray-100 transition-all duration-200">
                    <div className="w-12 lg:w-20">
                      <p className="bg-[#FF0000] text-white text-center py-1">
                        {day}
                      </p>
                      <p className="text-center bg-[#f0f0f0] text-[18px]">
                        {month}
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{notice.title}</p>
                      <p className="text-[#FF0000] font-semibold italic">
                        বিস্তারিত দেখুন
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      <Link
        href="/notices"
        className="flex justify-end items-center gap-1 text-[#FF0000] pr-2 mt-2"
      >
        <IoMenuOutline />
        <p>সকল নোটিশ দেখুন</p>
      </Link>
    </div>
  );
};

export default Slider2;
