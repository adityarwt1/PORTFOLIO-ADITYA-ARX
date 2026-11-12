
"use client"
import Link from "next/link";
import IntroAnimation from "@/components/IntroLoadin";
import PixelBlast from "@/components/PixelBlast";
import Image from 'next/image'
import { CertificateInterface, ExperienceInterface, navigationTypes, PortFolioInterfaces, portforlioData, ProjectInterface, } from "@/portFolioData/portFolioData";
import { AnimatePresence } from "motion/react";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, Suspense, useEffect, useId, useMemo, useState } from "react";
import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { monthUtcNumberToCompleteMonth } from "@/utiils/months";

function HomePageWrapper() {
  const porftFolioDataMemo = useMemo<PortFolioInterfaces>(() => portforlioData, [])
  const [isIntroSaw, setIsSawIntro] = useState<boolean>(true)
  const [currentTab, setCurrentTab] = useState<navigationTypes>("Experience")
  const searchParams = useSearchParams()
  const isResumeSearchParamsAvailable = searchParams.get(porftFolioDataMemo.showProfileSearchParamName) ? true : false
  const [isShowProfilePicture] = useState<boolean>(isResumeSearchParamsAvailable)
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
        <div key="pixel-blast" className="relative isolate min-h-screen w-full">
          <PixelBlast pixelSize={3} patternDensity={0.80} />
          <main className="pointer-events-auto relative z-10 flex min-h-screen flex-col items-center gap-2 font-mono scroll-fade-y">
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
      <span className="font-mongo font-medium">{portforlioData.bio} | {portforlioData.currentAcadmics}</span>
      <p className="text-[15px] font-roboto ">{portforlioData.fullBio({ interviewsCount: portforlioData.interviewsCount })}</p>
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

      {currentTab === "Experience" && <ExperienceWrapper key={useId()} expreienceData={portFolioData.experiences} />}
      {currentTab === "Projects" && <ProjectsWrapper key={useId()} projectData={portFolioData.projects} />}
      {currentTab === "Certificate" && <CertificateWrapper key={useId()} certificateArray={portFolioData.certificates} />}
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
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const handleImageMove = (move: "left" | "right") => {
    if (move == "left") setCurrentImageIndex(currentImageIndex - 1)
    else setCurrentImageIndex(currentImageIndex - 1)
  }
  return (
    <div className="flex flex-col gap-1.5">
      {/* card wrapper */}
      <div className="flex flex-col gap-3 mt-4 border border-zinc-950/15 px-4 py-6 h-auto shadow-md">
        <div className="flex justify-between ">
          <div className="flex gap-2 items-center">
            <img className="h-16 rounded-sm" src={experienceOject.companyLogo} alt={experienceOject.companyName + " Logo"} />
            <div className="flex flex-col gap-0">
              <span className="text-xl font-bold uppercase">{experienceOject.companyName}</span>
              <span><span className="font-medium">{experienceOject.role}</span> | {monthUtcNumberToCompleteMonth[new Date(experienceOject.startingFrom).getUTCMonth()]}{" "}{new Date(experienceOject.startingFrom).getFullYear()}{experienceOject.endDate && " - " + monthUtcNumberToCompleteMonth[new Date(experienceOject.endDate).getUTCMonth()] + "-" + new Date(experienceOject.endDate).getFullYear()} | {experienceOject.type}</span>
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
        {experienceOject.images && (<div>
          <div className="flex w-full justify-center items-center h-auto">
            {experienceOject.images.length > 1 && <button className={`${0 == currentImageIndex ? "cursor-not-allowed" : ""} w-[30%] `} onClick={() => handleImageMove("left")} disabled={0 == currentImageIndex}><ChevronLeftIcon /></button>}
            <img className="w-170" src={experienceOject.images[currentImageIndex]} />
            {experienceOject.images.length > 1 && <button className={`${experienceOject.images.length - 1 === currentImageIndex ? "cursor-not-allowed " : ""}w-[30%]`} onClick={() => handleImageMove("right")} disabled={experienceOject.images.length - 1 === currentImageIndex}><ChevronRightIcon /></button>}
          </div>
        </div>)}
        <div className="flex flex-wrap gap-1">
          {experienceOject.skillShet && experienceOject.skillShet.map((skill, index) => (<span key={skill + "_key" + index} className="px-3  rounded-full bg-zinc-950 text-white">{skill}</span>))}
        </div>
      </div>
    </div>
  )
}



const ProjectsWrapper = ({ projectData }: { projectData: ProjectInterface[] }) => {
  return (
    <div className="flex flex-col gap-3 mt-4">
      {projectData.map((projectDataObject, index) => <ProjectCards projectObject={projectDataObject} key={index + "_" + projectDataObject.name} />)}
    </div>
  )
}

