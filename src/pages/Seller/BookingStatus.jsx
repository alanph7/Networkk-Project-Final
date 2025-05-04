import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SellerNavbar from '../../components/SellerNavbar';
import axiosInstance from '../../utils/axios';

const ProviderBookingPage = () => {
  const [bookings, setBookings] = useState({
    pending: [],
    confirmed: [],
    completed: [],
    cancelled: [],
    rejected: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('pending');

  const fetchBookings = async () => {
    try {
      const serviceProviderId = localStorage.getItem('userId');
      if (!serviceProviderId) {
        console.log('No serviceProviderId found in localStorage');
        navigate('/seller-auth');
        return;
      }

      const response = await axiosInstance.get(`/bookings/provider?serviceProviderId=${serviceProviderId}`);
      
      if (response.data) {
        const categorizedBookings = {
          pending: response.data.filter(booking => booking.bookingStatus === 'pending'),
          confirmed: response.data.filter(booking => booking.bookingStatus === 'confirmed'),
          completed: response.data.filter(booking => booking.bookingStatus === 'completed'),
          cancelled: response.data.filter(booking => booking.bookingStatus === 'cancelled'),
          rejected: response.data.filter(booking => booking.bookingStatus === 'rejected')
        };
        setBookings(categorizedBookings);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await axiosInstance.put(`/bookings/${bookingId}`, {
        bookingStatus: newStatus
      });
      fetchBookings(); // Refresh bookings after update
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const sections = {
    pending: 'Pending Bookings',
    confirmed: 'Confirmed Bookings',
    completed: 'Completed Bookings',
    cancelled: 'Cancelled Bookings',
    rejected: 'Rejected Bookings'
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      rejected: 'bg-gray-100 text-gray-800'
    };
    return colors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentStatusColor = (status) => {
    return status === 'paid' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const renderBookings = (status) => (
    <div className="space-y-6">
      {bookings[status].length > 0 ? (
        bookings[status].map((booking, index) => (
          <div 
            key={`${status}-${booking.bookingId}-${index}`} // Added index to ensure uniqueness
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            {/* Status Badges Container */}
            <div className="flex justify-between items-center">
              <div className={`px-4 py-2 ${getStatusColor(booking.bookingStatus)}`}>
                <span className="text-sm font-medium capitalize">{booking.bookingStatus}</span>
              </div>
              <div className={`px-4 py-2 ${getPaymentStatusColor(booking.paymentStatus)}`}>
                <span className="text-sm font-medium capitalize">
                  {booking.paymentStatus === 'paid' ? 'Payment Received' : 'Payment Pending'}
                </span>
              </div>
            </div>

            <div className="p-6">
              {/* Service Details */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {booking.service?.title || 'Service'}
                  </h3>
                  <span className="text-lg font-bold text-sky-600">
                  ₹{booking.basePayment}
                  </span>
                </div>
              </div>

              {/* Customer Details & Booking Info */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Customer Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Customer Details</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-gray-600">Email: </span>
                      <span className="font-medium">{booking.user?.email || 'N/A'}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-600">Phone: </span>
                      <span className="font-medium">{booking.user?.phone || 'N/A'}</span>
                    </p>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Booking Details</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-gray-600">Date: </span>
                      <span className="font-medium">
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-600">Time: </span>
                      <span className="font-medium">{booking.bookingTime}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {status === 'pending' && (
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => handleStatusUpdate(booking.bookingId, 'confirmed')}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(booking.bookingId, 'rejected')}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Reject
                  </button>
                </div>
              )}
              
              {status === 'confirmed' && (
                <button
                  onClick={() => handleStatusUpdate(booking.bookingId, 'completed')}
                  className="mt-6 w-full bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 transition duration-300"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No {status.toLowerCase()} bookings found</p>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <SellerNavbar />
        <div className="flex-1 p-4 md:p-8 flex items-center justify-center">
          <div className="text-gray-600">Loading bookings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SellerNavbar />
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
            <p className="text-gray-600 mt-2">Manage your service bookings</p>
          </div>

          <div className="flex space-x-2 mb-8 overflow-x-auto">
            {Object.entries(sections).map(([key, value]) => (
              <button
                key={`booking-nav-${key}`}
                onClick={() => setActiveSection(key)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeSection === key
                    ? 'bg-sky-700 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {value}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            {renderBookings(activeSection)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderBookingPage;