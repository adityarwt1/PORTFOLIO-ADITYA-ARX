
"use client"
import IntroAnimation from "@/components/IntroLoadin";
import PixelBlast from "@/components/PixelBlast";
import { ExperienceInterface, navigationTypes, PortFolioInterfaces, portforlioData, } from "@/portFolioData/portFolioData";
import { AnimatePresence } from "motion/react";
import Image from 'next/image'
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, Suspense, useEffect, useId, useMemo, useState } from "react";
import { MoreVertical } from "lucide-react"
import { monthUtcNumberToCompleteMonth } from "@/utiils/months";
function HomePageWrapper() {
  const porftFolioDataMemo = useMemo<PortFolioInterfaces>(() => portforlioData, [])
  const [isIntroSaw, setIsSawIntro] = useState<boolean>(true)
  const [currentTab, setCurrentTab] = useState<navigationTypes>("Experience")
  const searchParams = useSearchParams()
  const isResumeSearchParamsAvailable = searchParams.get(porftFolioDataMemo.showProfileSearchParamName) ? true : false
  const [isShowProfilePicture] = useState<boolean>(isResumeSearchParamsAvailable)
  const featuredExperience = porftFolioDataMemo.experiences.find((experience) => experience.currentlyWorking);
  useEffect(() => {
    if (isIntroSaw) {
      setTimeout(() => {
        setIsSawIntro(false)
      }, porftFolioDataMemo.introTimeout);
    }
  }, [isIntroSaw])
  return (
    <AnimatePresence mode="wait">
      {isIntroSaw ? (
        <IntroAnimation key="intro" />
      ) : (
        <div key="pixel-blast" className="relative isolate h-screen w-full overflow-hidden">
          <PixelBlast pixelSize={1} patternDensity={0.65} />
          <main className="pointer-events-auto absolute inset-0 z-10 flex flex-col items-center gap-2 font-mono scroll-fade-y">
            <Banner bannerImageSource={porftFolioDataMemo.bannerImages[0]} />
            <ProfileContainer showProfileImage={isShowProfilePicture} portforlioData={porftFolioDataMemo} />
            <NavigationBar currentTab={currentTab} setCurrentTab={setCurrentTab} portFolioData={porftFolioDataMemo} />
          </main>
        </div>
      )}
    </AnimatePresence>
  );
}


const Banner = ({ bannerImageSource }: { bannerImageSource: string }) => {
  return <div className="relative z-10 mt-5 h-37.5 w-3xl  bg-white shadow-xl shadow-accent border border-zinc-950/15">
    <Image className="block h-full w-full object-contain" src={bannerImageSource} alt="Banner" width={778} height={212} unoptimized />
  </div>
}

const ProfileContainer = ({ showProfileImage, portforlioData }: { showProfileImage?: boolean, portforlioData: PortFolioInterfaces }) => {
  return (
    <div className="relative w-3xl h-auto bg-white  px-4 py-2  flex flex-col gap-2 shadow-accent shadow border border-zinc-950/15">
      <div className="h-25 w-25 overflow-hidden rounded-full border-2 border-zinc-950/15">
        <img className="block h-full w-full rounded-full object-cover" src={!showProfileImage ? portforlioData.dummyProfilePicture : portforlioData.profilePicture} alt={portforlioData.fullName} />
      </div>
      <span className="text-2xl font-bold uppercase">{portforlioData.fullName}</span>
      <span className="font-mongo font-medium">{portforlioData.bio}</span>
      <p className="text-[12px] font-roboto ">{portforlioData.fullBio}</p>
    </div>

  )
}

const NavigationBar = ({ currentTab, setCurrentTab, portFolioData }: { currentTab: navigationTypes, setCurrentTab: Dispatch<SetStateAction<navigationTypes>>, portFolioData: PortFolioInterfaces }) => {
  const handleClickToSelect = (tabName: navigationTypes) => setCurrentTab(tabName)
  return (
    <div className="w-3xl bg-white shadow-accent-foreground px-4 py-2 border border-zinc-950/15  ">
      <div className="flex justify-evenly">
        {[portFolioData.navigationTabs.map((element) => (
          <button className={`${currentTab === element && "border-b"} border-t-white uppercase text-center border-b-zinc-950 `} key={element} onClick={() => handleClickToSelect(element)}>{element}</button>
        ))]}
      </div>

      {currentTab === "Experience" && <ExperienceWrapper expreienceData={portFolioData.experiences} />}
    </div>)

}



const ExperienceWrapper = ({ expreienceData }: { expreienceData: ExperienceInterface[] }) => {
  return (
    <div className="flex flex-col gap-3">
      {expreienceData.map((experienceObject) => (
        <ExperienceCard key={experienceObject.startingFrom + useId()} experienceOject={experienceObject} />
      ))}
    </div>
  )
}

const ExperienceCard = ({ experienceOject }: { experienceOject: ExperienceInterface }) => {
  console.log(experienceOject)
  return (
    <div className="flex flex-col gap-1.5">
      {/* card wrapper */}
      <div className="flex flex-col gap-3 mt-4 border border-zinc-950/15 px-4 py-6 h-auto ">
        <div className="flex justify-between ">
          <div className="flex gap-2 items-center">
            <img className="h-16 rounded-sm" src={experienceOject.companyLogo} alt={experienceOject.companyName + " Logo"} />
            <div className="flex flex-col gap-0">
              <span className="text-xl font-bold uppercase">{experienceOject.role}</span>
              <span><span className="font-medium">{experienceOject.companyName}</span> | {monthUtcNumberToCompleteMonth[new Date(experienceOject.startingFrom).getUTCMonth()]}{" "}{new Date(experienceOject.startingFrom).getFullYear()}{experienceOject.endDate && " - " + monthUtcNumberToCompleteMonth[new Date(experienceOject.endDate).getUTCMonth()] + "-" + new Date(experienceOject.endDate).getFullYear()} | {experienceOject.type}</span>
              <span className="text-[12px] uppercase">{experienceOject.location}</span>
            </div>
          </div>
        </div>
        <span className="font-roboto uppercase">{experienceOject.description}</span>
        <div>
          {experienceOject.achivements && experienceOject.achivements.map((achives) => (
            <div key={achives + useId()}>• {achives}</div>
          ))}
        </div>
        <span>SKILL:-</span>
        <div className="flex flex-wrap">
          {experienceOject.skillShet && experienceOject.skillShet.map((skill) => (<span className="border px-2 mx-2 border-zinc-950/50">{skill}</span>))}
        </div>
      </div>
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