import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { useState } from 'react';

import './App.css';
import Location from './Location.tsx'
import Sidebar from './Sidebar.tsx'

import locations from './assets/location.json';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarId, setSidebarId] = useState(0);

    const handleViewSidebar = (id: number) => {
        setSidebarOpen(true);
        setSidebarId(id);
    };

    const handleCloseSidebar = () => {
        setSidebarOpen(false);
    }

    return (
        <>
            <MapContainer center={[42.7284, -73.677]} zoom={15} scrollWheelZoom={true} zoomControl={false} style={{ width: "100vw", height: "100vh" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map(location => (
                    <Marker
                        position={location.latlng as LatLngTuple}
                        key={location.id}
                        eventHandlers={{
                            mouseover: (event) => event.target.openPopup(),
                            mouseout: (event) => event.target.closePopup(),
                            click: () => handleViewSidebar(location.id),
                        }}
                    >
                        <Popup>
                            <Location
                                key={location.id}
                                id={location.id}
                                name={location.name}
                                latlng={location.latlng}
                            />
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            <Sidebar isOpen={sidebarOpen} id={sidebarId} closeSidebar={handleCloseSidebar} />
        </>
    )
}

export default App
