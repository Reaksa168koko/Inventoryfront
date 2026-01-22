import React, { useEffect, useState } from 'react';
import {
    FiSearch,
    FiFilter,
    FiPlus,
    FiMoreVertical,
    FiCheckCircle,
    FiXCircle,
    FiShoppingBag,
    FiAlertCircle,
    FiTrendingUp,
    FiTag,
    FiX,
    FiTrash2
} from 'react-icons/fi';

const Product = () => {

    const API_URL ="http://127.0.0.1:8000/api/product"

    const [loading,setloading] = useState(false)
    const [products, setProducts] = useState([]);

    const [product,setProduct] = useState({
        name:"",
        sku:"",
        category_id:"",
        supplier_id:"",
        price:"",
        quantity:"",
        description:"",
        image:"",
        status:""
    });
    //get
    useEffect(()=>{
        const fect = async () =>{
           try {
             const respone = await fetch(API_URL);
            if(!respone.ok){
                throw new Error("Error")
            }
            const data = await respone.json();
            setProducts(data.data)
           } catch (error) {
            console.log(error.message);
           }
         
        }
        if(loading){
            <h1>loading......</h1>
        }
        fect();

    },[])
    console.log(products);

// delete
const deleted = async (id) => {
  if (!id) {
    console.error("Delete failed: id is undefined");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Delete request failed");
    }

    console.log("Product deleted:", id);

    // update UI only
    setProducts(prev => prev.filter(p => p.id !== id));

    // ✅ STOP HERE — DO NOT CALL deleted() again

  } catch (error) {
    console.error(error);
  }
};



    const [showModal, setShowModal] = useState(false);

  // Form state
//   const [product, setProduct] = useState({
//     name: "",
//     id: "",
//     price: "",
//     stock: "",
//     type: "",
//   });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Save button handler
  const handleSave = () => {
    console.log("Saved Product:", product);
    setShowModal(false);
    // Here you can call API or add to state list
  };



    // Status badge color mapping
    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800 border border-green-200';
            case 'Pending': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
            case 'Inactive': return 'bg-red-100 text-red-800 border border-red-200';
            case 'On Sale': return 'bg-blue-100 text-blue-800 border border-blue-200';
            case 'Bouncing': return 'bg-purple-100 text-purple-800 border border-purple-200';
            default: return 'bg-gray-100 text-gray-800 border border-gray-200';
        }
    };

    // Status icon mapping
    const getStatusIcon = (status) => {
        switch (status) {
            case 'Active': return <FiCheckCircle className="mr-1" />;
            case 'Pending': return <FiAlertCircle className="mr-1" />;
            case 'Inactive': return <FiXCircle className="mr-1" />;
            case 'On Sale': return <FiTag className="mr-1" />;
            case 'Bouncing': return <FiTrendingUp className="mr-1" />;
            default: return null;
        }
    };

    // Type color mapping
    const getTypeColor = (type) => {
        const colors = {
            'Dessert': 'bg-pink-50 text-pink-700',
            'Fruits': 'bg-green-50 text-green-700',
            'Ice Cream': 'bg-blue-50 text-blue-700',
            'Care': 'bg-indigo-50 text-indigo-700',
            'Juice': 'bg-orange-50 text-orange-700',
            'Oil': 'bg-amber-50 text-amber-700',
            'Cream': 'bg-cyan-50 text-cyan-700',
            'Flowers': 'bg-emerald-50 text-emerald-700'
        };
        return colors[type] || 'bg-gray-50 text-gray-700';
    };

    return (
        <div className="min-h-screen w-full bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                        <p className="text-gray-600 mt-1">Manage your product inventory and listings</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium"
                    >
                        <FiPlus className="text-lg" />
                        Add New Product
                    </button>
                </div>

{/* Modal */}
{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 ">
      {/* Close */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-all duration-200 text-gray-500 hover:text-gray-800"
      >
        <FiX size={24} />
      </button>

      <h2 className="text-3xl font-bold mb-2 text-gray-800">Add / Edit Product</h2>
      <p className="text-gray-500 mb-6">Manage your product details here</p>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product ID</label>
          <input
            type="text"
            name="id"
            value={product.id}
            onChange={handleChange}
            placeholder="Enter product ID"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="0.00"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Enter stock quantity"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <input
            type="text"
            name="type"
            value={product.type}
            onChange={handleChange}
            placeholder="Enter product type"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow hover:shadow-lg"
        >
          <FiTrash2 />
          Delete
        </button>

        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Products</p>
                                <p className="text-2xl font-bold mt-1">{products.length}</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <FiShoppingBag className="text-blue-600 text-xl" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Active Products</p>
                                <p className="text-2xl font-bold mt-1">{products.filter(p => p.status === 'Active').length}</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <FiCheckCircle className="text-green-600 text-xl" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Low Stock</p>
                                <p className="text-2xl font-bold mt-1">2</p>
                            </div>
                            <div className="p-3 bg-yellow-50 rounded-lg">
                                <FiAlertCircle className="text-yellow-600 text-xl" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">On Sale</p>
                                <p className="text-2xl font-bold mt-1">{products.filter(p => p.status === 'On Sale').length}</p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <FiTag className="text-purple-600 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products by name, ID, or type..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                <FiFilter />
                                Filter
                            </button>
                            <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                Export
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products?.map((product, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-3">
                                                <span className="font-bold text-gray-700">{product.name.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{product.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-mono text-gray-600">{product.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900">{product.price}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium`}>
                                            {product.description}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(product.status)}`}>
                                            {product.quantity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
                                            {getStatusIcon(product.status)}
                                            {product.category.name}
                                        </span>
                                    </td>
                                    <td className="px-6 flex gap-3 py-4">
                                        <button onClick={()=>deleted(product.id)} className="p-2 bg-red-600 font-bold text-white hover:bg-red-700 rounded-lg transition-colors">
                                            Delete
                                        </button>
                                        <button className="p-2 bg-yellow-300 font-bold text-white hover:bg-yellow-500 rounded-lg transition-colors">
                                           Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">100</span> results
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                &lt; Previous
                            </button>
                            {[1, 2, 3, 4, '...', 10, 11].map((page, index) => (
                                <button
                                    key={index}
                                    className={`px-3 py-2 rounded-lg transition-colors ${page === 1
                                        ? 'bg-blue-600 text-white'
                                        : 'border border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                Next &gt;
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* User Profile */}
            <div className="mt-8 flex items-center justify-end">
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <div className="font-medium text-gray-900">Jane Cooper</div>
                        <div className="text-sm text-gray-600">jane234@example.com</div>
                    </div>
                    <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        JC
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;