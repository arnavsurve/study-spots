import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import UserLocation from './UserLocation';
import ConfirmModal from './ConfirmModal';

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tempPoint, setTempPoint] = useState(null);

  useEffect(() => {
    UserLocation().then(location => setUserLocation(location));
  }, []);

  if (!userLocation) {
    return <div>Loading...</div>;
  }

  const center = { lat: userLocation[0], lng: userLocation[1] };
  const zoom = 15; // default zoom level

  const onMapClick = (event) => {
    setTempPoint({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    setShowModal(true);
  };

  const onConfirm = () => {
    setSelectedPoints(current => [...current, tempPoint]);
    setShowModal(false);
  }

  return (
    <LoadScript googleMapsApiKey="AIzaSyC8DB-8dU06g4iUL84peKG3NtNhtlOkmKM">
      <GoogleMap 
        mapContainerStyle={{ height: '500px', width: '60%' }} 
        center={center} 
        zoom={zoom} 
        onClick={onMapClick} 
        options={{ disableDefaultUI: false}}
      >

        <Marker position={center} />
        {selectedPoints.map((point, index) => (
          <Marker key={index} position={point} />
        ))}
      </GoogleMap>

      <ConfirmModal
        isOpen={showModal}
        tempPoint={tempPoint}
        onConfirm={onConfirm}
        onCancel={() => setShowModal(false)}
      />
    </LoadScript>
  );
};


export default Map;
