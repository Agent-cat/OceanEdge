import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiMail, FiPhone, FiUser, FiCalendar, FiPackage, FiHome } from 'react-icons/fi';

const FormResponses = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/registrations`);
      setResponses(response.data.data || []);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch form responses');
      setLoading(false);
      console.error('Error fetching responses:', err);
    }
  };

  const filterResponses = (type) => {
    if (type === 'all') return responses;
    return responses.filter(response => response.type === type);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'tourism':
        return <FiPackage className="w-5 h-5" />;
      case 'investment':
        return <FiHome className="w-5 h-5" />;
      default:
        return <FiMail className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
        <button 
          onClick={fetchResponses}
          className="ml-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Form Responses</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2.5 rounded-lg transition-all duration-200 font-medium ${
              activeTab === 'all'
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-200'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            All Responses
          </button>
          <button
            onClick={() => setActiveTab('tourism')}
            className={`px-6 py-2.5 rounded-lg transition-all duration-200 font-medium ${
              activeTab === 'tourism'
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-200'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Tourism
          </button>
          <button
            onClick={() => setActiveTab('investment')}
            className={`px-6 py-2.5 rounded-lg transition-all duration-200 font-medium ${
              activeTab === 'investment'
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-200'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Investment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterResponses(activeTab).map((response) => (
          <motion.div
            key={response._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-amber-50 rounded-lg">
                    {getIcon(response.type)}
                  </div>
                  <span className="text-lg font-semibold capitalize text-gray-800">{response.type}</span>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(response.status || 'new')}`}>
                  {response.status || 'new'}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-700">
                  <FiUser className="text-gray-400 w-5 h-5" />
                  <span className="font-medium">{response.name}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <FiMail className="text-gray-400 w-5 h-5" />
                  <span>{response.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <FiPhone className="text-gray-400 w-5 h-5" />
                  <span>{response.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <FiCalendar className="text-gray-400 w-5 h-5" />
                  <span>{new Date(response.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {response.type === 'investment' && (
                <div className="pt-4 border-t border-gray-100">
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Property:</span> {response.propertyId?.title || 'N/A'}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Price:</span> {response.propertyId?.price || 'N/A'}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Requirements:</span> {response.requirements}
                    </p>
                  </div>
                </div>
              )}

              {response.type === 'tourism' && (
                <div className="pt-4 border-t border-gray-100">
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium">Package:</span> {response.packageId?.title || 'N/A'}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Price:</span> {response.packageId?.price || 'N/A'}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Requirements:</span> {response.requirements}
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-100">
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Location:</span> {response.country}, {response.state}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Occupation:</span> {response.occupation}
                  </p>
                  {response.message && (
                    <div className="mt-3">
                      <p className="font-medium text-gray-700 mb-1">Message:</p>
                      <p className="text-gray-600 whitespace-pre-line bg-gray-50 p-3 rounded-lg">{response.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filterResponses(activeTab).length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">No form responses found for this category.</p>
        </div>
      )}
    </div>
  );
};

export default FormResponses; 