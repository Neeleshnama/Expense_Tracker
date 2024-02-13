// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';

// const SummaryPage = ({ tripId }) => {
//   const [expenses, setExpenses] = useState([]);
//   const [families, setFamilies] = useState([]);
//   const [totalTripExpense, setTotalTripExpense] = useState(0);
//   const [totalFairSharePerFamily, setTotalFairSharePerFamily] = useState({});
//   const [loading, setLoading] = useState(true);
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

//     const fetchFamilies = async () => {
//       try {
//         const snapshot = await firebase.firestore().collection('families').get();
//         const familyData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setFamilies(familyData);
//       } catch (error) {
//         console.error('Error fetching families:', error);
//       }
//     };

//     fetchExpenses();
//     fetchFamilies();
//   }, [tripId]);
//   useEffect(() => {
//     if (expenses.length > 0 && families.length > 0) {
//       // Calculate total trip expenses
//       const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
//       setTotalTripExpense(totalExpense);

//       // Calculate total fair share for each family
//       const fairSharePerFamily = expenses.reduce((acc, expense) => {
//         for (const familyId in expense.fairShare) {
//           acc[familyId] = (acc[familyId] || 0) + expense.fairShare[familyId];
//         }
//         return acc;
//       }, {});
//       setTotalFairSharePerFamily(fairSharePerFamily);

//       setLoading(false);
//     }
//   }, [expenses, families]);
//   // Calculate total expenses paid by each family (paying family)
//   const totalExpensesByPayingFamily = expenses.reduce((acc, expense) => {
//     const payingFamilyId = expense.payingFamilyId;
//     acc[payingFamilyId] = (acc[payingFamilyId] || 0) + expense.amount;
//     return acc;
//   }, {});
//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   // Calculate total fair share for each family based on selected families and members
//  // Calculate total fair share for each family based on selected families and members
// // const totalFairSharePerFamily = families.reduce((acc, family) => {
// //     const familyId = family.id;
// //     const selectedExpenses = expenses.filter(expense => expense.families && expense.families.includes(familyId));
// //     const totalFairShare = selectedExpenses.reduce((total, expense) => {
// //       const fairShare = expense.fairShare[familyId] || 0;
// //       return total + fairShare;
// //     }, 0);
// //     acc[familyId] = totalFairShare;
// //     return acc;
// //   }, {});
  

//   // Calculate total trip expenses
//   const totalTripExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

//   return (
//     <div>
//       <h2>Summary</h2>
//       <h3>Total Trip Expenses: {totalTripExpenses}</h3>
//       <h3>Total Expenses Paid by Each Family:</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Family ID</th>
//             <th>Total Expenses</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.keys(totalExpensesByPayingFamily).map(familyId => (
//             <tr key={familyId}>
//               <td>Family {familyId}</td>
//               <td>{totalExpensesByPayingFamily[familyId]}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <h3>Total Fair Share for Each Family:</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Family</th>
//             <th>Total Fair Share</th>
//           </tr>
//         </thead>
//         <tbody>
//           {families.map(family => (
//             <tr key={family.id}>
//               <td>{family.familyName}</td>
//               <td>${totalFairSharePerFamily[family.id] || 0}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SummaryPage;
// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';

// const SummaryPage = ({ tripId }) => {
//   const [expenses, setExpenses] = useState([]);
//   const [families, setFamilies] = useState([]);
//   const [totalTripExpense, setTotalTripExpense] = useState(0);
//   const [totalFairSharePerFamily, setTotalFairSharePerFamily] = useState({});
//   const [loading, setLoading] = useState(true);

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

//     const fetchFamilies = async () => {
//       try {
//         const snapshot = await firebase.firestore().collection('families').get();
//         const familyData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setFamilies(familyData);
//       } catch (error) {
//         console.error('Error fetching families:', error);
//       }
//     };

//     fetchExpenses();
//     fetchFamilies();
//   }, [tripId]);

//   useEffect(() => {
//     if (expenses.length > 0 && families.length > 0) {
//       // Calculate total trip expenses
//       const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
//       setTotalTripExpense(totalExpense);

//       // Calculate total fair share for each family
//       const fairSharePerFamily = expenses.reduce((acc, expense) => {
//         for (const familyId in expense.fairShare) {
//           acc[familyId] = (acc[familyId] || 0) + expense.fairShare[familyId];
//         }
//         return acc;
//       }, {});
//       setTotalFairSharePerFamily(fairSharePerFamily);

