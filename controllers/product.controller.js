import productModel from "../models/product.model.js";
import fs from "fs";
import slugify from "slugify";
import categoryModel from "../models/category.model.js";

export const createProductController = async (req, res) => {
    try {
        console.log('Backend - createProduct Controller Triggered');
        const { name, description, category, quantity, price, shipping } = req.fields;
        const { photo } = req.files; 
        //console.log(name, description, category, quantity, price, shipping);
        //Validation for missing fields which will be checked against the requiredFields array using the filter method.
        const requiredFields = ["name", "description", "category", "quantity", "price"];
        const missingFields = requiredFields.filter(field => !req.fields[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `${missingFields.length > 0 ? 'Missing field(s): ' + missingFields.join(", ") : null } Required`
            });
        }   
        //Validation for mising photo and size being no more than 1mb(in kbs)
        if (photo && photo.size > 1000000) { 
            return res.status(400).json({
                message:  "Suitable Photo Is Required"
            });
        }   

        const products = new productModel({...req.fields, slug:slugify(name)});
        if (photo) {
            // grab the binary data using readFileSync method from the photo's path and assign in the the products object. Also grab the photo's type and assign in to the products too. If i used a cloud based storage service (aws/firebase etc) then i wouldnt need to grab the binary data like this.
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        //save the entire products object, which now includes the all the fields including the binary data and the photo.
        await products.save();
        const categoryGet = await categoryModel.findById(category);
        
            res.status(201).json({
            success: true,
            message: `${name} Created in ${categoryGet.name} Successfully`,
            products
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error,
            message: 'Error In Creating Product'
        })
    }
};

//Getting all the Products - Exluding the photo, limiting it to 12 and sorting the response with latest products first
export const getProductController = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .populate('category')
            .select("-photo")
            .limit(12)
            .sort({createdAt:-1});   
        res.status(200).json({
            success: true,
            message: 'All Products List',
            total: products.length,
            products
        })     
    } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          error,
          message: 'Error In Getting Products'
        })        
    }
};

//Getting a single product by slug 
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
        .findOne({slug:req.params.slug})
        .select('-photo')
        .populate('category');   
        res.status(200).json({
            success: true,
            message: 'Single Product Fetched',
            product
        })     
    } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          error,
          message: 'Error In Getting The Product'
        })        
    }
};

//Get photo for a product with its photoid
export const productPhotoController = async (req, res) => {
    try {
        const { photoid } = req.params;
        const productPhoto = await productModel.findById(photoid).select('photo');

        if (productPhoto && productPhoto.photo && productPhoto.photo.data) {
            res.set('Content-type', productPhoto.photo.contentType);
            return res.status(200).send(productPhoto.photo.data);
        } else {
            return res.status(404).json({
                success: false,
                message: 'Image not found',
            });
        }
         
    } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          error,
          message: 'Error In Getting Photo'
        })         
    }
};


//delete a product by it's ID
export const deleteProductController = async (req, res) => {
    try {
        const {id} = req.params;
        await productModel.findByIdAndDelete(id).select('-photo');  
        res.status(200).json({
            success: true,
            message: 'Product Deleted Successfully',
        })      
    } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          error,
          message: 'Error Deleting Product'
        })         
    }
}

//Updade a product by its ID
export const updateProductController = async (req, res) => {
    try {
        const { name, description, category, quantity, price, shipping } = req.fields;
        const { photo } = req.files; 
        const {id} = req.params;

        //Validation for missing fields which will be checked against the requiredFields array using the filter method.
        const requiredFields = ["name", "description", "category", "quantity", "price"];
        const missingFields = requiredFields.filter(field => !req.fields[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: `${missingFields.length > 0 ? 'Missing field(s): ' + missingFields.join(", ") : null } Required`
            });
        }   
        //Validation for mising photo and size being no more than 1mb(in kbs)
        if (photo && photo.size > 1000000) { 
            return res.status(400).json({
                error:  "Suitable Photo Is Required"
            });
        }   

        const products = await productModel.findByIdAndUpdate(
            id,
            {...req.fields, slug:slugify(name)},
            {new:true}
        )
        if (photo) {
            // grab the binary data using readFileSync method from the photo's path and assign in the the products object. Also grab the photo's type and assign in to the products too. If i used a cloud based storage service (aws/firebase etc) then i wouldnt need to grab the binary data like this.
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        //save the entire products object, which now includes the all the fields including the binary data and the photo.
        await products.save();
        res.status(201).json({
            success:true,
            message: "Product Updated Successfully",
            products
        })       
    } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          error,
          message: 'Error Updating Product'
        })          
    }
}