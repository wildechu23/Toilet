import './Sidebar.css';
import Rating from './location_marker/Rating';

import { useState, useEffect } from 'react';
import { LocationDataProps, RestroomProps } from './utils/types';
import { fetchRestrooms } from './utils/toilets_api';

interface SidebarProps {
    isOpen: boolean,
    id: number,
    locations: LocationDataProps[],
    closeSidebar: () => void
}

function Sidebar({ isOpen, locations, id, closeSidebar }: SidebarProps) {
    const sidebarClass = isOpen ? "sidebar open" : "sidebar";
    const [currentLocation, setCurrentLocation] = useState<LocationDataProps | undefined>();
    const [currentRestrooms, setCurrentRestrooms] = useState<RestroomProps[]>([])

    useEffect(() => {
        async function setData() {
            setCurrentLocation(getInfo(id));
            setCurrentRestrooms(await fetchRestrooms(id));
        }
        setData();
    }, [id]);

    function getInfo(id: number) {
        return locations.find((location) => {
            if(location.location_id == id) { 
                return location;
            }
        });
    }


    return (
        <div className={sidebarClass}>
            <div className="sidebar-header">
                <input type="text" name="search-bar" className="search-input" placeholder="Search.."></input>
                <button type="button" className="close-button" onClick={closeSidebar}>&#10006;</button>
            </div>
            <div className="location-content">
                <div className="location-name">
                    {currentLocation?.location_name}
                </div>
                <div className="location-star-rating">
                    <Rating rating={3.6}/>
                    ({3.6})
                </div>
                <button type="button" className="edit-sidebar-button">    
                    <i className="fa fa-edit"></i>
                    Edit Location
                </button>
            </div>
            <div className="restrooms">
                {currentRestrooms.map((restroom, index) => (
                    <div key={index} className={"restroom-entry"}>
                        <div className="restroom-title">
                            {restroom.gender}
                        </div>
                        {!!restroom.single_stall && <span title="Single Stall" className="icon single-stall"/>}
                        {!!restroom.wheelchair_stall && <span title="Wheelchair Stall" className="icon wheelchair-stall"/>}
                        {!!restroom.mirrors && <span title="Mirrors" className="icon mirror"/>}
                        {!!restroom.hand_dryers && <span title="Hand Dryers" className="icon hand-dryer"/>}
                        {!!restroom.paper_towels && <span title="Paper Towels"className="icon paper-towel"/>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;