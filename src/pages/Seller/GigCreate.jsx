import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, DollarSign, Clock, ChevronDown, MapPin, Phone } from 'lucide-react';
import axiosInstance from '../../utils/axios';

export default function GigCreate() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const sections = {
    overview: 'Basic Info',
    pricing: 'Service Rates',
    description: 'Description',
    requirements: 'Requirements'
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    basePrice: '',
    experience: '',
    specialSkills: '',
    requirementInfo: '',
    tools: '',
    holidays: {
      dates: []
    }
  });

  // Fetch provider details
  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const response = await axiosInstance.get('/serviceProviders/profile');
        setProvider(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch provider details:', error);
        setLoading(false);
      }
    };
    fetchProviderDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serviceData = {
        ...formData,
        serviceProviderId: provider.serviceProviderId,
        locality: provider.locality,
        address: provider.address,
        latitude: provider.latitude,
        longitude: provider.longitude
      };

      await axiosInstance.post('/services/create', serviceData);
      navigate('/');
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create Service Listing</h1>
          <p className="text-gray-600 mt-2">List your professional services in the marketplace</p>
        </div>

        {/* Navigation Pills */}
        <div className="flex space-x-2 mb-8 overflow-x-auto">
          {Object.entries(sections).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                activeSection === key
                ? 'bg-sky-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1">{provider.fname} {provider.lname}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <p className="mt-1">{provider.locality}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact</label>
                  <p className="mt-1">{provider.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1">{provider.email}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="Title of your service"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Category
                </label>
                <div className="relative">
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Carpentry">Carpentry</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Painting">Painting</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          )}

          {/* Pricing Section */}
          {activeSection === 'pricing' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Rates
                </label>
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.basePrice}
                      onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
                      placeholder="Base service charge"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                  <span className="text-gray-500">per visit</span>
                </div>
              </div>
            </div>
          )}

          {/* Description Section */}
          {activeSection === 'description' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About Your Service
                </label>
                <textarea
                  rows="6"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="Describe your experience, expertise, and the services you provide..."
                />
              </div>
            </div>
          )}

          {/* Requirements Section */}
          {activeSection === 'requirements' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Information Required from Customers
                </label>
                <textarea
                  rows="4"
                  value={formData.requirementInfo}
                  onChange={(e) => setFormData({...formData, requirementInfo: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="What information do you need from customers before starting the work?"
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <button 
            onClick={() => navigate('/seller/services')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
          >
            Create Service
          </button>
        </div>
      </div>
    </div>
  );
}