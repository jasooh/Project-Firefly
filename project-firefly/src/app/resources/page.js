import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import Image from "next/image";
import image2 from '/src/app/assets/drone3.png';

export default function report() {
    return (
        <div className="app-container">
            <article>
                <header className="fit-parent p-[5%]">
                    <h3>FIREFL.AI</h3>
                    <h1 className="text-primary">
                        <span className="text-white font-extralight">RESOURCES </span>PAGE
                    </h1>
                    <h3>Want to connect? Follow the emergency contacts below.</h3>
                    
                    <Image src={image2} alt='alt' width={500} height={500} className="absolute top-10 right-20" />

                    <TooltipProvider>
                        <div className="flex justify-between w-full mt-19.5 relative z-20">
                        <Tooltip>
                            <TooltipTrigger>
                                <button className="w-52 h-16 bg-black mt-10 mb-5 flex items-center justify-center rounded-md">
                                    <span className="text-white">BRITISH COLUMBIA</span>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>1-800-663-5555</p>
                            </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                            <TooltipTrigger>
                                <button className="w-52 h-16 bg-black mt-10 mb-5 flex items-center justify-center rounded-md">
                                    <span className="text-white">ALBERTA</span>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>310-FIRE (310-3473)</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger>
                                <button className="w-60 h-16 bg-black mt-10 mb-5 flex items-center justify-center rounded-md">
                                    <span className="text-white">ONTARIO</span>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>310-FIRE (3473)</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>


                <TooltipProvider>
                        <div className="flex justify-between w-full mt-5 relative z-20">
                        <Tooltip>
                            <TooltipTrigger>
                                <button className="w-52 h-16 bg-black mt-10 mb-5 flex items-center justify-center rounded-md">
                                    <span className="text-white">QUEBEC</span>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>1-800-463-3389</p>
                            </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                            <TooltipTrigger>
                                <button className="w-52 h-16 bg-black mt-10 mb-5 flex items-center justify-center rounded-md">
                                    <span className="text-white">YUKON</span>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>1-888-798-FIRE (3473)</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger>
                                <button className="w-60 h-16 bg-black mt-10 mb-5 flex items-center justify-center rounded-md">
                                    <span className="text-white">NORTHWEST TERRITORIES</span>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>1-877-NWT-FIRE (698-3473)</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>
                
                </header>
            </article>
        </div>
    );
}


