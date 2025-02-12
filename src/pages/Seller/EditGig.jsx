import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Camera, DollarSign, Clock, ChevronDown, MapPin, Phone } from 'lucide-react';
import axiosInstance from '../../utils/axios';
import SellerNavbar from '../../components/SellerNavbar';

const EditGig = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [providerRes, gigRes] = await Promise.all([
          axiosInstance.get('/serviceProviders/profile'),
          axiosInstance.get(`/services/${id}`)
        ]);
        setProvider(providerRes.data);
        setFormData(gigRes.data);
      } catch (error) {
        setError('Failed to fetch data');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/services/update/${id}`, formData);
      navigate('/my-gigs');
    } catch (error) {
      setError('Failed to update service');
      console.error('Error:', error);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SellerNavbar />
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Edit Service Listing</h1>
            <p className="text-gray-600 mt-2">Update your service information</p>
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
                {/* Provider Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1">{provider?.fname} {provider?.lname}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <p className="mt-1">{provider?.locality}</p>
                  </div>
                </div>

                {/* Service Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <div className="relative">
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Base Price (₹)</label>
                  <input
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                    min="0"
                  />
                </div>
              </div>
            )}

            {/* Description Section */}
            {activeSection === 'description' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                    placeholder="Describe your service in detail..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Skills</label>
                  <textarea
                    value={formData.specialSkills}
                    onChange={(e) => setFormData({...formData, specialSkills: e.target.value})}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                    placeholder="List your special skills..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <textarea
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                    placeholder="Describe your experience..."
                  />
                </div>
              </div>
            )}

            {/* Other sections remain similar to GigCreate.jsx */}
            {/* ... */}

          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            <button 
              onClick={() => navigate('/my-gigs')}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
            >
              Update Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditGig;