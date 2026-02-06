import { create } from "zustand";
import axiosInstance from '../lib/axios.js'
import toast from "react-hot-toast";


const BASE_URL = "http://localhost:5000"

export const useAuthStore = create ((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isLogOut:false,
    isCheckingAuth: true,
    
    signup: async(data) => { // calls signup api 
        set({isSigningUp:true});
        try {
           const res = await axiosInstance.post("/auth/signup",data)
           set({authUser:res.data});
           console.log("Response:", res);
           toast.success("Signup sucessfully")
        } catch (error) {
            console.log("Signup error:", error);
            toast.error(error.response.data.message);

        } finally {
            set({isSigningUp:false});
        }
        
    },

     login : async(data) => { // calls login api
        set({isLoggingIn : true});
        try {
            const res = await axiosInstance.post("/auth/login",data)
            set({authUser : res.data});
            toast.success("Logged in sucessfully");
            return true
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
             set({isLoggingIn : false})
        }
    },

    logout: async ()=>{
        set({isLoggingOut : true});
       try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out sucessfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/user");
            set({ authUser: res.data ,isCheckingAuth:false});
        } catch (error) {
            set({ authUser: null });
        }
    }

}))