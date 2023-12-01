import React, {Fragment, useEffect, useState, useContext} from 'react'
import axios from 'axios';

import { useAuth } from "../../../src/context/auth.context.js";
import { AlertContext } from '../../../src/context/alert.context.js';

import Layout from '../../components/layout/layout.component';
import AdminMenu from '../../components/adminMenu/adminMenu.component';
import CategoryForm from '../../components/forms/category.form';
import Modal from '../../components/modal/modal.component.js';
import Button from '../../components/button/button.component.js';


const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [auth] = useAuth(); // Get the Auth state
    const { alert, setAlert } = useContext(AlertContext);// to set the Alert type and message (alert displayed inside the Layout component)
    const [selected, setSelected] = useState(null);
    const [action, setAction] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [modalHeading, setModalheading] = useState('');


    //handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                '/api/v1/category/create-category', 
                {name},
                {
                    headers: {
                        Authorization: auth.token
                    }
                }
            );

            if(response.data?.success) {
                setName('');
                // Delay the execution of getAllCategories by 1000 milliseconds (1 second)
                setTimeout(() => {
                    getAllCategories();
                }, 2500);
                // getAllCategories();
                setAlert({type: 'success', message: response.data.message}); 
            }           
        } catch (error) {
            console.log(error);
            setAlert({type: 'error', message: error.response.data.message});

        }
    }

    //Edit Update of Category name
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            if (selected) {
                const response = await axios.put(
                    `/api/v1/category/update-category/${selected._id}`, 
                    {name: updatedName},
                    {
                        headers: {
                            Authorization: auth.token
                        }
                    }
                );
    
                if(response.data?.success) {
                    setSelected(null);
                    setUpdatedName("");
                    setAction(null);
                    // Delay the execution of getAllCategories by 1000 milliseconds (1 second)
                    setTimeout(() => {
                        getAllCategories();
                    }, 2500);
                    setAlert({type: 'success', message: response.data.message}); 
                }               

            } else {
                console.log('No category selected');
            }
        } catch (error) {
            console.log(error);
            setAlert({type: 'error', message: error.response.data.message});            
        }
    }

    //handle delete a category
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(
                `/api/v1/category/delete-category/${selected}`, 
                {
                    headers: {
                        Authorization: auth.token
                    }
                }
            );

            if(response.data?.success) {
                setSelected(null);
                setAction(null);
                // Delay the execution of getAllCategories by 1000 milliseconds (1 second)
                setTimeout(() => {
                    getAllCategories();
                }, 2500);
                setAlert({type: 'success', message: response.data.message}); 
            }               
        } catch (error) {
            console.log(error);
            setAlert({type: 'error', message: error.response.data.message});            
        }
    }

    // handle action
    const handleAction = (e) => {
        try {
            if (action !== null) {
                if (action === 'handleUpdate') {
                    console.log('handle update action executed')
                    return handleUpdate(e); // Assuming handleUpdate is an async function
                } else if (action === 'handleDelete') {
                    console.log('handle delete action executed')
                    return handleDelete(e); // Assuming handleDelete is an async function
                } 
            } else {
                console.log('category is not selected')
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    //get all Categories
    const getAllCategories = async () => {
        try {
            const response = await axios.get('/api/v1/category/get-category');
            if(response.data?.success) {
                setCategories(response.data.category);
                setAlert({type: 'success', message: response.data.message})
            }       
        } catch (error) {
            console.log(error);   
            setAlert({type: 'error', message: error.response.data.message})         
        }
    }

    useEffect(() => {
        getAllCategories();
// eslint-disable-next-line
    }, [])

  return (
    <Layout title="Dashboard- Create Category" alert={alert} setAlert={setAlert}>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>Manage Category Page</h1>
                    <div className='p-3 w-50'>
                        <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}>
                            <Button>Add</Button>
                        </CategoryForm>
                    </div>
                    <div className='w-75'>
                        <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(category => (
                                <Fragment key={category._id}>
                                    <tr >
                                            <td> {category.name} </td>
                                            <td> 
                                                <button 
                                                    className='btn btn-primary ms-2' 
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#Modal"
                                                    onClick={() => {
                                                        setSelected(category)
                                                        setUpdatedName(category.name)
                                                        setModalheading(`Edit ${category.name} Category`)
                                                        setAction('handleUpdate')
                                                        }
                                                    }
                                                    > 
                                                    Edit 
                                                    </button> 
                                                <button 
                                                    className='btn btn-danger ms-2'
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#Modal"
                                                    onClick={() => {
                                                        setSelected(category._id)
                                                        setModalheading(`Delete ${category.name} Category?`)
                                                        setAction('handleDelete')
                                                    }}
                                                    > 
                                                    Delete 
                                                    </button> 
                                            </td>
                                    </tr>
                                </Fragment >
                            ))}
                        </tbody>
                        </table>

                    </div>
                    <Modal class="modal fade" id="Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" modalHeading={modalHeading}>
                        <CategoryForm 
                            value={updatedName} 
                            setValue={setUpdatedName} 
                            handleSubmit={handleAction}
                            modalHeading={modalHeading}
                            action={action}
                            />
                    </Modal>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateCategory;