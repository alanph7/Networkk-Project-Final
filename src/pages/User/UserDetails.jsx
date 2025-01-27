import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";

const UserDetailsForm = () => {
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
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/users/d/me');
        const userData = response.data;
        setFormData({
          fname: userData.fname || "",
          lname: userData.lname || "",
          address: userData.address || "",
          latitude: userData.latitude || "",
          longitude: userData.longitude || "",
          locality: userData.locality || "",
          phone: userData.phone || "",
          username: userData.username || "",
          aadhaar: userData.aadhaar || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axiosInstance.put("/users/profile", formData);
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response?.data?.error || "Failed to update profile");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset form data to original values
    fetchUserData();
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="text-xl">Loading...</div>
    </div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Profile</h2>
        {!isEditing && (
          <button
            onClick={handleEditClick}
            className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
          >
            Edit Profile
          </button>
        )}
      </div>

      {message && (
        <div className={`p-4 mb-4 rounded ${
          message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {message}
        </div>
      )}

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
              className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 
                ${!isEditing ? 'bg-gray-100' : ''} 
                ${errors.fname ? 'border-red-500' : 'border-gray-300'}`}
              readOnly={!isEditing}
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
              className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 
                ${!isEditing ? 'bg-gray-100' : ''} 
                ${errors.lname ? 'border-red-500' : 'border-gray-300'}`}
              readOnly={!isEditing}
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
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 
              ${!isEditing ? 'bg-gray-100' : ''} 
              ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
            readOnly={!isEditing}
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
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 
              ${!isEditing ? 'bg-gray-100' : ''} 
              ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            readOnly={!isEditing}
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
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 
              ${!isEditing ? 'bg-gray-100' : ''} 
              ${errors.locality ? 'border-red-500' : 'border-gray-300'}`}
            readOnly={!isEditing}
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
              className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 
                ${!isEditing ? 'bg-gray-100' : ''} 
                ${errors.latitude ? 'border-red-500' : 'border-gray-300'}`}
              readOnly={!isEditing}
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
              className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 
                ${!isEditing ? 'bg-gray-100' : ''} 
                ${errors.longitude ? 'border-red-500' : 'border-gray-300'}`}
              readOnly={!isEditing}
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
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 
              ${!isEditing ? 'bg-gray-100' : ''} 
              ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            readOnly={!isEditing}
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
            className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 
              ${!isEditing ? 'bg-gray-100' : ''} 
              ${errors.aadhaar ? 'border-red-500' : 'border-gray-300'}`}
            readOnly={!isEditing}
            placeholder="Enter your Aadhaar number"
          />
          {errors.aadhaar && <p className="text-red-500 text-sm mt-1">{errors.aadhaar}</p>}
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700"
            >
              Update Details
            </button>
            <button
              type="button"
              onClick={handleCancelClick}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserDetailsForm;
