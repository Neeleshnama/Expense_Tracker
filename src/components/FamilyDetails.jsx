import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const FamilyDetails = () => {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        const snapshot = await firebase.firestore().collection('families').get();
        const familyData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFamilies(familyData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching families:', error);
        setLoading(false);
      }
    };
    fetchFamilies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Registered Families</h2>
      {families.length === 0 ? (
        <p>No families registered yet.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableRow}>
              <th style={styles.tableHeader}>Family Name</th>
              <th style={styles.tableHeader}>Number of Members</th>
              <th style={styles.tableHeader}>Members</th>
            </tr>
          </thead>
          <tbody>
            {families.map(family => (
              <tr key={family.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{family.familyName}</td>
                <td style={styles.tableCell}>{family.members.length}</td>
                <td style={styles.tableCell}>
                  <ul style={styles.memberList}>
                    {family.members.map((member, index) => (
                      <li key={index} style={styles.memberItem}>{member.name}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: 'auto',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  tableRow: {
    backgroundColor: '#f2f2f2',
  },
  tableHeader: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    background: '#4CAF50',
    color: 'white',
  },
  tableCell: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  },
  memberList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  memberItem: {
    marginBottom: '5px',
  },
};

export default FamilyDetails;
