import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaHeart, FaSearch } from 'react-icons/fa';
import { MdRemoveCircle } from 'react-icons/md';
import axiosInstance from '../../utils/axios';
import UserNavbar from '../../components/UserNavbar';
import LoadingSpinner from '../../components/LoadingSpinner';

const UserFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [removingId, setRemovingId] = useState(null);
  const navigate = useNavigate();

  // Fetch user's favorites
  useEffect(() => {
    const fetchFavorites = async () => {
        try {
          setLoading(true);
          // First get the list of favorite IDs
          const favoritesResponse = await axiosInstance.get('/users/d/me');
          
          // Extract favorites array - handle potential data formats
          let favoriteIds = [];
          
          // Check if favorites exist and ensure it's an array
          if (favoritesResponse.data.favorites) {
            // Handle string JSON format
            if (typeof favoritesResponse.data.favorites === 'string') {
              try {
                favoriteIds = JSON.parse(favoritesResponse.data.favorites);
              } catch (e) {
                console.error('Error parsing favorites JSON:', e);
                favoriteIds = [];
              }
            } 
            // Handle direct array
            else if (Array.isArray(favoritesResponse.data.favorites)) {
              favoriteIds = favoritesResponse.data.favorites;
            }
          }
          
          console.log('Favorite IDs:', favoriteIds);
          
          if (!favoriteIds || favoriteIds.length === 0) {
            setFavorites([]);
            setLoading(false);
            return;
          }
          
          // Then fetch details for each service
          const detailsPromises = favoriteIds.map(id => 
            axiosInstance.get(`/services/${id}`)
          );
          
          const responses = await Promise.all(detailsPromises.map(p => 
            p.catch(error => ({ error }))
          ));
          
          const validServices = responses
            .filter(response => !response.error)
            .map(response => response.data);
            
          setFavorites(validServices);
        } catch (error) {
          console.error('Error fetching favorites:', error);
          setError('Failed to load your favorite services. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

    fetchFavorites();
  }, []);

  // Handle removing a service from favorites
  const handleRemoveFavorite = async (serviceId) => {
    try {
      setRemovingId(serviceId);
      await axiosInstance.delete('/users/favorites', {
        data: {
          type: 'services',
          id: serviceId
        }
      });
      
      // Update the UI after successful removal
      setFavorites(prev => prev.filter(service => service.serviceId !== serviceId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    } finally {
      setRemovingId(null);
    }
  };

  // Filter favorites based on search query
  const filteredFavorites = favorites.filter(service => 
    service.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.serviceProvider?.fname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.serviceProvider?.lname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <UserNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserNavbar />
      <div className="container mx-auto px-12 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
          <p className="text-gray-600 mt-2">Services you've saved for later</p>
        </div>

        {/* Search and filter */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your favorites..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Favorites grid */}
        {filteredFavorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((service) => (
              <div 
                key={service.serviceId}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 relative group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={(() => {
                        try {
                          const pics = JSON.parse(service.demoPics || '[]');
                          return pics[0] || 'https://picsum.photos/seed/${provider.serviceId}/300/200';
                        } catch (error) {
                          console.error('Error parsing demoPics:', error);
                          return 'https://picsum.photos/seed/${provider.serviceId}/300/200';
                        }
                      })()}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/500x300?text=Error+Loading+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFavorite(service.serviceId);
                    }}
                    disabled={removingId === service.serviceId}
                    className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors duration-200 group-hover:opacity-100 opacity-0"
                    title="Remove from favorites"
                  >
                    {removingId === service.serviceId ? (
                      <div className="h-5 w-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <FaHeart className="text-red-500 h-5 w-5" />
                    )}
                  </button>
                </div>
                
                <Link to={`/service/${service.serviceId}`} className="block">
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-gray-900 mb-1 hover:text-sky-600 transition-colors">
                        {service.title}
                      </h3>
                      <span className="bg-sky-100 text-sky-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {service.category}
                      </span>
                    </div>

                    <div className="flex items-center mb-3">
                      <div className="flex items-center mr-2">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="font-semibold">{service.avgRating || '0'}</span>
                        <span className="text-gray-600 text-sm ml-1">({service.reviewCount || '0'})</span>
                      </div>
                      
                      {service.serviceProvider?.locality && (
                        <div className="flex items-center text-gray-500 text-sm">
                          <FaMapMarkerAlt className="mr-1" />
                          <span>{service.serviceProvider.locality}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <p className="font-bold text-xl text-sky-600">₹{service.basePrice}</p>
                      <span className={`text-sm ${service.isOpen ? 'text-green-500' : 'text-red-500'}`}>
                        {service.isOpen ? 'Open' : 'Closed'}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaHeart className="h-10 w-10 text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No favorites yet</h2>
            <p className="text-gray-500 mb-6">Save services you like by clicking the heart icon</p>
            <button 
              onClick={() => navigate('/search')}
              className="inline-flex items-center px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors"
            >
              <FaSearch className="mr-2" /> Explore Services
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFavorites;