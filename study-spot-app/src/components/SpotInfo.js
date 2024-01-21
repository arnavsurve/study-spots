import React from 'react';

const SpotInfo = ({ spot }) => {
  return (
    <div>
      <h2>{spot.name}</h2>
      <p>{spot.description}</p>
      {/* Display other information about the spot */}
    </div>
  );
};

export default SpotInfo;