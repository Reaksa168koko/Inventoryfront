import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL = "http://127.0.0.1:8000/api/product";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    status: "",
    description: "",
    category_id: "",
    supplier_id: "",
    sku: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch product by id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        const data = await res.json();

        // Backend returns data in 'data' field, not 'product'
        const productData = data.data;

        setProduct({
          name: productData.name || "",
          price: productData.price || "",
          quantity: productData.quantity || "",
          status: productData.status || "",
          description: productData.description || "",
          category_id: productData.category_id || "",
          supplier_id: productData.supplier_id || "",
          sku: productData.sku || "",
        });

        if (productData.image) {
          setPreview(`http://127.0.0.1:8000/storage/${productData.image}`);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 🔹 Image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🔹 Update product
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("status", product.status);
    formData.append("description", product.description);
    formData.append("category_id", product.category_id);
    formData.append("supplier_id", product.supplier_id);
    formData.append("sku", product.sku);

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Update failed");

      Swal.fire({
        title: "Product updated successfully!",
        icon: "success",
        draggable: true
      }).then(() => {
        navigate("/product");
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Update failed!",
        text: err.message,
        icon: "error",
        draggable: true
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header Section */}
        <div className="mb-8">
          <Link
            to="/product"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-blue-400 transition-all shadow-sm mb-6 group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </Link>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Edit Product</h2>
                <p className="text-gray-500 text-sm mt-1">Update your product information</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleUpdate} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT: Image Upload */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Product Image
              </label>

              <div className="relative">
                {preview ? (
                  <div className="relative group">
                    <img
                      src={preview}
                      alt="Product preview"
                      className="w-full aspect-square object-cover rounded-2xl border-2 border-gray-200 shadow-sm"
                    />
                    <label className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <div className="text-center text-white">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <p className="font-semibold">Change Image</p>
                      </div>
                      <input
                        type="file"
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                  </div>
                ) : (
                  <label className="block w-full aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-gray-700">Click to upload</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                )}
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-gray-600">
                    Use high-quality images with good lighting for best results
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: Form Fields */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Product Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Product Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={product.name}
                    onChange={(e) =>
                      setProduct({ ...product, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    required
                  />
                </div>

                {/* SKU */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                    SKU
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., PROD-001"
                    value={product.sku}
                    onChange={(e) =>
                      setProduct({ ...product, sku: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={product.price}
                      onChange={(e) =>
                        setProduct({ ...product, price: e.target.value })
                      }
                      className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      required
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={product.quantity}
                    onChange={(e) =>
                      setProduct({ ...product, quantity: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    required
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Status
                  </label>
                                <select
                                    value={product.status}
                                    onChange={(e) =>
                                      setProduct({ ...product, status: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl outline-none transition-all cursor-pointer focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                  >
                                    <option value="active">Active</option>
                                    <option value="pedding">Pending</option>
                                  </select>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    Description
                  </label>
                  <textarea
                    placeholder="Enter product description"
                    value={product.description}
                    onChange={(e) =>
                      setProduct({ ...product, description: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl outline-none transition-all resize-vertical focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <Link
              to="/product"
              className="px-6 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-700 font-semibold transition-all hover:bg-gray-50 hover:border-gray-400 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </Link>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Update Product
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default EditProduct;