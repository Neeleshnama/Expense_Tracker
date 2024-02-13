
// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// const ExpenseDetail = ({ expenseId }) => {
//   const [expense, setExpense] = useState(null);
//   const [payingFamilyName, setPayingFamilyName] = useState('');
//   const [comment, setComment] = useState('');
//   const [comments, setComments] = useState([]);
//   const [editingCommentId, setEditingCommentId] = useState('');
//   const [editedComment, setEditedComment] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const unsubscribe = firebase.firestore().collection('expenses').doc(expenseId).onSnapshot((snapshot) => {
//       if (snapshot.exists) {
//         setExpense({ id: snapshot.id, ...snapshot.data() });
//         const fetchData = async () => {
//           try {
//             const expenseData = snapshot.data();
//             const familySnapshot = await firebase.firestore().collection('families').doc(expenseData.payingFamilyId).get();
//             if (familySnapshot.exists) {
//               const familyData = familySnapshot.data();
//               setPayingFamilyName(familyData.familyName);
//             }
//           } catch (error) {
//             console.error('Error fetching paying family:', error);
//           }
//         };
//         fetchData();
//       } else {
//         setExpense(null);
//       }
//     });

//     const commentsRef = firebase.firestore().collection('expenses').doc(expenseId).collection('comments');
//     const commentsListener = commentsRef.orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
//       const updatedComments = [];
//       snapshot.forEach((doc) => {
//         updatedComments.push({ id: doc.id, ...doc.data() });
//       });
//       setComments(updatedComments);
//     });

//     return () => {
//       unsubscribe();
//       commentsListener();
//     };
//   }, [expenseId]);

//   const handleAddComment = async () => {
//     try {
//       if (!comment) {
//         setError('Please enter a comment');
//         return;
//       }
  
//       await firebase.firestore().collection('expenses').doc(expenseId).collection('comments').add({
//         text: comment,
//         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//         // Assuming currentUser is the authenticated user's object with a displayName property
//         // You can replace this with your actual user object
//         user: firebase.auth().currentUser.displayName,
//       });
//       setComment('');
//       setError('');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleEditComment = async (commentId) => {
//     try {
//       await firebase.firestore().collection('expenses').doc(expenseId).collection('comments').doc(commentId).update({
//         text: editedComment,
//       });
//       setEditingCommentId('');
//       setEditedComment('');
//       setError('');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await firebase.firestore().collection('expenses').doc(expenseId).collection('comments').doc(commentId).delete();
//       setError('');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleApproveExpense = async () => {
//     try {
//       await firebase.firestore().collection('expenses').doc(expenseId).update({
//         approved: true,
//       });
//       setError('');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

// return (
//   <div>
//     {expense && (
//       <>
//         <h2>{expense.title}</h2>
//         <table style={styles.table}>
//           <tbody>
//             <tr>
//               <td>Amount:</td>
//               <td>₹ {expense.amount}</td>
//             </tr>
//             <tr>
//               <td>Date:</td>
//               <td>{expense.date}</td>
//             </tr>
//             <tr>
//               <td>Category:</td>
//               <td>{expense.category}</td>
//             </tr>
//             <tr>
//               <td>Paying Family:</td>
//               <td>{payingFamilyName}</td>
//             </tr>
//             <tr>
//               <td>Approved:</td>
//               <td>{expense.approved ? 'Yes' : 'No'}</td>
//             </tr>
//           </tbody>
//         </table>
//         <button onClick={handleApproveExpense}>Approve Expense</button>
//         <h3>Comments</h3>
//         <ul>
//           {comments.map((comment) => (
//             <li key={comment.id} style={styles.commentLi}>
//               {editingCommentId === comment.id ? (
//                 <>
//                   <input
//                     type="text"
//                     value={editedComment}
//                     onChange={(e) => setEditedComment(e.target.value)}
//                     style={styles.commentInput}
//                   />
//                   <button onClick={() => handleEditComment(comment.id)} style={styles.commentButton}>Save</button>
//                   <button onClick={() => setEditingCommentId('')} style={styles.commentButton}>Cancel</button>
//                 </>
//               ) : (
//                 <>
//                   <div>{comment.text}</div>
//                   <div>Time: {new Date(comment.createdAt * 1000).toLocaleString()}</div>
//                   <button onClick={() => setEditingCommentId(comment.id)} style={styles.commentButton}>Edit</button>
//                   <button onClick={() => handleDeleteComment(comment.id)} style={styles.commentButton}>Delete</button>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>
//         <input
//           type="text"
//           placeholder="Add a comment"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           style={styles.commentInput}
//         />
//         <button onClick={handleAddComment} style={styles.commentButton}>Add Comment</button>
//       </>
//     )}
//     {error && <p>{error}</p>}
//   </div>
// );
// };

