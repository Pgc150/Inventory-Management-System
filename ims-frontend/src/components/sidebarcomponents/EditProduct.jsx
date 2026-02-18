import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useProductStore } from "../../store/useProductStore";
import { Loader2 } from "lucide-react";

export const EditProduct = ({ isOpen, onClose, product }) => {
  const { updateProduct, isUpdating } = useProductStore();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
        image: null,
      });
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(product._id, formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl"
        >
        
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-gray-600 font-bold">Edit Product</h2>
            <button onClick={onClose}>
              <X  className="hover:cursor-pointer"/>
            </button>
          </div>

          
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border border-gray-200 shadow-xl px-3 py-2 rounded"
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border px-3 py-2 border-gray-200 shadow-xl rounded"
            />

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full border px-3 py-2 border-gray-200 shadow-xl rounded"
              />

              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="w-full border px-3 py-2 border-gray-200 shadow-xl rounded"
              />
            </div>

            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full border px-3 py-2 border-gray-200 shadow-xl rounded"
            >
              <option value="">Select category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Food">Food</option>
              <option value="Groceries">Groceries</option>
            </select>

            <input
              type="file"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              className="w-full border px-3 py-2 rounded mt-2  border-gray-200 shadow-xl mb-5"
            />

            <button
              disabled={isUpdating}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 hover:cursor-pointer"
            >
              {isUpdating ? (
                <span className='flex items-center justify-center gap-2'>
                  <Loader2 className='w-4 h-4 animate-spin'/>
                     Updating...
                </span>
                ):(
                "Update"
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
