import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { useAuthStore } from '../store/useAuthStore';
import toast from "react-hot-toast";
import ThemeToggle from '../components/ThemeToggle'

const SignUp = () => {
    const navigate = useNavigate()
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
    })

    const {signup,isSigningUp} = useAuthStore();
    const validateForm = () =>{
      if (!formData.name.trim()) return toast.error("Full name is required");
      if (!formData.email.trim()) return toast.error("Email is required");
      if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
      if (!formData.password) return toast.error("Password is required");
      if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const success = validateForm();

        if (success === true) signup(formData);
        if(success === true){
          navigate('/login')
        }
    }
    
  return (
    <div className='min-h-screen w-full flex  bg-gray-50 dark:bg-gray-900'>
      <div className="absolute top-6 right-6">
        <ThemeToggle />
       </div>

      {/* left div */}
      <div className="hidden lg:flex lg:w-1/2 h-screen sticky top-0 bg-blue-400 relative  items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900 opacity-90" />

        <div className="relative z-10 text-white p-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <UserPlus size={80} className="mx-auto mb-6 text-blue-200" />
            <h1 className="text-4xl font-bold mb-4">Join Our System</h1>
            <p className="text-xl text-blue-100 max-w-md mx-auto">
              Create an account to start managing your inventory and tracking
              stock movements.
            </p>
          </motion.div>
        </div>

        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500 rounded-full blur-xl opacity-30 animate-blob" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-400 rounded-full blur-xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      {/* right div */}
   
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
        Create Account
      </h2>
      <p className="text-gray-500 mt-1">
        Please fill in the details
      </p>
    </div>

    {/* FORM */}
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Name */}
      <div >
        <label className="block text-left text-sm text-gray-600 mb-1">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.name}
          onChange={(e) => setFormData({...formData,name:e.target.value})}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-left text-sm text-gray-600 mb-1">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email:e.target.value})}
        />
      </div>

      {/* Password */}
      
       <div>
        <label className="block  text-left text-sm text-gray-600 mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password:e.target.value})}
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
      >
        Sign Up
      </button>

    </form>

    {/* Footer */}
    <p className="text-sm text-center text-gray-500 mt-4">
      Already have an account?{" "}
      <span className="text-blue-600 font-semibold cursor-pointer">
        <Link to='/login'>Login</Link>
      </span>
    </p>

  </motion.div>

</div>

</div>
  )
}

export default SignUp