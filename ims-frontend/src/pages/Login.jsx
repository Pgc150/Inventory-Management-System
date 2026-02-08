import React from "react";
import { useState } from "react";
import { LogIn ,} from "lucide-react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";

import { Link, Navigate } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const navigate = useNavigate(); 
   const [showPassword,setShowPassword] = useState(false);
   const [formData,setFormData] = useState({
        email:"",
        password:"",
    })

    const {login,isLoggingIn} = useAuthStore();
    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const sucess = await login(formData)
        if(sucess){
          navigate("/dashboard");
      }
    }
  return (
     <div className='min-h-screen w-full flex  bg-gray-50'>
      {/* left div */}
      <div className="hidden lg:flex lg:w-1/2 h-screen sticky top-0 bg-blue-400 relative  items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-blue-900 opacity-90" />

        <div className="relative z-10 text-white p-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
             <LogIn size={80} className="mx-auto mb-6 text-blue-200" />
              <h1 className="text-4xl font-bold mb-4">Join Our System</h1>
              <p className="text-xl text-blue-100 max-w-md mx-auto">
              Login to access your inventory dashboard and manage stock
              efficiently.
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

   
    <div className="mb-6 text-center">
      <h2 className="text-2xl font-bold text-gray-600">
        Login
      </h2>
      <p className="text-gray-500 mt-1">
        Enter your credentials to continue
      </p>
    </div>

    
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <button
        type="submit"
        className="w-full bg-blue-500 pt-3 pb-3 hover:bg-blue-700 shadow-xl border border-blue-300 text-white py-2 rounded-lg font-semibold transition"
      >
        Login
      </button>

    </form>

   
    <p className="text-sm text-center text-gray-500 mt-4">
     Don’t have an account ?{" "}
      <span className="text-blue-500 font-semibold cursor-pointer">
        <Link to='/signup'>Sign up</Link>
      </span>
    </p>

  </motion.div>

</div>

</div>
  );
};

export default Login;
