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

  // Update the content section to handle all booking statuses
  const renderBookings = (status) => (
    <div className="space-y-4">
      {bookings[status].length > 0 ? (
        bookings[status].map((booking) => (
          // Add unique key using bookingId
          <div 
            key={`booking-${booking.bookingId}`} 
            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <p className="font-semibold">Service: {booking.service?.serviceName || 'N/A'}</p>
            <p>Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
            <p>Time: {booking.bookingTime}</p>
            <p>Description: {booking.description}</p>
            <p>Base Payment: ${booking.basePayment}</p>
            {status === 'confirmed' && (
              <button
                key={`pay-button-${booking.bookingId}`}
                className="mt-2 bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 transition duration-300"
                onClick={() => handlePayment(booking)}
              >
                Pay Now
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No {status} bookings found.</p>
      )}
    </div>
  );

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