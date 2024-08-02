import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import './SelectLocationOverlay.css';
import { LatLngTuple } from 'leaflet';
import { useState } from 'react';

interface SelectLocationOverlayProps {
    center: [number, number],
    setCenter: (c: [number, number]) => void,
    toggleSelect: () => void,
}

function SelectLocationOverlay({center, setCenter, toggleSelect}: SelectLocationOverlayProps) {
    const [markerPos, setMarkerPos] = useState(center);
    function MapEvents() {
        useMapEvents({
            click: (event) => {
                const {lat, lng} = event.latlng;
                setMarkerPos([lat, lng]);
            }
        });
        return null;
    }

    function handleConfirm() {
        setCenter(markerPos);
        toggleSelect();
    }
    
    return (
        <div className="overlay-mask">
            <div className="overlay-box">   
                <div className="overlay-name">
                    Select Location
                </div>
                <div className="location-map-wrapper">
                    <MapContainer 
                        center={center as LatLngTuple} 
                        zoom={15} 
                        style={{ width: "100%", height: "300px"}}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={markerPos as LatLngTuple} />
                        <MapEvents />
                    </MapContainer>
                </div>
                <button type="button" className="confirm-button" onClick={handleConfirm}>Confirm</button> 
            </div>
        </div>
    );
}

export default SelectLocationOverlay;