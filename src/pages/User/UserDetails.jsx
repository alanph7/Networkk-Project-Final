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
              placeholder="Enter latitude"
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
              placeholder="Enter longitude"
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

        

        <button
          type="submit"
          className="w-full bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-indigo-500"
          //onClick={handleSubmit}
        >
          Save Details
        </button>
      </form>
    </div>
  );
}


// import React, { useState } from "react";
// import { User, MapPin, Phone, CreditCard, AtSign } from "lucide-react";
// import axiosInstance from "../../utils/axios";

// export default function UserDetailsForm() {
//   const [formData, setFormData] = useState({
//     fname: "",
//     lname: "",
//     address: "",
//     latitude: "",
//     longitude: "",
//     locality: "",
//     phone: "",
//     username: "",
//     aadhaar: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//     // Clear error for this field when user starts typing
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: "",
//       });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.fname) newErrors.fname = "First name is required.";
//     if (!formData.lname) newErrors.lname = "Last name is required.";
//     if (!formData.phone) newErrors.phone = "Phone number is required.";
//     if (!formData.aadhaar) newErrors.aadhaar = "Aadhaar is required.";
//     if (!formData.address) newErrors.address = "Address is required.";
//     if (!formData.locality) newErrors.locality = "Locality is required.";
//     if (!formData.username) newErrors.username = "Username is required.";
//     if (formData.aadhaar && formData.aadhaar.length !== 12)
//       newErrors.aadhaar = "Aadhaar must be 12 digits.";
//     if (formData.latitude && isNaN(parseFloat(formData.latitude)))
//       newErrors.latitude = "Latitude must be a number.";
//     if (formData.longitude && isNaN(parseFloat(formData.longitude)))
//       newErrors.longitude = "Longitude must be a number.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     try {
//       const response = await axiosInstance.put("/users/profile", formData);
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage(error.response?.data?.error || "Failed to update profile.");
//     }
//   };

//   const FormField = React.memo(({ label, name, icon: Icon, type = "text", placeholder }) => (
//     <div className="space-y-2">
//       <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
//         <Icon className="h-4 w-4 text-gray-500" />
//         <span>{label}</span>
//       </label>
//       <input
//         type={type}
//         name={name}
//         value={formData[name]}
//         onChange={handleInputChange}
//         className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//           errors[name] 
//             ? "border-red-500 focus:border-red-500" 
//             : "border-gray-300 focus:border-indigo-500"
//         }`}
//         placeholder={placeholder}
//       />
//       {errors[name] && (
//         <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
//       )}
//     </div>
//   ));

//   return (
//     <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
//       <div className="px-6 py-8">
//         <div className="space-y-1 mb-8">
//           <h2 className="text-2xl font-bold text-center text-gray-900">
//             Complete Your Profile
//           </h2>
//           <p className="text-center text-gray-500">
//             Please fill in your details to continue
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {message && (
//             <div className={`p-4 rounded-lg ${
//               message.includes("Failed")
//                 ? "bg-red-50 text-red-700"
//                 : "bg-green-50 text-green-700"
//             }`}>
//               <p>{message}</p>
//             </div>
//           )}

//           <div className="grid md:grid-cols-2 gap-6">
//             <FormField
//               label="First Name"
//               name="fname"
//               icon={User}
//               placeholder="John"
//             />
//             <FormField
//               label="Last Name"
//               name="lname"
//               icon={User}
//               placeholder="Doe"
//             />
//           </div>

//           <FormField
//             label="Username"
//             name="username"
//             icon={AtSign}
//             placeholder="johndoe"
//           />

//           <div className="space-y-6">
//             <FormField
//               label="Address"
//               name="address"
//               icon={MapPin}
//               placeholder="123 Main St"
//             />
//             <FormField
//               label="Locality"
//               name="locality"
//               icon={MapPin}
//               placeholder="Downtown"
//             />
//           </div>

//           <div className="grid md:grid-cols-2 gap-6">
//             <FormField
//               label="Latitude"
//               name="latitude"
//               icon={MapPin}
//               placeholder="0.000000"
//             />
//             <FormField
//               label="Longitude"
//               name="longitude"
//               icon={MapPin}
//               placeholder="0.000000"
//             />
//           </div>

//           <div className="grid md:grid-cols-2 gap-6">
//             <FormField
//               label="Phone Number"
//               name="phone"
//               icon={Phone}
//               placeholder="+91 1234567890"
//             />
//             <FormField
//               label="Aadhaar Number"
//               name="aadhaar"
//               icon={CreditCard}
//               placeholder="123456789012"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-500 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             Save Profile Details
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }