import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBox, FiLayers, FiShoppingCart, FiDatabase, FiTruck } from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome /> },
    { name: 'Products', path: '/product', icon: <FiBox /> },
    { name: 'Categories', path: '/category', icon: <FiLayers /> },
    { name: 'Orders', path: '/order', icon: <FiShoppingCart /> },
    { name: 'Stock', path: '/stock', icon: <FiDatabase /> },
    { name: 'Suppliers', path: '/supplier', icon: <FiTruck /> },
  ];

  return (
    <div className="w-64 bg-gray-800 min-h-screen p-6 flex flex-col space-y-4">
      <h2 className="text-white text-2xl font-bold mb-6">Dashboard</h2>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`
            flex items-center gap-3 px-4 py-2 rounded-lg text-white font-medium transition
            ${location.pathname === link.path ? 'bg-gray-700' : 'hover:bg-gray-700'}
          `}
        >
          <span className="text-xl">{link.icon}</span>
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
