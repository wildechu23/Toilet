import 'leaflet/dist/leaflet.css';
import { LatLngTuple } from 'leaflet';
import { useState } from 'react';
import useLocations from './useLocations';
import { LocationDataProps, RestroomProps } from './utils/types';
import { fetchRestrooms } from './utils/toilets_api.tsx';

import './App.css';
import Sidebar from './Sidebar.tsx';
import AddButton from './add_location/AddButton.tsx';

import MapComponent from './Map.tsx';
import AddLocationOverlay from './add_location/AddLocationOverlay.tsx';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarId, setSidebarId] = useState(0);
    const [center, setCenter] = useState<LatLngTuple>([42.7284, -73.677]);

    const { locations, updateLocations } = useLocations();

    const [currentLocation, setCurrentLocation] = useState<LocationDataProps | undefined>();
    const [currentRestrooms, setCurrentRestrooms] = useState<RestroomProps[]>([]);
    const [editMode, setEditMode] = useState(false);

    
    const [addLocationOpen, setAddLocationOpen] = useState(false);
    const [selectLocationOpen, setSelectLocationOpen] = useState(false);

    const openOverlay = () => setAddLocationOpen(true);
    const closeOverlay = () => setAddLocationOpen(false);
    const openSelect = () => setSelectLocationOpen(true);
    const closeSelect = () => setSelectLocationOpen(false);

    function openEdit() {
        setEditMode(true);
    }

    function closeEdit() {
        setEditMode(false);
    }

    async function setData(id: number) {
        const location = getInfo(id);
        setCurrentLocation(location);
        if (location) {
            setCurrentRestrooms(await fetchRestrooms(id));
        }
    }

    function getInfo(id: number) {
        return locations.find((location) => location.location_id === id);
    }


    const openSidebar = (id: number) => {
        setSidebarOpen(true);
        setSidebarId(id);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
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
                id={sidebarId} 
                setData={setData}
                openEdit={openEdit}
                currentLocation={currentLocation}
                currentRestrooms={currentRestrooms}
                openOverlay={openOverlay}
                closeSidebar={closeSidebar} 
            />
            <AddButton openOverlay={openOverlay}/>
            <AddLocationOverlay 
                mapCenter={center} 
                updateLocations={updateLocations}
                editMode={editMode}
                closeEdit={closeEdit}
                addLocationOpen={addLocationOpen}
                selectLocationOpen={selectLocationOpen} 
                openOverlay={openOverlay}
                closeOverlay={closeOverlay}
                openSelect={openSelect}
                closeSelect={closeSelect}
                currentLocation={currentLocation}
                currentRestrooms={currentRestrooms}
            />
        </>
    )
}

export default App
