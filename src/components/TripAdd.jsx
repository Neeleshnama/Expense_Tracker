import React, { useState } from 'react';
import TripManagement from './TripManagement';

const TripAdd = () => {
  const [showTripForm, setShowTripForm] = useState(false);

  const handleAddTripClick = () => {
    setShowTripForm(true);
  };

  const handleTripCreated = () => {
    setShowTripForm(false); // Hide the form after creating trip
  };

  return (
    <div style={styles.container}>
      {showTripForm && <TripManagement onTripCreated={handleTripCreated} />}
      <button onClick={handleAddTripClick} style={styles.addButton}>
        Add Trip
      </button>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
  },
  addButton: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default TripAdd;
