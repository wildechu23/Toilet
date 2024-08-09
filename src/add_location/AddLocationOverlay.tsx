import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import './AddLocationOverlay.css';
import SelectLocationOverlay from './SelectLocationOverlay';
import { LatLngTuple } from 'leaflet';

import { postLocation, putLocation } from '../utils/toilets_api';
import { LocationProps, RestroomProps } from '../utils/types';

interface AddLocationOverlayProps {
    mapCenter: LatLngTuple,
    updateLocations: () => void,
    editMode: boolean,
    closeEdit: () => void,
    addLocationOpen: boolean, 
    selectLocationOpen: boolean, 
    openOverlay: () => void, 
    closeOverlay: () => void, 
    openSelect: () => void,
    closeSelect: () => void, 
    currentLocation: LocationProps | undefined,
    currentRestrooms: RestroomProps[]
}

const genders = ["Men", "Women", "Unisex"];
const checkboxes = ["Single Stall", "Wheelchair Stall", "Mirrors", "Hand Dryers", "Paper Towels"]
const amenities = ["single_stall", "wheelchair_stall", "mirrors", "hand_dryers", "paper_towels"];


function AddLocationOverlay({ 
    mapCenter, 
    updateLocations, 
    editMode, 
    closeEdit, 
    addLocationOpen, 
    selectLocationOpen, 
    openOverlay,
    closeOverlay, 
    openSelect,
    closeSelect,
    currentLocation, 
    currentRestrooms, 
}: AddLocationOverlayProps) {
    const [locationName, setName] = useState("");
    const [inputFields, setInputFields] = useState([] as RestroomProps[]);
    
    const [center, setCenter] = useState<LatLngTuple>(mapCenter);
    

    useEffect(() => {
        if(editMode && currentLocation) {
            setName(currentLocation.location_name);
            setInputFields(currentRestrooms);
            setCenter([currentLocation.latitude, currentLocation.longitude]);
        } else {
            setName("");
            setInputFields([]);
            setCenter(mapCenter);
        }
    }, [editMode, currentLocation, mapCenter]);

    function resetData() {
        setName("");
        setInputFields([]);
    }


    function addEmptyRestroom() {
        setInputFields(prev => [...prev, {
            gender: "",
            single_stall: false,
            wheelchair_stall: false,
            mirrors: false,
            hand_dryers: false,
            paper_towels: false,
        }]);
    }

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setName(value);
    };

    function handleFormChange<K extends keyof RestroomProps, V extends RestroomProps[K]>(
        index: number, name: K, checked: V 
    ) {
        let data = [...inputFields];
        data[index][name] = checked;
        setInputFields(data);
    }

    function handleCenter(c: LatLngTuple) {
        setCenter(c);
    }

    function exitOverlay() {
        if(editMode) closeEdit();
        resetData();
        closeOverlay();
    }

    function handleEditLocation() {
        closeOverlay();
        openSelect();
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let locationPromise;
        if(editMode && currentLocation) {
            locationPromise = putLocation(locationName, currentLocation.location_id, center, inputFields);
        } else {
            locationPromise = postLocation(locationName, center, inputFields);
        }

        locationPromise.then(() => {
            updateLocations();
        })
        .catch((err) => {
            console.error(err);
        })
        exitOverlay();
    }

    function UpdateMapView({ center }: { center: LatLngTuple }) {
        const map = useMap();
        useEffect(() => {
            map.setView(center, map.getZoom(), { animate: false });
        }, [center, map]);
        return null;
    }

    return (
        <>
            {addLocationOpen && 
                <div className="overlay-box">    
                    <div className="overlay-name">
                        {editMode ? "Edit Location" : "Add Location"}
                    </div>
                    <button type="button" className="close-overlay-button" onClick={exitOverlay}>X</button>
                    <form className="location-form" onSubmit={handleSubmit}>
                        <div className="location-header">
                            Place Details:
                        </div>
                        <fieldset className="location-fields">
                            <div className="location-name-field">
                                <label htmlFor="location-name">Name:</label>
                                <input 
                                    type="text" 
                                    id="location-name" 
                                    name="location-name" 
                                    onChange={handleNameChange} 
                                    value={locationName} 
                                />
                            </div>
                            <div className="location-map-wrapper">
                                <div className="location-map-button">
                                    <MapContainer 
                                        center={center} zoom={15} 
                                        attributionControl={false} 
                                        doubleClickZoom={false}
                                        dragging={false}
                                        scrollWheelZoom={false}
                                        trackResize={false}
                                        touchZoom={false}
                                        zoomControl={false} 
                                        style={{ width: "100%", height: "300px"}}
                                    >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker
                                            position={center}
                                        ></Marker>
                                        <UpdateMapView center={center} />
                                    </MapContainer>
                                    <button type="button" 
                                        className="edit-button" 
                                        onClick={handleEditLocation}>
                                        Edit Location
                                    </button>
                                </div>
                            </div>
                        </fieldset>
                        <div className="overlay-restrooms">
                            Restrooms:
                        </div>
                        <div className="restroom-list">
                            {inputFields.map((input, index) =>
                                <div className="restroom-item" key={index}>
                                    Restroom #{index + 1}
                                    <fieldset>
                                        <legend>Gender</legend> 
                                        {genders.map((gender) => 
                                            <div key={gender}>
                                                <input 
                                                    type="radio" 
                                                    id={`gender-${index}-${gender}`} 
                                                    checked={input.gender == gender} 
                                                    value={gender} 
                                                    onChange={event => handleFormChange(
                                                        index, 
                                                        "gender",
                                                        event.target.value
                                                    )}
                                                />
                                                <label>{gender}</label>
                                            </div>
                                        )}
                                    </fieldset>
                                    <fieldset>
                                        <legend>Amenities</legend>
                                        {checkboxes.map((prop, jndex) =>
                                            <div key={prop}>
                                                <input
                                                    id={`item-${index}-${prop}`}
                                                    type="checkbox"
                                                    checked={input[amenities[jndex] as keyof RestroomProps] as boolean}
                                                    value={prop}
                                                    name={prop}
                                                    onChange={event => handleFormChange(
                                                        index, 
                                                        amenities[jndex] as keyof RestroomProps, event.target.checked
                                                    )}
                                                />
                                                <label htmlFor={`item-${index}-${prop}`}>{prop}</label>
                                            </div>
                                        )}
                                    </fieldset>
                                </div>
                            )}
                        </div>
                        <button type="button" className="add-restroom-button" onClick={addEmptyRestroom}>Add Restroom</button>
                        <div className="overlay-submit">
                            <button type="submit" className="submit-button">Submit</button>
                        </div>
                    </form>
                </div>
            }
            {selectLocationOpen &&
                <SelectLocationOverlay center={center} setCenter={handleCenter} openOverlay={openOverlay} closeSelect={closeSelect}/>
            }
        </>
    );
}

export default AddLocationOverlay;