import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { Camera, DollarSign, Clock, ChevronDown, MapPin, Phone } from 'lucide-react';

export default function GigCreate() {
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    basePrice: '',
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create Service Listing</h1>

        {/* Provider Info - Read Only */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Provider Information</h2>
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
        </div>

        {/* Service Details Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Service Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
              >
                <option value="">Select Category</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Painting">Painting</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Base Price (Rs)</label>
              <input
                type="number"
                required
                value={formData.basePrice}
                onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700"
            >
              Create Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}