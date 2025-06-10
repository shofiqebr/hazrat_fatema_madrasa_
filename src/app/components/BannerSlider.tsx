// components/BannerSlider.tsx
'use client';

import { FC } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import banner1 from '@/assets/banner1.jpg';
import banner2 from '@/assets/banner2.jpg';
import banner3 from '@/assets/banner3.jpg';

const images = [banner1, banner2, banner3];

const BannerSlider: FC = () => (
  <div className="relative">
    <Swiper
      spaceBetween={30}
      centeredSlides
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      modules={[Autoplay, Pagination]}
      className="w-full h-48 "
    >
      {images.map((src, i) => (
        <SwiperSlide key={i}>
          <Image
            src={src}
            alt={`Slide ${i + 1}`}
            fill
            className=""
            sizes="100vw"
            priority={i === 0}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default BannerSlider;