// const styles = {
// table: {
//   width: '100%',
//   borderCollapse: 'collapse',
//   marginBottom: '20px',
// },
// commentLi: {
//   marginBottom: '10px',
//   padding: '10px',
//   borderRadius: '5px',
//   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//   transition: 'box-shadow 0.3s ease',
//   background: 'linear-gradient(135deg, #f6d365, #fda085)',
//   '&:hover': {
//     boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
//   },
// },
// commentInput: {
//   marginRight: '10px',
//   padding: '5px',
//   borderRadius: '5px',
//   border: '1px solid #ccc',
// },
// commentButton: {
//   padding: '5px 10px',
//   borderRadius: '5px',
//   border: 'none',
//   cursor: 'pointer',
//   margin: '0 5px',
//   background: '#007bff',
//   color: '#fff',
// },
// };

// export default ExpenseDetail;



import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const ExpenseDetail = ({ expenseId }) => {
  const [expense, setExpense] = useState(null);
  const [payingFamilyName, setPayingFamilyName] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState('');
  const [editedComment, setEditedComment] = useState('');
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
        // Handle error
        setLoading(false);
      }
    };
    fetchFamilies();
  }, []);
  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('expenses').doc(expenseId).onSnapshot((snapshot) => {
      if (snapshot.exists) {
        setExpense({ id: snapshot.id, ...snapshot.data() });
        const fetchData = async () => {
          try {
            const expenseData = snapshot.data();
            const familySnapshot = await firebase.firestore().collection('families').doc(expenseData.payingFamilyId).get();
            if (familySnapshot.exists) {
              const familyData = familySnapshot.data();
              setPayingFamilyName(familyData.familyName);
            }
          } catch (error) {
            console.error('Error fetching paying family:', error);
          }
        };
        fetchData();
      } else {
        setExpense(null);
      }
    });

    const commentsRef = firebase.firestore().collection('expenses').doc(expenseId).collection('comments');
    const commentsListener = commentsRef.orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
      const updatedComments = [];
      snapshot.forEach((doc) => {
        updatedComments.push({ id: doc.id, ...doc.data() });
      });
      setComments(updatedComments);
    });

    return () => {
      unsubscribe();
      commentsListener();
    };
  }, [expenseId]);

  const handleAddComment = async () => {
    try {
      if (!comment) {
        setError('Please enter a comment');
        return;
      }
  
      await firebase.firestore().collection('expenses').doc(expenseId).collection('comments').add({
        text: comment,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        // Assuming currentUser is the authenticated user's object with a displayName property
        // You can replace this with your actual user object
        user: firebase.auth().currentUser.displayName,
      });
      setComment('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditComment = async (commentId) => {
    try {
      await firebase.firestore().collection('expenses').doc(expenseId).collection('comments').doc(commentId).update({
        text: editedComment,
      });
      setEditingCommentId('');
      setEditedComment('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await firebase.firestore().collection('expenses').doc(expenseId).collection('comments').doc(commentId).delete();
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleApproveExpense = async () => {
    try {
      await firebase.firestore().collection('expenses').doc(expenseId).update({
        approved: true,
      });
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {expense && (
        <>
          <h2>{expense.title}</h2>
          <table style={styles.table}>
            <tbody>
              <tr style={{color:'red'}}>
                <td>Amount:</td>
                <td>₹ {expense.amount}</td>
              </tr>
              <tr>
                <td>Date:</td>
                <td>{expense.date}</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{expense.category}</td>
              </tr>
              <tr style={{color:'green'}}>
                <td>Paying Family:</td>
                <td>{payingFamilyName}</td>
              </tr>
              <tr style={{color:'red'}}>
                <td>Splitted Among:</td>
                <td>
                  {expense.splitAmongAll ? 'All Families' : expense.selectedFamilies.map(id => {
                    const family = families.find(family => family.id === id);
                    return family ? family.familyName : '';
                  }).join(', ')}
                </td>
              </tr>
              {/* <tr>
                <td>Approved:</td>
                <td>{expense.approved ? 'Yes' : 'No'}</td>
              </tr> */}
            </tbody>
          </table>
          <button onClick={handleApproveExpense}>Approve Expense</button>
          <h3>Comments</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} style={styles.commentLi}>
                {editingCommentId === comment.id ? (
                  <>
                    <input
                      type="text"
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      style={styles.commentInput}
                    />
                    <button onClick={() => handleEditComment(comment.id)} style={styles.commentButton}>Save</button>
                    <button onClick={() => setEditingCommentId('')} style={styles.commentButton}>Cancel</button>
                  </>
                ) : (
                  <>
                    <div>{comment.text}</div>
                    <div>Time: {new Date(comment.createdAt * 1000).toLocaleString()}</div>
                    <button onClick={() => setEditingCommentId(comment.id)} style={styles.commentButton}>Edit</button>
                    <button onClick={() => handleDeleteComment(comment.id)} style={styles.commentButton}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={styles.commentInput}
          />
          <button onClick={handleAddComment} style={styles.commentButton}>Add Comment</button>
        </>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  commentLi: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
    background: 'linear-gradient(135deg, #f6d365, #fda085)',
    '&:hover': {
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
  },
  commentInput: {
    marginRight: '10px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  commentButton: {
    padding: '5px 10px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    margin: '0 5px',
    background: '#007bff',
    color: '#fff',
  },
};

export default ExpenseDetail;
