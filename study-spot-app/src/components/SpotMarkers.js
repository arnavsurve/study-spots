import React, { useEffect, useState } from 'react';
import { Marker } from '@react-google-maps/api';

const SpotMarkers = ({ initialSpots }) => {
  const [spots, setSpots] = useState(initialSpots || []);

  useEffect(() => {
    // Fetch spots from your API
    fetch('http://localhost:8081/api/spots')
      .then(response => response.json())
      .then(data => {
        setSpots(data);
      });
  }, []);

  useEffect(() => {
    console.log(spots); // Log the spots data
  }, [spots]);

  return (
    <>
      {spots.map((spot, index) => (
        <Marker key={index}
            position={{ 
                lat: spot.location.coordinates[1], 
                lng: spot.location.coordinates[0] 
            }} 
        />
      ))}
    </>
  );
};

export default SpotMarkers;