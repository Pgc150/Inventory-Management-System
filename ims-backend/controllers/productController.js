import Product from '../models/productModel.js'
import {cloudinary} from '../config/cloudinary.js'


const deleteImage = async (publicId) => {
    if(!publicId) return;
    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.log("Error deleting image:",error.message)
    }
}

// create new product
export const createProduct = async (req,res) => {
    try {
        const {name, description,price,quantity,category} = req.body;

        // validation
        if (!name || !price || !quantity || !category) {
            return res.status(400).json({
                success: false,
                message: 'Name, price, quantity, and category are required'
            });
        }

        // Validate category
        const validCategories = ['Electronics', 'Clothing', 'Food', 'Groceries'];
        if (!validCategories.includes(category)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid category. Must be: Electronics, Clothing, Food, or Groceries'
            });
        }

        // prepare image data
        let imageUrl = '';
        let imagePublicId = '';

        if(req.file){
            imageUrl = req.file.path;
            imagePublicId = req.file.filename;
        }

        // create product 
        const product =  new Product ({
            name,
            description: description || '',
            price: parseFloat(price),
            quantity: parseInt(quantity),
            category,
            image: imageUrl,
            imagePublicId: imagePublicId,
            user: req.user
        })

        await product.save()

        res.status(201).json({
            success:true,
            message:"Product created sucessfully",
            data: product
        })
    } catch (error) {
         console.error('Create product error:', error.message);
        
        // Clean up uploaded image if product creation fails
        if (req.file) {
            await deleteImage(req.file.filename);
        }
        
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}


// get all products
export const getProducts = async (req,res) => {
    try {
        const {category ,sortBy='createdAt',order = 'desc',search} = req.query

        let query = {}
        
        // filter by category
        if(category && ['Electronics','Clothing','Food','Groceries'].includes(category)){
            query.category = category
        }

        // Search by name or description
        if(search){
            query.$or = [
                {name:{$regex: search, $options: 'i'}},
                {description: {$regex:search, $options:'i'}}
            ]
        }

        // Sort
        const sortOptions = {}
        sortOptions[sortBy] = order === 'asc' ? 1 : -1

        const products = await Product.find(query).sort(sortOptions).select('-__v')

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        })

    } catch (error) {
        console.error('Get products error:', error.message);
        res.status(500).json({
            sucess:false,
            message:'Server error'
        })
    }
}

// get single product
export const getProductById = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id)

         if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Get product error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

// Update Product
export const updateProduct = async (req,res) => {
    try {
        const {name,description,price,quantity,category,removeImage} = req.body;

        const productId = req.params.id;

        // find product
        let product = await Product.findById(productId);

        if(!product) {
            return res.status(404).json({
                sucess:false,
                message: 'Product not found'
            })
        }

        let oldImagePublicId = null;

        // Handle image removal

        if(removeImage === 'true' && product.imagePublicId){
            oldImagePublicId = product.imagePublicId
        }

        // Handle new image upload
        if(req.file) {
            // store old image for deletion 
            if(product.imagePublicId){
                oldImagePublicId = product.imagePublicId;
            }

            product.image = req.file.path;
            product.imagePublicId = req.file.filename;            
        } else if (removeImage === 'true') {
            // Remove image without uploading new one
            product.image = '';
            product.imagePublicId = '';
        } 

        // Update other fields
        if(name) product.name = name;
        if(description !== undefined) product.description = description;
        if(price) product.price = parseFloat(price);
        if(quantity) product.quantity = parseInt(quantity)

         if (category) {
            // Validate category
            const validCategories = ['Electronics', 'Clothing', 'Food', 'Groceries'];
            if (!validCategories.includes(category)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid category. Must be: Electronics, Clothing, Food, or Groceries'
                });
            }
            product.category = category;
           }
            await product.save();

            // delete old image after sucessfull update
            if(oldImagePublicId) {
                await deleteImage(oldImagePublicId)
            }

            res.status(200).json({
                sucess: true,
                message: 'Product updated sucessfully',
                data: product
            })
           
    } catch (error) {
        console.log("Update product error:",error.message) 

        if(req.file){
            await deleteImage(req.file.filename)
        }

        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}


export const delteProduct = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(404).json({
                sucess:false,
                message: 'Product not found'
            })
        }

        if (product.imagePublicId) { // delete image from cludinary
            await deleteImage(product.imagePublicId);
        }

        await product.deleteOne();

        res.status(200).json({
            sucess: true,
            message: 'Product deleted sucessfully' 
        })
    } catch (error) {
        console.error('Delete product error',error.message);

        res.status(500).json({
            sucess: false,
            message: 'Server error'
        })
    }
}


