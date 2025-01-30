import React, { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';

const LocationTest = () => {
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
    locality: ''
  });

  const handlePlaceSelected = (place) => {
    const locality = place.formatted_address;
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();

    setLocation({
      latitude,
      longitude,
      locality
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Location Test</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Location
          </label>
          <Autocomplete
            apiKey="AIzaSyDjLpn8fDYOJJ9Yj7PVsJzslIiVfk2iiHg"
            onPlaceSelected={handlePlaceSelected}
            options={{
              componentRestrictions: { country: "in" },
              types: ["geocode", "establishment"],
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Selected Location Details:</h3>
            <p><span className="font-medium">Latitude:</span> {location.latitude}</p>
            <p><span className="font-medium">Longitude:</span> {location.longitude}</p>
            <p><span className="font-medium">Locality:</span> {location.locality}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationTest;