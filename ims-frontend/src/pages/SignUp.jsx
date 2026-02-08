import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User2, UserPlus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { useAuthStore } from '../store/useAuthStore';
import toast from "react-hot-toast";
import ThemeToggle from '../components/ThemeToggle'

const SignUp = () => {
    const[showPassword,setShowPassword] = useState(false)
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
    <div className="mb-6 relative text-center">
      {/* <UserPlus className='w-8 h-8 text-gray-600'/> */}
      <h2 className="text-2xl font-bold text-gray-600">
        Create Account
      </h2>
      <p className="text-gray-500 mt-1">
        Please fill in the details
      </p>
    </div>

    {/* FORM */}
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Name */}
      <div>
          <label className="block text-left  text-gray-600 mb-1">
              Name 
          </label>
            <div className="relative w-full ">
              <User2
                className="absolute left-4 top-1/4 w-5 h-5 mr-2 translate-x-1/5 text-gray-400"
                />
            <input
                type="email"
                placeholder="Enter your name"
                className="w-full pl-12 pt-2 px-5 py-4 border border-gray-200 shadow-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email:e.target.value})}
              />
            </div>
        </div>

      
       <div>
          <label className="block text-left  text-gray-600 mb-1">
                Email 
          </label>
            <div className="relative w-full ">
              <Mail
                className="absolute left-4 top-1/4 w-5 h-5 mr-2 translate-x-1/5 text-gray-400"
                />
            <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pt-2 px-5 py-4 border border-gray-200 shadow-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email:e.target.value})}
              />
            </div>
        </div>
      
         <div>
            <label className="block text-left text-gray-600 mb-1">
             Password
           </label>
         <div className="relative w-full mb-6">
          <Lock
             size={20}
             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
           />
           <input
             type={showPassword ? "text" : "password"}
             placeholder="Enter your password"
             className="w-full  pl-12 border border-gray-200 pr-12 py-3 shadow-xl rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
             value={formData.password}
             onChange={(e) =>
               setFormData({ ...formData, password: e.target.value })
             }
           />
           <button
             type="button"
             onClick={() => setShowPassword(!showPassword)}
             className="absolute right-4 top-1/2 -translate-y-1/2 
                        text-gray-400 hover:text-blue-500"
           >
             {showPassword ? (
               <EyeOff className="w-5 h-5" />
             ) : (
               <Eye className="w-5 h-5" />
             )}
           </button>
         </div>
       </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full  pt-3 pb-3 bg-blue-600 shadow-xl border border-blue-300 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
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