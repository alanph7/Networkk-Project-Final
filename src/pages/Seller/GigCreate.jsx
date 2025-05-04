import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  DollarSign,
  Clock,
  ChevronDown,
  MapPin,
  Phone,
  X,
} from "lucide-react";
import axiosInstance from "../../utils/axios";
import SellerNavbar from "../../components/SellerNavbar";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0ea5e9", // matches Tailwind's sky-500
    },
  },
});

export default function GigCreate() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const sections = {
    overview: "Basic Info",
    pricing: "Service Rates",
    description: "Description",
    requirements: "Requirements",
    availability: "Availability", // Add this new section
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    basePrice: "",
    experience: "",
    specialSkills: "",
    tools: "",
    // holidays: {
    //   dates: []
    // },
    isOpen: true,
    holidays: [],
  });

  // Fetch provider details
  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const response = await axiosInstance.get("/serviceProviders/profile");
        setProvider(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch provider details:", error);
        setLoading(false);
      }
    };
    fetchProviderDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataUpload = new FormData();

      // Append service data
      const serviceData = {
        ...formData,
        serviceProviderId: provider.serviceProviderId,
        holidays: formData.holidays, // Add holidays array
        isOpen: formData.isOpen, // Add service status
      };

      // Convert serviceData to JSON and append
      formDataUpload.append("serviceData", JSON.stringify(serviceData));

      // Append images
      images.forEach((image) => {
        formDataUpload.append("images", image);
      });

      const response = await axiosInstance.post(
        "/services/create",
        formDataUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/my-gigs");
    } catch (error) {
      console.error("Error creating service:", error);
      // Show error to user
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validImageFiles = files.filter((file) =>
      ["image/jpeg", "image/png", "image/gif"].includes(file.type)
    );

    if (validImageFiles.length + images.length > 5) {
      alert("You can upload a maximum of 5 images");
      return;
    }

    // Create preview URLs
    const previews = validImageFiles.map((file) => URL.createObjectURL(file));
    setImagePreview((prev) => [...prev, ...previews]);
    setImages((prev) => [...prev, ...validImageFiles]);
    console.log(images);
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    setImagePreview((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SellerNavbar />
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Create Service Listing
            </h1>
            <p className="text-gray-600 mt-2">
              List your professional services in the marketplace
            </p>
          </div>

          {/* Navigation Pills */}
          <div className="flex space-x-2 mb-8 overflow-x-auto">
            {Object.entries(sections).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeSection === key
                    ? "bg-sky-800 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {value}
              </button>
            ))}
          </div>

          {/* Content Sections */}
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
            {/* Overview Section */}
            {activeSection === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <p className="mt-1">
                      {provider.fname} {provider.lname}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <p className="mt-1">{provider.locality}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Contact
                    </label>
                    <p className="mt-1">{provider.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
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
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
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
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Carpentry">Carpentry</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Painting">Painting</option>
                      <option value="Gardening">Gardening</option>
                      <option value="Babysitting">Babysitting</option>
                      <option value="Cooking">Cooking</option>
                      <option value="Moving">Moving</option>
                      <option value="Computer Repair">Computer Repair</option>
                      <option value="Appliance Repair">Appliance Repair</option>
                      <option value="Photography">Photography</option>
                      <option value="Makeup & Beauty">Makeup & Beauty</option>
                      <option value="Hair Styling">Hair Styling</option>
                      <option value="Massage Therapy">Massage Therapy</option>
                      <option value="Pet Grooming">Pet Grooming</option>
                      <option value="Dog Walking">Dog Walking</option>
                      <option value="Pest Control">Pest Control</option>
                      <option value="Handyman">Handyman</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            )}

            {/* Pricing Section */}
            {activeSection === "pricing" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Rates
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                    <span className="absolute left-4 top-2 text-gray-400">₹</span>
                      <input
                        type="number"
                        value={formData.basePrice}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            basePrice: e.target.value,
                          })
                        }
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
            {activeSection === "description" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About Your Service
                  </label>
                  <textarea
                    rows="6"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="Describe your experience, expertise, and the services you provide..."
                  />
                </div>
              </div>
            )}

            {/* Requirements Section */}
            {activeSection === "requirements" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Samples (Max 5 images)
                  </label>
                  <div className="grid grid-cols-5 gap-4">
                    {imagePreview.map((preview, index) => (
                      <div key={index} className="relative">
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
                    {imagePreview.length < 5 && (
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
            {activeSection === "availability" && (
              <div className="space-y-6">
                <ThemeProvider theme={theme}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* Service Status Toggle */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Service Status
                        </h3>
                        <p className="text-sm text-gray-500">
                          Enable or disable your service listing
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.isOpen}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              isOpen: e.target.checked,
                            })
                          }
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
                              const dateStr =
                                dayjs(newDate).format("YYYY-MM-DD");
                              if (!formData.holidays.includes(dateStr)) {
                                setFormData({
                                  ...formData,
                                  holidays: [...formData.holidays, dateStr],
                                });
                              }
                            }
                          }}
                          minDate={dayjs()}
                          className="w-full"
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              sx: { marginBottom: 2 },
                            },
                          }}
                        />
                      </div>

                      {/* Display Selected Holidays */}
                      {formData.holidays.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Selected Holidays
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {formData.holidays.map((date, index) => (
                              <div
                                key={index}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full"
                              >
                                <span className="text-sm">
                                  {dayjs(date).format("DD MMM YYYY")}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData({
                                      ...formData,
                                      holidays: formData.holidays.filter(
                                        (_, i) => i !== index
                                      ),
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
              onClick={() => navigate("/seller/services")}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-sky-800 text-white rounded-lg hover:bg-sky-600"
            >
              Create Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
