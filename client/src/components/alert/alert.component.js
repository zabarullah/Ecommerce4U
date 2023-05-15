import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

//helper function to reset the state of Alert to null
export const handleAlertClose = (setAlert) => {
  setAlert(null);
};

//Alert Component
const Alert = ({ type, message, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timeout = setTimeout(() => {
        setShow(false);
        onClose();
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [message, onClose]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  return (
    show && (
      <div className={`alert alert-${type === 'error' ? 'danger' : type} position-fixed p-2 rounded mb-3 start-50 translate-middle-x` } role="alert" style={{ display: 'inline-flex', width: 'auto', marginTop: '-60px' }}>
        <div className="alert-message d-flex align-items-center my-2"> 
          {type === 'success' ? (
            <FontAwesomeIcon icon={faCheckCircle} className="me-2"/>
          ) : (
            <FontAwesomeIcon icon={faTimesCircle} className="me-2"/>
          )}
          <span className="message me-2">{message}</span>
        </div>
        <button type="button" className="btn-close position-absolute top-0 end-0 ms-2" onClick={handleClose}> </button>
      </div>
    )
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
//         <div className="d-flex justify-content-center">
//             <div className={`alert alert-${type === 'error' ? 'danger' : type} position-relative p-2 rounded mb-3` } role="alert" style={{ display: 'inline-flex', width: 'auto' }}>
//                 <div className="d-flex align-items-center my-2"> 
//                 {type === 'success' ? (
//                     <FontAwesomeIcon icon={faCheckCircle} className="me-2"/>
//                 ) : (
//                     <FontAwesomeIcon icon={faTimesCircle} className="me-2"/>
//                 )}
//                 <span className="message me-2">{message}</span>
//                 </div>
//                 <button type="button" className="btn-close position-absolute top-0 end-0 ms-2" onClick={handleClose}> </button>
//             </div>
//         </div>
//     )
//   );
// };

// export default Alert;


