import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useProductStore } from '../../store/useProductStore'
import toast from 'react-hot-toast'
import { X } from 'lucide-react';

export const AddProduct = () => {
  const {add,isAdded} = useProductStore()
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
      validateForm()
       await add(formData)
      setFormData(initialFormData);
  }
  return (
    <div className='bg-gradient-to-br from-blue-50 to-gray-50'>
      <div className='top-0 flex justify-center  '>
       <div className="w-full lg:w-1/2 flex items-center justify-center p-8">

  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
  >

    {/* Header */}
    <div className="mb-6 text-center">
      <h2 className="text-2xl font-bold text-gray-800">
        Add
      </h2>
      <p className="text-gray-500 mt-1">
        Add Product
      </p>
      <Link to='/dashboard'><X className=''/></Link>
    </div>

    {/* FORM */}
    <form onSubmit={handleSubmit} className="space-y-4">
     
      <main className=''>
        <div>
          
         <label className="block text-left text-sm text-gray-600 mb-1">
          Name
         </label>
         <input
          type="text"
          required
          placeholder="Enter Product name"
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name:e.target.value})}
        />
        </div>

        <div className=''>
         <label className="block text-left text-sm text-gray-600 mb-1">
          Description
         </label>
         <textarea
          type="text"
          required
          placeholder="Enter Product Description"
          className="w-full mb-3 px-4 py-2 h- border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description:e.target.value})}
        />
        </div>

       {/* price & quantity */}
       <div className='flex gap-2'>
          <div className=''>
         <label className="block text-left text-sm text-gray-600 mb-1">
          Price
         </label>
         <input
          type="number"
          required
          placeholder="0"
          className="w-full mb-3 px-4 py-2 h- border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price:e.target.value})}
        />
        </div>

        <div className=''>
         <label className="block text-left text-sm text-gray-600 mb-1">
          Quantity
         </label>
         <input
          type="number"
          required
          placeholder="10"
          className="w-full px-4 py-2 h- border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.quantity}
          onChange={(e) => setFormData({...formData, quantity:e.target.value})}
        />
        </div>
       </div>

        <div className=''>
         <label className="block text-left text-sm text-gray-600 mb-1">
          Category
         </label>
        <select
         value={formData.category}
         onChange={(e) =>
         setFormData({ ...formData, category: e.target.value })
         }
        className="w-full mb-3 px-4 py-2 h- border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Food">Food</option>
          <option value="Grocessry">Grocessry</option>
        </select>
        </div>

        <div className=''>
         <label className="block text-left text-sm text-gray-600 mb-1">
          Product Image
         </label>
         <input
          type="file"
          required
          placeholder="Enter Product Description"
          className="w-full mb-3 px-4 py-2 h- border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          
          onChange={(e) => setFormData({...formData, image:e.target.files[0]})}
        />
        </div>

      </main>

      <div className='flex gap-4'>
        <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
      >
        Add
      </button>

      <button
       
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
      >
        <Link to='/dashboard'>Back</Link>
      </button>
      </div>

    </form>

  </motion.div>

</div>
    </div>
    </div>
  )
}

