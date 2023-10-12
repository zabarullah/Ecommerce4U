import React from 'react'

const Button = ({children}) => {
  return (
    <button type="submit" className="btn btn-primary" >{children}</button>
    // data-bs-dismiss="modal"   Thisis whats needed to allow the Modale to close when a submit botton is pressed
  )
}

export default Button