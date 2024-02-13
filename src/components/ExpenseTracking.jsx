// import React, { useState } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';


// const ExpenseTracking = ({ tripId, families }) => {
//   const [amount, setAmount] = useState('');
//   const [date, setDate] = useState('');
//   const [category, setCategory] = useState('');
//   const [splitAmongAll, setSplitAmongAll] = useState(false);
//   const [selectedFamilies, setSelectedFamilies] = useState([]);
//   const [error, setError] = useState('');
//   const setFamilyMembersParticipating = (familyId, memberId) => {
//     setSelectedFamilies((prevSelectedFamilies) => {
//       return prevSelectedFamilies.map((family) => {
//         if (family.id === familyId) {
//           return { ...family, participatingMemberId: memberId };
//         }
//         return family;
//       });
//     });
//   };
//   const calculateFairShare = () => {
//     let totalMembers = 0;
//     const familyMembers = {};

//     if (splitAmongAll) {
//       for (const family of families) {
//         totalMembers += family.members.length;
//         familyMembers[family.id] = family.members.length;
//       }
//     } else {
//       for (const selectedFamily of selectedFamilies) {
//         const family = families.find((f) => f.id === selectedFamily);
//         if (family) {
//           const selectedFamilyMembers = family.members.filter((member) =>
//             member.participating ? member.participating : true
//           );
//           totalMembers += selectedFamilyMembers.length;
//           familyMembers[selectedFamily] = selectedFamilyMembers.length;
//         }
//       }
//     }

//     const fairShare = parseFloat(amount) / totalMembers;

//     const splitData = {};
//     for (const familyId in familyMembers) {
//       splitData[familyId] = fairShare * familyMembers[familyId];
//     }

//     return splitData;
//   };

//   const handleAddExpense = async () => {
//     try {
//       if (!amount || !date || !category) {
//         setError('Please fill in all fields');
//         return;
//       }

//       if (!splitAmongAll && selectedFamilies.length === 0) {
//         setError('Please select at least one family or choose to split among all families');
//         return;
//       }

//       const expenseData = {
//         tripId,
//         amount: parseFloat(amount),
//         date,
//         category,
//         splitAmongAll,
//         families: selectedFamilies,
//         fairShare: calculateFairShare(),
//       };

//       const expenseRef = await firebase.firestore().collection('expenses').add(expenseData);
//       console.log('Expense added with ID: ', expenseRef.id);
//       setError('');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Expense</h2>
//       <input
//         type="number"
//         placeholder="Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
//       <input
//         type="date"
//         placeholder="Date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Category"
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//       />
//       <select
//         multiple
//         onChange={(e) =>
//           setSelectedFamilies(Array.from(e.target.selectedOptions, (option) => option.value))
//         }
//       >
//         <option value="">Select Families</option>
//         {families.map((family) => (
//           <option key={family.id} value={family.id}>
//             {family.name}
//           </option>
//         ))}
//       </select>
//       {selectedFamilies.map((familyId) => (
//         <div key={familyId}>
//           <h3>{families.find((f) => f.id === familyId).name}</h3>
//           <label>
//             Members Participating:
//             <select
//               onChange={(e) =>
//                 setFamilyMembersParticipating(familyId, e.target.value === 'all' ? null : e.target.value)
//               }
//             >
//               <option value="all">All Members</option>
//               {families
//                 .find((f) => f.id === familyId)
//                 .members.map((member) => (
//                   <option key={member.id} value={member.id}>
//                     {member.name}
//                   </option>
//                 ))}
//             </select>
//           </label>
//         </div>
//       ))}
//       <label>
//         <input
//           type="checkbox"
//           checked={splitAmongAll}
//           onChange={(e) => setSplitAmongAll(e.target.checked)}
//         />
//         Split among all families
//       </label>
//       <button onClick={handleAddExpense}>Add Expense</button>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default ExpenseTracking;


// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';

// const ExpenseTracking = ({ tripId }) => {
//   const [amount, setAmount] = useState('');
//   const [date, setDate] = useState('');
//   const [category, setCategory] = useState('');
//   const [splitAmongAll, setSplitAmongAll] = useState(false);
//   const [selectedFamilies, setSelectedFamilies] = useState([]);
//   const [error, setError] = useState('');
//   const [families, setFamilies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFamilies = async () => {
//       try {
//         const snapshot = await firebase.firestore().collection('families').get();
//         const familyData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setFamilies(familyData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching families:', error);
//         setError('Error fetching families');
//         setLoading(false);
//       }
//     };
//     fetchFamilies();
//   }, []);

