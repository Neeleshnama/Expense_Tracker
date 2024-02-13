// import  React, { useState, useEffect } from 'react';

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// //import { CCard } from '@coreui/react'

// const TripList = ({ onTripClick }) => {
//   const [trips, setTrips] = useState([]);

//   useEffect(() => {
//     const fetchTrips = async () => {
//       try {
//         const snapshot = await firebase.firestore().collection('trips').get();
//         const tripData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setTrips(tripData);
//       } catch (error) {
//         console.error('Error fetching trips:', error);
//       }
//     };
//     fetchTrips();
//   }, []);

//   return (
//     <div>
//       <h2>Trip List</h2>
//       <ul>
//         {trips.map(trip => (
//           <li key={trip.id} onClick={() => onTripClick(trip.id)}>
//             {trip.tripName}
//           </li>
//         ))}
//       </ul>
     
//     </div>
//   );
// };

// export default TripList;
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './back.css';

const TripList = ({ onTripClick }) => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const snapshot = await firebase.firestore().collection('trips').get();
        const tripData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTrips(tripData);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className='back'>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Trip List</h2>
      <div   style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {trips.map(trip => (
          <div
            key={trip.id}
            onClick={() => onTripClick(trip.id)}
            style={{
              margin: '10px',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              minWidth: '300px',
              maxWidth: '400px',
              backgroundColor: '#f8f9fa',
            }}
          >
            <h3 style={{ marginBottom: '10px', color: 'red' }}>{trip.tripName}</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '5px',color: 'green' }}>
              <strong>Destination:</strong> {trip.destination}
            </p>
            <p style={{ fontSize: '0.9rem', marginBottom: '5px' }}>
              <strong>Start Date:</strong> {trip.startDate}
            </p>
            <p style={{ fontSize: '0.9rem', marginBottom: '5px' }}>
              <strong>End Date:</strong> {trip.endDate}
            </p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripList;
