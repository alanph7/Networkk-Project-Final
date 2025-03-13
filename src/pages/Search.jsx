import React, { useState, useEffect } from "react";
import { FaSearch, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import axiosInstance from "../utils/axios";
import { Link } from 'react-router-dom';
import { haversineDistance } from "../components/Haversine";
import UserNavbar from '../components/UserNavbar';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import LoadingSpinner from "../components/LoadingSpinner";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0ea5e9", // matches Tailwind's sky-500
    },
  },
});

export default function Search() {
  const [filters, setFilters] = useState({
    date: null, // Changed from "" to null
    type: "",
    sortBy: "rating",
    sortOrder: "desc",
    minPrice: "",
    maxPrice: "",
    maxDistance:50, // Default 10km radius
    minRating: "",
    name: "",
    isOpen: true // Add this line
  });

  const [filteredProviders, setFilteredProviders] = useState([]);
  const [originalProviders, setOriginalProviders] = useState([]);
  const [error, setError] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [avgRating, setAvgRating] = useState(0);

  // Update the initial data load useEffect
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axiosInstance.get('/services');
        // Filter for accepted status and open services immediately after fetching
        const acceptedServices = response.data.filter(service => 
          service.status === 'accepted' && service.isOpen
        );
        setOriginalProviders(response.data.filter(service => service.status === 'accepted'));
        setFilteredProviders(acceptedServices);
      } catch (error) {
        console.error('Error fetching providers:', error);
        setError('Failed to load services');
      }
    };

    fetchProviders();
  }, []);

  // Add useEffect for getting user location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setIsLoadingLocation(false);
        },
        (error) => {
          setLocationError("Unable to get your location. Please enable location services.");
          setIsLoadingLocation(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
      setIsLoadingLocation(false);
    }
  }, []);

  const applyFilters = () => {
    let results = [...originalProviders];
 // First filter by status and isOpen
 results = results.filter(provider => 
  provider.status === 'accepted' && 
  (filters.isOpen ? provider.isOpen : true)
);

    // Filter out providers who have holiday on selected date
    if (filters.date) {
      const selectedDate = filters.date; // Already in YYYY-MM-DD format
      results = results.filter(provider => {
        if (!provider.holidays) return true;
        let holidayDates;
        try {
          holidayDates = Array.isArray(provider.holidays) 
            ? provider.holidays 
            : JSON.parse(provider.holidays);
        } catch (e) {
          console.error('Error parsing holidays:', e);
          return true;
        }
        return !holidayDates.includes(selectedDate);
      });
    }

    // Apply category filter
    if (filters.type) {
      results = results.filter(provider => 
        provider.category?.toLowerCase().includes(filters.type.toLowerCase())
      );
    }

   
    // Then apply price filters
    if (filters.minPrice) {
      results = results.filter(provider => 
        provider.basePrice >= parseInt(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      results = results.filter(provider => 
        provider.basePrice <= parseInt(filters.maxPrice)
      );
    }

    // Apply name filter
    if (filters.name) {
      results = results.filter(provider =>
        provider.serviceProvider.fname.toLowerCase().includes(filters.name.toLowerCase()) ||
        provider.serviceProvider.lname.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    // Filter by distance if user location is available
    if (userLocation && filters.maxDistance) {
      results = results.filter(provider => {
        if (!provider.serviceProvider.latitude || !provider.serviceProvider.longitude) {
          return false;
        }
        
        const distance = haversineDistance(
          userLocation.latitude,
          userLocation.longitude,
          parseFloat(provider.serviceProvider.latitude),
          parseFloat(provider.serviceProvider.longitude)
        );
        
        return distance <= filters.maxDistance;
      });
    }

    // Apply sorting
    if (filters.sortBy === 'price') {
      results.sort((a, b) => {
        return filters.sortOrder === 'asc' 
          ? a.basePrice - b.basePrice
          : b.basePrice - a.basePrice;
      });
    } else if (filters.sortBy === 'rating') {
      results.sort((a, b) => b.avgRating - a.avgRating);
    }

    setFilteredProviders(results);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Apply filters whenever filters change
  useEffect(() => {
    applyFilters();
  }, [filters]);



  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserNavbar />
      <div className="flex-1">
        <div className="container mx-auto p-4">
          {isLoadingLocation ? (
            <LoadingSpinner />
          ) : locationError ? (
            <div className="text-red-500 text-center py-4">{locationError}</div>
          ) : (
            <>
              <div className="flex items-center mb-8">
                <input
                  type="text"
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="flex-grow border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                  placeholder="What service are you looking for?"
                />
                <button
                  onClick={applyFilters}
                  className="bg-sky-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-sky-600"
                >
                  <FaSearch />
                </button>
              </div>

              <div className="flex mb-8">
                <div className="w-1/4 pr-4">
                  <h3 className="font-bold mb-4">Filters</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <ThemeProvider theme={theme}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Select Date"
                          value={filters.date ? dayjs(filters.date) : null}
                          onChange={(newDate) => {
                            setFilters(prev => ({
                              ...prev,
                              date: newDate ? dayjs(newDate).format('YYYY-MM-DD') : null
                            }));
                          }}
                          minDate={dayjs()}
                          className="w-full"
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              size: "small",
                              sx: { marginTop: 1 }
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </ThemeProvider>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Price Range
                    </label>
                    <div className="flex items-center">
                      <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Min"
                      />
                      <span className="mx-2">-</span>
                      <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Search by Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={filters.name}
                      onChange={handleFilterChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Provider name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Distance (km): {filters.maxDistance}
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">1</span>
                      <input
                        type="range"
                        name="maxDistance"
                        min="1"
                        max="50"
                        value={filters.maxDistance}
                        onChange={handleFilterChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
                      />
                      <span className="text-sm text-gray-500">50</span>
                    </div>
                    {userLocation && (
                      <p className="text-xs text-gray-500 mt-1">
                        Showing services within {filters.maxDistance}km of your location
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center justify-between text-sm font-medium text-gray-700">
                      <span>Show only open services</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="isOpen"
                          checked={filters.isOpen}
                          onChange={(e) => setFilters(prev => ({ 
                            ...prev, 
                            isOpen: e.target.checked 
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                      </label>
                    </label>
                  </div>
                  {/* Add more filter options here */}
                </div>

                <div className="w-3/4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Services</h2>
                    <div className="flex items-center">
                      <select
                        name="sortBy"
                        value={filters.sortBy}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mr-2"
                      >
                        <option value="rating">Sort by Rating</option>
                        <option value="price">Sort by Price</option>
                        <option value="distance">Sort by Distance</option>
                      </select>
                      {filters.sortBy !== "rating" && (
                        <select
                          name="sortOrder"
                          value={filters.sortOrder}
                          onChange={handleFilterChange}
                          className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="asc">
                            {filters.sortBy === "price" ? "Low to High" : "Near to Far"}
                          </option>
                          <option value="desc">
                            {filters.sortBy === "price" ? "High to Low" : "Far to Near"}
                          </option>
                        </select>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProviders.map((provider) => (
                      <div 
                        key={provider.serviceId}
                        className={`block transition duration-300 ease-in-out ${
                          provider.isOpen ? 'transform hover:-translate-y-1 cursor-pointer' : 'opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <div className="border rounded-lg overflow-hidden shadow-lg bg-white relative">
                          {provider.isOpen ? (
                            <Link to={`/service/${provider.serviceId}`}>
                              <img
                                //src={`https://picsum.photos/seed/${provider.serviceId}/300/200`}
                                src={(() => {
                                  try {
                                    const pics = JSON.parse(provider.demoPics || '[]');
                                    return pics[0] || 'https://picsum.photos/seed/${provider.serviceId}/300/200';
                                  } catch (error) {
                                    console.error('Error parsing demoPics:', error);
                                    return 'https://picsum.photos/seed/${provider.serviceId}/300/200';
                                  }
                                })()}
                                alt={provider.title}
                                className="w-full h-48 object-cover"
                              />
                              <div className="p-4">
                                <h3 className="font-bold text-lg mb-2">
                                  {provider.serviceProvider.fname} {provider.serviceProvider.lname}
                                </h3>
                                <p className="text-sm font-bold text-gray-600 mb-2">{provider.category}</p>
                                
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                  {provider.description || "No description available"}
                                </p>

                                <div className="flex items-center mb-2">
                                  <FaStar className="text-yellow-400 mr-1" />
                                  <span>{provider.avgRating}</span>
                                  <span className="mx-2">|</span>
                                  <FaMapMarkerAlt className="text-gray-400 mr-1" />
                                  <span>{provider.locality}</span>
                                </div>
                                {userLocation && provider.serviceProvider.latitude && provider.serviceProvider.longitude && (
                                  <p className="text-sm text-gray-600">
                                    Distance: {haversineDistance(
                                      userLocation.latitude,
                                      userLocation.longitude,
                                      parseFloat(provider.serviceProvider.latitude),
                                      parseFloat(provider.serviceProvider.longitude)
                                    ).toFixed(1)} km
                                  </p>
                                )}
                                <div className="flex items-center justify-between mt-2">
                                  <p className="font-bold text-lg text-sky-600">Rs {provider.basePrice}</p>
                                  <span className={`text-sm ${provider.isOpen ? 'text-green-500' : 'text-red-500'}`}>
                                    {provider.isOpen ? 'Open' : 'Closed'}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          ) : (
                            <>
                              <img
                                //src={`https://picsum.photos/seed/${provider.serviceId}/300/200`}
                                src={(() => {
                                  try {
                                    const pics = JSON.parse(provider.demoPics || '[]');
                                    return pics[0] || 'https://picsum.photos/seed/${provider.serviceId}/300/200';
                                  } catch (error) {
                                    console.error('Error parsing demoPics:', error);
                                    return 'https://picsum.photos/seed/${provider.serviceId}/300/200';
                                  }
                                })()}
                                alt={provider.title}
                                className="w-full h-48 object-cover"
                              />
                              <div className="p-4">
                                <h3 className="font-bold text-lg mb-2">
                                  {provider.serviceProvider.fname} {provider.serviceProvider.lname}
                                </h3>
                                <p className="text-sm font-bold text-gray-600 mb-2">{provider.category}</p>
                                
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                  {provider.description || "No description available"}
                                </p>

                                <div className="flex items-center mb-2">
                                  <FaStar className="text-yellow-400 mr-1" />
                                  <span>{provider.avgRating}</span>
                                  <span className="mx-2">|</span>
                                  <FaMapMarkerAlt className="text-gray-400 mr-1" />
                                  <span>{provider.locality}</span>
                                </div>
                                {userLocation && provider.serviceProvider.latitude && provider.serviceProvider.longitude && (
                                  <p className="text-sm text-gray-600">
                                    Distance: {haversineDistance(
                                      userLocation.latitude,
                                      userLocation.longitude,
                                      parseFloat(provider.serviceProvider.latitude),
                                      parseFloat(provider.serviceProvider.longitude)
                                    ).toFixed(1)} km
                                  </p>
                                )}
                                <div className="flex items-center justify-between mt-2">
                                  <p className="font-bold text-lg text-sky-600">Rs {provider.basePrice}</p>
                                  <span className={`text-sm ${provider.isOpen ? 'text-green-500' : 'text-red-500'}`}>
                                    {provider.isOpen ? 'Open' : 'Closed'}
                                  </span>
                                </div>
                                <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                                  <span className="text-white font-bold text-lg">Currently Unavailable</span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
