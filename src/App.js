import React, { useState, useEffect } from 'react';
//import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router';
import {Route,Navigate,Routes} from "react-router-dom"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import Auth from './components/Auth';
import ExpenseTracking from './components/ExpenseTracking';
import FamilyRegistration from './components/FamilyRegistration';
import TripManagement from './components/TripManagement';
import ExpenseDetail from './components/ExpenseDetail';
import Navbar from './components/Navbar';
import TripList from './components/TripList';
import TripDetails from './components/TripDetails';
import TripAdd from './components/TripAdd';
import FamilyDetails from './components/FamilyDetails';
import Modal from './components/Modal';
function App() {
  const [user, setUser] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showfamily, setshowfamily] = useState(true);
  const handleTripClick = (tripId) => {
    setSelectedTrip(tripId);
  };
  const closefamilyModal = () => {
    setshowfamily(false);
  };
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    
      <div className="App">
        <Navbar user={user} />
        {!selectedTrip ? <TripList onTripClick={handleTripClick} /> : <TripDetails tripId={selectedTrip} />}
        <Routes> 
          <Route exact path="/" element = {user ? <Navigate to="/" /> : <Auth />}
            
          />
          <Route path="/expense" element= {user ? <ExpenseTracking tripId={selectedTrip}/> : <Navigate to="/" />}/>
            
         
          <Route path="/family" element= {user ?<Modal isOpen={showfamily} onClose={closefamilyModal}> <FamilyDetails /> </Modal> : <Navigate to="/" />} />
            
          
          <Route path="/trip"  element= {user ? <TripAdd/> : <Navigate to="/" />}/>
            
          
            
         
         
          </Routes> 
      </div>
   
  );
}

export default App;
