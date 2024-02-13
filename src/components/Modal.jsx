import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button style={styles.closeButton} onClick={onClose}>Close</button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    overflow: 'scroll',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    overflow: 'scroll',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '5px 10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ddd',
    cursor: 'pointer',
  },
};

export default Modal;
