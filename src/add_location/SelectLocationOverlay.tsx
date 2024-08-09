import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import './SelectLocationOverlay.css';
import { LatLngTuple } from 'leaflet';
import { useState } from 'react';

interface SelectLocationOverlayProps {
    center: LatLngTuple,
    setCenter: (c: LatLngTuple) => void,
    openOverlay: () => void,
    closeSelect: () => void,
}

function SelectLocationOverlay({center, setCenter, openOverlay, closeSelect}: SelectLocationOverlayProps) {
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
        closeSelect();
        openOverlay();
    }
    
    return (
        <div className="overlay-box">   
            <div className="overlay-name">
                Select Location
            </div>
            <div className="location-map-wrapper">
                <MapContainer 
                    center={center} 
                    zoom={15} 
                    style={{ width: "100%", height: "300px"}}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={markerPos} />
                    <MapEvents />
                </MapContainer>
            </div>
            <button type="button" className="confirm-button" onClick={handleConfirm}>Confirm</button> 
        </div>
    );
}

export default SelectLocationOverlay;