import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaCheck, FaClock, FaRedo, FaThumbsUp, FaHeart } from "react-icons/fa";
import axiosInstance from "../utils/axios";

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axiosInstance.get(`/services/${id}`);
        setService(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  if (!service) return <div className="text-center p-8">Service not found</div>;

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
          <div className="flex items-center mb-6">
            <div>
              <p className="font-semibold">
                {service.serviceProvider.username} 
              </p>
              <div className="flex items-center">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-semibold">{service.avgRating}</span>
                  <span className="text-gray-600 ml-1">({service.reviewCount})</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">About This Service</h2>
            <p className="text-gray-700 leading-relaxed">{service.description}</p>
          </div>

          <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">About The Provider</h2>
            <div className="flex items-center mb-4">
              <div>
                <p className="font-semibold text-lg">
                  {service.serviceProvider.fname} {service.serviceProvider.lname}
                </p>
                <p className="text-gray-600 mb-2">{service.serviceProvider.email}</p>
                <p className="text-gray-600 mb-2">{service.serviceProvider.phone}</p>
                <p className="text-gray-600">{service.serviceProvider.locality}</p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            {service.Reviews?.map(review => (
              <div key={review.reviewId} className="mb-6 p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-sky-700 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {review.user?.fname?.[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{review.user?.fname}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < review.rating ? "text-yellow-400" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Section */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 bg-white p-6 border rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Rs {service.basePrice}</h2>
            <p className="text-gray-600 mb-6">{service.description.substring(0, 100)}...</p>
            
            <ul className="mb-6">
              <li className="flex items-center mb-3">
                <FaCheck className="mr-3 text-sky-700" /> Available
              </li>
              <li className="flex items-center mb-3">
                <FaCheck className="mr-3 text-sky-700" /> {service.category}
              </li>
              <li className="flex items-center mb-3">
                <FaCheck className="mr-3 text-sky-700" /> {service.locality}
              </li>
            </ul>

            <button className="w-full bg-sky-700 text-white py-3 rounded-lg font-bold text-lg hover:bg-sky-600 transition duration-300 mb-4">
              Book Now (Rs {service.basePrice})
            </button>
            
            <p className="text-center mt-4 text-sm text-gray-600">
              You won't be charged yet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}