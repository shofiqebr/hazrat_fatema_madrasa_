'use client';

import Image from 'next/image';
import slider1 from '@/assets/slider11.avif';
import slider2 from '@/assets/slider12.avif';
import slider3 from '@/assets/slider13.avif';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const images = [
  { src: slider1, alt: 'Building' },
  { src: slider2, alt: 'Annual Event' },
  { src: slider3, alt: 'Parade' },
];

const Slider1 = () => {
  return (
    <div className="relative border w-full h-[500px]">
      <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-[500px]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider1;