//   const setFamilyMembersParticipating = (familyId, memberId) => {
//     setSelectedFamilies(prevSelectedFamilies => {
//       return prevSelectedFamilies.map(family => {
//         if (family.id === familyId) {
//           return { ...family, participatingMemberId: memberId };
//         }
//         return family;
//       });
//     });
//   };

//   const calculateFairShare = () => {
//     let totalMembers = 0;
//     const familyMembers = {};

//     if (splitAmongAll) {
//       for (const family of families) {
//         totalMembers += family.members.length;
//         familyMembers[family.id] = family.members.length;
//       }
//     } else {
//       for (const selectedFamily of selectedFamilies) {
//         const family = families.find(f => f.id === selectedFamily);
//         if (family) {
//           const selectedFamilyMembers = family.members.filter(member => (member.participating ? member.participating : true));
//           totalMembers += selectedFamilyMembers.length;
//           familyMembers[selectedFamily] = selectedFamilyMembers.length;
//         }
//       }
//     }

//     const fairShare = parseFloat(amount) / totalMembers;

//     const splitData = {};
//     for (const familyId in familyMembers) {
//       splitData[familyId] = fairShare * familyMembers[familyId];
//     }

//     return splitData;
//   };

//   const handleAddExpense = async () => {
//     try {
//       if (!amount || !date || !category) {
//         setError('Please fill in all fields');
//         return;
//       }

//       if (!splitAmongAll && selectedFamilies.length === 0) {
//         setError('Please select at least one family or choose to split among all families');
//         return;
//       }

//       const expenseData = {
//         tripId,
//         amount: parseFloat(amount),
//         date,
//         category,
//         splitAmongAll,
//         families: selectedFamilies,
//         fairShare: calculateFairShare(),
//       };

//       const expenseRef = await firebase.firestore().collection('expenses').add(expenseData);
//       console.log('Expense added with ID: ', expenseRef.id);
//       setError('');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Add Expense</h2>
//       {families.length === 0 ? (
//         <p>No families registered. Please register a family first.</p>
//       ) : (
//         <>
//           <input
//             type="number"
//             placeholder="Amount"
//             value={amount}
//             onChange={e => setAmount(e.target.value)}
//           />
//           <input
//             type="date"
//             placeholder="Date"
//             value={date}
//             onChange={e => setDate(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Category"
//             value={category}
//             onChange={e => setCategory(e.target.value)}
//           />
//           <select
//             multiple
//             onChange={e =>
//               setSelectedFamilies(Array.from(e.target.selectedOptions, option => option.value))
//             }
//           >
//             <option value="">Select Families</option>
//             {families.map(family => (
//               <option key={family.id} value={family.id}>
//                 {family.familyName}
//               </option>
//             ))}
//           </select>
//           {selectedFamilies.map(familyId => (
//             <div key={familyId}>
//               <h3>{families.find(f => f.id === familyId).name}</h3>
//               <label>
//                 Members Participating:
//                 <select multiple
//                   onChange={e =>
//                     setFamilyMembersParticipating(
//                       familyId,
//                       e.target.value === 'all' ? null : e.target.value
//                     )
//                   }
//                 >
//                   <option value="all">All Members</option>
//                   {families
//                     .find(f => f.id === familyId)
//                     .members.map(member => (
//                       <option key={member.id} value={member.id}>
//                         {member.name}
//                       </option>
//                     ))}
//                 </select>
//               </label>
//             </div>
//           ))}
//           <label>
//             <input
//               type="checkbox"
//               checked={splitAmongAll}
//               onChange={e => setSplitAmongAll(e.target.checked)}
//             />
//             Split among all families
//           </label>
//           <button onClick={handleAddExpense}>Add Expense</button>
//         </>
//       )}
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default ExpenseTracking;

// new 
// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import SummaryPage from './SummaryPage';

// const ExpenseTracking = ({ tripId }) => {
//   const [amount, setAmount] = useState('');
//   const [date, setDate] = useState('');
//   const [category, setCategory] = useState('');
//   const [splitAmongAll, setSplitAmongAll] = useState(false);
//   const [selectedFamilies, setSelectedFamilies] = useState([]);
//   const [selectedFamilyMembers, setSelectedFamilyMembers] = useState({});
//   const [payingFamilyId, setPayingFamilyId] = useState('');
//   const [error, setError] = useState('');
//   const [families, setFamilies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFamilies = async () => {
//       try {
//         const snapshot = await firebase.firestore().collection('families').get();
//         const familyData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setFamilies(familyData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching families:', error);
//         setError('Error fetching families');
//         setLoading(false);
//       }
//     };
//     fetchFamilies();
//   }, []);

//   const setFamilyMembersParticipating = (familyId, memberIds) => {
//     setSelectedFamilyMembers(prevSelectedFamilyMembers => ({
//       ...prevSelectedFamilyMembers,
//       [familyId]: memberIds,
//     }));
//   };

//   const handleAddExpense = async () => {
//     try {
//       if (!amount || !date || !category) {
//         setError('Please fill in all fields');
//         return;
//       }

//       if (!splitAmongAll && selectedFamilies.length === 0) {
//         setError('Please select at least one family or choose to split among all families');
//         return;
//       }

//       const expenseData = {
//         tripId,
//         amount: parseFloat(amount),
//         date,
//         category,
//         splitAmongAll,
//         selectedFamilies,
//         selectedFamilyMembers,
//         payingFamilyId,
//         fairShare: calculateFairShare(),
//       };

//       const expenseRef = await firebase.firestore().collection('expenses').add(expenseData);
//       console.log('Expense added with ID: ', expenseRef.id);
//       setError('');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const calculateFairShare = () => {
//     let totalMembers = 0;
//     const familyMembers = {};

//     if (splitAmongAll) {
//       for (const family of families) {
//         totalMembers += family.members.length;
//         familyMembers[family.id] = family.members.length;
//       }
//     } else {
//       for (const selectedFamilyId in selectedFamilyMembers) {
//         const memberIds = selectedFamilyMembers[selectedFamilyId];
//         const family = families.find(f => f.id === selectedFamilyId);
//         if (family) {
//           const selectedFamilyMembers = family.members.filter(member => memberIds.includes(member.id));
//           totalMembers += selectedFamilyMembers.length;
//           familyMembers[selectedFamilyId] = selectedFamilyMembers.length;
//         }
//       }
//     }

//     const fairShare = parseFloat(amount) / totalMembers;

//     const splitData = {};
//     for (const familyId in familyMembers) {
//       splitData[familyId] = fairShare * familyMembers[familyId];
//     }

//     return splitData;
//   };
  
  
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Add Expense</h2>
//       {families.length === 0 ? (
//         <p>No families registered. Please register a family first.</p>
//       ) : (
//         <>
//           <input
//             type="number"
//             placeholder="Amount"
//             value={amount}
//             onChange={e => setAmount(e.target.value)}
//           />
//           <input
//             type="date"
//             placeholder="Date"
//             value={date}
//             onChange={e => setDate(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Category"
//             value={category}
//             onChange={e => setCategory(e.target.value)}
//           />
       
//           <label>
//             Paying Family:
//             <select
//               value={payingFamilyId}
//               onChange={e => setPayingFamilyId(e.target.value)}
//             >
//               <option value="">Select Paying Family</option>
//               {families.map(family => (
//                 <option key={family.id} value={family.id}>
//                   {family.familyName}
//                 </option>
//               ))}
//             </select>
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               checked={splitAmongAll}
//               onChange={e => setSplitAmongAll(e.target.checked)}
//               disabled={selectedFamilies.length > 0}
//             />
//             Split among all families
//           </label>
//           <button onClick={handleAddExpense}>Add Expense</button>
//         </>
//       )}
//       {error && <p>{error}</p>}
//       <SummaryPage tripId={tripId}/>
//     </div>
//   );
// };

// export default ExpenseTracking;

//new css

// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import SummaryPage from './SummaryPage';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ExpenseTracking = ({ tripId }) => {
//   const [amount, setAmount] = useState('');
//   const [date, setDate] = useState('');
//   const [category, setCategory] = useState('');
//   const [splitAmongAll, setSplitAmongAll] = useState(false);
//   const [selectedFamilies, setSelectedFamilies] = useState([]);
//   const [selectedFamilyMembers, setSelectedFamilyMembers] = useState({});
//   const [payingFamilyId, setPayingFamilyId] = useState('');
//   const [error, setError] = useState('');
//   const [families, setFamilies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFamilies = async () => {
//       try {
//         const snapshot = await firebase.firestore().collection('families').get();
//         const familyData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setFamilies(familyData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching families:', error);
//         setError('Error fetching families');
//         setLoading(false);
//       }
//     };
//     fetchFamilies();
//   }, []);

//   const setFamilyMembersParticipating = (familyId, memberIds) => {
//     setSelectedFamilyMembers(prevSelectedFamilyMembers => ({
//       ...prevSelectedFamilyMembers,
//       [familyId]: memberIds,
//     }));
//   };

//   const handleAddExpense = async () => {
//     try {
//       if (!amount || !date || !category) {
//         setError('Please fill in all fields');
//         return;
//       }

//       if (!splitAmongAll && selectedFamilies.length === 0) {
//         setError('Please select at least one family or choose to split among all families');
//         return;
//       }

//       const expenseData = {
//         tripId,
//         amount: parseFloat(amount),
//         date,
//         category,
//         splitAmongAll,
//         selectedFamilies,
//         selectedFamilyMembers,
//         payingFamilyId,
//         fairShare: calculateFairShare(),
//       };

//       const expenseRef = await firebase.firestore().collection('expenses').add(expenseData);
//       console.log('Expense added with ID: ', expenseRef.id);
//       setError('');
//       toast.success('Expense Added successfully!');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const calculateFairShare = () => {
//     let totalMembers = 0;
//     const familyMembers = {};

//     if (splitAmongAll) {
//       for (const family of families) {
//         totalMembers += family.members.length;
//         familyMembers[family.id] = family.members.length;
//       }
//     } else {
//       for (const selectedFamilyId in selectedFamilyMembers) {
//         const memberIds = selectedFamilyMembers[selectedFamilyId];
//         const family = families.find(f => f.id === selectedFamilyId);
//         if (family) {
//           const selectedFamilyMembers = family.members.filter(member => memberIds.includes(member.id));
//           totalMembers += selectedFamilyMembers.length;
//           familyMembers[selectedFamilyId] = selectedFamilyMembers.length;
//         }
//       }
//     }

//     const fairShare = parseFloat(amount) / totalMembers;

//     const splitData = {};
//     for (const familyId in familyMembers) {
//       splitData[familyId] = fairShare * familyMembers[familyId];
//     }

//     return splitData;
//   };
  
  
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Add Expense</h2>
//       {families.length === 0 ? (
//         <p>No families registered. Please register a family first.</p>
//       ) : (
//         <>
//         <label htmlFor="">Amount( in ₹)</label>
//           <input
//             type="number"
//             placeholder="Amount"
//             value={amount}
//             onChange={e => setAmount(e.target.value)}
//             style={styles.input}
//           />
//           <label htmlFor="">Date</label>
//           <input
//             type="date"
//             placeholder="Date"
//             value={date}
//             onChange={e => setDate(e.target.value)}
//             style={styles.input}
//           />
//           <input
//             type="text"
//             placeholder="Category"
//             value={category}
//             onChange={e => setCategory(e.target.value)}
//             style={styles.input}
//           />
       
//           <label style={styles.label}>
//             Paying Family:
//             <select
//               value={payingFamilyId}
//               onChange={e => setPayingFamilyId(e.target.value)}
//               style={styles.select}
//             >
//               <option value="">Select Paying Family</option>
//               {families.map(family => (
//                 <option key={family.id} value={family.id}>
//                   {family.familyName}
//                 </option>
//               ))}
//             </select>
//           </label>
//           <label style={styles.label}>
//             <input
//               type="checkbox"
//               checked={splitAmongAll}
//               onChange={e => setSplitAmongAll(e.target.checked)}
//               disabled={selectedFamilies.length > 0}
//             />
//             Split among all families
//           </label>
//           <button onClick={handleAddExpense} style={styles.button}>Add Expense</button>
//         </>
//       )}
//       {error && <p style={styles.error}>{error}</p>}
//       {/* <SummaryPage tripId={tripId}/> */}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '400px',
//     margin: 'auto',
//     padding: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//   },
//   heading: {
//     textAlign: 'center',
//     marginBottom: '20px',
//   },
//   input: {
//     width: '100%',
//     marginBottom: '15px',
//     padding: '10px',
//     fontSize: '16px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     boxSizing: 'border-box',
//   },
//   label: {
//     display: 'block',
//     marginBottom: '15px',
//   },
//   select: {
//     width: '100%',
//     padding: '10px',
//     fontSize: '16px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     boxSizing: 'border-box',
//   },
//   button: {
//     width: '100%',
//     padding: '10px',
//     fontSize: '16px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },
//   error: {
//     color: 'red',
//     marginTop: '10px',
//     textAlign: 'center',
//   },
// };

