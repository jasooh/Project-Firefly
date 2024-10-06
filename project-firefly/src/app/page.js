import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import Image from "next/image";
import image2 from '/src/app/assets/forest.png';
  
export default function Home() {
    return (
        <div className="app-container">
            <article>
                <header className="fit-parent p-[5%] relative z-10">
                    <h3>Introducing</h3>
                    <h1 className="text-primary">
                        <span className="text-white font-extralight">PROJECT: </span>FIREFL.AI
                    </h1>
                    <h3>Sky guardians, protecting forests from the flames before they spark.</h3>
                    <TooltipProvider>
                        <div className="flex justify-between w-full mt-19.5 relative z-20">
                        <Tooltip>
                            <TooltipTrigger>
                                <button className="w-52 h-16 bg-black mt-10 mb-5 flex items-center justify-center rounded-md">
                                    <span className="text-white">OUR PURPOSE</span>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Our team strives to raise awareness and sense<br />  of emergency regarding forest fires. These tragic<br /> disasters have been overlooked far too many times,<br /> so to combat the lack of importance, our team<br /> developed an alert system to shut down fires before<br /> they can even begin. We believe that each person has<br /> a responsibility to care for the land we live on, so by<br /> creating a forest fire alert system we have gone one<br /> step further to ensure everyone has the power to make<br /> a difference.</p>
                            </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                            <TooltipTrigger>
                                <button className="w-52 h-16 bg-black mt-10 mb-5 flex items-center justify-center rounded-md">
                                    <span className="text-white">ABOUT OUR DRONES</span>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Our drones are skillfully developed to identify any incoming smoke<br /> and/or fires through object detection. Data is then gathered and stored<br /> through sensors, allowing for real time forecasts on temperature levels<br /> and risk levels for any given location.</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger>
                                <button className="w-60 h-16 bg-black mt-10 mb-5 flex items-center justify-center rounded-md">
                                    <span className="text-white">THE FURTURE OF SUSTAINABILITY</span>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>As the era of technology continues, we as a community<br />  have the opportunity to make real changes for the betterment<br />  of both the earth and our own well-being. Forests are a vital part of<br /> our everyday lives, playing key roles in biodiversity, the water cycle,<br /> carbon release, air pollution, and much more. By actively protecting<br /> forests from intense fires, we contribute to the overall sustainability<br /> of every living organism while simultaneously increasing a sense of<br /> community and trust amongst civillians.   </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>
                <div className="absolute inset-0 z-0">
                    <Image src={image2} alt='alt' width={1600} height={500} className = "absolute bottom-0 left-1/2 transform -translate-x-1/2 z-[-1]" />
                </div>
             </header>
        </article>
    </div>

    );
}
