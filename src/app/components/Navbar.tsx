// components/Navbar.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars, FaCaretDown } from 'react-icons/fa';
import logo from '@/assets/logo.png';
import { useUser } from '@/context/UserContext';

type NavItem = {
  name: string;
  link: string;
  subLink?: { name: string; link: string }[];
};

const navList: NavItem[] = [
  { name: 'হোম', link: '/' },
  {
    name: 'আমাদের সম্পর্কে',
    link: '/aboutus',
    subLink: [
      { name: 'চেয়ারম্যান এর বার্তা', link: '/aboutus' },
      { name: 'প্রিন্সিপালের বার্তা', link: '/aboutus' },
      { name: 'পরিচালনা পর্ষদ', link: '/aboutus' },
      { name: 'মাস্টার প্ল্যান', link: '/aboutus' },
      { name: 'ইতিহাস', link: '/aboutus' },
      { name: 'ভিশন ও উদ্দেশ্য', link: '/aboutus' },
      { name: 'পরিকাঠামো', link: '/aboutus' },
    ],
  },
  {
    name: 'একাডেমিক',
    link: '/academic',
    subLink: [
      { name: 'আচরণবিধি', link: '/academic' },
      { name: 'অভিভাবকদের জন্য নির্দেশিকা', link: '/academic' },
      { name: 'পোশাকবিধি', link: '/academic' },
      { name: 'হোমওয়ার্ক ও ক্লাস লেকচার ডকুমেন্টস', link: '/academic' },
      { name: 'লেসন প্ল্যান', link: '/academic' },
      { name: 'একাডেমিক ক্যালেন্ডার', link: '/academic' },
      { name: 'সিলেবাস', link: '/academic' },
      { name: 'ক্লাস রুটিন', link: '/academic' },
      { name: 'সহ-পাঠক্রমিক কার্যক্রম', link: '/academic' },
    ],
  },
  {
    name: 'তথ্য',
    link: '/information',
    subLink: [
      { name: 'নোটিশ বোর্ড', link: '/notices' },
      { name: 'পেমেন্ট পদ্ধতি', link: '/information' },
      { name: 'সুবিধাসমূহ', link: '/information' },
      { name: 'সংবাদ ও ইভেন্ট', link: '/information' },
      { name: 'আমাদের অর্জনসমূহ', link: '/information' },
      { name: 'ছুটির তালিকা', link: '/information' },
      { name: 'শিক্ষক তথ্য', link: '/information' },
      { name: 'শিক্ষার্থী তথ্য', link: '/information' },
      { name: 'নীতিমালা ও নির্দেশিকা', link: '/information' },
      { name: 'লাইব্রেরি', link: '/information' },
      { name: 'স্বাস্থ্য ও পরিবেশ সচেতনতা তথ্য', link: '/information' },
    ],
  },
  {
    name: 'ভর্তি',
    link: '/admission',
    subLink: [
      { name: 'আবেদন করুন', link: '/admission' },
      { name: 'ফাস্ট ফ্যাক্টস', link: '/admission' },
      { name: 'ফি ও পেমেন্ট', link: '/admission' },
      { name: 'স্কলারশিপ', link: '/admission' },
      { name: 'ট্রান্সফার পদ্ধতি', link: '/admission' },
    ],
  },
  {
    name: 'ক্যাম্পাস জীবন',
    link: '/campuslife',
    subLink: [
      { name: 'ছবির গ্যালারি', link: '/campuslife' },
      { name: 'ভিডিও গ্যালারি', link: '/campuslife' },
    ],
  },
  {
    name: 'চাকরি',
    link: '/employment',
    subLink: [
      { name: 'সংক্ষেপে', link: '/employment' },
      { name: 'চাকরির বিজ্ঞপ্তি', link: '/employment' },
      { name: 'নিয়োগ পরীক্ষার ফলাফল', link: '/employment' },
    ],
  },
  { name: 'যোগাযোগ', link: '/contact' },
];

