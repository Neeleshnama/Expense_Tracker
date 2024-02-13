
// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
// import ExpenseTracking from './ExpenseTracking';
// import FamilyRegistration from './FamilyRegistration';
// import ExpenseDetail from './ExpenseDetail';
// import Modal from './Modal.jsx'; // Import the modal component
// import SummaryPage from './SummaryPage.jsx';

// const TripDetails = ({ tripId }) => {
//   const [expenses, setExpenses] = useState([]);
//   const [selectedExpenseId, setSelectedExpenseId] = useState(null);
//   const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
//   const [showRegisterFamilyModal, setShowRegisterFamilyModal] = useState(false);
//   const [showExpenseModal, setShowExpenseModal] = useState(false);
//   const [showSummaryModal, setShowSummaryModal] = useState(false);
//   const [showActions, setShowActions] = useState(false); // New state to control showing buttons at the top
//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const snapshot = await firebase.firestore().collection('expenses').where('tripId', '==', tripId).get();
//         const expenseData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setExpenses(expenseData);
//       } catch (error) {
//         console.error('Error fetching expenses:', error);
//       }
//     };
//     fetchExpenses();
//   }, [tripId]);

//   const handleExpenseClick = (expenseId) => {
//     setSelectedExpenseId(expenseId);
//     setShowExpenseModal(true);
//   };

//   const handleRegisterFamilyClick = () => {
//     setShowRegisterFamilyModal(true);
//   };

//   const handleAddExpenseClick = () => {
//     setShowAddExpenseModal(true);
//   };
  
//   const handleSummaryClick = () => {
//     setShowSummaryModal(true);
//   };
  
//   const handleActionsClick = () => {
//     setShowActions(!showActions); // Toggle the state to show/hide buttons at the top
//   };

//   const closeAddExpenseModal = () => {
//     setShowAddExpenseModal(false);
//   };

//   const closeExpenseModal = () => {
//     setShowExpenseModal(false);
//   };

//   const closeRegisterFamilyModal = () => {
//     setShowRegisterFamilyModal(false);
//   };

//   const closeSummaryModal = () => {
//     setShowSummaryModal(false);
//   };

//   return (
//     <div>
//       {showActions && (
//         <div style={styles.buttonContainer}>
//           <button onClick={handleRegisterFamilyClick} style={styles.button}>Register Family</button>
//           <button onClick={handleAddExpenseClick} style={styles.button}>Add Expense</button>
//           <button onClick={handleSummaryClick} style={styles.button}>Show Division</button>
//         </div>
//       )}
//       <h2>Trip Expenses</h2>
//       {expenses.length === 0 ? (
//         <>
//         <p>No data</p>
//         <div style={styles.buttonContainer}>
//         <button onClick={handleActionsClick} style={styles.button}>Actions</button> </div></>
//       ) : (
        
//         <div style={styles.expenseContainer}>
//           <div style={styles.buttonContainer}>
//         <button onClick={handleActionsClick} style={styles.button}>Actions</button> </div>
      
//           {expenses.map(expense => (
            
//             <div key={expense.id} onClick={() => handleExpenseClick(expense.id)} style={styles.card}>
//               <p>Amount: ₹{expense.amount}</p>
//               <p>Date: {expense.date}</p>
//               <p>Description: {expense.category}</p>
//             </div>
//           ))}
//         </div>
//       )}
     

//       {/* Render AddExpense modal */}
//       <Modal isOpen={showAddExpenseModal} onClose={closeAddExpenseModal}>
//         <ExpenseTracking tripId={tripId} />
//       </Modal>

//       {/* Render RegisterFamily modal */}
//       <Modal isOpen={showRegisterFamilyModal} onClose={closeRegisterFamilyModal}>
//         <FamilyRegistration tripId={tripId} />
//       </Modal>
      
//       {/* Render SummaryPage modal */}
//       <Modal isOpen={showSummaryModal} onClose={closeSummaryModal}>
//         <SummaryPage tripId={tripId} />
//       </Modal>
      
//       {/* Render ExpenseDetail modal */}
//       <Modal isOpen={showExpenseModal} onClose={closeExpenseModal}>
//         <ExpenseDetail expenseId={selectedExpenseId} />
//       </Modal>

//     </div>
//   );
// };

// const styles = {
//   expenseContainer: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '20px',
//   },
//   card: {
//     width: '300px',
//     padding: '20px',
//     borderRadius: '10px',
//     cursor: 'pointer',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//     background: 'linear-gradient(135deg, white, red)',
//     '&:hover': {
//       transform: 'scale(1.05)',
//       boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
//     },
//   },
//   buttonContainer: {
//     textAlign: 'center',
//     margin: '20px 20px',
//   },
//   button: {
//     padding: '10px 30px',
//     fontSize: '16px',
//     backgroundColor: 'green',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     margin: '20px 10px',
//   },
// };

// export default TripDetails;




import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import ExpenseTracking from './ExpenseTracking';
import FamilyRegistration from './FamilyRegistration';
import ExpenseDetail from './ExpenseDetail';
import Modal from './Modal.jsx'; // Import the modal component
import SummaryPage from './SummaryPage.jsx';
import './stylecard.css';
const TripDetails = ({ tripId }) => {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showRegisterFamilyModal, setShowRegisterFamilyModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showActions, setShowActions] = useState(false); // New state to control showing buttons at the top
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const snapshot = await firebase.firestore().collection('expenses').where('tripId', '==', tripId).get();
        const expenseData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setExpenses(expenseData);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchExpenses();
  }, [tripId]);

  const handleExpenseClick = (expenseId) => {
    setSelectedExpenseId(expenseId);
    setShowExpenseModal(true);
  };

  const handleRegisterFamilyClick = () => {
    setShowRegisterFamilyModal(true);
  };

  const handleAddExpenseClick = () => {
    setShowAddExpenseModal(true);
  };
  
  const handleSummaryClick = () => {
    setShowSummaryModal(true);
  };
  
  const handleActionsClick = () => {
    setShowActions(!showActions); // Toggle the state to show/hide buttons at the top
  };

  const closeAddExpenseModal = () => {
    setShowAddExpenseModal(false);
  };

  const closeExpenseModal = () => {
    setShowExpenseModal(false);
  };

  const closeRegisterFamilyModal = () => {
    setShowRegisterFamilyModal(false);
  };

  const closeSummaryModal = () => {
    setShowSummaryModal(false);
  };

  return (
    <div className='bigback'>
      {showActions && (
        <div style={styles.buttonContainer}>
          <button onClick={handleRegisterFamilyClick} style={styles.button}>Register Family</button>
          <button onClick={handleAddExpenseClick} style={styles.button}>Add Expense</button>
          <button onClick={handleSummaryClick} style={styles.button}>Show Division</button>
        </div>
      )}
      <h2 className='h2'>Trip Expenses</h2>
      {expenses.length === 0 ? (
        <>
        <p>No data</p>
        <div style={styles.buttonContainer}>
        <button onClick={handleActionsClick} style={styles.button}>Actions</button> </div></>
      ) : (
        
        <>
        <div style={styles.buttonContainer}>
        <button onClick={handleActionsClick} style={styles.button}>Actions</button> </div>
          
       {expenses.map(expense => (
            
            <div style={{cursor:'pointer'}} key={expense.id} onClick={() => handleExpenseClick(expense.id)} >
              
              <div class="coupon">
  <div class="container">
    <h3 class="expire">₹{expense.amount}</h3>
  </div>
  
  <div className="img"></div>
  
  <div class="container">
    <h2 class="promo"><b>{expense.category}</b></h2> 
    <p> {expense.date}</p>
  </div>
  <div class="container">
    <p > <span class="promo">New</span ></p>
    {/* <p class="expire">Expires: Jan 03, 2021</p> */}
  </div>
</div>
            </div>
          ))}
          </>
        
   

      )}
     

      {/* Render AddExpense modal */}
      <Modal isOpen={showAddExpenseModal} onClose={closeAddExpenseModal}>
        <ExpenseTracking tripId={tripId} />
      </Modal>

      {/* Render RegisterFamily modal */}
      <Modal isOpen={showRegisterFamilyModal} onClose={closeRegisterFamilyModal}>
        <FamilyRegistration tripId={tripId} />
      </Modal>
      
      {/* Render SummaryPage modal */}
      <Modal isOpen={showSummaryModal} onClose={closeSummaryModal}>
        <SummaryPage tripId={tripId} />
      </Modal>
      
      {/* Render ExpenseDetail modal */}
      <Modal isOpen={showExpenseModal} onClose={closeExpenseModal}>
        <ExpenseDetail expenseId={selectedExpenseId} />
      </Modal>

    </div>
  );
};

const styles = {
  expenseContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    cursor: 'pointer',
  },
  card: {
    width: '300px',
    padding: '20px',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    background: 'linear-gradient(135deg, white, red)',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
  },
  buttonContainer: {
    textAlign: 'center',
    margin: '20px 20px',
  },
  button: {
    padding: '10px 30px',
    fontSize: '16px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '20px 10px',
  },
};

export default TripDetails;

