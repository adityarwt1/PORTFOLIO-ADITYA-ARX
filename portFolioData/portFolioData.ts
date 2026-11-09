export interface ExperienceInterface {
    companyName: string;
    startingFrom: Date;
    endDate?: Date;
    currentlyWorking: boolean;
    role: string;
    images?: string[];
    description: string;
    achivements?: string[];
    skillShet?: string[];
    isPaid: boolean;
    companyLogo?: string;
    type:"Part-Time" |"Remote" |"Full Time" | "Internship",
    location:string
}

export interface EmailInterface {
    contactFor: string;
    emailId: string;
}

export interface AchievementInterface {
    image?: string[];
    achivementName: string;
    achivementDate: Date;
    isFeaturable: boolean;
    description: string;
}

export interface CertificateInterface {
    certificateName: string;
    images: string[];
    certificateProvider: string;
    certificateDescription: string;
    certificateIssueDate: Date;
    certificateSkillGain?: string[];
    certificateOffialLink?: string;
}

export interface ProjectExternalLinkInterface {
    link: string;
    icon?: string;
}

export interface ProjectContributorInterface {
    iconOfSocialMedia?: string;
    link: string;
}

export interface ProjectInterface {
    name: string;
    description: string[];
    images?: string[];
    liveUrlLink: string;
    externalLinks?: ProjectExternalLinkInterface[];
    achivements: string[];
    startingDate: Date;
    endDate?: Date;
    contributers?: ProjectContributorInterface[];
}

export interface AcademicBackgroundInterface {
    name: string;
    image?: string[];
    address: string;
    cgpa?: number;
    currentYear?: string;
    isCurrentActive: boolean;
    descriptions: string[];
}

