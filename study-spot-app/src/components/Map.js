import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import UserLocation from './UserLocation';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    UserLocation().then(location => setUserLocation(location));
  }, []);

  if (!userLocation) {
    return <div>Loading...</div>;
  }

  const center = { lat: userLocation[0], lng: userLocation[1] };
  const zoom = 15; // default zoom level

  return (
    <LoadScript googleMapsApiKey="AIzaSyC8DB-8dU06g4iUL84peKG3NtNhtlOkmKM">
      <GoogleMap mapContainerStyle={{ height: '500px', width: '60%' }} center={center} zoom={zoom}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

//   return (
//     <MapContainer center={userLocation} zoom={15} style={{ height: '400px', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
// 
//       <Marker position={userLocation}>
//         <Popup>You are here</Popup>
//       </Marker>
// 
//     </MapContainer>
//   );


export default Map;
