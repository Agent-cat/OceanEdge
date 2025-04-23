import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '../components/Admin/AdminSidebar';
import AdminDashboard from '../components/Admin/AdminDashboard';
import TourismManagement from '../components/Admin/TourismManagement';
import InvestmentManagement from '../components/Admin/InvestmentManagement';
import BookingManagement from '../components/Admin/BookingManagement';
import FormResponses from '../components/Admin/FormResponses';

const AdminPannel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

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
    <div className="min-h-screen pt-16 bg-black">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-6 lg:p-8"
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-gray-800">
            {renderContent()}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPannel;