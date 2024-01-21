import React, { useEffect, useState } from 'react';
import { Marker } from '@react-google-maps/api';

const SpotMarkers = () => {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    // Fetch spots from your API
    fetch('/api/spots')
      .then(response => response.json())
      .then(data => setSpots(data));
  }, []);

  return (
    <>
      {spots.map((spot, index) => (
        <Marker key={index} position={{ lat: spot.lat, lng: spot.lng }} />
      ))}
    </>
  );
};

export default SpotMarkers;