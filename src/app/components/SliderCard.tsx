'use client';

import Image, { StaticImageData } from 'next/image';
// import bgpopup from '../assets/bg-popup.png';

interface SliderCardProps {
  book: StaticImageData;
  headiing: string;
  bgColor: string;
  subBgColor: string;
}

const SliderCard = ({ book, headiing, bgColor, subBgColor }: SliderCardProps) => {
  return (
    <div
      className={`grid place-items-center rounded-2xl pt-2 hover:-translate-y-3 transform duration-300 ${bgColor}`}
    >
      <h1 className="text-2xl text-white font-bold pb-5 pt-5">{headiing}</h1>
      <button className="text-white text-sm font-semibold border border-white px-3 py-1 rounded-xl hover:bg-[#FF0000] hover:border-[#FF0000] mb-3">
        বিস্তারিত
      </button>
      <div className="w-full h-full p-2">
        <div className={`${subBgColor} flex justify-center items-center rounded-2xl`}>
          <Image src={book} alt={`${headiing} Book`} className="w-24 py-5" />
        </div>
      </div>
    </div>
  );
};

export default SliderCard;
