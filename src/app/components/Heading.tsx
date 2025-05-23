'use client';

import React from 'react';

interface HeadingProps {
  title: string;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center pb-2">
      <h1 className="text-xl lg:text-2xl font-bold text-[#FF0000] p-3 text-center lg:text-start">
        {title}
      </h1>
      <div className="h-[2px] w-[20%] bg-[#FF0000] mb-2 mx-auto"></div>
    </div>
  );
};

export default Heading;
