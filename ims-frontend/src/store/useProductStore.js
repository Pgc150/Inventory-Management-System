import { create } from "zustand";
import toast from "react-hot-toast";
import { productInstance } from "../lib/axios";

export const useProductStore = create ((set,get)=> ({
       productList:[],
       dashboardData:{
         totalProducts:0,
         lowStockCount:0,
         totalInventoryValue:0
       },
       isAdded : false ,
       isUpdated:false,
       isDeleted:false,
       isLoading:false,
       isUpdating:false,
       isDownloading: false,
       csvData:[],
       setCSVData:(data) => set({csvData:data}),

       filters :{
           search:"",
           category:"",
           sortBy:"createdAt",
           order:"desc",
       },

       setFilters:(newFilters) => 
       set({filters:{...get().filters,...newFilters}}),

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

       deleteProduct: async(id) =>{
            set({isDeleted:true})
            try {
              const res = await productInstance.delete(`/product/delete/${id}`)
              set((state)=>({
                   productList: state.productList.filter(
                    (product) => product._id !== id
                   )
              }))
              toast.success("Product Deleted")
            } catch (error) {
              console.log("Error in deleting Product",error)
              toast.error(error.response.data.message || "Failed to delte product")
            }
       },

       list: async() => {
          set({isLoading:true})
          const {search,category,sortBy,order} = get().filters;
          try {
            const res = await productInstance.get('/product/list',{
              params:{search,category,sortBy,order}
            })
            console.log("list api response", res.data.data);

            set({productList:res.data.data})
            set({dashboardData:res.data.stats || {
              totalProducts:0,
              lowStockCount:0,
              totalInventoryValue:0
            }})
          } catch (error) {
            console.log("Error in list Product",error)
            toast.error(error.response.data)
          }finally{
            set({isLoading: false})
          }
       },

       updateProduct : async (id,updatedData) =>{
         set({isUpdating:true})

         try {
           const res = await productInstance.put(
            `/product/update/${id}`,
            updatedData
           )

           set((state) => ({
             productList:state.productList.map((product)=>
              product._id === id
              ? res.data.data  // updated product from backend
               : product
            )
           }))
           toast.success("Product updated sucessfully")
         } catch (error) {
            console.log("Error updating product",error)
             toast.error(
              error.response?.data?.message || "Failed to update product"
            );
         } finally {
           set({isUpdating:false})
         }
       },

       dowanloadCSV: async () =>{
          set({isDownloading:true})
          try {
            const res = await productInstance.get('/product/export/csv',{
              responseType:"blob",
              withCredentials:true,
            })
            set({csvData:res.data})
            const blob = new Blob([res.data],{type:"text/csv"})
            const link = document.createElement("a")

            link.href = URL.createObjectURL(blob)
            link.download = "my-products.csv" // set the filename

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            
            URL.revokeObjectURL(link.href)  
          } catch (error) {
            console.log("CSV download error",error)
            toast.error("Error dowanloading csv")
          } finally {
            set({isDownloading: false})
          }
       }
}))