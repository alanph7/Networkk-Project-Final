import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaStar, FaCheck } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Chip } from '@mui/material'; // Add this import
import axiosInstance from '../../utils/axios';
import AdminNavbar from '../../components/AdminNav';

const View = () => {
  const location = useLocation();
  const gig = location.state?.gig;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (!gig?.id) {
        setError('No service ID provided');
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get(`/services/${gig.id}`);
        setImages(JSON.parse(response.data.demoPics || '[]'));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [gig?.id]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  if (!gig) return <div className="text-center p-8">Service not found</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{gig.title}</h1>
            
            {/* Service Provider Info */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <div className="w-full h-full bg-sky-700 flex items-center justify-center text-white font-bold">
                  {gig.seller?.[0] || "U"}
                </div>
              </div>
              <div>
                <p className="font-semibold">{gig.seller}</p>
                <div className="flex items-center">
                  <Chip
                    label={gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
                    color={
                      gig.status === 'pending' ? 'warning' :
                      gig.status === 'accepted' ? 'success' : 'error'
                    }
                    size="small"
                  />
                </div>
              </div>
            </div>

            {/* Image Carousel */}
            <div className="mb-8 relative h-[400px] rounded-lg overflow-hidden">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    opacity: currentImageIndex === index ? 1 : 0,
                    zIndex: currentImageIndex === index ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out",
                  }}
                >
                  <img
                    src={image}
                    alt={`${gig.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/default-service.jpg";
                    }}
                  />
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 transition-colors duration-200 z-10"
                onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 transition-colors duration-200 z-10"
                onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* About Service */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About This Service</h2>
              <p className="text-gray-700 leading-relaxed">
                {gig.description}
              </p>
            </div>

            {/* Service Provider Details */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">About The Provider</h2>
              <div className="flex items-center mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden mr-4">
                  <div className="w-full h-full bg-sky-700 flex items-center justify-center text-white font-bold">
                    {gig.seller?.[0] || "U"}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-lg">{gig.seller}</p>
                  <p className="text-gray-600">{gig.category}</p>
                  <p className="text-gray-600 mb-2">Submitted: {new Date(gig.submittedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Details */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 bg-white p-6 border rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-4">
                ${gig.price}/hr
              </h2>
              <p className="text-gray-600 mb-6">
                {gig.description.substring(0, 100)}...
              </p>
              <ul className="mb-6">
                <li className="flex items-center mb-3">
                  <FaCheck className="mr-3 text-sky-700" /> Status: {gig.status}
                </li>
                <li className="flex items-center mb-3">
                  <FaCheck className="mr-3 text-sky-700" /> {gig.category}
                </li>
                <li className="flex items-center mb-3">
                  <FaCheck className="mr-3 text-sky-700" /> Hourly Rate
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;