// export default ExpenseTracking;

// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ExpenseTracking = ({ tripId }) => {
//   const [amount, setAmount] = useState('');
//   const [date, setDate] = useState('');
//   const [category, setCategory] = useState('');
//   const [splitAmongAll, setSplitAmongAll] = useState(false);
//   const [selectedFamilies, setSelectedFamilies] = useState([]);
//   const [selectedFamilyMembers, setSelectedFamilyMembers] = useState({});
//   const [payingFamilyId, setPayingFamilyId] = useState('');
//   const [error, setError] = useState('');
//   const [families, setFamilies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFamilies = async () => {
//       try {
//         const snapshot = await firebase.firestore().collection('families').get();
//         const familyData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setFamilies(familyData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching families:', error);
//         setError('Error fetching families');
//         setLoading(false);
//       }
//     };
//     fetchFamilies();
//   }, []);

//   const setFamilyMembersParticipating = (familyId, memberIds) => {
//     setSelectedFamilyMembers(prevSelectedFamilyMembers => ({
//       ...prevSelectedFamilyMembers,
//       [familyId]: memberIds,
//     }));
//   };

//   const handleAddExpense = async () => {
//     try {
//       if (!amount || !date || !category) {
//         setError('Please fill in all fields');
//         return;
//       }

//       if (!splitAmongAll && selectedFamilies.length === 0) {
//         setError('Please select at least one family or choose to split among all families');
//         return;
//       }

//       const expenseData = {
//         tripId,
//         amount: parseFloat(amount),
//         date,
//         category,
//         splitAmongAll,
//         selectedFamilies,
//         selectedFamilyMembers,
//         payingFamilyId,
//         fairShare: calculateFairShare(),
//       };

//       const expenseRef = await firebase.firestore().collection('expenses').add(expenseData);
//       console.log('Expense added with ID: ', expenseRef.id);
//       setError('');
//       toast.success('Expense Added successfully!');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const calculateFairShare = () => {
//     let totalMembers = 0;
//     const familyMembers = {};
  
//     // If splitting among all families
//     if (splitAmongAll) {
//       for (const family of families) {
//         totalMembers += family.members.length;
//         familyMembers[family.id] = family.members.length;
//       }
//     } else {
//       // If specific families are selected
//       for (const selectedFamilyId of selectedFamilies) {
//         const memberIds = selectedFamilyMembers[selectedFamilyId] || [];
//         const family = families.find(f => f.id === selectedFamilyId);
//         if (family) {
//           const selectedFamilyMembersCount = memberIds.length; // Count only selected members
//           totalMembers += selectedFamilyMembersCount;
//           familyMembers[selectedFamilyId] = selectedFamilyMembersCount;
//         }
//       }
//     }
  
//     // Calculate fair share
//     const fairShare = parseFloat(amount) / (totalMembers || 1); // Ensure totalMembers is not 0
  
//     // Distribute fair share among families
//     const splitData = {};
//     for (const familyId in familyMembers) {
//       splitData[familyId] = fairShare * familyMembers[familyId];
//     }
  
//     return splitData;
//   };
  
  

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Add Expense</h2>
//       {families.length === 0 ? (
//         <p>No families registered. Please register a family first.</p>
//       ) : (
//         <>
         
//           <input
//             type="number"
//             placeholder="Amount"
//             value={amount}
//             onChange={e => setAmount(e.target.value)}
//             style={styles.input}
//           />
//           <input
//             type="date"
//             placeholder="Date"
//             value={date}
//             onChange={e => setDate(e.target.value)}
//             style={styles.input}
//           />
//           <input
//             type="text"
//             placeholder="Category"
//             value={category}
//             onChange={e => setCategory(e.target.value)}
//             style={styles.input}
//           />
//           <label style={styles.label}>
//             Paying Family:
//             <select
//               value={payingFamilyId}
//               onChange={e => setPayingFamilyId(e.target.value)}
//               style={styles.select}
//             >
//               <option value="">Select Paying Family</option>
//               {families.map(family => (
//                 <option key={family.id} value={family.id}>
//                   {family.familyName}
//                 </option>
//               ))}
//             </select>
//           </label>
//           <label style={styles.label}>
//             Select Families for Splitting:
//             <select
//               multiple
//               value={selectedFamilies}
//               onChange={e => setSelectedFamilies(Array.from(e.target.selectedOptions, option => option.value))}
//               style={styles.select}
//             >
//               {families.map(family => (
//                 <option key={family.id} value={family.id}>
//                   {family.familyName}
//                 </option>
//               ))}
//             </select>
//           </label>
//           {selectedFamilies.map((selectedFamilyId, index) => (
//             <div key={index}>
//               <label style={styles.label}>
//                 Select members from {families.find(family => family.id === selectedFamilyId)?.familyName}:
//                 <select
//                   multiple
//                   value={selectedFamilyMembers[selectedFamilyId] || []}
//                   onChange={e => setFamilyMembersParticipating(selectedFamilyId, Array.from(e.target.selectedOptions, option => option.value))}
//                   style={styles.select}
//                 >
//                   {families.find(family => family.id === selectedFamilyId)?.members.map(member => (
//                     <option key={member.id} value={member.id}>
//                       {member.name}
//                     </option>
//                   ))}
//                 </select>
//               </label>
//             </div>
//           ))}
//           <label style={styles.label}>
//             <input
//               type="checkbox"
//               checked={splitAmongAll}
//               onChange={e => setSplitAmongAll(e.target.checked)}
//               disabled={selectedFamilies.length > 0}
//             />
//             Split among all families
//           </label>
//           <button onClick={handleAddExpense} style={styles.button}>Add Expense</button>
//         </>
//       )}
//       {error && <p style={styles.error}>{error}</p>}
//     </div>
//   );
// };


// const styles = {
//   container: {
//     maxWidth: '400px',
//     margin: 'auto',
//     padding: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//   },
//   heading: {
//     textAlign: 'center',
//     marginBottom: '20px',
//   },
//   input: {
//     width: '100%',
//     marginBottom: '15px',
//     padding: '10px',
//     fontSize: '16px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     boxSizing: 'border-box',
//   },
//   label: {
//     display: 'block',
//     marginBottom: '15px',
//   },
//   select: {
//     width: '100%',
//     padding: '10px',
//     fontSize: '16px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     boxSizing: 'border-box',
//   },
//   button: {
//     width: '100%',
//     padding: '10px',
//     fontSize: '16px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },
//   error: {
//     color: 'red',
//     marginTop: '10px',
//     textAlign: 'center',
//   },
// };

// export default ExpenseTracking;

import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExpenseTracking = ({ tripId }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [splitAmongAll, setSplitAmongAll] = useState(false);
  const [selectedFamilies, setSelectedFamilies] = useState([]);
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState({});
  const [payingFamilyId, setPayingFamilyId] = useState('');
  const [error, setError] = useState('');
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
        setError('Error fetching families');
        setLoading(false);
      }
    };
    fetchFamilies();
  }, []);

  const handleFamilyCheckboxChange = (event, familyId) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedFamilies([...selectedFamilies, familyId]);
    } else {
      setSelectedFamilies(selectedFamilies.filter(id => id !== familyId));
      setSelectedFamilyMembers(prevSelectedFamilyMembers => {
        const updatedSelectedFamilyMembers = { ...prevSelectedFamilyMembers };
        delete updatedSelectedFamilyMembers[familyId];
        return updatedSelectedFamilyMembers;
      });
    }
  };

  const handleMemberCheckboxChange = (event, familyId, memberName) => {
    const { checked } = event.target;
    setSelectedFamilyMembers(prevSelectedFamilyMembers => ({
      ...prevSelectedFamilyMembers,
      [familyId]: checked
        ? [...(prevSelectedFamilyMembers[familyId] || []), memberName]
        : (prevSelectedFamilyMembers[familyId] || []).filter(name => name !== memberName),
    }));
  };
  
  

  const handleAddExpense = async () => {
    try {
      if (!amount || !date || !category) {
        setError('Please fill in all fields');
        return;
      }

      if (!splitAmongAll && selectedFamilies.length === 0) {
        setError('Please select at least one family or choose to split among all families');
        return;
      }

      const expenseData = {
        tripId,
        amount: parseFloat(amount),
        date,
        category,
        splitAmongAll,
        selectedFamilies,
        selectedFamilyMembers,
        payingFamilyId,
        fairShare: calculateFairShare(),
      };

      const expenseRef = await firebase.firestore().collection('expenses').add(expenseData);
      console.log('Expense added with ID: ', expenseRef.id);
      setError('');
      toast.success('Expense Added successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  const calculateFairShare = () => {
    let totalMembers = 0;
    const familyMembers = {};
  
    // If splitting among all families
    if (splitAmongAll) {
      for (const family of families) {
        totalMembers += family.members.length;
        familyMembers[family.id] = family.members.length;
      }
    } else {
      // If specific families are selected
      for (const selectedFamilyId of selectedFamilies) {
        const memberIds = selectedFamilyMembers[selectedFamilyId] || [];
        const family = families.find(f => f.id === selectedFamilyId);
        if (family) {
          const selectedFamilyMembersCount = memberIds.length; // Count only selected members
          totalMembers += selectedFamilyMembersCount;
          familyMembers[selectedFamilyId] = selectedFamilyMembersCount;
        }
      }
    }
  
    // Calculate fair share
    const fairShare = parseFloat(amount) / (totalMembers || 1); // Ensure totalMembers is not 0
  
    // Distribute fair share among families
    const splitData = {};
    for (const familyId in familyMembers) {
      splitData[familyId] = fairShare * familyMembers[familyId];
    }
  
    return splitData;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Expense</h2>
      {families.length === 0 ? (
        <p>No families registered. Please register a family first.</p>
      ) : (
        <>
        <label htmlFor="" style={styles.label}>Amount(in ₹)</label>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            style={styles.input}
          />
          <label htmlFor="" style={styles.label}>Date</label>
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={e => setDate(e.target.value)}
            style={styles.input}
          />
          <label htmlFor="" style={styles.label}>Description</label>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={styles.input}
          />
          <label style={styles.label}>
            Paying Family:
            <select
              value={payingFamilyId}
              onChange={e => setPayingFamilyId(e.target.value)}
              style={styles.select}
            >
              <option value="">Select Paying Family</option>
              {families.map(family => (
                <option key={family.id} value={family.id}>
                  {family.familyName}
                </option>
              ))}
            </select>
          </label>
          <label style={styles.label}>
            Select Families for Splitting:
          </label>
          {families.map(family => (
            <div key={family.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFamilies.includes(family.id)}
                  onChange={e => handleFamilyCheckboxChange(e, family.id)}
                />
                {family.familyName}
              </label>
              {selectedFamilies.includes(family.id) && (
                <div>
                  <label style={{font:'bold',fontSize:'20px'}} >
                    Select members from {family.familyName}:
                  </label>
                 
                  {family.members.map(member => (
                    <div key={member.id}>
                      <label style={{color:'red'}}>
                        <input
                          type="checkbox"
                          checked={(selectedFamilyMembers[family.id] || []).includes(member.name)}
                          onChange={e => handleMemberCheckboxChange(e, family.id, member.name)}
                        />
                        {member.name}
                    
                      </label>
                    </div>
                  ))}
                  <hr />
                </div>
              )}
            </div>
          ))}
          <hr />
          <h3 style={{color:'red'}}>Or</h3>
          <label style={styles.label}>
            <input
              type="checkbox"
              checked={splitAmongAll}
              onChange={e => setSplitAmongAll(e.target.checked)}
              disabled={selectedFamilies.length > 0}
            />
            Split among all families
          </label>
          <button onClick={handleAddExpense} style={styles.button}>Add Expense</button>
        </>
      )}
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
  label: {
    display: 'block',
    marginBottom: '5px',
    
  },
  select: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
    marginBottom: '15px',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
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

export default ExpenseTracking;







