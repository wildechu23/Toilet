import { ChangeEvent, FormEvent, useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import axios from 'axios';
import './AddLocationOverlay.css';
import SelectLocationOverlay from './SelectLocationOverlay';
import { LatLngTuple } from 'leaflet';

interface AddLocationOverlayProps {
    isOpen: boolean,
    mapCenter: LatLngTuple,
    toggleOverlay: () => void,
    fetchLocations: () => void,
}

interface RestroomProps {
    gender: string,
    single_stall: boolean,
    wheelchair_stall: boolean,
    mirrors: boolean,
    hand_dryers: boolean,
    paper_towels: boolean,
}

const genders = ["Men", "Women", "Unisex"];
const checkboxes = ["Single Stall", "Wheelchair Stall", "Mirrors", "Hand Dryers", "Paper Towels"]

function AddLocationOverlay({ isOpen, mapCenter, toggleOverlay, fetchLocations }: AddLocationOverlayProps) {
    const [locationName, setName] = useState("");
    const [inputFields, setInputFields] = useState([] as RestroomProps[]);
    
    const [center, setCenter] = useState<LatLngTuple>(mapCenter);
    

    const [selectLocationOpen, setSelectLocationOpen] = useState(false);

    function resetData() {
        setName("");
        setInputFields([]);
    }

    useEffect(() => {
        setCenter(mapCenter);
    }, [mapCenter]);

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
        resetData();
        toggleOverlay();
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        axios.post('//localhost:3000/locations', {
            "name": locationName,
            "lat": center[0],
            "lng": center[1],
            "restrooms": inputFields,
        })
        .then((res) => {
            console.log(res);
            fetchLocations();
        })
        .catch((err) => console.log(err));
        exitOverlay();
    }

    function toggleSelect() {
        toggleOverlay();
        setSelectLocationOpen(!selectLocationOpen);
    }

    return (
        <>
            {isOpen && 
            <div className="overlay-mask">
                <div className="overlay-box">    
                    <div className="overlay-name">
                        Add Location
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
                                    </MapContainer>
                                    <button type="button" 
                                        className="edit-button" 
                                        onClick={toggleSelect}>
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
                                        {checkboxes.map((prop) =>
                                            <div key={prop}>
                                                <input
                                                    id={`item-${index}-${prop}`}
                                                    type="checkbox"
                                                    checked={input[prop as keyof RestroomProps] as boolean}
                                                    value={prop}
                                                    name={prop}
                                                    onChange={event => handleFormChange(
                                                        index, 
                                                        event.target.name.toLowerCase().replace(" ", "_") as keyof RestroomProps, event.target.checked
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
            </div>
            }
            {selectLocationOpen &&
                <SelectLocationOverlay center={center} setCenter={handleCenter} toggleSelect={toggleSelect}/>
            }
        </>
    );
}

export default AddLocationOverlay;