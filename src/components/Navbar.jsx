// import React from 'react';
// import { Link } from 'react-router-dom';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// const Navbar = ({ user }) => {
//   const handleLogout = () => {
//     firebase.auth().signOut();
//   };

//   return (
//     <nav style={styles.nav}>
//       <div className="nav-wrapper container">
//         <Link to="/" className="brand-logo" style={styles.brand}>Expense Tracker</Link>
//         <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
//         <ul className="right hide-on-med-and-down" style={styles.navItems}>
//           <li><Link to="/trip" style={styles.navLink}>Trip Management</Link></li>
//           <li><Link to="/expense" style={styles.navLink}>Add Expense</Link></li>
//           <li><Link to="/family" style={styles.navLink}>Family Registration</Link></li>
//           {user ? (
//             <li><button className="btn red darken-3" onClick={handleLogout} style={styles.logoutBtn}>Logout</button></li>
//           ) : (
//             <li><Link to="/login" style={styles.navLink}>Login</Link></li>
//           )}
//         </ul>
//       </div>
     
//     </nav>
//   );
// };
// // const styles = {
// //   nav: {
// //     backgroundColor: '#1565c0', // Blue darken-2
// //     padding: '0 10px',
// //   },
// //   brand: {
// //     fontSize: '1.5rem',
// //     fontWeight: 'bold',
// //     marginRight: '15px',
// //     textDecoration: 'none', // Remove text decoration
// //   },
// //   navItems: {
// //     display: 'flex',
// //     alignItems: 'center',
// //   },
// //   navLink: {
// //     color: '#fff',
// //     fontSize: '1rem',
// //     marginRight: '15px',
// //     textDecoration: 'none', // Remove text decoration
// //   },
// //   logoutBtn: {
// //     fontSize: '1rem',
// //     marginRight: '15px',
// //   },
// //   mobileNav: {
// //     backgroundColor: '#1565c0', // Blue darken-2
// //   },
// // };
// export default Navbar;
import {React, useState} from 'react';
import { Link ,NavLink} from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import React, { useState } from "react";
//import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "./Navbar.css";

const Navbar = ({ user }) => {
  const handleLogout = () => {
    firebase.auth().signOut();
  };
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
         Expense Tracker
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          Menu
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/trip">Trips</NavLink>
            </li>
            <li>
              <NavLink to="/expense">expenses</NavLink>
            </li>
            <li>
              <NavLink to="/family">Registered Families</NavLink>
            </li>
           <li>
           {user ? (
            <li><button className="btn red darken-3" onClick={handleLogout} >Logout</button></li>
          ) : (
            <li><Link to="/login" >Login</Link></li>
          )}
           </li>
          </ul>
        </div>
      </div>
    </nav>
 
  );
};
// const styles = {
//   nav: {
//     backgroundColor: '#1565c0', // Blue darken-2
//     padding: '0 10px',
//   },
//   brand: {
//     fontSize: '1.5rem',
//     fontWeight: 'bold',
//     marginRight: '15px',
//     textDecoration: 'none', // Remove text decoration
//   },
//   navItems: {
//     display: 'flex',
//     alignItems: 'center',
//   },
//   navLink: {
//     color: '#fff',
//     fontSize: '1rem',
//     marginRight: '15px',
//     textDecoration: 'none', // Remove text decoration
//   },
//   logoutBtn: {
//     fontSize: '1rem',
//     marginRight: '15px',
//   },
//   mobileNav: {
//     backgroundColor: '#1565c0', // Blue darken-2
//   },
// };
export default Navbar;
