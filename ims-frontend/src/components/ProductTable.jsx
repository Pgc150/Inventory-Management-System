import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { useAuthStore } from "../store/useAuthStore";
import { EditProduct } from "./sidebarcomponents/EditProduct";

const ProductList = () => {

  const [selectedProduct,setSelectedProduct] = useState(null)
  const[isEditOpen,setIsEditOpen] = useState(false)

  const {
    productList,
    list,
    setFilters,
    isLoading,
    deleteProduct
  } = useProductStore();

  const {checkAuth} = useAuthStore()

  useEffect(() => {
    list();
  }, []);

  useEffect(() => {
  checkAuth();
}, []);

  
  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex gap-10 items-center">
        <h2 className="text-2xl font-bold mb-4">Product List</h2>
        <Link
          to="/add"
          className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition mb-5"
        >
          + Add
        </Link>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or description"
          onChange={(e) => setFilters({ search: e.target.value })}
          className="border px-3 py-2 rounded w-64"
        />

        {/* Category Filter */}
        <select
          onChange={(e) => setFilters({ category: e.target.value })}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Food">Food</option>
          <option value="Groceries">Groceries</option>
        </select>

        {/* Sort */}
        <select
          onChange={(e) =>
            e.target.value === "low"
              ? setFilters({ sortBy: "price", order: "asc" })
              : setFilters({ sortBy: "price", order: "desc" })
          }
          className="border px-3 py-2 rounded"
        >
          <option value="">Sort by price</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>

        <button
          onClick={list}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">Price (₹)</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-blue-50">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Loading products...
                </td>
              </tr>
            ) : productList.length > 0 ? (
              productList.map((product) => (
                <tr key={product._id} className="text-center">
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.category}</td>
                  <td className="p-2">{product.price}</td>

                  {/* Low Stock Indicator */}
                  <td
                    className={`p-2 font-semibold ${
                      product.quantity < 10
                        ? "text-red-600 bg-red-100"
                        : "text-green-600"
                    }`}
                  >
                    {product.quantity}
                    {product.quantity < 10 && (
                      <span className="block text-xs font-normal">
                        ⚠ Low stock
                      </span>
                    )}
                  </td>

                  <td className="p-2 space-x-2">
                    <button
                     onClick={()=>{
                       setSelectedProduct(product);
                       setIsEditOpen(true);
                     }}
                     className="bg-green-200 px-3 py-1 rounded">
                      Edit
                    </button>
                    <button 
                     onClick={() => deleteProduct(product._id)}
                     className="bg-red-300 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
         <EditProduct
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        product={selectedProduct}
      />
      </div>
    </div>
  );
};

export default ProductList;
