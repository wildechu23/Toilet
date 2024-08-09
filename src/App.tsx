import 'leaflet/dist/leaflet.css';
import { LatLngTuple } from 'leaflet';
import { useState } from 'react';
import useLocations from './useLocations';
import { LocationDataProps, RestroomProps, ReviewProps } from './utils/types';
import { fetchRestrooms, fetchReviews } from './utils/toilets_api.tsx';

import './App.css';
import Sidebar from './sidebar/Sidebar.tsx';
import AddButton from './add_location/AddButton.tsx';

import MapComponent from './Map.tsx';
import AddLocationOverlay from './add_location/AddLocationOverlay.tsx';
import ReviewOverlay from './review/ReviewOverlay.tsx';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarId, setSidebarId] = useState(0);
    const [center, setCenter] = useState<LatLngTuple>([42.7284, -73.677]);

    const { locations, updateLocations } = useLocations();

    const [currentLocation, setCurrentLocation] = useState<LocationDataProps | undefined>();
    const [currentRestrooms, setCurrentRestrooms] = useState<RestroomProps[]>([]);
    const [currentReviews, setCurrentReviews] = useState<ReviewProps[]>([]);
    const [editMode, setEditMode] = useState(false);

    
    const [addLocationOpen, setAddLocationOpen] = useState(false);
    const [selectLocationOpen, setSelectLocationOpen] = useState(false);
    const [reviewOpen, setReviewOpen] = useState(false);

    const openOverlay = () => setAddLocationOpen(true);
    const closeOverlay = () => setAddLocationOpen(false);
    const openSelect = () => setSelectLocationOpen(true);
    const closeSelect = () => setSelectLocationOpen(false);

    const [restroomId, setRestroomId] = useState<number | undefined>(undefined);

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
            setCurrentReviews(await fetchReviews(id));
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

    function openReview(id: number) {
        setRestroomId(id);
        setReviewOpen(true);
    }

    function closeReview() {
        setReviewOpen(false);
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
                locations={locations}
                currentLocation={currentLocation}
                currentRestrooms={currentRestrooms}
                currentReviews={currentReviews}
                openOverlay={openOverlay}
                closeSidebar={closeSidebar} 
                openReview={openReview}
            />
            <AddButton openOverlay={openOverlay}/>

            { (addLocationOpen || selectLocationOpen || reviewOpen) && 
                <div className="overlay-mask"></div>
            }
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
            {reviewOpen && 
                <ReviewOverlay 
                    location={currentLocation}
                    restroom={currentRestrooms.find(restroom => restroom.restroom_id == restroomId)}
                    closeReview={closeReview}
                />
            }
        </>
    )
}

export default App
