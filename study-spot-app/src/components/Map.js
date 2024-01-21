import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import UserLocation from './UserLocation';
import ConfirmModal from './ConfirmModal';
import axios from 'axios';
import SpotMarkers from './SpotMarkers';
import SpotInfo from './SpotInfo';

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tempPoint, setTempPoint] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);

  useEffect(() => {
    UserLocation().then(location => setUserLocation(location));
  }, []);

  if (!userLocation) {
    return <div>Loading...</div>;
  }

  const center = { lat: userLocation[0], lng: userLocation[1] };
  const zoom = 15; // default zoom level

  const onMapClick = async (event) => {
    setTempPoint({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    setShowModal(true);

    try {
      const response = await axios.post('http://localhost:8081/api/spots', {
        name: 'study spot',
        type: 'study',
        location: {
          type: 'Point',
          coordinates: [tempPoint.lng, tempPoint.lat]
        },
        description: 'new study spot',
        busyIndex: 0,
        busyIndexSum: 0,
        count: 0
      });
  
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onConfirm = () => {
    setSelectedPoints(current => [...current, tempPoint]);
    setShowModal(false);
  }

  return (
    <LoadScript googleMapsApiKey="AIzaSyA5n9CN1Ge45nGmwqnJSWg3emb1A1eDl_8">
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
        <SpotMarkers />
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
