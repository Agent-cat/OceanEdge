import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '../components/Admin/AdminSidebar';
import AdminDashboard from '../components/Admin/AdminDashboard';
import TourismManagement from '../components/Admin/TourismManagement';
import InvestmentManagement from '../components/Admin/InvestmentManagement';
import BookingManagement from '../components/Admin/BookingManagement';
import FormResponses from '../components/Admin/FormResponses';
import { FaBars, FaTimes } from 'react-icons/fa';

const AdminPannel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'tourism':
        return <TourismManagement />;
      case 'investments':
        return <InvestmentManagement />;
      case 'bookings':
        return <BookingManagement />;
      case 'responses':
        return <FormResponses />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-black text-white">
      <div className="flex flex-col md:flex-row">
        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden fixed top-[4.5rem] left-4 z-50">
          <button 
            onClick={toggleSidebar}
            className="bg-amber-600 p-2 rounded-full shadow-lg"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Sidebar - Hidden on mobile by default */}
        <div className={`
          fixed md:relative z-40 transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'left-0' : '-left-64 md:left-0'} 
          w-64 h-[calc(100vh-4rem)]
        `}>
          <AdminSidebar 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setSidebarOpen(false);
            }} 
          />
        </div>

        {/* Overlay to close sidebar on mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden" 
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 ml-0 md:ml-64 transition-all duration-300 ease-in-out">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPannel;