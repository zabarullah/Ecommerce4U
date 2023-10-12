import React from 'react'

const Modal = ({children, modalHeading}) => {
  return (
    <div className="modal fade" id="Modal" tabIndex={-1}>
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title">{modalHeading}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
            {/* <p>Modal body text goes here.</p> */}
            {children}
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
        </div>
        </div>
    </div>
    </div>

  )
}

export default Modal;