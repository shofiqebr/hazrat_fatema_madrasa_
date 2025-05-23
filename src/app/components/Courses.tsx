'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

import book1 from '@/assets/book1.png';
import book3 from '@/assets/book3.png';
import book4 from '@/assets/book4.png';

import culture from '@/assets/culture.png';
import ict from '@/assets/ict.png';
import studentDevelopment from '@/assets/studentDevelopment.png';
import higherEducation from '@/assets/higherEducation.png';
import bloodBank from '@/assets/bloodBank.png';
import achievement from '@/assets/achievement.png';

import Heading from './Heading';

// import OtherActivityCard from './OtherActivityCard';
import SliderCard from './SliderCard';
import OtherActivityCard from './OtherActivityCard';

const Courses = () => {
  const swiperRef = useRef(null);

  return (
    <div className="py-5 pt-10 mx-2 ">
      {/* Courses Section */}
      <Heading title="Our Courses for Students" />

      <Swiper
        ref={swiperRef}
        freeMode={true}
        breakpoints={{
          360: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          640: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 10,
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><SliderCard bgColor="bg-[#1F8447]" subBgColor="bg-[#D7F9E9]" book={book1} headiing="Class 1" /></SwiperSlide>
        <SwiperSlide><SliderCard bgColor="bg-[#FF8757]" subBgColor="bg-[#FDDEC4]" book={book4} headiing="Class 2" /></SwiperSlide>
        <SwiperSlide><SliderCard bgColor="bg-[#1F512F]" subBgColor="bg-[#9CDAB1]" book={book3} headiing="Class 3" /></SwiperSlide>
        <SwiperSlide><SliderCard bgColor="bg-[#633341]" subBgColor="bg-[#C46883]" book={book4} headiing="Class 4" /></SwiperSlide>
        <SwiperSlide><SliderCard bgColor="bg-[#687200]" subBgColor="bg-[#DFE7AC]" book={book1} headiing="PSC" /></SwiperSlide>
        <SwiperSlide><SliderCard bgColor="bg-[#59301F]" subBgColor="bg-[#FEBA23]" book={book4} headiing="Class 6" /></SwiperSlide>
        <SwiperSlide><SliderCard bgColor="bg-[#C66783]" subBgColor="bg-[#F6C0D2]" book={book3} headiing="Class 7" /></SwiperSlide>
        <SwiperSlide><SliderCard bgColor="bg-[#40591F]" subBgColor="bg-[#AF9842]" book={book4} headiing="JSC" /></SwiperSlide>
        <SwiperSlide><SliderCard bgColor="bg-[#8F2900]" subBgColor="bg-[#FE9158]" book={book1} headiing="SSC" /></SwiperSlide>
        <SwiperSlide><SliderCard bgColor="bg-[#7A831F]" subBgColor="bg-[#CDD69E]" book={book4} headiing="HSC" /></SwiperSlide>
      </Swiper>

      {/* Other Activities Section */}
      <div className="py-10">
        <Heading title="Others Activities" />
        <div className="flex flex-col items-center justify-center gap-10 w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
            <OtherActivityCard image={culture} heading="Cultural Department" />
            <OtherActivityCard image={ict} heading="Ict Department" />
            <OtherActivityCard image={studentDevelopment} heading="Student Development" />
            <OtherActivityCard image={higherEducation} heading="Higher Education" />
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 w-full">
            <div className="md:hidden lg:block w-full h-full" />
            <OtherActivityCard image={bloodBank} heading="Blood Bank" />
            <OtherActivityCard image={achievement} heading="Our Achievement" />
            <div className="md:hidden lg:block w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