const ProjectCards = ({ projectObject }: { projectObject: ProjectInterface }) => {
  return (
    <div className="flex flex-col items-center border shadow-md px-4 py-2 gap-4">
      <div className="flex flex-col gap-0 w-full">
        <span className="text-3xl font-extrabold">{projectObject.name}</span>
        <span className="text-sm ">From: {projectObject.startingDate.getDate() + " " + monthUtcNumberToCompleteMonth[projectObject.startingDate.getMonth()] + " " + projectObject.startingDate.getFullYear()} {projectObject.endDate ? `To: ${projectObject.endDate.getDate() + " " + monthUtcNumberToCompleteMonth[projectObject.endDate.getMonth()] + " " + projectObject.endDate.getFullYear()} ` : "• Ongoing"}</span>
        <Link href={projectObject.liveUrlLink} className="flex text-blue-400 hover:text-blue-500" target="_blank"><span>Live url</span> <ArrowUpRightIcon /></Link>
      </div>
      <div className="flex flex-col w-full gap-2">
        {projectObject.description.map((descriptionParagraph, index) => (
          <span className="font-normal w-full" key={index + descriptionParagraph.slice(1, 4)}>{descriptionParagraph}</span>
        ))}
      </div>
      {projectObject.images && <img src={projectObject.images[0]} alt={projectObject.name} />}
      <div>
        <span className="w-full">Achivements:- </span>
        <div className="flex flex-col w-full gap-2">
          {projectObject.achivements.map((projectAchinvements, index) => (
            <span className="font-normal w-full" key={projectAchinvements + index}>• {projectAchinvements}</span>
          ))}
        </div>
      </div>
      <div className="w-full">
        <span className="w-full">Skillset:-</span>
        <div className="flex gap-1 w-full">
          {projectObject.skillShet.map((skill, index) => (
            <span className="w-fit px-4  bg-zinc-950 rounded-full text-white " key={skill + index}>{skill}</span>
          ))}
        </div>
      </div>
      {projectObject.contributers && <div className="w-full">
        <span>Contributors:-</span>
        <div className="flex flex-wrap">
          {projectObject.contributers.map((contributors, index) => (
            <Link target="_blank" href={contributors.link} key={contributors.username + index} className="flex gap-2 justify-center items-center">
              {contributors.iconOfSocialMedia && contributors.iconOfSocialMedia.includes("git") && <img src={contributors.iconOfSocialMedia} alt={contributors.username} />}
              <span className="flex gap-1 text-blue-500 hover:text-blue-400"><span>{contributors.username}</span><ArrowUpRightIcon /></span>
            </Link>
          ))}
        </div>
      </div>}
      {projectObject.externalLinks && <div className="w-full">
        <span>Link:-</span>
        <div className="flex flex-wrap">
          {projectObject.externalLinks.map((link, index) => (
            <Link target="_blank" href={link.link} key={link.link + index} className="flex gap-2 justify-center items-center">
              {link.icon && link.icon.includes("git") ? <img src={link.icon} alt={link.link} /> : <img src={link.icon} alt={link.link} />}
              <span className="flex gap-1 text-blue-500 hover:text-blue-400"><span>{link.link}</span><ArrowUpRightIcon /></span>
            </Link>
          ))}
        </div>
      </div>}
    </div>
  )
}


const CertificateWrapper = ({ certificateArray }: { certificateArray: CertificateInterface[] }) => {
  return (
    <div className="flex mt-4 flex-col gap-1">
      {certificateArray.map((certificateJson, index) => <CertificateCard certicateJson={certificateJson} key={certificateJson.certificateName + "_" + index} />)}
    </div>
  )
}

const CertificateCard = ({ certicateJson }: { certicateJson: CertificateInterface }) => {
  console.log(certicateJson)
  return (
    <div className="border px-4 flex flex-col py-2 shadow-md gap-2">
      <div className="flex flex-col">
        <span className="uppercase font-bold text-xl">{certicateJson.certificateName}</span>
        <div className="flex gap-2.5">
          <span className="text-sm font-normal">Issue Date: {certicateJson.certificateIssueDate.getDate() + " " + monthUtcNumberToCompleteMonth[certicateJson.certificateIssueDate.getMonth()] + " " + certicateJson.certificateIssueDate.getFullYear()}, By {certicateJson.certificateProvider}</span>
          {certicateJson.certificateOffialLink && <Link href={certicateJson.certificateOffialLink} className="flex gap-0.5 text-blue-400" target="_blank"><span>Official Link</span><ArrowUpRightIcon/></Link>}
        </div>
      </div>
      <div>{certicateJson.certificateDescription}</div>
      <img src={certicateJson.images[0]} alt={certicateJson.certificateName} /> 
      <div className="flex gap-1 flex-wrap">
      {certicateJson.certificateSkillGain && certicateJson.certificateSkillGain.map((skill, index)=> (<span key={skill + "_" + index}  className="px-4 w-fit rounded-full bg-zinc-950 text-white text-nowrap ">{skill}</span>))}
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
    <div className="animate-bounce w-full h-screen flex flex-col justify-center items-center"><span>Loading....</span></div>
  )
}