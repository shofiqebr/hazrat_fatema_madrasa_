'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

// import { useState } from 'react';
import { IoMenuOutline } from 'react-icons/io5';
import Link from 'next/link';
import Heading from './Heading';


// const buttons = ['ALL', 'PSC', 'JSC', 'SSC', 'HSC'];

const notices = [
  'পরীক্ষাসহ শ্রেণি কার্যক্রম বন্ধ প্রসঙ্গে',
  'রমজান মাসের সময়সূচী',
  'ঈদুল ফিতরের ছুটির নোটিশ',
  'ঈদুল আজহার ছুটির বিজ্ঞপ্তি',
  'পবিত্র আশুরার ছুটির নোটিশ',
  'লাইলাতুল কদরের ছুটির ঘোষণা',
  'মিলাদুন্নবী (সাঃ) উপলক্ষে ছুটি',
  'শবে বরাতের ছুটির বিজ্ঞপ্তি',
  'শবে মেরাজ উপলক্ষে ছুটি',
  'জুমাতুল বিদার বিশেষ নোটিশ',
  'ইফতার ও দোয়া মাহফিলের আমন্ত্রণ',
];


const Slider2 = () => {
  // const [selected, setSelected] = useState('ALL');

  return (
    <div className="lg:pl-10 mx-2 lg:mx-0">
      <Heading title="Notice Board" />

      {/* Filter Buttons */}
      {/* <div className="flex gap-4 md:gap-7 mt-5 pb-8">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => setSelected(button)}
            className={`text-lg font-semibold border border-black px-3 py-1 rounded-lg hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white ${
              selected === button
                ? 'bg-[#FF0000] border-[#FF0000] text-white'
                : 'bg-[#F6F2F2]'
            }`}
          >
            {button}
          </button>
        ))}
      </div> */}

      {/* Vertical Slider */}
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
        {notices.map((notice, i) => (
          <SwiperSlide key={i}>
            <div className="flex gap-3 border border-[#f1f1f0] px-3 py-2">
              <div className="w-12 lg:w-20">
                <p className="bg-[#FF0000] text-white text-center py-1">05</p>
                <p className="text-center bg-[#f0f0f0] text-[18px]">Oct</p>
              </div>
              <div>
                <p className="text-lg font-bold">{notice}</p>
                <p className="text-[#FF0000] font-semibold italic">View Notice</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* View All Link */}
      <Link href="/notices" className="flex justify-end items-center gap-1 text-[#FF0000] pr-2 mt-2">
        <IoMenuOutline />
        <p>সকল নোটিশ দেখুন</p>
      </Link>
    </div>
  );
};

export default Slider2;
