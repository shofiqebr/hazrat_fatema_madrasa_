// components/Navbar.tsx
'use client';

import { useState, FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars, FaCaretDown } from 'react-icons/fa';
import logo from '@/assets/logo.png';             
type NavItem = {
  name: string;
  link: string;
  subLink?: { name: string; link: string }[];
};

interface NavbarProps {
  selected: string;
  setSelected: (v: string) => void;
}

const navList: NavItem[] = [
  { name: 'Home', link: '/' },
  {
    name: 'About us',
    link: '/aboutus',
    subLink: [
      { name: 'Message from Chairman', link: '/aboutus' },
      { name: 'Message from Principal', link: '/aboutus' },
      { name: 'Governing Body', link: '/aboutus' },
      { name: 'Master Plan', link: '/aboutus' },
      { name: 'History', link: '/aboutus' },
      { name: 'Vision and Objectives', link: '/aboutus' },
      { name: 'Infrastructure', link: '/aboutus' },
    ],
  },
   {
            name: 'Academic', link: '/academic', subLink: [
                { name: ' Code of Conducts', link: '/academic' },
                { name: 'Guideline for Parents', link: '/academic' },
                { name: 'Dress Code', link: '/academic' },
                { name: 'HomeWork And Class Lecture Documents', link: '/academic' },
                { name: 'Lesson Plan', link: '/academic' },
                { name: 'Academic calendar', link: '/academic' },
                { name: 'Syllabus', link: '/academic' },
                { name: 'Class Routine', link: '/academic' },
                { name: 'Co-curricular Activities', link: '/academic' },
            ]
        },
        {
            name: 'Information', link: '/information',  subLink: [
                { name: 'Notice Board', link: '/information' },
                { name: 'Payment Procedure', link: '/information' },
                { name: 'Facilities', link: '/information' },
                { name: 'News and Events', link: '/information' },
                { name: 'Our Achievements', link: '/information' },
                { name: 'List of Holidays', link: '/information' },
                { name: 'Teachers Info', link: '/information' },
                { name: 'Student Info', link: '/information' },
                { name: 'Policies & Guidelines', link: '/information' },
                { name: 'Library', link: '/information' },
                { name: 'Health and Environmental Awarness Info', link: '/information' },
            ]
        },
        {
            name: 'Admission', link: '/admission', subLink: [
                { name: 'Apply Now', link: '/admission' },
                { name: 'Fast Facts‌', link: '/admission' },
                { name: 'Fees & Payment', link: '/admission' },
                { name: 'Scholarships', link: '/admission' },
                { name: 'Transfer Procedures', link: '/admission' },
            ]
        },
        {
            name: 'Campus Life ', link: '/campuslife', subLink: [
                { name: 'Photo Gallery', link: '/campuslife' },
                { name: 'Video Gallery', link: '/campuslife' },
            ]
        },
        {
            name: 'Employment', link: '/employment',  subLink: [
                { name: 'At a Glance', link: '/employment' },
                { name: 'Employment Circulars‌', link: '/employment' },
                { name: 'Recruitment Exam Results', link: '/employment' },
            ]
        },
        { name: 'Contact', link: '/contact', },
        {
            name: 'স্বাধীনতা কর্নার ', link: '/freedomcorner',  subLink: [
                { name: 'নোটিশ', link: '/freedomcorner' },
                { name: 'ছবির গ্যালারী', link: '/freedomcorner' },
                { name: 'ভিডিও গ্যালারী', link: '/freedomcorner' },
            ]
        },
];

const Navbar: FC<NavbarProps> = ({ selected, setSelected }) => {
  const [toggle, setToggle] = useState(false);
  const [activeSubIndex, setActiveSubIndex] = useState<number | null>(null);

  const handleSubToggle = (index: number) =>
    setActiveSubIndex(activeSubIndex === index ? null : index);

  return (
    <header className="sticky top-0 z-20 bg-[#EBEBEB] py-1">
      <div className="mx-auto flex max-w-[1536px] items-center justify-between gap-1 lg:px-2 sm:px-4">
        {/* Logo */}
        <Link href="/">
          <Image src={logo} alt="Logo" className="h-12 w-auto" priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-2 text-[12px] xl:gap-5 xl:text-sm lg:flex">
          {navList.map((item, i) => (
            <div
              key={i}
              className="group relative flex items-center gap-1 pb-[4px] pt-[4px] font-semibold
                         hover:border-b-4 hover:pb-0 border-[#FF0000]"
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

        {/* Desktop login button */}
        <Link
          href="https://education.ionicerp.xyz"
          className="hidden lg:block"
        >
          <button className="rounded-lg bg-[#FF0000] px-4 py-2 font-bold text-white lg:text-xs xl:text-base">
            Parents Login
          </button>
        </Link>

        {/* Mobile toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setToggle(!toggle)}
            className="relative border border-[#FF0000] p-2"
          >
            <FaBars className="text-2xl" />
          </button>

          {toggle && (
            <div className="absolute right-0 top-full w-full flex-col gap-3 border bg-white p-3 lg:w-60">
              {navList.map((item, i) => (
                <div key={i} className="flex flex-col font-semibold">
                  <div
                    className="flex items-center justify-between border-b border-[#FF0000] pb-[4px] pt-[4px]"
                    onClick={() => handleSubToggle(i)}
                  >
                    <Link href={item.link}>{item.name}</Link>
                    {item.subLink && <FaCaretDown className="text-[#FF0000]" />}
                  </div>

                  {/* mobile sub‑menu */}
                  {activeSubIndex === i && item.subLink && (
                    <div className="ml-5 flex flex-col gap-3 border pl-3">
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

              {/* Mobile login btn */}
              <Link
                href="https://education.ionicerp.xyz"
                className="border-b border-[#FF0000] pb-[4px] pt-[4px]"
                onClick={() => setToggle(false)}
              >
                <button className="w-full rounded-lg bg-[#FF0000] px-4 py-2 font-bold text-white">
                  Parents Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
