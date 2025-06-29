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
    <div className="bg-white shadow-lg rounded-md p-4 w-full h-full max-h-[500px]">
      <Heading title="নোটিশ বোর্ড" />

      {isLoading ? (
        <p className="text-center text-gray-500 mt-4">লোড হচ্ছে...</p>
      ) : (
        <Swiper
          direction="vertical"
          spaceBetween={10}
          slidesPerView={4}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          className="h-[350px]"
        >
          {notices?.map((notice) => {
            const date = new Date(notice.date);
            const day = date.getDate().toString().padStart(2, "0");
            const month = date.toLocaleString("bn-BD", { month: "short" });

            return (
              <SwiperSlide key={notice._id}>
                <Link href={`/notices/${notice._id}`}>
                  <div className="flex gap-3 border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-100 transition-all">
                    <div className="w-12 text-center">
                      <p className="bg-[#FF0000] text-white text-sm py-1 rounded-t">
                        {day}
                      </p>
                      <p className="bg-gray-100 text-gray-800 text-sm py-1 rounded-b">
                        {month}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold line-clamp-2 text-gray-800">
                        {notice.title}
                      </p>
                      <p className="text-xs text-[#FF0000] font-medium italic">
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
        className="flex justify-end items-center gap-1 text-[#FF0000] mt-3"
      >
        <IoMenuOutline />
        <p className="text-sm font-medium">সকল নোটিশ দেখুন</p>
      </Link>
    </div>
  );
};

export default Slider2;
