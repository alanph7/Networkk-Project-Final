import React, { useState } from "react";
import axiosInstance from "../../utils/axios";

export default function UserDetailsForm() {
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
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

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
        const response = await axiosInstance.put("/users/profile", formData);
        console.log("Response:", response.data); // Debug log
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error:", error.response?.data || error.message); // Debug log
        setMessage(error.response?.data?.error || "Failed to update profile.");
      }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleInputChange}
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none ${
              errors.fname ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your first name"
          />
          {errors.fname && <p className="text-red-500 text-sm mt-1">{errors.fname}</p>}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleInputChange}
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none ${
              errors.lname ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your last name"
          />
          {errors.lname && <p className="text-red-500 text-sm mt-1">{errors.lname}</p>}
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

        

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500"
          //onClick={handleSubmit}
        >
          Save Details
        </button>
      </form>
    </div>
  );
}
