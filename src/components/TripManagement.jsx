import React, { useState } from 'react';
//import firebase from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// //import 'firebase/firestore';
// //import firebase from 'firebase'; // Importing the entire firebase library
// //import 'firebase/firestore'
// const TripManagement = () => {
//   const [tripName, setTripName] = useState('');
//   const [destination, setDestination] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [error, setError] = useState('');

//   const handleCreateTrip = async () => {
//     try {
//       const tripRef = await firebase.firestore().collection('trips').add({
//         tripName,
//         destination,
//         startDate,
//         endDate,
//         families: [],
//       });
//       console.log('Trip created with ID: ', tripRef.id);
//       setError('');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Create New Trip</h2>
//       <input
//         type="text"
//         placeholder="Trip Name"
//         value={tripName}
//         onChange={(e) => setTripName(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Destination"
//         value={destination}
//         onChange={(e) => setDestination(e.target.value)}
//       />
//       <input
//         type="date"
//         placeholder="Start Date"
//         value={startDate}
//         onChange={(e) => setStartDate(e.target.value)}
//       />
//       <input
//         type="date"
//         placeholder="End Date"
//         value={endDate}
//         onChange={(e) => setEndDate(e.target.value)}
//       />
//       <button onClick={handleCreateTrip}>Create Trip</button>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default TripManagement;

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TripManagement = () => {
  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  // const handleCreateTrip = async () => {
  //   try {
  //     // Your create trip logic here
  //     setError('');
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };
    const handleCreateTrip = async () => {
    try {
      const tripRef = await firebase.firestore().collection('trips').add({
        tripName,
        destination,
        startDate,
        endDate,
        families: [],
      });
      console.log('Trip created with ID: ', tripRef.id);
      setError('');
      toast.success('Trip created successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create New Trip</h2>
      <label htmlFor="">Trip Name</label>
      <input
        type="text"
        placeholder="Trip Name"
        value={tripName}
        onChange={(e) => setTripName(e.target.value)}
        style={styles.input}
      />
      <label htmlFor="">Where did you want to go ?</label>
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        style={styles.input}
      />
      <label htmlFor="">Start Date</label>
      <input
        type="date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        style={styles.input}
      />
      <label htmlFor="">End Date</label>
      <input
        type="date"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleCreateTrip} style={styles.button}>Create Trip</button>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: 'red',
  },
  input: {
    width: '100%',
    marginBottom: '15px',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    textAlign: 'center',
  },
};

export default TripManagement;
