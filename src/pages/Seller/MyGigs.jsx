import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { AuthContext } from '../../context/AuthContext';

const MyGigs = () => {
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userEmail } = useContext(AuthContext);
  

  useEffect(() => {
    const fetchMyGigs = async () => {
        if (!userEmail) {
            setLoading(false);
            return;
          }
    
          try {
            const providerResponse = await axiosInstance.get(`/serviceProviders/email/${userEmail}`);
            const providerId = providerResponse.data.serviceProviderId;
            
            const servicesResponse = await axiosInstance.get(`/services/provider/${providerId}`);
            setGigs(servicesResponse.data);
          } catch (error) {
            setError('Failed to fetch services. Please try again later.');
            console.error('Error:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchMyGigs();
      }, [userEmail]);
    
      if (loading) return <div className="text-center p-8">Loading...</div>;
      if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
    
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Services</h1>
          <Link 
            to="/gigcreate"
            className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
          >
            Create New Service
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <div key={gig.serviceId} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">{gig.title}</h3>
              <p className="text-gray-600 mb-4">{gig.category}</p>
              <div className="flex justify-between items-center">
                <span className="text-sky-600 font-medium">₹{gig.basePrice}</span>
                <Link 
                  to={`/service/${gig.serviceId}`}
                  className="text-sky-500 hover:text-sky-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {gigs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No services created yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGigs;