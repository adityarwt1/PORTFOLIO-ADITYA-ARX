"use client"
import IntroAnimation from "@/components/IntroLoadin";
import PixelBlast from "@/components/PixelBlast";
import { portforlioData } from "@/portFolioData/portFolioData";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [isIntroSaw, setIsSawIntro] =useState<boolean>(true)
  const featuredExperience = portforlioData.experiences.find(

    (experience) => experience.currentlyWorking,
  );
  useEffect(()=>{
    if(isIntroSaw){
      setTimeout(() => {
        setIsSawIntro(false)
      }, 5200000);
    }
  },[isIntroSaw])
  if(isIntroSaw) return <IntroAnimation/>
  return (
      <PixelBlast />
  );
}

