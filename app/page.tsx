
"use client"
import IntroAnimation from "@/components/IntroLoadin";
import PixelBlast from "@/components/PixelBlast";
import { navigationTypes, portforlioData } from "@/portFolioData/portFolioData";
import { AnimatePresence } from "motion/react";
import Image from 'next/image'
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react";

function HomePageWrapper() {
  const [isIntroSaw, setIsSawIntro] = useState<boolean>(true)
  const [currentTab, setCurrentTab] = useState<navigationTypes>("Experience")
  const searchParams = useSearchParams()
  const isResumeSearchParamsAvailable = searchParams.get(portforlioData.showProfileSearchParamName) ? true : false
  const [isShowProfilePicture] = useState<boolean>(isResumeSearchParamsAvailable)
  const featuredExperience = portforlioData.experiences.find(

    (experience) => experience.currentlyWorking,
  );
  useEffect(() => {
    if (isIntroSaw) {
      setTimeout(() => {
        setIsSawIntro(false)
      }, portforlioData.introTimeout);
    }
  }, [isIntroSaw])
  return (
    <AnimatePresence mode="wait">
      {isIntroSaw ? (
        <IntroAnimation key="intro" />
      ) : (
        <div key="pixel-blast" className="relative isolate h-screen w-full overflow-hidden">
          <PixelBlast pixelSize={1} patternDensity={0.65} />
          <main className="pointer-events-auto absolute inset-0 z-10 flex flex-col items-center gap-2 font-mono">
            <Banner />
            <ProfileContainer showProfileImage={isShowProfilePicture} />
            <NavigationBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
          </main>
        </div>
      )}
    </AnimatePresence>
  );
}


const Banner = () => {
  return <div className="relative z-10 mt-5 h-37.5 w-3xl  bg-white shadow-xl shadow-accent border border-zinc-950/15">
      <Image className="block h-full w-full object-contain" src={portforlioData.bannerImages[0]} alt="Banner" width={778} height={212} unoptimized />
    </div>
}

const ProfileContainer = ({ showProfileImage }: { showProfileImage?: boolean }) => {
  return (
    <div className="relative w-3xl h-auto bg-white  px-4 py-2  flex flex-col gap-2 shadow-accent shadow border border-zinc-950/15">
      <div className="h-25 w-25 overflow-hidden rounded-full border-2 border-zinc-950/15">
        <img className="block h-full w-full rounded-full object-cover" src={!showProfileImage ? portforlioData.dummyProfilePicture : portforlioData.profilePicture} alt={portforlioData.fullName} />
      </div>
      <span className="font-mongo">{portforlioData.bio}</span>
      <p className="text-[12px] font-roboto ">{portforlioData.fullBio}</p>
    </div>

  )
}

const NavigationBar = ({ currentTab, setCurrentTab }: { currentTab: navigationTypes, setCurrentTab: Dispatch<SetStateAction<navigationTypes>> }) => {
  const handleClickToSelect = (tabName: navigationTypes) => setCurrentTab(tabName)
  return (
    <div className="w-3xl bg-white shadow-accent-foreground px-4 py-2 border border-zinc-950/15  ">
      <div className="flex justify-evenly">
        {[portforlioData.navigationTabs.map((element) => (
          <button className={`${currentTab === element && "border-b"} border-t-white uppercase text-center border-b-zinc-950 `} key={element} onClick={() => handleClickToSelect(element)}>{element}</button>
        ))]}
      </div>
    </div>)

}

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingInSuspense />}>
      <HomePageWrapper />
    </Suspense>
  )
}

const LoadingInSuspense = () => {
  return (
    <div className="animate-bounce">Loading....</div>
  )
}