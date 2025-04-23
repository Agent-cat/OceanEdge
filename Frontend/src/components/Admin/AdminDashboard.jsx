import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  ChartBarIcon,
  CurrencyDollarIcon, 
  CalendarIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalInvestments: 0,
    totalTourismPackages: 0,
    totalFormResponses: 0,
    recentBookings: [],
    recentInvestments: [],
    monthlyRevenue: 0,
    pendingApprovals: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/stats`);
      setStats(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      setLoading(false);
      console.error('Error fetching dashboard data:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4B678]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-6 py-4 rounded-lg">
          <p className="flex items-center">
            <ClipboardDocumentListIcon className="w-5 h-5 mr-2" />
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-[fairplay] font-bold text-white">Dashboard Overview</h1>
        <button 
          onClick={fetchDashboardData}
          className="px-4 py-2 bg-[#D4B678]/10 text-[#D4B678] border border-[#D4B678]/20 rounded-lg hover:bg-[#D4B678]/20 transition-colors duration-200 flex items-center space-x-2"
        >
          <ArrowTrendingUpIcon className="w-4 h-4" />
          <span>Refresh Stats</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<CalendarIcon className="w-6 h-6" />}
          title="Total Bookings"
          value={stats.totalBookings}
          trend="+12%"
          trendUp={true}
        />
        <StatCard
          icon={<CurrencyDollarIcon className="w-6 h-6" />}
          title="Monthly Revenue"
          value={`₹${stats.monthlyRevenue.toLocaleString()}`}
          trend="+8%"
          trendUp={true}
        />
        <StatCard
          icon={<ChartBarIcon className="w-6 h-6" />}
          title="Tourism Packages"
          value={stats.totalTourismPackages}
          trend="+5%"
          trendUp={true}
        />
        <StatCard
          icon={<UserGroupIcon className="w-6 h-6" />}
          title="Pending Approvals"
          value={stats.pendingApprovals}
          trend="-2%"
          trendUp={false}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivityCard
          title="Recent Bookings"
          data={stats.recentBookings}
          type="booking"
        />
        <RecentActivityCard
          title="Recent Investments"
          data={stats.recentInvestments}
          type="investment"
        />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, trend, trendUp }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-black/40 backdrop-blur-sm rounded-lg border border-gray-800 p-6 hover:border-[#D4B678]/50 transition-colors duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="p-3 bg-[#D4B678]/10 rounded-lg">
          <div className="text-[#D4B678]">{icon}</div>
        </div>
        <div className={`flex items-center space-x-1 ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
          {trendUp ? (
            <ArrowTrendingUpIcon className="w-4 h-4" />
          ) : (
            <ArrowTrendingDownIcon className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">{trend}</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
    </motion.div>
  );
};

const RecentActivityCard = ({ title, data, type }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
      case 'available':
        return 'bg-green-900/20 text-green-400 border border-green-500/50';
      case 'pending':
        return 'bg-[#D4B678]/10 text-[#D4B678] border border-[#D4B678]/20';
      default:
        return 'bg-red-900/20 text-red-400 border border-red-500/50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: type === 'booking' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-black/40 backdrop-blur-sm rounded-lg border border-gray-800 p-6 hover:border-[#D4B678]/50 transition-colors duration-300"
    >
      <h3 className="text-xl font-[fairplay] font-bold text-white mb-6">{title}</h3>
      <div className="space-y-4">
        {data.map((item) => (
          <div 
            key={item._id} 
            className="flex items-center justify-between border-b border-gray-800 pb-4 last:border-0"
          >
            <div className="space-y-1">
              <p className="font-medium text-white">
                {type === 'booking' ? item.customerName : item.title}
              </p>
              <p className="text-sm text-gray-400">
                {type === 'booking' ? item.packageName : `₹${item.price}`}
              </p>
            </div>
            <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(item.status)}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AdminDashboard; 