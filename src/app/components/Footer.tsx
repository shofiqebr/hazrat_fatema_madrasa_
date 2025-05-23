'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';

// ✅ Import local images from src/assets
import emailIcon from '@/assets/email.png';
import locationIcon from '@/assets/location.png';
import paperPlaneIcon from '@/assets/paper-plane.png';

const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const [todayCount, setTodayCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const visits = JSON.parse(localStorage.getItem('visitData') || '[]');

    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentMonth = now.getMonth();

    const visitsToday = visits.filter((visit: string) => visit.startsWith(today));
    const visitsThisMonth = visits.filter((visit: string) => new Date(visit).getMonth() === currentMonth);

    setTodayCount(visitsToday.length);
    setTotalCount(visits.length);

    visits.push(new Date().toISOString());
    localStorage.setItem('visitData', JSON.stringify(visits));
  }, []);

  const iconStyle = (hovered: boolean) =>
    hovered
      ? 'invert(100%) brightness(100%) contrast(100%)'
      : 'invert(15%) sepia(100%) saturate(5246%) hue-rotate(0deg) brightness(90%) contrast(120%)';

  const hoverClass = (hovered: boolean) =>
    `text-xl font-semibold transition duration-300 ${hovered ? 'text-white' : 'text-[#FF0000]'}`;

  const buttons = [
    { src: emailIcon, label: 'Get Appointment', hovered: isHovered, setHovered: setIsHovered },
    { src: locationIcon, label: 'Contact Us Today', hovered: isHovered1, setHovered: setIsHovered1 },
    { src: paperPlaneIcon, label: 'Take a School Tour', hovered: isHovered2, setHovered: setIsHovered2 },
  ];

  return (
    <div className="lg:h-[670px] h-[1900px] md:h-[1500px] relative">
      <div className="bg-gradient-to-b from-red-50 to-red-200 h-full w-full opacity-90" />
      <div className="max-w-7xl mx-auto z-10 absolute top-0 left-0 right-0">
        {/* Top Buttons */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 pt-16">
          {buttons.map((item, i) => (
            <button
              key={i}
              className="bg-white flex justify-center items-center gap-4 border-2 border-[#FF0000] px-5 py-2 rounded-xl hover:bg-[#FF0000] transition duration-300"
              onMouseEnter={() => item.setHovered(true)}
              onMouseLeave={() => item.setHovered(false)}
            >
              <Image
                src={item.src}
                alt={item.label}
                width={36}
                height={36}
                style={{ filter: iconStyle(item.hovered) }}
              />
              <p className={hoverClass(item.hovered)}>{item.label}</p>
            </button>
          ))}
        </div>

        <div className="h-[1px] mx-5 lg:mx-0 bg-[#2b2121] my-10" />

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mx-10 md:mx-24 text-xs gap-5 md:gap-10 pb-10">
          {/* About Us */}
          <div className="text-black">
            <h3 className="text-2xl font-semibold">About Us</h3>
            <div className="h-[1px] bg-[#2b2121] mb-5 w-[80%]" />
            <p className="leading-5 text-justify">
              Viqarunnisa Noon School & College is an all-girls educational institute in Baily Road, Dhaka, Bangladesh.
              It has 4 campuses and around 25,000 students.
            </p>
            <button className="text-[#FF0000] hover:text-white text-lg font-semibold border border-[#FF0000] px-4 py-2 rounded-xl bg-white hover:bg-[#FF0000] mt-5">
              Contact us
            </button>
          </div>

          {/* Important Links */}
          <div className="text-black">
            <h3 className="text-2xl font-semibold">Important Links</h3>
            <div className="h-[1px] bg-[#2b2121] mb-5" />
            {[
              'Dhaka Districts office',
              'Dhaka Education Board',
              'eTIF',
              'Directorate of Secondary and Higher Education',
              'Directorate of Primary Education',
              'Ministry of Education',
            ].map((link, i) => (
              <Link key={i} href="#">
                <p>{link}</p>
              </Link>
            ))}
          </div>

          {/* Services */}
          <div className="text-black">
            <h3 className="text-2xl font-semibold">Services</h3>
            <div className="h-[1px] bg-[#2b2121] mb-5 w-[70%]" />
            {['Admission', 'Result', 'Online Admission', 'Fees Payment'].map((service, i) => (
              <Link key={i} href="#">
                <p>{service}</p>
              </Link>
            ))}
          </div>

          {/* Contact Info */}
          <div className="text-black">
            <h3 className="text-2xl font-semibold">Contact Info</h3>
            <div className="h-[1px] bg-[#2b2121] mb-5 w-[90%]" />
            <p className="font-bold">Help Line Number (Mob)</p>
            <p>01867268422, 01866785183, 01866785184</p>
            <p className="font-bold">Help Line Number (Tel)</p>
            <p>02-48317513, 02-48317519, 02-58310500</p>
            <p className="font-bold">Email Address</p>
            <p>info@vnsc.edu.bd, vnsc_bd@yahoo.com</p>

            <h3 className="text-2xl font-semibold pt-5">Working Hours</h3>
            <div className="h-[1px] bg-[#2b2121] mb-5" />
            <p>Week Days: 9 AM - 5 PM</p>
            <p className="font-bold">Friday & Saturday : Close</p>
          </div>

          {/* Visitor Counter */}
          <div className="text-black">
            <h3 className="text-2xl font-semibold">Visitor Counter</h3>
            <div className="h-[1px] bg-[#2b2121] mb-5" />
            <div className="flex flex-col items-center border border-[#FF0000] p-2 bg-white rounded mb-2">
              <p className="text-base font-bold">Today Total Visitors</p>
              <p className="text-lg text-[#FF0000] font-bold">{todayCount}</p>
            </div>
            <div className="flex flex-col items-center border border-[#FF0000] p-2 bg-white rounded mb-2">
              <p className="text-base font-bold">Grand Total</p>
              <p className="text-lg text-[#FF0000] font-bold">{totalCount}</p>
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-[#474646]" />

        {/* Social & Credits */}
        <div className="flex justify-center items-center gap-5 text-black text-2xl pt-5">
          <Link href="#"><FaFacebookF className="text-[#1877F2]" /></Link>
          <FaTwitter />
          <Link href="#"><FaLinkedinIn className="text-[#0A66C2]" /></Link>
          <Link href="#"><FaYoutube className="text-[#FF0000]" /></Link>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 text-black pt-5">
          <p className="text-sm">© Copyright Shikkha Chat 2009 , All Rights Reserved</p>
          <Link href="https://shikkhachat.com">
            <p className="pb-2 text-sm">Developed By IONIC Corporation</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
