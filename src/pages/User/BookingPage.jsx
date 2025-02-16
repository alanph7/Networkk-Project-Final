import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';
import Collapsible from '@edonec/collapsible';
import '@edonec/collapsible/build/index.css';
import '@edonec/collapsible/build/icons.css';
import UserNavbar from '../../components/UserNavbar';
import axiosInstance from '../../utils/axios';

const BookingsPage = () => {
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
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.log('No userId found in localStorage');
        navigate('/login');
        return;
      }

      const response = await axiosInstance.get(`/bookings?userId=${userId}`);
      
      if (response.data) {
        // Categorize bookings by status
        const categorizedBookings = {
          pending: response.data.filter(booking => booking.bookingStatus === 'pending'),
          confirmed: response.data.filter(booking => booking.bookingStatus === 'confirmed'),
          completed: response.data.filter(booking => booking.bookingStatus === 'completed'),
          cancelled: response.data.filter(booking => booking.bookingStatus === 'cancelled'),
          rejected: response.data.filter(booking => booking.bookingStatus === 'rejected')
        };
        
        setBookings(categorizedBookings);
      } else {
        setBookings({
          pending: [],
          confirmed: [],
          completed: [],
          cancelled: [],
          rejected: []
        });
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error.response?.data || error.message);
      setLoading(false);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  // Add useEffect to fetch bookings when component mounts
  useEffect(() => {
    fetchBookings();
  }, []);

  // Add loading state handler
  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <UserNavbar />
        <div className="flex-1 p-4 md:p-8 flex items-center justify-center">
          <div className="text-gray-600">Loading bookings...</div>
        </div>
      </div>
    );
  }

  // Update the sections object to include all statuses
  const sections = {
    pending: 'Pending Bookings',
    confirmed: 'Confirmed Bookings',
    completed: 'Completed Bookings',
    cancelled: 'Cancelled Bookings',
    rejected: 'Rejected Bookings'
  };

  // Update the handlePayment function to use the service provider's link
  const handlePayment = (booking) => {
    if (booking.serviceProvider?.link) {
      // Open the payment link in a new tab
      window.open(booking.serviceProvider.link, '_blank');
    } else {
      // Handle case when no payment link is available
      console.error('No payment link available for this service provider');
      // Optionally show a notification to the user
      alert('Payment link not available. Please contact the service provider.');
    }
  };

  // Update the content section to handle all booking statuses
  const renderBookings = (status) => (
    <div className="space-y-6">
      {bookings[status].length > 0 ? (
        bookings[status].map((booking, index) => (
          <div 
            key={`${status}-booking-${booking.bookingId}-${index}`} 
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            {/* Status Badge */}
            <div className={`px-4 py-2 ${getStatusColor(booking.bookingStatus)}`}>
              <span className="text-sm font-medium capitalize">{booking.bookingStatus}</span>
            </div>

            <div className="p-6">
              {/* Service Details */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {booking.service?.serviceName || 'Service'}
                  </h3>
                  <span className="text-lg font-bold text-sky-600">
                    ${booking.basePayment}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">
                  {booking.service?.description || 'No description available'}
                </p>
              </div>

              {/* Service Provider & Booking Details */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Service Provider Card */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Service Provider
                  </h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-gray-600">Name: </span>
                      <span className="font-medium">
                        {booking.serviceProvider ? 
                          `${booking.serviceProvider.fname} ${booking.serviceProvider.lname}` : 
                          'N/A'}
                      </span>
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-600">Phone: </span>
                      <span className="font-medium">{booking.serviceProvider?.phone || 'N/A'}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-600">Location: </span>
                      <span className="font-medium">{booking.serviceProvider?.locality || 'N/A'}</span>
                    </p>
                  </div>
                </div>

                {/* Booking Details Card */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Booking Details
                  </h4>
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
                    <p className="text-sm">
                      <span className="text-gray-600">Description: </span>
                      <span className="font-medium">{booking.description || 'No description provided'}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              {status === 'confirmed' && booking.paymentStatus !== 'paid' && (
                <button
                  className="mt-6 w-full bg-sky-600 text-white py-3 px-4 rounded-lg hover:bg-sky-700 transition duration-300 flex items-center justify-center font-medium"
                  onClick={() => handlePayment(booking)}
                >
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Proceed to Payment
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

  // Add this helper function for status colors
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserNavbar />
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-600 mt-2">Manage all your service bookings</p>
          </div>

          {/* Updated Navigation Pills */}
          <div className="flex space-x-2 mb-8 overflow-x-auto">
            {Object.entries(sections).map(([key, value]) => (
              <button
                key={`nav-${key}`}  // Added unique key prefix
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

          {/* Updated Content Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {renderBookings(activeSection)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;