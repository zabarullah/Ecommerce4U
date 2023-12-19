// useCategoryHook.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useCategoryHook = () => {
  const [categories, setCategories] = useState([]);


  // get all Categories
  const getAllCategories = async () => {
    try {
      const response = await axios.get('/api/v1/category/get-category');
      if (response.data?.success) {
        setCategories(response.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []); // This effect runs once on mount

  return { categories };
};

export default useCategoryHook;
