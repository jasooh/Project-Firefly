"use client"; // Ensure this component renders only on the client side
import { useState } from "react"; // Import useState for managing state
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import "./styles.css"; // Make sure to import the CSS file
import { Icon } from "leaflet";

export default function Report() {
    const [markers, setMarkers] = useState([
        {
            geocode: [48.8566, 2.3522],
            popUp: "Pop up 1"
        },
        {
            geocode: [48.8584, 2.2945],
            popUp: "Pop up 2"
        },
        {
            geocode: [48.8606, 2.3376],
            popUp: "Pop up 3"
        }
    ]);
    const [location, setLocation] = useState(""); // State to hold the input value

    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/14261/14261136.png",
        iconSize: [38, 38]
    });

    const handleInputChange = (e) => {
        setLocation(e.target.value); // Update the location state on input change
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Replace with your own API key for OpenCage
        const apiKey = "4623a02011a8487a99ce0e3c9e3c6cc9";
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const newGeocode = [
                data.results[0].geometry.lat,
                data.results[0].geometry.lng
            ];
            const newMarker = {
                geocode: newGeocode,
                popUp: `Location: ${location}`
            };

            // Update markers state to include the new marker
            setMarkers([...markers, newMarker]);
        } else {
            alert("Location not found"); // Alert if the location is not found
        }

        setLocation(""); // Clear the input after submission
    };

    return (
        <div className="main-content"> {/* Main content wrapper */}
            <div className="container"> {/* Container for map and form */}
                <form onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        placeholder="Enter location"
                        value={location}
                        onChange={handleInputChange} // Handle input changes
                    />
                    <button type="submit">Submit</button>
                </form>

                <MapContainer center={[48.8566, 2.3522]} zoom={13}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {markers.map((marker, index) => (
                        <Marker key={index} position={marker.geocode} icon={customIcon}>
                            {/* Popup content for each marker */}
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
