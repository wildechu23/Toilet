import './Sidebar.css';
import Rating from './location_marker/Rating';

import locations from './assets/location.json';

interface SidebarProps {
    isOpen: boolean,
    id: number,
    closeSidebar: () => void
}

function getInfo(id: number) {
    return locations.find((location) => {
        if(location.id == id) { 
            return location;
        }
    });
}

function Sidebar({ isOpen, id, closeSidebar }: SidebarProps) {
    const sidebarClass = isOpen ? "sidebar open" : "sidebar";

    return (
        <div className={sidebarClass}>
            <div className="sidebar-header">
                <input type="text" className="search-input" placeholder="Search.."></input>
                <button type="button" className="close-button" onClick={closeSidebar}>&#10006;</button>
            </div>
            <div className="location-content">
                <div className="location-name">
                    {getInfo(id)?.name}
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