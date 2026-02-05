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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900 opacity-90" />

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

    {/* Header */}
    <div className="mb-6 text-center">
      <h2 className="text-2xl font-bold text-gray-800">
        Login
      </h2>
      <p className="text-gray-500 mt-1">
        Enter your credentials to continue
      </p>
    </div>

    {/* FORM */}
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>


      {/* Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
      >
        Login
      </button>

    </form>

    {/* Footer */}
    <p className="text-sm text-center text-gray-500 mt-4">
     Don’t have an account ?{" "}
      <span className="text-blue-600 font-semibold cursor-pointer">
        <Link to='/signup'>Sign up</Link>
      </span>
    </p>

  </motion.div>

</div>

</div>
  );
};

export default Login;
