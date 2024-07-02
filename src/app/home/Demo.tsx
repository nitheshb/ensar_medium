"use client"; // Marking as client-side component


import React from "react";
import Banner from "./Banner";
//import Trending from "./Trending";
//import Posts from "../Common/Posts/Posts";
import Discover from "./Discover";
import DemoHeader from "./DemoHeader";
import StoryList from "@/components/StoryList";
import StoryItem from "@/components/StoryItem";
import Navbar from "@/components/Navbar";

const Demo: React.FC = () => {
  return (
    <>
     <DemoHeader/>
      <Banner />
      {/* <Trending /> */}
      <div className="size py-7 flex flex-col-reverse md:flex-row gap-[7rem]">
        <div className="flex-[1.5]">
          {/* <Posts /> */}
          <StoryList allTopics={[]} UserTags={[]}/>
          {/* <StoryItem key={""} story={{
                      id: "",
                      authorId: "",
                      content: null,
                      topics: [],
                      publish: false,
                      createdAt: undefined,
                      updatedAt: undefined
                  }}/> */}
        </div>
        <div className="flex-[1] relative">
          <Discover />
        </div>
      </div>
    </>
  );
};

export default Demo;