const Navbar = () => {
  const { user } = useUser();
  const dynamicNavList = [...navList];

  if (user && !dynamicNavList.some(item => item.link === '/dashboard')) {
    dynamicNavList.push({
      name: 'ড্যাশবোর্ড',
      link: '/dashboard',
    });
  }

  const [selected, setSelected] = useState<string>("ALL");
  const [toggle, setToggle] = useState(false);
  const [activeSubIndex, setActiveSubIndex] = useState<number | null>(null);

  const handleSubToggle = (index: number) =>
    setActiveSubIndex(activeSubIndex === index ? null : index);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload(); // force reload after logout
  };

  return (
    <header className="sticky top-0 z-20 bg-[#EBEBEB] py-1">
      <div className="mx-auto flex max-w-[1536px] items-center justify-between gap-1 lg:px-2 sm:px-4">
        {/* Logo */}
        <Link href="/">
          <Image src={logo} alt="Logo" className="h-16 w-auto" priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-2 text-[12px] xl:gap-5 xl:text-lg lg:flex">
          {dynamicNavList.map((item, i) => (
            <div
              key={i}
              className="group relative flex items-center gap-1 pb-[4px] pt-[4px] font-semibold hover:border-b-4 hover:pb-0 border-[#FF0000]"
            >
              <Link href={item.link}>{item.name}</Link>
              {item.subLink && <FaCaretDown className="text-[#FF0000]" />}
              {item.subLink && (
                <div className="absolute left-0 top-full hidden w-60 flex-col gap-3 border border-gray-200 bg-white p-3 group-hover:flex">
                  {item.subLink.map((s, si) => (
                    <Link
                      key={si}
                      href={s.link}
                      className="hover:text-[#FF0000]"
                      onClick={() => setSelected(s.name)}
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Auth Button */}
        {!user ? (
          <Link href="/login" className="hidden lg:block">
            <button className="rounded-lg bg-green-600 px-4 py-2 font-bold text-white lg:text-xs xl:text-base">
              Login
            </button>
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="rounded-lg bg-[#FF0000] px-4 py-2 font-bold text-white lg:text-xs xl:text-base"
          >
            Logout
          </button>
        )}

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <button
            onClick={() => setToggle(!toggle)}
            className="relative border border-[#FF0000] p-2"
          >
            <FaBars className="text-2xl" />
          </button>

          {toggle && (
            <div className="absolute right-0 top-full w-full flex-col gap-3 border bg-white p-3 lg:w-60">
              {dynamicNavList.map((item, i) => (
                <div key={i} className="flex flex-col font-semibold">
                  <div
                    className="flex items-center justify-between border-b border-[#FF0000] pb-[4px] pt-[4px]"
                    onClick={() => handleSubToggle(i)}
                  >
                    <Link href={item.link}>{item.name}</Link>
                    {item.subLink && <FaCaretDown className="text-[#FF0000]" />}
                  </div>

                  {activeSubIndex === i && item.subLink && (
                    <div className="ml-5 flex flex-col gap-3 border-l pl-3">
                      {item.subLink.map((s, si) => (
                        <Link
                          key={si}
                          href={s.link}
                          className="border-b border-dotted border-[#FF0000] py-1 hover:text-[#FF0000]"
                          onClick={() => {
                            setSelected(s.name);
                            setToggle(false);
                          }}
                        >
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Auth Button */}
              {!user ? (
                <Link
                  href="/login"
                  className="mt-2 border-b border-[#FF0000] pb-[4px] pt-[4px]"
                  onClick={() => setToggle(false)}
                >
                  <button className="w-full rounded-lg bg-green-600 px-4 py-2 font-bold text-white">
                    লগইন
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setToggle(false);
                  }}
                  className="mt-2 w-full rounded-lg bg-[#FF0000] px-4 py-2 font-bold text-white"
                >
                  লগআউট
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
