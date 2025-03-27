import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaStar, FaCheck } from "react-icons/fa";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { Chip } from "@mui/material";
import axiosInstance from "../../utils/axios";
import AdminNavbar from "../../components/AdminNav";

const View = () => {
  const location = useLocation();
  const gig = location.state?.gig;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serviceProvider, setServiceProvider] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (!gig?.id) {
        setError("No service ID provided");
        setLoading(false);
        return;
      }
      try {
        // First fetch the service details
        const serviceResponse = await axiosInstance.get(`/services/${gig.id}`);
        const serviceData = serviceResponse.data;
        
        // Set images
        setImages(JSON.parse(serviceData.demoPics || "[]"));
        
        // Only fetch provider details if serviceProviderId exists
        if (serviceData.serviceProviderId) {
          const providerResponse = await axiosInstance.get(`/serviceProviders/${serviceData.serviceProviderId}`);
          const providerData = providerResponse.data;
          
          // If profile picture URL is relative, convert to absolute
          if (providerData.profilePicture && !providerData.profilePicture.startsWith('http')) {
            providerData.profilePicture = `${import.meta.env.VITE_API_URL}${providerData.profilePicture}`;
          }
          
          setServiceProvider(providerData);
        } else if (gig.serviceProviderId) {
          const providerResponse = await axiosInstance.get(`/serviceProviders/${gig.serviceProviderId}`);
          const providerData = providerResponse.data;
          
          // If profile picture URL is relative, convert to absolute
          if (providerData.profilePicture && !providerData.profilePicture.startsWith('http')) {
            providerData.profilePicture = `${import.meta.env.VITE_API_URL}${providerData.profilePicture}`;
          }
          
          setServiceProvider(providerData);
        }
      } catch (err) {
        console.error('Error fetching details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [gig?.id, gig?.serviceProviderId]);

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
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  if (!gig) return <div className="text-center p-8">Service not found</div>;

  const carouselSection = (
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
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );

  const providerProfileSection = (
    <div className="lg:col-span-1">
      <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-sky-50 to-white rounded-xl border border-sky-100">
        {/* Profile Picture */}
        <div className="relative mb-4">
          {serviceProvider?.profilePicture ? (
            <img
              src={serviceProvider.profilePicture}
              alt={`${serviceProvider.fname} ${serviceProvider.lname}`}
              className="w-24 h-24 rounded-2xl object-cover shadow-md"
              onError={(e) => {
                e.target.src = "/default-avatar.jpg"; // Add a default avatar image
                e.target.onerror = null;
              }}
            />
          ) : (
            <div className="w-24 h-24 bg-gradient-to-br from-sky-600 to-sky-800 text-white flex items-center justify-center rounded-2xl text-3xl font-bold shadow-md">
              {serviceProvider?.fname?.[0] || gig?.seller?.[0] || "U"}
            </div>
          )}
        </div>

        {/* Provider Name */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {serviceProvider 
            ? `${serviceProvider.fname || ''} ${serviceProvider.lname || ''}`.trim() 
            : gig?.seller || 'Unknown Provider'}
        </h3>

        {/* Category Badge */}
        <span className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-2">
          {gig?.category}
        </span>

        {/* Member Since */}
        {gig?.submittedAt && (
          <p className="text-sm text-gray-500">
            Member since {new Date(gig.submittedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminNavbar />
      <div className="container mx-auto py-8 px-4 lg:px-12">
        {/* Service Provider Details Section - Now at top */}
        <div className="mb-10 bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-4">Service Provider Details</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {providerProfileSection}
            {/* Provider Details */}
            <div className="lg:col-span-2">
              {serviceProvider && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Experience */}
                  {serviceProvider.experience && (
                    <div className="col-span-2 bg-gray-50 p-5 rounded-xl">
                      <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Professional Experience
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{serviceProvider.experience[0]} Years</p>
                    </div>
                  )}

                  {/* Skills */}
                  {serviceProvider.skills && (
                    <div className="col-span-2 bg-gray-50 p-5 rounded-xl">
                      <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                          />
                        </svg>
                        Professional Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {serviceProvider.skills.split(',').map((skill, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1.5 bg-white text-sky-700 rounded-full text-sm font-medium border border-sky-100 hover:bg-sky-50 transition-colors duration-200"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  {serviceProvider.languages && (
                    <div className="col-span-2 bg-gray-50 p-5 rounded-xl">
                      <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" 
                          />
                        </svg>
                        Languages
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {serviceProvider.languages.split(',').map((language, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1.5 bg-white text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                          >
                            {language.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Information */}
                  {(serviceProvider.phone || serviceProvider.email) && (
                    <div className="bg-gray-50 p-5 rounded-xl">
                      <h3 className="text-md font-semibold text-gray-800 mb-3">Contact Information</h3>
                      {serviceProvider.phone && (
                        <p className="flex items-center text-gray-600 mb-2">
                          <svg className="w-5 h-5 mr-2 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {serviceProvider.phone}
                        </p>
                      )}
                      {serviceProvider.email && (
                        <p className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 mr-2 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {serviceProvider.email}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Location */}
                  {serviceProvider.locality && (
                    <div className="bg-gray-50 p-5 rounded-xl">
                      <h3 className="text-md font-semibold text-gray-800 mb-3">Location</h3>
                      <p className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {serviceProvider.locality}
                      </p>
                    </div>
                  )}

                  {/* Payment Link */}
                  {serviceProvider.link && (
                    <div className="bg-gray-50 p-5 rounded-xl">
                      <h3 className="text-md font-semibold text-gray-800 mb-3">Payment Details</h3>
                      <a 
                        href={serviceProvider.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sky-600 hover:text-sky-800 transition-colors group"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        View Payment Details
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Section (Gig Details) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{gig.title}</h1>

            {/* Seller Info */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-sky-700 text-white flex items-center justify-center rounded-full text-xl font-bold">
                {gig.seller?.[0] || "U"}
              </div>
              <div>
                <p className="text-lg font-semibold">{gig.seller}</p>
                <Chip
                  label={gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
                  color={
                    gig.status === "pending" ? "warning" : gig.status === "accepted" ? "success" : "error"
                  }
                  size="small"
                />
              </div>
            </div>

            {/* Image Carousel */}
            {carouselSection}

            {/* About Service */}
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">About This Service</h2>
            <p className="text-gray-600 leading-relaxed">{gig.description}</p>
          </div>

          {/* Right Section (Pricing & Details) */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 bg-white p-6 border rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">${gig.price}/hr</h2>
              <p className="text-gray-600 mb-6">{gig.description.substring(0, 100)}...</p>
              <ul className="mb-6 space-y-3">
                <li className="flex items-center">
                  <FaCheck className="mr-2 text-sky-700" /> Status: {gig.status}
                </li>
                <li className="flex items-center">
                  <FaCheck className="mr-2 text-sky-700" /> {gig.category}
                </li>
                <li className="flex items-center">
                  <FaCheck className="mr-2 text-sky-700" /> Hourly Rate
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
