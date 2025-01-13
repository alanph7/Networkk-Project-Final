import React, { useState } from 'react';
import { Camera, DollarSign, Clock, ChevronDown, MapPin, Phone } from 'lucide-react';

const ServiceListingPage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  
  const sections = {
    overview: 'Basic Info',
    pricing: 'Service Rates',
    description: 'Description',
    requirements: 'Requirements',
    gallery: 'Portfolio'
  };

  const serviceCategories = [
    'Carpenter',
    'Electrician',
    'Plumber',
    'Painter',
    'House Cleaning',
    'AC Repair',
    'Home Appliance Repair',
    'Mason',
    'Tile Work',
    'Interior Work'
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="Your contact number"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Category
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-sky-500 focus:border-transparent">
                    <option>Select your service type</option>
                    {serviceCategories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Area
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Areas you serve (e.g., Downtown, North Side)"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
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
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        placeholder="Minimum service charge"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      />
                    </div>
                    <span className="text-gray-500">per visit</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        placeholder="Hourly rate (optional)"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      />
                    </div>
                    <span className="text-gray-500">per hour</span>
                  </div>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="Describe your experience, expertise, and the services you provide..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience
                </label>
                <input
                  type="number"
                  placeholder="Years of experience"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Skills
                </label>
                <input
                  type="text"
                  placeholder="E.g., Modern designs, Smart home systems, etc."
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
                  Information Required from Customers
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="What information do you need from customers before starting the work? (e.g., type of repair, property details)"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tools & Equipment
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="List the tools and equipment you bring with you"
                ></textarea>
              </div>
            </div>
          )}

          {/* Gallery Section */}
          {activeSection === 'gallery' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-gray-500 hover:border-sky-500 hover:text-sky-500 cursor-pointer">
                  <Camera className="w-8 h-8 mb-2" />
                  <span className="text-sm">Add Work Sample</span>
                </div>
                {/* Placeholder for uploaded images */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative aspect-video bg-gray-100 rounded-lg">
                    <img src={`/api/placeholder/400/300`} alt={`Work sample ${i}`} className="rounded-lg w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Add photos of your previous work to showcase your skills and build trust with customers.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Save as Draft
          </button>
          <button className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">
            Publish Listing
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceListingPage;