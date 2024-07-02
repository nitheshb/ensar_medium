import { GetSelectedTopics } from "@/actions/Topics";
import { getUniqueTopics } from "@/actions/getStories";
import Navbar from "@/components/Navbar";
import StoryList from "@/components/StoryList";
import Image from "next/image";
import Discover from "./home/Discover";
import DemoHeader from "./home/DemoHeader";
import Banner from "./home/Banner";

export default async function Home() {
  const allTopics = await getUniqueTopics()
  const UserTags = await GetSelectedTopics()
  
  return (
    <main className=" mx-auto ">
       <DemoHeader/>
      <Banner />

      {/* <Navbar/> */}
      <div className="size py-7 flex flex-col-reverse md:flex-row gap-[7rem]">

      <div className="max-w-[1100px] mx-auto   flex-[1.5]">
        <StoryList allTopics={allTopics.response} UserTags={UserTags.Tags}/>
      </div>
      <div className="flex-[1] relative">
          <Discover />
        </div>
        </div>
    </main>
  );
}


