import './Sidebar.css';
import Rating from './location_marker/Rating';

import { useState, useEffect } from 'react';

import { LocationDataProps } from './types';

interface SidebarProps {
    isOpen: boolean,
    id: number,
    locations: LocationDataProps[],
    closeSidebar: () => void
}


function Sidebar({ isOpen, locations, id, closeSidebar }: SidebarProps) {
    const sidebarClass = isOpen ? "sidebar open" : "sidebar";

    const [currentLocation, setCurrentLocation] = useState<LocationDataProps | undefined>();

    useEffect(() => {
        setCurrentLocation(getInfo(id));
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
            </div>
        </div>
    );
};

export default Sidebar;