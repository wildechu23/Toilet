import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { LocationProps } from './utils/types.tsx';
import LocationMarker from './location_marker/LocationMarker.tsx';
import './Map.css'
import { useEffect } from 'react';

interface MapComponentProps {
    locations: LocationProps[];
    onMarkerClick: (id: number) => void;
    center: LatLngTuple;
    setCenter: (center: LatLngTuple) => void;
}

function MapComponent({ locations, onMarkerClick, center, setCenter }: MapComponentProps) {
    const MapEvents = () => {
        useMapEvents({
            moveend: (event) => {
                const map = event.target;
                setCenter(map.getCenter());
            }
        });
        return null;
    };

    return (
        <MapContainer center={center} zoom={15} scrollWheelZoom={true} zoomControl={false} style={{ width: "100vw", height: "100vh" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map(location => (
                <Marker
                    position={[location.latitude, location.longitude] as LatLngTuple}
                    key={location.location_id}
                    eventHandlers={{
                        mouseover: (event) => event.target.openPopup(),
                        mouseout: (event) => event.target.closePopup(),
                        click: () => onMarkerClick(location.location_id),
                    }}
                >
                    <Popup closeButton={false}>
                        <LocationMarker
                            key={location.location_id}
                            id={location.location_id}
                            name={location.location_name}
                            rating={location.rating}
                            updateTrigger={locations.find(l => l.location_id == location.location_id)}
                        />
                    </Popup>
                </Marker>
            ))}
            <MapEvents />
        </MapContainer>
    );
};

export default MapComponent;