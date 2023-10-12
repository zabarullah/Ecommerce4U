import React from 'react'

const CategoryForm = ({handleSubmit, value, setValue, modalHeading, children, action}) => {
  return (
    <>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            {action === "handleDelete"? 
              null 
            :  
            <input type="text" className="form-control" placeholder={modalHeading ? modalHeading : "Enter New Category Name"}
            value={value}  
            onChange={(e) => setValue(e.target.value)} />
          }
        </div>
        {children? children : modalHeading? 
          <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >Confirm</button>
          : null
        }
          
        </form>
    </>
  )
};

export default CategoryForm;