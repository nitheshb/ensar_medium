import React, { useEffect, useState } from "react";
import Link from "next/link";
import { nav } from '../../data/data';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import router from "next/router";




const DemoHeader: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const scrollMe = () => {
      setIsActive(window.scrollY > 50);
    };
    window.addEventListener("scroll", scrollMe);
    return () => {
      window.removeEventListener("scroll", scrollMe);
    };
  }, []);



  // const handleGetStartedClick = () => {
  //   router.push(''); 
  // };

  return (
    <header
      className={`border-b border-black sticky top-0 z-50 
      ${isActive ? "bg-white" : "bg-[#FFC017]"}
      transition-all duration-500`}
    >
      <div className="size h-[70px] flex items-center justify-between">
        <Link href="/">
          <h2 className="text-[#000] w-[199.275px] h-[50.5px] font-bold text-2xl leading-[1.2] m-0 inline-flex items-center justify-center">
            Ensar University
          </h2>
        </Link>
        <div className="flex items-center gap-5">
          <div className="hidden text-sm sm:flex items-center gap-5">
            {nav.map((link, i) => (
              <Link key={i} href={link.path}>
                {link.title}
              </Link>
            ))}
          </div>
          <div className="relative">
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button
                  className="text-sm sm:flex items-center gap-5"
                >
                  Sign In
                </button>
              </SignInButton>
            ) : (
              <UserButton />
            )}
          </div>
          <button
            onClick={() => {}}
            // onClick={handleGetStartedClick}
            className={`text-white rounded-full px-3 p-2 text-sm font-medium
            ${isActive ? "bg-green-700" : "bg-black"}`}
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default DemoHeader;

