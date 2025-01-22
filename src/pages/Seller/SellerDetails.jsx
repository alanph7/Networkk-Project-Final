import React, { useState } from "react";
import axiosInstance from "../../utils/axios";

export default function SellerDetailsForm() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    address: "",
    latitude: "",
    longitude: "",
    locality: "",
    phone: "",
    username: "",
    aadhaar: "",
    languages: [],
    skills: [],
    experience: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [newLanguage, setNewLanguage] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    console.log("Form data before validation:", formData); // Debug log
  
    const newErrors = {};
    if (!formData.fname) newErrors.fname = "First name is required.";
    if (!formData.lname) newErrors.lname = "Last name is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.aadhaar) newErrors.aadhaar = "Aadhaar is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.locality) newErrors.locality = "Locality is required.";
    if (!formData.username) newErrors.username = "Username is required.";
    if (formData.aadhaar && formData.aadhaar.length !== 12)
      newErrors.aadhaar = "Aadhaar must be 12 digits.";
    if (formData.latitude && isNaN(parseFloat(formData.latitude)))
      newErrors.latitude = "Latitude must be a number.";
    if (formData.longitude && isNaN(parseFloat(formData.longitude)))
      newErrors.longitude = "Longitude must be a number.";
    if (!formData.languages || formData.languages.length === 0) {
      newErrors.languages = "Please select at least one language";
    }
    
    if (!formData.skills || formData.skills.length === 0) {
      newErrors.skills = "Please select at least one skill";
    }
    
    if (!formData.experience) {
      newErrors.experience = "Experience is required";
    } else if (isNaN(formData.experience) || formData.experience < 0) {
      newErrors.experience = "Experience must be a positive number";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!validateForm()) {
        console.log("Validation failed:", errors);
        return;
    }
    try {
        const response = await axiosInstance.put("/serviceProviders/profile", formData);
        console.log("Response:", response.data); // Debug log
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error:", error.response?.data || error.message); // Debug log
        setMessage(error.response?.data?.error || "Failed to update profile.");
      }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* First Name and Last Name */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="fname"
              value={formData.fname}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none"
              placeholder="Enter your first name"
            />
            {errors.fname && <p className="text-red-500 text-sm mt-1">{errors.fname}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lname"
              value={formData.lname}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none"
              placeholder="Enter your last name"
            />
            {errors.lname && <p className="text-red-500 text-sm mt-1">{errors.lname}</p>}
          </div>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none"
            placeholder="Enter your username"
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none"
            placeholder="Enter your address"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        {/* Locality */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Locality</label>
          <input
            type="text"
            name="locality"
            value={formData.locality}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none"
            placeholder="Enter your locality"
          />
          {errors.locality && <p className="text-red-500 text-sm mt-1">{errors.locality}</p>}
        </div>

        {/* Latitude and Longitude */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Latitude</label>
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none"
              placeholder="Enter latitude"
            />
            {errors.latitude && <p className="text-red-500 text-sm mt-1">{errors.latitude}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Longitude</label>
            <input
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none"
              placeholder="Enter longitude"
            />
            {errors.longitude && <p className="text-red-500 text-sm mt-1">{errors.longitude}</p>}
          </div>
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Aadhaar */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Aadhaar</label>
          <input
            type="text"
            name="aadhaar"
            value={formData.aadhaar}
            onChange={handleInputChange}
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none ${
              errors.aadhaar ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your Aadhaar number"
          />
          {errors.aadhaar && <p className="text-red-500 text-sm mt-1">{errors.aadhaar}</p>}
        </div>

        {/* Languages Known */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Languages Known</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.languages.map((lang, index) => (
              <span key={index} className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm flex items-center">
                {lang}
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      languages: prev.languages.filter((_, i) => i !== index)
                    }))
                  }}
                  className="ml-2 text-sky-600 hover:text-sky-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="Add a language"
            />
            <button
              type="button"
              onClick={() => {
                if (newLanguage.trim()) {
                  setFormData(prev => ({
                    ...prev,
                    languages: [...prev.languages, newLanguage.trim()]
                  }));
                  setNewLanguage('');
                }
              }}
              className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700"
            >
              Add
            </button>
          </div>
          {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages}</p>}
        </div>

        {/* Skills */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Skills</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.skills.map((skill, index) => (
              <span key={index} className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm flex items-center">
                {skill}
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      skills: prev.skills.filter((_, i) => i !== index)
                    }))
                  }}
                  className="ml-2 text-sky-600 hover:text-sky-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="Add a skill"
            />
            <button
              type="button"
              onClick={() => {
                if (newSkill.trim()) {
                  setFormData(prev => ({
                    ...prev,
                    skills: [...prev.skills, newSkill.trim()]
                  }));
                  setNewSkill('');
                }
              }}
              className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700"
            >
              Add
            </button>
          </div>
          {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
        </div>

        {/* Years of Experience */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none"
            placeholder="Enter years of experience"
            min="0"
          />
          {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-sky-800"
          //onClick={handleSubmit}
        >
          Save Details
        </button>
      </form>
    </div>
  );
}
