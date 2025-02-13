import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaCheck,
  FaClock,
  FaRedo,
  FaThumbsUp,
  FaHeart,
} from "react-icons/fa";
import axiosInstance from "../utils/axios";
import UserNavbar from "../components/UserNavbar";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axiosInstance.get(`/services/${id}`);
        setService(response.data);
        setImages(JSON.parse(response.data.demoPics || "[]"));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    // Cleanup on unmount
    return () => clearInterval(autoSlide);
  }, [images.length]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error)
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  if (!service) return <div className="text-center p-8">Service not found</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {<UserNavbar />}
      <div className="flex-1"></div>
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                {service.serviceProvider.profilePicture ? (
                  <img
                    src={service.serviceProvider.profilePicture}
                    alt={`${service.serviceProvider.fname}'s profile`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-sky-700 flex items-center justify-center text-white font-bold">
                    {service.serviceProvider.fname?.[0] || "U"}
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold">
                  {service.serviceProvider.fname}{" "}
                  {service.serviceProvider.lname}
                </p>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-semibold">
                      {service.avgRating || 0}
                    </span>
                    <span className="text-gray-600 ml-1">
                      ({service.reviewCount || 0})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="mb-8 relative">
            <img 
              src={`https://picsum.photos/seed/${service.serviceId}/800/400`} 
              alt={service.title} 
              className="w-full rounded-lg shadow-lg"
            />

          </div> */}

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
                    alt={`${service.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/default-service.jpg";
                    }}
                  />
                </div>
              ))}

              {/* Navigation arrows with higher z-index */}
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 transition-colors duration-200 z-10"
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? images.length - 1 : prev - 1
                  )
                }
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 transition-colors duration-200 z-10"
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === images.length - 1 ? 0 : prev + 1
                  )
                }
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Indicators with higher z-index */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/75"
                      }`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About This Service</h2>
              <p className="text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">About The Provider</h2>
              <div className="flex items-center mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden mr-4">
                  {service.serviceProvider.profilePicture ? (
                    <img
                      src={service.serviceProvider.profilePicture}
                      alt={`${service.serviceProvider.fname}'s profile`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-sky-700 flex items-center justify-center text-white font-bold">
                      {service.serviceProvider.fname?.[0] || "U"}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-lg">
                    {service.serviceProvider.fname}{" "}
                    {service.serviceProvider.lname}
                  </p>
                  <p className="text-gray-600">
                    {service.serviceProvider.email}
                  </p>
                  <p className="text-gray-600 mb-2">
                    {service.serviceProvider.locality}
                  </p>
                  <button className="bg-sky-700 text-white py-2 px-4 rounded hover:bg-sky-800 transition">
                    Contact Me
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Reviews</h2>
              {service.Reviews?.map((review) => (
                <div
                  key={review.reviewId}
                  className="mb-6 p-6 bg-white rounded-lg shadow-md"
                >
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
                            className={
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
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
              <h2 className="text-3xl font-bold mb-4">
                Rs {service.basePrice}
              </h2>
              <p className="text-gray-600 mb-6">
                {service.description.substring(0, 100)}...
              </p>

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

              <button
                onClick={() =>
                  navigate("/user-booking", {
                    state: {
                      basePrice: service.basePrice,
                      serviceId: service.serviceId,
                      serviceTitle: service.title,
                      serviceProviderId:
                        service.serviceProvider.serviceProviderId, // Add this
                    },
                  })
                }
                className="w-full bg-sky-700 text-white py-3 rounded-lg font-bold text-lg hover:bg-sky-600 transition duration-300 mb-4"
              >
                Book Now (Rs {service.basePrice})
              </button>

              <p className="text-center mt-4 text-sm text-gray-600">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
