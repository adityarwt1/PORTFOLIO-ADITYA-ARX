import HomePageLoadinScreen from "@/components/HomePageLoading";
import {portforlioData} from "@/portFolioData/portFolioData"
export default async function HomePage() {
  "use cache"
  console.log(portforlioData)
  
  return (
    <div>HomePage Content</div>
  )
}


