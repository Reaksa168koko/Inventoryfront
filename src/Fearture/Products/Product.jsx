import React from 'react';
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
    FiTag
} from 'react-icons/fi';

const Product = () => {
    // Product data from the table
    const products = [
        { name: "Cherry Delight", id: "#KP267400", price: "$90.50", stock: "350 pcs", type: "Dessert", status: "Pending" },
        { name: "Kiwi", id: "#TL651535", price: "$12.00", stock: "650 kg", type: "Fruits", status: "Active" },
        { name: "Mango Magic", id: "#GB851535", price: "$100.50", stock: "1200 pcs", type: "Ice Cream", status: "Inactive" },
        { name: "Joy Care", id: "#ER651535", price: "$59.99", stock: "700 pcs", type: "Care", status: "On Sale" },
        { name: "Blueberry Bliss", id: "#SD487441", price: "$150.90", stock: "100 lt", type: "Dessert", status: "Bouncing" },
        { name: "Watermelon", id: "#TL449003", price: "$10.99", stock: "23 lt", type: "Juice", status: "Pending" },
        { name: "Trilogy", id: "#KP651535", price: "$130.00", stock: "3000 pcs", type: "Oil", status: "Active" },
        { name: "Dryskin", id: "#GB449003", price: "$40.70", stock: "400 pcs", type: "Cream", status: "Inactive" },
        { name: "Olive Oil", id: "#SD449003", price: "$35.50", stock: "200 lt", type: "Oil", status: "On Sale" },
        { name: "Citrus Brust", id: "#ER558612", price: "$9.99", stock: "1200 pcs", type: "Flowers", status: "Bouncing" },
    ];

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
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                        <FiPlus className="text-lg" />
                        Add New Product
                    </button>
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
                            {products.map((product, index) => (
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
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product.stock.includes('23') ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-700'}`}>
                                            {product.stock}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(product.type)}`}>
                                            {product.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
                                            {getStatusIcon(product.status)}
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <FiMoreVertical className="text-gray-500" />
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