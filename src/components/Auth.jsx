import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './back.css'
// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  // Your Firebase config here
  apiKey: "AIzaSyAL0euRkxqPfTufAU6AFtYJvNUH0KCe70Q",
  authDomain: "expensetracker-aa5f9.firebaseapp.com",
  projectId: "expensetracker-aa5f9",
  storageBucket: "expensetracker-aa5f9.appspot.com",
  messagingSenderId: "718244935188",
  appId: "1:718244935188:web:33f82fc52cff9ea7ad5901",
  measurementId: "G-Z31SEJ8HNB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// const Auth = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSignUp = async () => {
//     try {
//       await firebase.auth().createUserWithEmailAndPassword(email, password);
//       setError('');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleSignIn = async () => {
//     try {
//       await firebase.auth().signInWithEmailAndPassword(email, password);
//       setError('');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await firebase.auth().signOut();
//       setError('');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Authentication</h1>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleSignUp}>Sign Up</button>
//       <button onClick={handleSignIn}>Sign In</button>
//       <button onClick={handleSignOut}>Sign Out</button>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default Auth;


const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.container} className='login'> 
      <h1 style={styles.heading}>Authentication</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSignUp} style={styles.button}>Sign Up</button>
      <button onClick={handleSignIn} style={styles.button}>Sign In</button>
      <button onClick={handleSignOut} style={styles.button}>Sign Out</button>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(135deg, #f6d365, #fda085)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: 'white',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    marginBottom: '15px',
  },
  button: {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    border: 'none',
    background: 'black',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginBottom: '10px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
};

export default Auth;
