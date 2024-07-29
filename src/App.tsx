import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { useState } from 'react';

import './App.css';
import Location from './location_marker/Location.tsx';
import Sidebar from './Sidebar.tsx';
import AddButton from './add_location/AddButton.tsx';

import locations from './assets/location.json';
import AddLocationOverlay from './add_location/AddLocationOverlay.tsx';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarId, setSidebarId] = useState(0);

    const [addLocationOpen, setAddLocationOpen] = useState(false);

    const handleViewSidebar = (id: number) => {
        setSidebarOpen(true);
        setSidebarId(id);
    };

    const handleCloseSidebar = () => {
        setSidebarOpen(false);
    }

    const toggleOverlay = () => {
        setAddLocationOpen(!addLocationOpen);
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
            <AddButton openOverlay={toggleOverlay}/>
            <AddLocationOverlay isOpen={addLocationOpen} closeOverlay={toggleOverlay}/>
        </>
    )
}

export default App
