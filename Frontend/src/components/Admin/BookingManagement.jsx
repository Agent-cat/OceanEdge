import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiCheck, FiX, FiPhone, FiMail, FiMessageSquare } from 'react-icons/fi';
import axios from 'axios';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`);
      setBookings(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch bookings');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/${bookingId}/status`, {
        status: newStatus
      });
      fetchBookings();
    } catch (err) {
      setError('Failed to update booking status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
          onClick={fetchBookings}
          className="ml-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Booking Management</h2>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Guest Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Package/Room
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check-In
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check-Out
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.fullName}</div>
                      <div className="text-sm text-gray-500">{booking.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{booking.package || booking.accommodation}</div>
                  <div className="text-sm text-gray-500">{booking.rooms ? `${booking.rooms} room(s)` : ''}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(booking.checkIn).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(booking.checkOut).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                  <button
                    onClick={() => {
                      setSelectedBooking(booking);
                      setShowDetails(true);
                    }}
                    className="text-amber-500 hover:text-amber-600"
                  >
                    <FiEye size={20} />
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                    className="text-green-500 hover:text-green-600"
                  >
                    <FiCheck size={20} />
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FiX size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booking Details Modal */}
      {showDetails && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Booking Details</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Guest Information</h4>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.fullName}</p>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.email}</p>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.phoneNumber}</p>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.country}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Stay Details</h4>
                  <p className="mt-1 text-sm text-gray-900">Check-in: {new Date(selectedBooking.checkIn).toLocaleDateString()}</p>
                  <p className="mt-1 text-sm text-gray-900">Check-out: {new Date(selectedBooking.checkOut).toLocaleDateString()}</p>
                  <p className="mt-1 text-sm text-gray-900">
                    Guests: {selectedBooking.adults} adults, {selectedBooking.children} children, {selectedBooking.infants} infants
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Package & Preferences</h4>
                <p className="mt-1 text-sm text-gray-900">Package: {selectedBooking.package}</p>
                <p className="mt-1 text-sm text-gray-900">Accommodation: {selectedBooking.accommodation}</p>
                <p className="mt-1 text-sm text-gray-900">View Preference: {selectedBooking.view}</p>
                <p className="mt-1 text-sm text-gray-900">Meal Preference: {selectedBooking.mealPreference}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Special Requirements</h4>
                <div className="mt-1 space-y-1">
                  {selectedBooking.specialRequirements.map((req, index) => (
                    <p key={index} className="text-sm text-gray-900">{req}</p>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    handleStatusUpdate(selectedBooking._id, 'confirmed');
                    setShowDetails(false);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Confirm Booking
                </button>
                <button
                  onClick={() => {
                    handleStatusUpdate(selectedBooking._id, 'cancelled');
                    setShowDetails(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement; 