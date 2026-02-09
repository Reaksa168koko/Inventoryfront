import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/api/product";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const data = await res.json();
        setProduct(data.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchProduct();
  }, [id]);


  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  const statusColor = {
    active: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    pedding: "bg-yellow-100 text-yellow-800 border-yellow-200",
    inactive: "bg-red-100 text-red-800 border-red-200"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600">
          <span className="hover:text-blue-600 cursor-pointer">Products</span>
          <span>/</span>
          <span className="text-slate-900 font-medium">{product.name}</span>
        </nav>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8 lg:p-12">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <img
                  src={`http://127.0.0.1:8000/storage/${product.image}`}
                  alt={product.name}
                  className="relative w-full h-96 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Category Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {product.category?.name || 'Uncategorized'}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">{product.name}</h1>
                <p className="text-slate-600">{product.description || 'No description available'}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ${product.price}
                </span>
                <span className="text-slate-500">USD</span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">SKU</p>
                  <p className="font-semibold text-slate-900">{product.sku}</p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <p className="text-sm text-slate-600 mb-1">Quantity</p>
                  <p className="font-semibold text-slate-900">{product.quantity} units</p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 col-span-2">
                  <p className="text-sm text-slate-600 mb-2">Status</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusColor[product.status.toLowerCase()] || statusColor.pending}`}>
                    <span className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse"></span>
                    {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Supplier Info */}
              {product.supplier && (
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Supplier Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600">Name:</span>
                      <span className="font-medium text-slate-900">{product.supplier.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600">Phone:</span>
                      <span className="font-medium text-slate-900">{product.supplier.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600">Email:</span>
                      <span className="font-medium text-slate-900">{product.supplier.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600">Address:</span>
                      <span className="font-medium text-slate-900">{product.supplier.address}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">

                <button className="px-6 bg-white border-2 border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 font-semibold py-4 rounded-xl transition-all duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Metadata */}
              <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-1">
                <div className="flex justify-between">
                  <div >
                    <p>Created: {new Date(product.created_at).toLocaleDateString()}</p>
                    <p>Last Updated: {new Date(product.updated_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Link to={"/product"} className="py-2 px-12 bg-blue-600 rounded-4xl text-xl font-bold text-teal-50">Back</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;