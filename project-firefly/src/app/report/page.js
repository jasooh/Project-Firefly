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
    );
};

export default MyMapComponent;
