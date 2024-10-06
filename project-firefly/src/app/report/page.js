<<<<<<< HEAD
"use client"; // Ensure this component renders only on the client side
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const MyMapComponent = () => {
    return (
        <MapContainer 
            center={[48.8566, 2.3522]} // Center coordinates for Paris
            zoom={13} 
            style={{ height: '100vh', width: '100%' }}
        >
            <TileLayer
                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer>
=======
import { Input } from "@/components/ui/input"
import Image from "next/image";
import image1 from '../assets/drone.png'

export default function report() {
    return (
        <div className="app-container">
            <article>
                <header className="fit-parent p-[5%]">
                    <h3>Welcome to the</h3>
                    <h1 className="text-primary">
                        <span className="text-white font-extralight">REPORT </span>PAGE
                    </h1>
                    <div className="flex justify-right v-screen">
                        <Image src={image1} alt='alt' width={550} height={550} className="absolute top-20 right-20" />
                    </div>
                    <h3>See a fire? Report using the form below.</h3>
                    <h3 className="mt-5 mb-10">Your contribution saves lives.</h3>
                    <div className = "space-y-4">
                        <Input type="text" id="location" placeholder="Location of Sighting" maxlength = "30" className="w-80" />
                        <Input type="text" id="location" placeholder="Time of Sighting" maxlength = "30" className="w-80" />
                        <h4 className="pl-2">Upload a photo of the sighting</h4>
                        <Input id="picture" type="file" maxlength = "30" className="w-80" />
                    </div>
                    <button className="w-20 h-10 flex items-center justify-center mt-4 rounded-md bg-[#c35a05] hover:bg-orange-600 hover:shadow-lg" >
                        <span className="text-white">SUBMIT</span>
                    </button>
                </header>
            </article>
        </div>
>>>>>>> 143f7211e98c87b0c4828f196ce7acc845f78eb8
    );
};

export default MyMapComponent;