export interface PortFolioInterfaces {
    username: string;
    fullName: string;
    bio: string;
    profilePicture: string;
    bannerImages: string[];
    lastOnline: string;
    currentAcadmics: string;
    hoby: string;
    currentRole:string
    navigationTabs:navigationTypes[]
    emailIds: EmailInterface[];
    mobileNumber: number[];
    course: string;
    achivements: AchievementInterface[];
    certificates: CertificateInterface[];
    experiences: ExperienceInterface[];
    projects: ProjectInterface[];
    acadmicBackgrounds: AcademicBackgroundInterface[];
    introTimeout:number
    showProfileSearchParamName:string
    dummyProfilePicture:string
    fullBio:string
}
export type navigationTypes = "Experience"| "Certificate"|"Projects"|"Acadmic"|"Contact"|"More About"
export const portforlioData: PortFolioInterfaces = {
    navigationTabs:[ "Experience", "Projects","Certificate", "Acadmic","Contact", "More About"],
    username: "adityarwt1",
    acadmicBackgrounds: [{
        address: "Sidhi, Post Code 48661 Madhya Pradesh, India.",
        descriptions: ["In this School I have complted my Higher Secondary Education from Class 9th to Class 12th."],
        isCurrentActive: true,
        name: "GOVT. Excellence Higher Secondary School No. 01 Sidhi, Madhya Pradesh",
        image: ["/school/soe/main.jpg"],
    }],
    achivements: [{
        achivementDate: new Date(2024, 6, 20),
        achivementName: "Intership to full time Offer!",
        description: "Got my first full time offer for full stack developer in my Class 11th",
        isFeaturable: true,
        image: ["/company/tripxpay/fulltimeoffer.png"]
    }, {
        achivementDate: new Date(2024, 3, 24),
        achivementName: "Information Techonology Distric Wise First Rank.",
        description: "In the subject of Information technology got highest mark in the entire district!",
        isFeaturable: true,
        image: ["/school/soe/10Result.png"]
    }],
    bannerImages: ["/bannerImages/1.png"],
    bio: "Dev/DevOps Engineer | Linux | MERN/PERN | DSA C++",
    certificates: [{
        certificateDescription: "DevOps skill start with here started to understand the KUBERNETES then get into system design by own.",
        certificateIssueDate: new Date(2025, 5, 18),
        certificateName: "Docker and Kubernetes",
        certificateProvider: "Hitesh Chaudary(Chai And Code Founder)",
        images: [
            "https://udemy-certificate.s3.amazonaws.com/image/UC-8b49a93e-d015-4074-8b48-64badad89d07.jpg?v=1750228482000"
        ],
        certificateOffialLink: "https://www.udemy.com/certificate/UC-8b49a93e-d015-4074-8b48-64badad89d07/",
        certificateSkillGain: ["DOCKER", "KUBERNETES", "LINUX"],
    },
    {
        certificateDescription: "By this certificate I become the well known of the web developement, where I know how the JavaScript work under the hood!",
        certificateIssueDate: new Date(2025, 4, 11),
        certificateName: "Complete Web Developement Couse.",
        certificateProvider: "Hitesh Chaudary(Chai And Code Founder)",
        images: [
            "https://udemy-certificate.s3.amazonaws.com/image/UC-ca3caf9c-3c6d-4ad0-944a-9d6cb20e6fc3.jpg?v=1746950518000"
        ],
        certificateOffialLink: "https://www.udemy.com/certificate/UC-ca3caf9c-3c6d-4ad0-944a-9d6cb20e6fc3/",
        certificateSkillGain: ["TypeScript", "JavaScript", "MySql", "MongoDB", "Prisma", "React", "Tailwind Css", "Node.js", "Next.js", "Git and GitHub"],
    },
    {
        certificateDescription: "By this completion of certificate I know the one another programming languase mainly for data manipulatoin and DSA(Data Structure and Algorithm) Skill.",
        certificateIssueDate: new Date(2025, 4, 17),
        certificateName: "Python Course",
        certificateProvider: "Hitesh Chaudary(Chai And Code Founder)",
        images: [
            "https://udemy-certificate.s3.amazonaws.com/image/UC-cdb96290-0c0d-4f22-a384-f2ac59000b0f.jpg?v=1747466531000"
        ],
        certificateOffialLink: "https://www.udemy.com/certificate/UC-cdb96290-0c0d-4f22-a384-f2ac59000b0f/",
        certificateSkillGain: ["Python", 'Flask', "Django", "Pandas", "Numpy"],
    }],
    course: "PCM",
    currentAcadmics: "Class 12th",
    emailIds: [{
        contactFor: "Buiseness",
        emailId: "arxsoftwares@gmail.com"
    }, {
        contactFor: "Personal",
        emailId: "adityarawatnew2487@gmail.com"
    }],
    experiences: [{
        companyName: "ARX SOFTWARES",
        currentlyWorking: true,
        description: "Shipping solution Real world problem who might be possible to solve with technical stuff!",
        isPaid: false,
        role: "FOUNDER",
        startingFrom: new Date(2026, 7, 24),
        achivements: ["E-Sport get 10X boot by our product E-Sports", "Developed Help in the Competative Exams!"],
        companyLogo: "/company/arxSoftwares/logo.png",
        images: ["/company/arxSoftwares/banner.png"],
        skillShet: ["NEXT.JS", 'REMIX 3', 'REACT.JS', "PRISMA ORM", "FIREBASE AUTHENTICATION"],
        type:"Part-Time",
        location:"Madhya Pradesh India"
    },
    {
        companyName: "TRIPX PAY",
        currentlyWorking: false,
        description: "B2B Fintech Plateform for Travel Companies.",
        role: "Full Stack Developer",
        startingFrom: new Date(2025, 4, 18),
        isPaid: false,
        achivements: ["Got full time offer after 4 months of intership.", "Shiped Admin Dashboard End to End!", "Work on document Verification process!"],
        endDate: new Date(2025, 6, 20),
        images: [
            "/company/tripxpay/Internship.png"
        ],
        skillShet: ["Firebase", "Next.js", "Tailwind CSS"],
        companyLogo: "/company/tripxpay/logo.ico",
        type:"Internship",
        location:"New Delhi India"
    }],
    fullName:"ADITYA RAWAT",
    hoby:"GAMMING AND CODDING",
    lastOnline:new Date().toISOString(),
    mobileNumber:[
        6263508686,
        9244524565
    ],
    profilePicture:"/profilePicture.png",
    projects:[{
        achivements:["Build software library where new modern problem who might be solve with the technical stuff solved and shipped!",

        ],
        description:['Solving Real Worl Problems who might be solve with technical stuff.'],
        startingDate:new Date(2026,7,24),
        liveUrlLink:"https://arx-softwares.vercel.app/",
        name:"ARX SOFTWARES",
        images:['/company/arxSoftwares/banner.png']
    }],
    currentRole:"SOFTWARE ENGINEER",
    introTimeout:2000,
    showProfileSearchParamName:"resume",
    dummyProfilePicture:"/defaultPicture.png",
    fullBio:`Myself Aditya Rawat currenty I am working at own product called ARX SOFTWARES. I am started codding since past ${new Date().getFullYear() - 2024} years when I was in class 10th, since this period of time gave 3 interviews in the startups and worked full time intern at one of those fintech company.`
}; 