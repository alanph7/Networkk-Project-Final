import React, { useState } from "react";
import { FaSearch, FaStar, FaMapMarkerAlt } from "react-icons/fa";

// Dummy data for service providers
const dummyServiceProviders = [
  {
    id: 1,
    name: "John Doe",
    type: "Carpenter",
    rating: 4.5,
    price: 50,
    distance: 5,
    availableDate: "2024-10-17",
    workers: 1,
  },
  {
    id: 2,
    name: "Jane Smith",
    type: "Carpenter",
    rating: 4.8,
    price: 60,
    distance: 3,
    availableDate: "2024-10-17",
    workers: 2,
  },
  {
    id: 3,
    name: "Bob Johnson",
    type: "Carpenter",
    rating: 4.2,
    price: 55,
    distance: 7,
    availableDate: "2024-10-17",
    workers: 1,
  },
  {
    id: 4,
    name: "Alice Brown",
    type: "Painter",
    rating: 4.7,
    price: 45,
    distance: 4,
    availableDate: "2024-10-18",
    workers: 3,
  },
  {
    id: 5,
    name: "Charlie Wilson",
    type: "Gardener",
    rating: 4.0,
    price: 40,
    distance: 6,
    availableDate: "2024-10-19",
    workers: 2,
  },
];

export default function Search() {
  const [filters, setFilters] = useState({
    date: "",
    type: "",
    sortBy: "rating",
    sortOrder: "desc",
    minPrice: "",
    maxPrice: "",
    maxDistance: "",
    minRating: "",
    name: "", // New filter for searching by name
  });

  const [filteredProviders, setFilteredProviders] = useState(
    dummyServiceProviders
  );
  const [error, setError] = useState("");

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = () => {
    if (!filters.date || !filters.type) {
      setError("Date and Type of Work are required");
      return;
    }
    setError("");

    let filtered = dummyServiceProviders.filter((provider) => {
      return (
        provider.type.toLowerCase().includes(filters.type.toLowerCase()) &&
        (!filters.minPrice || provider.price >= parseInt(filters.minPrice)) &&
        (!filters.maxPrice || provider.price <= parseInt(filters.maxPrice)) &&
        (!filters.maxDistance ||
          provider.distance <= parseInt(filters.maxDistance)) &&
        (!filters.minRating ||
          provider.rating >= parseFloat(filters.minRating)) &&
        (!filters.name ||
          provider.name.toLowerCase().includes(filters.name.toLowerCase()))
      );
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      if (filters.sortBy === "price") {
        return filters.sortOrder === "asc"
          ? a.price - b.price
          : b.price - a.price;
      } else if (filters.sortBy === "rating") {
        return b.rating - a.rating; // Always sort ratings in descending order
      } else if (filters.sortBy === "distance") {
        return filters.sortOrder === "asc"
          ? a.distance - b.distance
          : b.distance - a.distance;
      }
      return 0;
    });

    setFilteredProviders(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-8">
        <input
          type="text"
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          className="flex-grow border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          placeholder="What service are you looking for?"
        />
        <button
          onClick={applyFilters}
          className="bg-green-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-green-600"
        >
          <FaSearch />
        </button>
      </div>

      <div className="flex mb-8">
        <div className="w-1/4 pr-4">
          <h3 className="font-bold mb-4">Filters</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price Range
            </label>
            <div className="flex items-center">
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Min"
              />
              <span className="mx-2">-</span>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Max"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Search by Name
            </label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Provider name"
            />
          </div>
          {/* Add more filter options here */}
        </div>

        <div className="w-3/4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Services</h2>
            <div className="flex items-center">
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mr-2"
              >
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price</option>
                <option value="distance">Sort by Distance</option>
              </select>
              {filters.sortBy !== "rating" && (
                <select
                  name="sortOrder"
                  value={filters.sortOrder}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="asc">
                    {filters.sortBy === "price" ? "Low to High" : "Near to Far"}
                  </option>
                  <option value="desc">
                    {filters.sortBy === "price" ? "High to Low" : "Far to Near"}
                  </option>
                </select>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <div
                key={provider.id}
                className="border rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={`https://picsum.photos/seed/${provider.id}/300/200`}
                  alt={provider.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{provider.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{provider.type}</p>
                  <div className="flex items-center mb-2">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{provider.rating}</span>
                    <span className="mx-2">|</span>
                    <FaMapMarkerAlt className="text-gray-400 mr-1" />
                    <span>{provider.distance} km</span>
                  </div>
                  <p className="font-bold text-lg">${provider.price}/hr</p>
                  {provider.availableDate < filters.date && (
                    <p className="text-red-500 font-semibold mt-2">
                      Unavailable on selected date
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
