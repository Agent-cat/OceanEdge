import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  GlobeAltIcon, 
  CurrencyDollarIcon, 
  CalendarIcon, 
  ClipboardDocumentListIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ChartBarIcon },
    { id: 'tourism', label: 'Tourism Packages', icon: GlobeAltIcon },
    { id: 'investments', label: 'Investments', icon: CurrencyDollarIcon },
    { id: 'bookings', label: 'Bookings', icon: CalendarIcon },
    { id: 'responses', label: 'Form Responses', icon: ClipboardDocumentListIcon }
  ];

  return (
    <div className="w-72 min-h-screen bg-black/40 backdrop-blur-sm border-r border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-[fairplay] font-bold text-white flex items-center">
          <HomeIcon className="w-7 h-7 mr-3 text-[#D4B678]" />
          Admin Panel
        </h1>
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-[#D4B678]/10 text-[#D4B678] border border-[#D4B678]/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon className={`w-5 h-5 mr-3 ${
              activeTab === item.id
                ? 'text-[#D4B678]'
                : 'text-gray-500'
            }`} />
            {item.label}
          </motion.button>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar; 