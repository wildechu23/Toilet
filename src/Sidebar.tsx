import './Sidebar.css';

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
                {getInfo(id)?.name}
            </div>
        </div>
    );
};

export default Sidebar;