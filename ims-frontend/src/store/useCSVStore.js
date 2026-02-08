import { create } from 'zustand';
import Papa from 'papaparse';
import axios from 'axios';

const useCSVStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  // Fetch products from API
  fetchProducts: async () => {
    set({ loading: true, error: null });
    
    try {
       const response = await axios.get('http://localhost:5000/api/product/export/csv', {
        withCredentials: true, // This sends cookies with the request
        headers: {
          'Content-Type': 'text/csv',
        },
      });
    
      const csvText = response.data;
      
      // Parse CSV
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          set({ 
            products: results.data, 
            loading: false,
            error: null 
          });
        },
        error: (error) => {
          set({ 
            error: error.message, 
            loading: false 
          });
        }
      });
      
    } catch (error) {
      set({ 
        error: error.message, 
        loading: false,
        products: [] 
      });
    }
  },

  // Get chart data grouped by category
  getChartData: (state) => {
    const categoryData = state.products.reduce((acc, product) => {
      if (product.category) {
        const category = product.category.trim();
        const quantity = parseInt(product.quantity) || 0;
        
        if (acc[category]) {
          acc[category] += quantity;
        } else {
          acc[category] = quantity;
        }
      }
      return acc;
    }, {});

    return Object.entries(categoryData)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  },

  // Clear data
  clearProducts: () => set({ products: [], error: null }),
}));

export default useCSVStore;