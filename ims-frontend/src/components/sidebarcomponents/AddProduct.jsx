import React, { useState } from 'react'
import { motion ,AnimatePresence} from 'framer-motion'
import { Link } from 'react-router-dom'
import { useProductStore } from '../../store/useProductStore'
import toast from 'react-hot-toast'
import { X,Loader2 } from 'lucide-react';

export const AddProduct = ({isAddOpen,onClose}) => {
  const {add,isAdded} = useProductStore()
  const [isLoading, setIsLoading] = useState(false)
  const initialFormData = {
  name: "",
  description: "",
  price: "",
  quantity: "",
  category: "",
  image: ""
};

const [formData, setFormData] = useState(initialFormData);

   const validateForm = () =>{
      if (!formData.name.trim()) return toast.error("name is required");
      if (!formData.description.trim()) return toast.error("description is required");
      if (formData.price <= 100) return toast.error("Price cannot be less than 100");
      if (formData.quantity <= 0) return toast.error("Enter a valid quantity");
    return true;
    }

  const handleSubmit = async(e) => {
      e.preventDefault()
      const sucess = validateForm()
      if(!sucess) return
      try {
        setIsLoading(true);
        await add(formData);
        setFormData(initialFormData);
        onClose();
      } catch (err) {
        toast.error("Failed to add product");
      } finally {
        setIsLoading(false);
       }
      
  }


  return (

  <AnimatePresence>
    {isAddOpen && (
      <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
          >

    
      <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-gray-600 font-bold">Add Product</h2>
            <button onClick={onClose}>
              <X />
            </button>
          </div>
   

    <form onSubmit={handleSubmit} className="space-y-4">
     
      <main className=''>
        <div>
          
         <label className="block text-left  text-gray-600 mb-1">
          Name
         </label>
         <input
          type="text"
          required
          placeholder="Enter Product name"
          className="w-full mb-3 px-4 py-2 border border-gray-200 shadow-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name:e.target.value})}
        />
        </div>

        <div className=''>
         <label className="block text-left text-gray-600 mb-1">
          Description
         </label>
         <textarea
          type="text"
          required
          placeholder="Enter Product Description"
          className="w-full mb-3 px-4 py-2  border border-gray-200 shadow-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description:e.target.value})}
        />
        </div>

       
       <div className='flex gap-2'>
          <div className=''>
         <label className="block text-left  text-gray-600 mb-1">
          Price
         </label>
         <input
          type="number"
          required
          placeholder="0"
          className="w-full mb-3 px-4 py-2  border border-gray-200 shadow-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price:e.target.value})}
        />
        </div>

        <div className=''>
         <label className="block text-left  text-gray-600 mb-1">
          Quantity
         </label>
         <input
          type="number"
          required
          placeholder="10"
          className="w-full px-4 py-2 border border-gray-200 shadow-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.quantity}
          onChange={(e) => setFormData({...formData, quantity:e.target.value})}
        />
        </div>
       </div>

        <div className=''>
         <label className="block text-left text-gray-600 mb-1">
          Category
         </label>
        <select
         value={formData.category}
         onChange={(e) =>
         setFormData({ ...formData, category: e.target.value })
         }
        className="w-full mb-3 px-4 py-2  border-gray-200 shadow-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Food">Food</option>
          <option value="Grocessry">Grocessry</option>
        </select>
        </div>

        <div className=''>
         <label className="block text-left text-gray-600 mb-1">
          Product Image
         </label>
         <input
          type="file"
          required
          placeholder="Enter Product Description"
          className="w-full mb-3 px-4 py-2 border border-gray-200 shadow-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          
          onChange={(e) => setFormData({...formData, image:e.target.files[0]})}
        />
        </div>

      </main>

      <div className='flex gap-4 pt-2'>
        <button
        type="submit"
        disabled={isAdded}
        className={`w-full py-2 rounded-lg font-semibold shadow-xl border border-blue-200 transition ${
          isAdded ? "bg-blue-300 cursor cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        {isAdded ? (
          <span className='flex items-center justify-center gap-2'>
            <Loader2 className='w-4 h-4 animate-spin'/>
            Adding...
          </span>
        ):(
          "Add"
        )}
      </button>

      <button
        type="button"
        disabled={isLoading}
        onClick={onClose}
        className="w-full bg-red-300 border border-red-200 hover:bg-red-500 transform-3d text-white py-2 rounded-lg font-semibold transition"
      >
        Cancel
      </button>
      </div>

    </form>

     </motion.div>
    </motion.div>
    )}
  
  </AnimatePresence>  
  )
}

