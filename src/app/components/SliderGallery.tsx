'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

import Heading from './Heading';

import building from '@/assets/banner2.jpg';
import anual from '@/assets/welcome.jpg';
import parod from '@/assets/slider13.avif';

const SliderGallery = () => {
  const swiperRef = useRef(null);

  const images = [
    { src: building, alt: 'Building' },
    { src: anual, alt: 'Annual Event' },
    { src: parod, alt: 'Parade' },
    { src: building, alt: 'Building again' },
    { src: anual, alt: 'Annual Event again' },
    { src: parod, alt: 'Parade again' },
  ];

  return (
    <div className="mb-10">
      <Heading title="Photo Gallery" />

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
            slidesPerGroup: 1,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 1,
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
        {images.map((image, idx) => (
          <SwiperSlide key={idx}>
            <div className="overflow-hidden rounded-xl">
              <Image
                src={image.src}
                alt={image.alt}
                className="transition-transform duration-300 hover:scale-125"
                width={500}
                height={300}
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                priority={idx === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderGallery;
