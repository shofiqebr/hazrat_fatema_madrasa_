// components/BannerSlider.tsx
'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
    <Link
      href="#"
      className="absolute top-2 lg:top-10 right-2 lg:right-20
                 z-10 rounded lg:rounded-2xl bg-[#FF0000]
                 px-2 lg:px-8 py-1 lg:py-3 text-xs lg:text-base font-bold text-white"
    >
      Login
    </Link>

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
