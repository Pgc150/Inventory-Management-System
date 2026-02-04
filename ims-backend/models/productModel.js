import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        maxlength: 100
    },
     description: {
        type: String,
        trim: true,
        maxlength: 500
    },

     price: {
        type: Number,
        required: true,
        min: 100
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    category: {
        type: String,
        required: true,
        enum:{
            values:['Electronics', 'Clothing', 'Food', 'Groceries'],
            message: '{VALUE} is not a valid category. Please select: Electronics, Clothing, Food, or Groceries'
        }
    },
    image : {
        type : String,
        default: ''
    },
     imagePublicId: {
        type: String, // Cloudinary public_id
        default: ''
    },
    
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    }
},
  {timestamps: true}
)

const Product = mongoose.model('Product',productSchema)
export default Product