//       setLoading(false);
//     }
//   }, [expenses, families]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Summary</h2>
//       <h3>Total Trip Expenses: ${totalTripExpense}</h3>
//       <h3>Total Expenses Paid by Each Family:</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Family</th>
//             <th>Total Expenses</th>
//           </tr>
//         </thead>
//         <tbody>
//           {families.map(family => {
//             const totalExpenses = expenses.reduce((total, expense) => {
//               if (expense.payingFamilyId === family.id) {
//                 total += expense.amount;
//               }
//               return total;
//             }, 0);
//             return (
//               <tr key={family.id}>
//                 <td>{family.familyName}</td>
//                 <td>{totalExpenses}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <h3>Total Fair Share for Each Family:</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Family</th>
//             <th>Total Fair Share</th>
//           </tr>
//         </thead>
//         <tbody>
//           {families.map(family => (
//             <tr key={family.id}>
//               <td>{family.familyName}</td>
//               <td>${totalFairSharePerFamily[family.id] || 0}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SummaryPage;

// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';

// const SummaryPage = ({ tripId }) => {
//   const [expenses, setExpenses] = useState([]);
//   const [families, setFamilies] = useState([]);
//   const [totalTripExpense, setTotalTripExpense] = useState(0);
//   const [totalFairSharePerFamily, setTotalFairSharePerFamily] = useState({});
//   const [loading, setLoading] = useState(true);

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

//     const fetchFamilies = async () => {
//       try {
//         const snapshot = await firebase.firestore().collection('families').get();
//         const familyData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setFamilies(familyData);
//       } catch (error) {
//         console.error('Error fetching families:', error);
//       }
//     };

//     fetchExpenses();
//     fetchFamilies();
//   }, [tripId]);

//   useEffect(() => {
//     if (expenses.length > 0 && families.length > 0) {
//       // Calculate total trip expenses
//       const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
//       setTotalTripExpense(totalExpense);

//       // Calculate total fair share for each family
//       const fairSharePerFamily = expenses.reduce((acc, expense) => {
//         for (const familyId in expense.fairShare) {
//           acc[familyId] = (acc[familyId] || 0) + expense.fairShare[familyId];
//         }
//         return acc;
//       }, {});
//       setTotalFairSharePerFamily(fairSharePerFamily);

//       setLoading(false);
//     }
//   }, [expenses, families]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Summary</h2>
//       <h3>Total Trip Expenses: ${totalTripExpense}</h3>
//       <h3>Total Expenses Paid by Each Family:</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Family</th>
//             <th>Total Expenses</th>
//             <th>Fair Share</th>
//             <th>Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           {families.map(family => {
//             const totalExpenses = expenses.reduce((total, expense) => {
//               if (expense.payingFamilyId === family.id) {
//                 total += expense.amount;
//               }
//               return total;
//             }, 0);

//             const totalFairShare = totalFairSharePerFamily[family.id] || 0;

//             // Calculate description
//             let description = '';
//             const amountToBePaid = totalFairShare - totalExpenses;
//             if (amountToBePaid > 0) {
//               description = `Amount to be paid: $${amountToBePaid}`;
//             } else if (amountToBePaid < 0) {
//               description = `Amount to be returned: $${Math.abs(amountToBePaid)}`;
//             } else {
//               description = 'No amount to be paid or returned';
//             }

//             return (
//               <tr key={family.id}>
//                 <td>{family.familyName}</td>
//                 <td>${totalExpenses}</td>
//                 <td>${totalFairShare}</td>
//                 <td>{description}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SummaryPage;

// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';

// const SummaryPage = ({ tripId }) => {
//   const [expenses, setExpenses] = useState([]);
//   const [families, setFamilies] = useState([]);
//   const [totalTripExpense, setTotalTripExpense] = useState(0);
//   const [totalFairSharePerFamily, setTotalFairSharePerFamily] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchExpensesAndFamilies = async () => {
//       try {
//         const expenseSnapshot = await firebase.firestore().collection('expenses').where('tripId', '==', tripId).get();
//         const expenseData = expenseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setExpenses(expenseData);

//         const familySnapshot = await firebase.firestore().collection('families').get();
//         const familyData = familySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setFamilies(familyData);

//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchExpensesAndFamilies();
//   }, [tripId]);

