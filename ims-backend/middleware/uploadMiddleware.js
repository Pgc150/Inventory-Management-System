import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { cloudinary } from '../config/cloudinary.js';


// cloudinary storage configuration 

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'inventory-products',
        allowed_formats: ['jpg','png','jpeg'],
        transformation: [{ width: 800, height: 800, crop: 'limit' }],
        public_id: (req, file) => {
            const timestamp = Date.now();
            const originalName = file.originalname.split('.')[0];
            return `product-${originalName}-${timestamp}`;
        }
    }
})

// file filter only for images 
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
}

const upload = multer ({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // file limit 5MB
    }
})

export {upload}
