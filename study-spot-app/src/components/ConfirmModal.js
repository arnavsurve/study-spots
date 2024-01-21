import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import Modal from 'react-modal';

Modal.defaultStyles.content.width = '300px';
Modal.defaultStyles.content.height = '300px';
Modal.defaultStyles.content.overflow = 'hidden';

const ConfirmModal = ({ isOpen, tempPoint, onConfirm, onCancel }) => {
  const zoom = 15; // default zoom level

  return (
    <Modal isOpen={isOpen}>
      <div>
        <p>Are you sure you want to add this point?</p>

      <GoogleMap 
        mapContainerStyle={{ height: '200px', width: '70%' }} 
        center={tempPoint} 
        zoom={17} 
        options={{ disableDefaultUI: true}}
      >
        <Marker position={tempPoint} />
      </GoogleMap>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;