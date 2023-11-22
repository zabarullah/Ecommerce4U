import React, { useContext, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './alert.styles.css'

import { AlertContext } from '../../context/alert.context';

const Alert = () => {
  const { alert, removeAlert } = useContext(AlertContext);

  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => {
        removeAlert();
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [alert, removeAlert]);

  if (!alert) {
    return null;
  }

  const { type, message } = alert;

  const handleClose = () => {
    removeAlert();
  };

  return (
    <div className={`alert-container alert alert-${type === 'error' ? 'danger' : type}  p-2 rounded mb-3 `} role="alert" style={{ display: 'inline-flex', width: 'auto', marginTop: '-60px' }}>
      <div className="alert-message d-flex align-items-center my-2">
        {type === 'success' ? (
          <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
        ) : (
          <FontAwesomeIcon icon={faTimesCircle} className="me-2" />
        )}
        <span className="message me-2">{message}</span>
      </div>
      <button type="button" className="btn-close position-absolute top-0 end-0 ms-2" onClick={handleClose}></button>
    </div>
  );
};

export default Alert;


// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// //helper function to reset the state of Alert to null
// export const handleAlertClose = (setAlert) => {
//   setAlert(null);
// };

// //Alert Component
// const Alert = ({ type, message, onClose }) => {
//   const [show, setShow] = useState(true);

//   useEffect(() => {
//     if (message) {
//       setShow(true);
//       const timeout = setTimeout(() => {
//         setShow(false);
//         onClose();
//       }, 5000);
//       return () => clearTimeout(timeout);
//     }
//   }, [message, onClose]);

//   const handleClose = () => {
//     setShow(false);
//     onClose();
//   };

//   return (
//     show && (
//       <div className={`alert alert-${type === 'error' ? 'danger' : type} position-fixed p-2 rounded mb-3 start-50 translate-middle-x` } role="alert" style={{ display: 'inline-flex', width: 'auto', marginTop: '-60px' }}>
//         <div className="alert-message d-flex align-items-center my-2"> 
//           {type === 'success' ? (
//             <FontAwesomeIcon icon={faCheckCircle} className="me-2"/>
//           ) : (
//             <FontAwesomeIcon icon={faTimesCircle} className="me-2"/>
//           )}
//           <span className="message me-2">{message}</span>
//         </div>
//         <button type="button" className="btn-close position-absolute top-0 end-0 ms-2" onClick={handleClose}> </button>
//       </div>
//     )
//   );
// };

// export default Alert;
