import PixelBlast from "@/components/PixelBlast";
import { portforlioData } from "@/portFolioData/portFolioData";

export default function HomePage() {
  const featuredExperience = portforlioData.experiences.find(
    (experience) => experience.currentlyWorking,
  );

  return (
      <PixelBlast />
  );
}

