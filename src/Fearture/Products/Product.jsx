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
  FiEye
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Product = () => {
  const API_PRODUCT = "http://127.0.0.1:8000/api/product"
  const API_CATEGORY = "http://127.0.0.1:8000/api/category"
  const API_SUPPLIER = "http://127.0.0.1:8000/api/supplier"
  const [products, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate();
  console.log(categories);
  

  // Form state for new product
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    price: '',
    quantity: '',
    category_id: '',
    supplier_id: '',
    status: 'active',
    description: ''
  });
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  /////////////////////////////////////////////
  const fetchProducts = async () => {
    try {
      const res = await fetch(API_PRODUCT);
      const data = await res.json();
      setProduct(data.product );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(API_CATEGORY);
      const data = await res.json();
      
      setCategories(data.category);
 
      
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const res = await fetch(API_SUPPLIER);
      const data = await res.json();
      setSuppliers(data.Supplier || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSuppliers();
  }, []);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('sku', newProduct.sku);
    formData.append('price', newProduct.price);
    formData.append('quantity', newProduct.quantity);
    formData.append('category_id', newProduct.category_id);
    formData.append('supplier_id', newProduct.supplier_id);
    formData.append('status', newProduct.status);
    formData.append('description', newProduct.description);

    if (productImage) {
      formData.append('image', productImage);
    }

    try {
      const res = await fetch(API_PRODUCT, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error('Failed to add product');

      Swal.fire({
        title: "Product added successfully!",
        icon: "success",
        draggable: true
      });

      setShowModal(false);
      setNewProduct({
        name: '',
        sku: '',
        price: '',
        quantity: '',
        category_id: '',
        supplier_id: '',
        status: 'active',
        description: ''
      });
      setProductImage(null);
      setImagePreview(null);
      fetchProducts();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Failed to add product!",
        text: error.message,
        icon: "error",
        draggable: true
      });
    }
  };
  ////////////////////////////////////////////////




  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'pending':
      case 'pedding': // Handle both spellings
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'on sale':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'bouncing':
        return 'bg-purple-100 text-purple-800 border border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  // Status icon mapping
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <FiCheckCircle className="mr-1" />;
      case 'pending':
      case 'pedding': // Handle both spellings
        return <FiAlertCircle className="mr-1" />;
      case 'inactive':
        return <FiXCircle className="mr-1" />;
      case 'on sale':
        return <FiTag className="mr-1" />;
      case 'bouncing':
        return <FiTrendingUp className="mr-1" />;
      default:
        return null;
    }
  };

  // Format price to currency
  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  // Format stock quantity
  const formatStock = (quantity) => {
    if (quantity < 50) return `${quantity} pcs (Low)`;
    if (quantity < 100) return `${quantity} pcs (Medium)`;
    return `${quantity} pcs`;
  };

  // Get stock color based on quantity
  const getStockColor = (quantity) => {
    if (quantity < 50) return 'bg-red-50 text-red-700';
    if (quantity < 100) return 'bg-yellow-50 text-yellow-700';
    return 'bg-gray-50 text-gray-700';
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
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
            <FiPlus className="text-lg" />
            Add New Product
          </button>

         {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
    <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Add New Product
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              Fill in the product details below
            </p>
          </div>
          
          <button
            onClick={() => setShowModal(false)}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg text-white text-2xl flex items-center justify-center transition-all"
          >
            ×
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: Image Upload */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Product Image
            </label>
            
            <label className="block w-full aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer transition-all hover:border-blue-400 hover:bg-blue-50 relative overflow-hidden group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Click to upload
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              )}
            </label>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-xs text-gray-600">
                💡 Use high-quality images for best results
              </p>
            </div>
          </div>

          {/* RIGHT: Form Fields */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Product Name - Full Width */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* SKU */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  SKU
                </label>
                <input
                  type="text"
                  placeholder="e.g., PROD-001"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newProduct.category_id}
                  onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 outline-none transition-all cursor-pointer focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                    <option value="">Select category</option>
                    {categories?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
              </div>

              {/* Supplier - Full Width */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Supplier
                </label>
                <select
                  value={newProduct.supplier_id}
                  onChange={(e) => setNewProduct({ ...newProduct, supplier_id: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 outline-none transition-all cursor-pointer focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">Select supplier</option>
                  {suppliers?.map((sup) => (
                    <option key={sup.id} value={sup.id}>
                      {sup.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status - Full Width Toggle */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Status
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setNewProduct({ ...newProduct, status: 'active' })}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-center gap-2 ${
                      newProduct.status === 'active'
                        ? 'bg-green-50 border-green-500 shadow-sm'
                        : 'bg-gray-50 border-gray-300 hover:border-green-400'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${
                      newProduct.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                    <span className={`font-semibold ${
                      newProduct.status === 'active' ? 'text-green-700' : 'text-gray-600'
                    }`}>
                      Active
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewProduct({ ...newProduct, status: 'pedding' })}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-center gap-2 ${
                      newProduct.status === 'pedding'
                        ? 'bg-amber-50 border-amber-500 shadow-sm'
                        : 'bg-gray-50 border-gray-300 hover:border-amber-400'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${
                      newProduct.status === 'pedding' ? 'bg-amber-500' : 'bg-gray-400'
                    }`} />
                    <span className={`font-semibold ${
                      newProduct.status === 'pedding' ? 'text-amber-700' : 'text-gray-600'
                    }`}>
                      Pending
                    </span>
                  </button>
                </div>
              </div>

              {/* Description - Full Width */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Enter product description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 outline-none transition-all resize-vertical focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-8 py-5 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          All fields are required
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowModal(false)}
            className="px-6 py-2.5 rounded-xl border-2 border-gray-300 bg-white text-gray-700 font-semibold transition-all hover:bg-gray-50 hover:border-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={handleAddProduct}
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 hover:shadow-xl"
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  </div>
)}
        </div>

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
                <p className="text-2xl font-bold mt-1">
                  {products.filter(p => p.status?.toLowerCase() === 'active').length}
                </p>
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
                <p className="text-2xl font-bold mt-1">
                  {products.filter(p => p.quantity < 50).length}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <FiAlertCircle className="text-yellow-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Products</p>
                <p className="text-2xl font-bold mt-1">
                  {products.filter(p =>
                    p.status?.toLowerCase() === 'pending' ||
                    p.status?.toLowerCase() === 'pedding'
                  ).length}
                </p>
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
                placeholder="Search products by name, SKU, or category..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={product.id || index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {product.image ? (
                        <div className="h-10 w-10 flex-shrink-0 rounded-lg overflow-hidden mr-3">
                          <img
                            src={`http://127.0.0.1:8000/storage/${product.image}`}
                            alt={product.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${product.name}&background=random`;
                            }}
                          />
                        </div>
                      ) : (
                        <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="font-bold text-gray-700">
                            {product.name?.charAt(0) || 'P'}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{product.name || 'N/A'}</div>
                        <div className="text-xs text-gray-500 truncate max-w-xs">
                          {product.description || 'No description'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-gray-600">
                      {product.sku || `#${product.id}`}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">
                      {formatPrice(product.price || 0)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStockColor(product.quantity || 0)}`}>
                      {formatStock(product.quantity || 0)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                      {product.category?.name || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {product.supplier?.name || 'N/A'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {product.supplier?.email || ''}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
                      {getStatusIcon(product.status)}
                      {product.status?.charAt(0).toUpperCase() + product.status?.slice(1) || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {/* View Button */}
                      <button
                        className="flex items-center gap-1 px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 rounded-lg transition-colors border border-gray-200 text-sm font-medium"
                        title="View Details"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        <FiEye className="text-base" />
                        View
                      </button>

                      {/* Update Button */}
                      <button
                        className="flex items-center gap-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg transition-colors border border-blue-200 text-sm font-medium"
                        title="Edit Product"
                        onClick={() => navigate(`/product/edit/${product.id}`)}
                      >
                        <FiCheckCircle className="text-base" />
                        Edit
                      </button>

                      {/* Delete Button */}
                      <button
                        className="flex items-center gap-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 rounded-lg transition-colors border border-red-200 text-sm font-medium"
                        title="Delete Product"
                      >
                        <FiXCircle className="text-base" />
                        Delete
                      </button>

                      {/* More Options Dropdown Trigger */}
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
                        title="More Options"
                      >
                        <FiMoreVertical className="text-lg" />
                      </button>
                    </div>
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
              Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(products.length, 10)}</span> of <span className="font-medium">{products.length}</span> products
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