//   useEffect(() => {
//     if (expenses.length > 0 && families.length > 0) {
//       // Calculate total trip expenses
//       const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
//       setTotalTripExpense(totalExpense);

//       // Calculate total fair share for each family
//       const fairSharePerFamily = expenses.reduce((acc, expense) => {
//         for (const familyId in expense.fairShare) {
//           acc[familyId] = (acc[familyId] || 0) + expense.fairShare[familyId];
//         }
//         return acc;
//       }, {});
//       setTotalFairSharePerFamily(fairSharePerFamily);
//     }
//   }, [expenses, families]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Summary</h2>
//       <h3>Total Trip Expenses: ${totalTripExpense}</h3>
//       <h3>Total Expenses Paid by Each Family:</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Family</th>
//             <th>Total Expenses</th>
//             <th>Fair Share</th>
//             <th>Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           {families.map(family => {
//             const totalExpenses = expenses.reduce((total, expense) => {
//               if (expense.payingFamilyId === family.id) {
//                 total += expense.amount;
//               }
//               return total;
//             }, 0);

//             const totalFairShare = totalFairSharePerFamily[family.id] || 0;

//             // Calculate description
//             let description = '';
//             const amountToBePaid = totalFairShare - totalExpenses;
//             if (amountToBePaid > 0) {
//               description = `Amount to be paid: $${amountToBePaid}`;
//             } else if (amountToBePaid < 0) {
//               description = `Amount to be returned: $${Math.abs(amountToBePaid)}`;
//             } else {
//               description = 'No amount to be paid or returned';
//             }

//             return (
//               <tr key={family.id}>
//                 <td>{family.familyName}</td>
//                 <td>${totalExpenses}</td>
//                 <td>${totalFairShare}</td>
//                 <td>{description}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SummaryPage;
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const SummaryPage = ({ tripId }) => {
  const [expenses, setExpenses] = useState([]);
  const [families, setFamilies] = useState([]);
  const [totalTripExpense, setTotalTripExpense] = useState(0);
  const [totalFairSharePerFamily, setTotalFairSharePerFamily] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpensesAndFamilies = async () => {
      try {
        const expenseSnapshot = await firebase.firestore().collection('expenses').where('tripId', '==', tripId).get();
        const expenseData = expenseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setExpenses(expenseData);

        const familySnapshot = await firebase.firestore().collection('families').get();
        const familyData = familySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFamilies(familyData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchExpensesAndFamilies();
  }, [tripId]);

  useEffect(() => {
    if (expenses.length > 0 && families.length > 0) {
      // Calculate total trip expenses
      const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
      setTotalTripExpense(totalExpense);

      // Calculate total fair share for each family
      const fairSharePerFamily = expenses.reduce((acc, expense) => {
        for (const familyId in expense.fairShare) {
          acc[familyId] = (acc[familyId] || 0) + expense.fairShare[familyId];
        }
        return acc;
      }, {});
      setTotalFairSharePerFamily(fairSharePerFamily);
    }
  }, [expenses, families]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Summary</h2>
      <h3>Total Trip Expenses: <span style={{ color: 'red' }}>₹{totalTripExpense}</span></h3>
      <h3>Total Expenses Paid by Each Family:</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Family</th>
            <th>Total Expenses</th>
            <th>Fair Share</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {families.map(family => {
            const totalExpenses = expenses.reduce((total, expense) => {
              if (expense.payingFamilyId === family.id) {
                total += expense.amount;
              }
              return total;
            }, 0);

            const totalFairShare = totalFairSharePerFamily[family.id] || 0;

            // Calculate description
            let description = '';
            const amountToBePaid = totalFairShare - totalExpenses;
            if (amountToBePaid > 0) {
              description = <span style={{ color: 'red' }}>Amount to be paid: ₹{Math.round(amountToBePaid)}</span>;
            } else if (amountToBePaid < 0) {
              description = <span style={{ color: 'green' }}>Amount to be returned: ₹{Math.round(Math.abs(amountToBePaid))}</span>;
            } else {
              description = 'No amount to be paid or returned';
            }

            return (
              <tr key={family.id} style={styles.tableRow}>
                <td>{family.familyName}</td>
                <td>₹{totalExpenses}</td>
                <td>₹{Math.round(totalFairShare)}</td>
                <td>{description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableRow: {
    
    border:'3px solid #ccc',
  },
};

export default SummaryPage;
