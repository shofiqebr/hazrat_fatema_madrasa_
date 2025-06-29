"use client";
// import BannerSlider from "../components/BannerSlider";
// import Courses from './components/Courses';
// import GoverningBody from './components/GoverningBody';
import Slider1 from "../components/Slider1";
import Slider2 from "../components/Slider2";
import Courses from "../components/Courses";
import SliderGallery from "../components/SliderGallery";
// import SliderGallery from './components/SliderGallery';

export default function Home() {
  return (
    <div>
      {/* <BannerSlider /> */}

      <div className="max-w-[1536px] mx-auto">
        <div className="grid lg:grid-cols-7 grid-cols-1 gap-5 lg:gap-0 xl:gap-5 mx-2 pt-5">
          <div className="lg:col-span-4">
            <Slider1 />
          </div>
          <div className="lg:col-span-3">
            <Slider2 />
          </div>
        </div>

        <Courses />
        {/* <GoverningBody /> */}
      </div>

      <SliderGallery />
    </div>
  );
}
