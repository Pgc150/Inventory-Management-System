import { create } from "zustand";
import toast from "react-hot-toast";
import { productInstance } from "../lib/axios";

export const useProductStore = create ((set,get)=> ({
       productData : null,
       productList:null,
       isAdded : false ,
       isUpdated:false,
       isDeleted:false,

       add : async(data) =>{
          set({isAdded:true})

          try {
            const res = await productInstance.post('/product/add',data)
            set({productData:res.data})
            console.log("Response:",res)
            toast.success("Product Added Sucessfully")
          } catch (error) {
            console.log("Error in AddProduct",error)
            toast.error(error.reponse.data.message)
          } finally{
            set({isAdded: false})
          }

       },

       delete: async(id) =>{
           
       },
       list: async() => {
          try {
            const res = await productInstance.get('/product/list')
            set({productList:res.data})
          } catch (error) {
            console.log("Error in list Product",error)
            toast.error(error.reponse.data)
          }
       }

}))