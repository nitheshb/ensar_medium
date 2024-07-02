'use client'
import React, { useEffect, useState } from "react";
import Image from 'next/image'
import Link from "next/link";
import { nav } from '../../data/data';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
// import router from "next/router";
import {ScrollText, Search} from "lucide-react"

import axios from "axios";
import { useRouter } from "next/navigation";




const DemoHeader: React.FC = () => {
  const router = useRouter()
  const [SearchInput, setSearchInput] = useState<string>('')

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


  const MakeNewStory = async () => {
    try {
        const response = await axios.post('/api/new-story')
        router.push(`/story/${response.data.id}`)
        console.log(response)
    } catch (error) {   
        console.log("Error creating new story", error)
    }
}
const SearchFun = (event:React.KeyboardEvent<HTMLInputElement>) => {
  if(event.key === 'Enter'){
      router.push(`/search?for=${SearchInput}`)
  }
}
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
      <div className='flex items-center space-x-3'>
            {/* <Link href='/'>
                <Image src='/medium-icon.svg' width={40} height={40} alt='Medium Logo'/>
            </Link> */}
            <Link href="/">
          <h2 className="text-[#000] w-[199.275px] h-[50.5px] font-bold text-2xl leading-[1.2] m-0 inline-flex items-center justify-center">
            Ensar University
          </h2>
        </Link>
            <div className='flex items-center bg-gray-50 rounded-full px-2'>
                <Search onClick={() => router.push(`/search?for${SearchInput}`)} size={20} className='opacity-50' />
                <input onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => SearchFun(e)} type="text" placeholder='Search...' className='focus:outline-none px-1 py-2 placeholder:text-sm text-sm bg-gray-50 rounded-full' />
            </div>
            </div>
    
     
        <div className="flex items-center gap-5">
        <button
            onClick={MakeNewStory}
            // onClick={handleGetStartedClick}
            className={`text-white rounded-full px-3 p-2 text-sm font-medium
            ${isActive ? "bg-green-700" : "bg-black"}`}
          >
            Write Story+
          </button>

            <Link href='/me/drafts' className='opacity-90 flex items-center space-x-1 text-sm '><ScrollText size={20} opacity={20} /> My Stories</Link>

      
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
        
        </div>
      </div>
    </header>
  );
};

export default DemoHeader;

