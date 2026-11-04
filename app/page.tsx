"use client"
import IntroAnimation from "@/components/IntroLoadin";
import PixelBlast from "@/components/PixelBlast";
import { portforlioData } from "@/portFolioData/portFolioData";
import { AnimatePresence } from "motion/react";
import { div } from "motion/react-client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function HomePageWrapper() {
  const [isIntroSaw, setIsSawIntro] = useState<boolean>(true)
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
          <PixelBlast />
          <main className="pointer-events-none absolute inset-0 z-10 flex gap-2 flex-col items-center font-mono">
            <Banner />
            <ProfileContainer showProfileImage={isShowProfilePicture} />
          </main>
        </div>
      )}
    </AnimatePresence>
  );
}


const Banner = () => {
  return <div className="relative z-10 mt-5 h-37.5 w-2xl border  border-zinc-950/30 bg-white shadow-xl shadow-accent">Banner</div>
}

const ProfileContainer = ({ showProfileImage }: { showProfileImage?: boolean }) => {
  return (
    <div className="w-2xl h-auto bg-white border border-zinc-950/15 px-4 py-2 shadow-accent">
      <div className="w-25 h-25 rounded-full border-2 border-zinc-950\15">
        <img src={showProfileImage ? portforlioData.dummyProfilePicture : portforlioData.profilePicture} />
      </div>
      <span className="font-mono">{portforlioData.bio}</span>
      <p className="text-[12px] font-">{portforlioData.fullBio}</p>
    </div>

  )
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