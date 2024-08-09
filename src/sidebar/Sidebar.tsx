import './Sidebar.css';
import Rating from '../location_marker/Rating';
import RestroomLabel from './RestroomLabel';
import ReviewElement from './ReviewElement';

import { useEffect } from 'react';
import { LocationProps, RestroomProps, ReviewProps } from '../utils/types';

interface SidebarProps {
    isOpen: boolean,
    id: number,
    setData: (id: number) => void
    openEdit: () => void,
    locations: LocationProps[],
    currentLocation: LocationProps | undefined,
    currentRestrooms: RestroomProps[],
    currentReviews: ReviewProps[],
    openOverlay: () => void,
    closeSidebar: () => void,
    openReview: (id: number) => void,
}

function Sidebar({ 
    isOpen, 
    id, 
    setData,
    openEdit,
    locations,
    currentLocation,
    currentRestrooms,
    currentReviews,
    openOverlay,
    closeSidebar,
    openReview
}: SidebarProps) {
    const sidebarClass = isOpen ? "sidebar open" : "sidebar";

    useEffect(() => {
        setData(id);
    }, [id, locations]);

    function openEditLocation() {
        openEdit();
        openOverlay();
    }

    function calculateRating() {
        if(currentReviews.length == 0) return 0;
        return currentReviews.reduce((total: number, next: ReviewProps) => total + next.rating, 0) / currentReviews.length;
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
                    <Rating rating={calculateRating()}/>
                    ({currentReviews.length})
                </div>
                <button type="button" className="edit-sidebar-button" onClick={openEditLocation}>    
                    <i className="fa fa-edit"></i>
                    Edit Location
                </button>
            </div>
            <div className="restrooms">
                <div className="sidebar-item-title">
                    Restrooms
                </div>
                {currentRestrooms.map((restroom, index) => 
                    <RestroomLabel key={index} restroom={restroom} addReview={() => {openReview(restroom.restroom_id!)}}/>
                )}
            </div>
            <div className="reviews">
                <div className="sidebar-item-title">
                    Reviews
                </div>
                {currentReviews.length == 0 ? "No Reviews" :
                currentReviews.map((review, index) => 
                    <ReviewElement 
                        key={index} 
                        review={review}
                        gender={
                            currentRestrooms.find(r => r.restroom_id === review.restroom_id)?.gender
                        }/>
                )}
            </div>
        </div>
    );
};

export default Sidebar;