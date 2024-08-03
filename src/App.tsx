import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import Location from './location_marker/Location.tsx';
import Sidebar from './Sidebar.tsx';
import AddButton from './add_location/AddButton.tsx';

// import locations from './assets/location.json';
import AddLocationOverlay from './add_location/AddLocationOverlay.tsx';

import { LocationDataProps } from './types';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarId, setSidebarId] = useState(0);

    const [addLocationOpen, setAddLocationOpen] = useState(false);

    const [locations, setLocations] = useState([] as LocationDataProps[]);
    
    useEffect(() => { 
        fetchLocations() 
    }, []);
    
    async function fetchLocations() {
        try {
            const res = await axios.get('//localhost:3000/locations');
            setLocations(res.data);
        } catch (err) {
            console.error('Error fetching locations:', err);
        }
    };

    const [center, setCenter] = useState<LatLngTuple>([42.7284, -73.677]);

    function MapEvents() {
        useMapEvents({
            moveend: (event) => {
                const map = event.target;
                setCenter(map.getCenter());
            }
        });
        return null;
    }

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
            <MapContainer center={center} zoom={15} scrollWheelZoom={true} zoomControl={false} style={{ width: "100vw", height: "100vh" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map(location => (
                    <Marker
                        position={[location.latitude, location.longitude] as LatLngTuple}
                        key={location.location_id}
                        eventHandlers={{
                            mouseover: (event) => event.target.openPopup(),
                            mouseout: (event) => event.target.closePopup(),
                            click: () => handleViewSidebar(location.location_id),
                        }}
                    >
                        <Popup>
                            <Location
                                key={location.location_id}
                                id={location.location_id}
                                name={location.location_name}
                            />
                        </Popup>
                    </Marker>
                ))}
                <MapEvents />
            </MapContainer>
            <Sidebar isOpen={sidebarOpen} locations={locations} id={sidebarId} closeSidebar={handleCloseSidebar} />
            <AddButton openOverlay={toggleOverlay}/>
            <AddLocationOverlay isOpen={addLocationOpen} mapCenter={center} toggleOverlay={toggleOverlay} fetchLocations={fetchLocations}/>
        </>
    )
}

export default App
