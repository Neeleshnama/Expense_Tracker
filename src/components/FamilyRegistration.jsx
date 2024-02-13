
import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './back.css';
const FamilyRegistration = ({ tripId }) => {
  const [familyName, setFamilyName] = useState('');
  const [numberOfMembers, setNumberOfMembers] = useState(0);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');

  const handleAddMember = () => {
    const newMembers = [...members];
    newMembers.push({ name: '', age: '' }); // You can add more fields here like age, etc.
    setMembers(newMembers);
  };

  const handleMemberChange = (index, key, value) => {
    const newMembers = [...members];
    newMembers[index][key] = value;
    setMembers(newMembers);
  };

  const handleRegisterFamily = async () => {
    try {
      const familyRef = await firebase.firestore().collection('families').add({
        tripId,
        familyName,
        members,
      });
      console.log('Family registered with ID: ', familyRef.id);
      setError('');
      toast.success('Family registered successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.container} className='register'>
      <h2 style={styles.heading}>Register Family</h2>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Family Name:</label>
        <input
          type="text"
          placeholder="Family Name"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Number of Members:</label>
        <input
          type="number"
          placeholder="Number of Members"
          value={numberOfMembers}
          onChange={(e) => setNumberOfMembers(parseInt(e.target.value))}
          style={styles.input}
        />
      </div>
      {members.map((member, index) => (
        <div key={index} style={styles.memberGroup}>
          <input
            type="text"
            placeholder="Member Name"
            value={member.name}
            onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Member Age"
            value={member.age}
            onChange={(e) => handleMemberChange(index, 'age', parseInt(e.target.value))}
            style={styles.input}
          />
        </div>
      ))}
      <button onClick={handleAddMember} style={styles.button}>Add Member</button>
      <button onClick={handleRegisterFamily} style={styles.button}>Register Family</button>
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
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: 'red',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    marginBottom: '10px',
  },
  memberGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    background: 'black',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  },
};

export default FamilyRegistration;
