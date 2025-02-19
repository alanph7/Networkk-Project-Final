import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Camera, DollarSign, ChevronDown, X, Calendar } from 'lucide-react';
import axiosInstance from '../../utils/axios';
import SellerNavbar from '../../components/SellerNavbar';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import dayjs from "dayjs";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0ea5e9",
    },
  },
});

const EditGig = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const sections = {
    overview: 'Basic Info',
    pricing: 'Service Rates',
    description: 'Description',
    requirements: 'Requirements',
    availability: 'Availability'
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    basePrice: '',
    experience: '',
    specialSkills: '',
    tools: '',
    isOpen: true,
    holidays: []
  });

  // Fetch existing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [providerRes, gigRes, imagesRes] = await Promise.all([
          axiosInstance.get('/serviceProviders/profile'),
          axiosInstance.get(`/services/${id}`),
          axiosInstance.get(`/services/images/${id}`)
        ]);

        setProvider(providerRes.data);
        
        const gigData = gigRes.data;
        // Parse holidays from JSON
        let parsedHolidays = [];
        if (gigData.holidays) {
          try {
            // If it's a string, parse it, otherwise use the array
            parsedHolidays = typeof gigData.holidays === 'string' 
              ? JSON.parse(gigData.holidays)
              : gigData.holidays;
          } catch (e) {
            console.error('Error parsing holidays:', e);
            parsedHolidays = [];
          }
        }

        setFormData({
          title: gigData.title || '',
          description: gigData.description || '',
          category: gigData.category || '',
          basePrice: gigData.basePrice || '',
          experience: gigData.experience || '',
          specialSkills: gigData.specialSkills || '',
          tools: gigData.tools || '',
          isOpen: gigData.isOpen ?? true,
          holidays: Array.isArray(parsedHolidays) ? parsedHolidays : [] // Ensure it's an array
        });

        if (imagesRes.data.imageUrls) {
          setExistingImages(imagesRes.data.imageUrls);
        }

      } catch (error) {
        setError('Failed to fetch data');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validImageFiles = files.filter(file => 
      ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
    );
  
    if (validImageFiles.length + images.length + existingImages.length > 5) {
      alert('You can have a maximum of 5 images total');
      return;
    }
  
    const previews = validImageFiles.map(file => URL.createObjectURL(file));
    setImagePreview(prev => [...prev, ...previews]);
    setImages(prev => [...prev, ...validImageFiles]);
  };
  
  const removeImage = (indexToRemove, isExisting = false) => {
    if (isExisting) {
      setExistingImages(prev => prev.filter((_, index) => index !== indexToRemove));
    } else {
      setImages(prev => prev.filter((_, index) => index !== indexToRemove));
      setImagePreview(prev => prev.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataUpload = new FormData();
      
      const serviceData = {
        ...formData,
        serviceProviderId: provider.serviceProviderId,
        holidays: Array.isArray(formData.holidays) ? formData.holidays : [] // Ensure it's an array
      };

      formDataUpload.append('serviceData', JSON.stringify(serviceData));
      
      // Append new images
      images.forEach((image) => {
        formDataUpload.append('images', image);
      });

      // Add existing images to be kept
      formDataUpload.append('existingImages', JSON.stringify(existingImages));

      await axiosInstance.put(`/services/update/${id}`, formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

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
                  ? 'bg-sky-700 text-white'
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
                    <p className="mt-1">{provider?.fname} {provider?.lname}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <p className="mt-1">{provider?.locality}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact</label>
                    <p className="mt-1">{provider?.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1">{provider?.email}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Rates</label>
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={formData.basePrice}
                        onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">About Your Service</label>
                  <textarea
                    rows="6"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Requirements Section */}
            {activeSection === 'requirements' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Samples (Max 5 images)
                  </label>
                  <div className="grid grid-cols-5 gap-4">
                    {existingImages.map((url, index) => (
                      <div key={`existing-${index}`} className="relative">
                        <img 
                          src={url} 
                          alt={`Existing ${index + 1}`} 
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button 
                          onClick={() => removeImage(index, true)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    {imagePreview.map((preview, index) => (
                      <div key={`new-${index}`} className="relative">
                        <img 
                          src={preview} 
                          alt={`Preview ${index + 1}`} 
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button 
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    {(existingImages.length + imagePreview.length) < 5 && (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-24">
                        <label className="cursor-pointer">
                          <input 
                            type="file" 
                            multiple 
                            accept="image/jpeg,image/png,image/gif"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <Camera className="text-gray-400" />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Availability Section */}
            {activeSection === 'availability' && (
              <div className="space-y-6">
                <ThemeProvider theme={theme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* Service Status Toggle */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Service Status</h3>
                        <p className="text-sm text-gray-500">Enable or disable your service listing</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.isOpen}
                          onChange={(e) => setFormData({...formData, isOpen: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                      </label>
                    </div>

                    {/* Holiday Management */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="inline-block w-4 h-4 mr-2" />
                          Add Holiday Dates
                        </label>
                        <DatePicker
                          label="Select Holiday Date"
                          value={null}
                          onChange={(newDate) => {
                            if (newDate) {
                              const dateStr = dayjs(newDate).format('YYYY-MM-DD');
                              const currentHolidays = Array.isArray(formData.holidays) ? formData.holidays : [];
                              if (!currentHolidays.includes(dateStr)) {
                                setFormData({
                                  ...formData,
                                  holidays: [...currentHolidays, dateStr]
                                });
                              }
                            }
                          }}
                          minDate={dayjs()}
                          className="w-full"
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              sx: { marginBottom: 2 }
                            },
                          }}
                        />
                      </div>

                      {/* Display Selected Holidays */}
                      {Array.isArray(formData.holidays) && formData.holidays.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Holidays</h4>
                          <div className="flex flex-wrap gap-2">
                            {formData.holidays.map((date, index) => (
                              <div
                                key={index}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full"
                              >
                                <span className="text-sm">
                                  {dayjs(date).format('DD MMM YYYY')}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updatedHolidays = formData.holidays.filter((_, i) => i !== index);
                                    setFormData({
                                      ...formData,
                                      holidays: updatedHolidays
                                    });
                                  }}
                                  className="text-gray-500 hover:text-red-500"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </LocalizationProvider>
                </ThemeProvider>
              </div>
            )}
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
              className="px-6 py-2 bg-sky-700 text-white rounded-lg hover:bg-sky-600"
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