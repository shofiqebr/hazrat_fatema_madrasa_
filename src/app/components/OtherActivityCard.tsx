'use client';

import Image, { StaticImageData } from 'next/image';

interface OtherActivityCardProps {
  image: StaticImageData;
  heading: string;
}

const OtherActivityCard = ({ image, heading }: OtherActivityCardProps) => {
  return (
    <div className="p-3 shadow-lg hover:shadow-2xl border-t rounded-2xl hover:-translate-y-3 transform duration-300">
      <div className="rounded-2xl flex flex-col justify-center items-center p-5">
        <Image src={image} alt={heading} className="w-12 h-12" />
        <h1 className="text-xl lg:text-sm xl:text-lg font-bold pt-5 text-center">{heading}</h1>
      </div>
    </div>
  );
};

export default OtherActivityCard;
