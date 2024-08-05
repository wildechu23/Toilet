import 'leaflet/dist/leaflet.css';
import { LatLngTuple } from 'leaflet';
import { useState } from 'react';
import { useLocations } from './useLocations';

import './App.css';
import Sidebar from './Sidebar.tsx';
import AddButton from './add_location/AddButton.tsx';

import MapComponent from './Map.tsx';
import AddLocationOverlay from './add_location/AddLocationOverlay.tsx';


function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarId, setSidebarId] = useState(0);

    const [addLocationOpen, setAddLocationOpen] = useState(false);

    const { locations, updateLocations } = useLocations();
    const [center, setCenter] = useState<LatLngTuple>([42.7284, -73.677]);

    const openSidebar = (id: number) => {
        setSidebarOpen(true);
        setSidebarId(id);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    const toggleOverlay = () => {
        setAddLocationOpen(!addLocationOpen);
    }

    return (
        <>
            <MapComponent
                locations={locations}
                onMarkerClick={openSidebar}
                center={center}
                setCenter={setCenter}
            />
            <Sidebar 
                isOpen={sidebarOpen} 
                locations={locations} 
                id={sidebarId} 
                closeSidebar={closeSidebar} 
            />
            <AddButton openOverlay={toggleOverlay}/>
            <AddLocationOverlay 
                isOpen={addLocationOpen} 
                mapCenter={center} 
                toggleOverlay={toggleOverlay} 
                updateLocations={updateLocations}
            />
        </>
    )
}

export default App
