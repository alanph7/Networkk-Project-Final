import React from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaCheck, FaClock, FaRedo, FaThumbsUp, FaHeart } from "react-icons/fa";

// Dummy data for the service
const serviceData = {
  id: 1,
  title: "I will do professional carpentry work for your home",
  rating: 4.9,
  reviewCount: 189,
  ordersInQueue: 12,
  price: 50,
  description: "As an experienced carpenter with over 10 years in the field, I offer top-notch carpentry services for your home. From custom furniture to intricate woodwork, I ensure quality craftsmanship and attention to detail in every project.",
  sellerName: "JohnDoeWoodworks",
  sellerAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
  sellerLevel: "Level 2 Seller",
  responseTime: "1 hour",
  lastDelivery: "about 2 hours",
  languages: ["English", "Spanish"],
  skills: ["Woodworking", "Furniture Design", "Home Improvement"],
  reviews: [
    { id: 1, user: "Alice", rating: 5, comment: "Excellent work! Very professional and timely." },
    { id: 2, user: "Bob", rating: 4, comment: "Good quality, but took a bit longer than expected." },
  ]
};

export default function ServiceDetails() {
  const { id } = useParams();
  // In a real app, you'd fetch the service data based on the id
  const service = serviceData;

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
          <div className="flex items-center mb-6">
            <img src={service.sellerAvatar} alt={service.sellerName} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <p className="font-semibold">{service.sellerName}</p>
              <div className="flex items-center">
                <p className="text-sm text-gray-600 mr-2">{service.sellerLevel}</p>
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-semibold">{service.rating}</span>
                  <span className="text-gray-600 ml-1">({service.reviewCount})</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8 relative">
            <img src="https://picsum.photos/seed/carpentry/800/400" alt="Service" className="w-full rounded-lg shadow-lg" />
            <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
              <FaHeart className="text-red-500" />
            </button>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">About This Gig</h2>
            <p className="text-gray-700 leading-relaxed">{service.description}</p>
          </div>
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">About The Seller</h2>
            <div className="flex items-center mb-4">
              <img src={service.sellerAvatar} alt={service.sellerName} className="w-24 h-24 rounded-full mr-6" />
              <div>
                <p className="font-semibold text-lg">{service.sellerName}</p>
                <p className="text-gray-600 mb-2">{service.sellerLevel}</p>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">Contact Me</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <p className="font-semibold mb-2">Languages</p>
                <p className="text-gray-700">{service.languages.join(", ")}</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Skills</p>
                <p className="text-gray-700">{service.skills.join(", ")}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            {service.reviews.map(review => (
              <div key={review.id} className="mb-6 p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {review.user[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{review.user}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-4 bg-white p-6 border rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">${service.price}</h2>
            <p className="text-gray-600 mb-6">{service.description.substring(0, 100)}...</p>
            <div className="flex justify-between mb-6 text-sm">
              <span className="flex items-center"><FaClock className="mr-2 text-gray-500" /> {service.responseTime} response time</span>
              <span className="flex items-center"><FaRedo className="mr-2 text-gray-500" /> {service.lastDelivery}</span>
            </div>
            <ul className="mb-6">
              <li className="flex items-center mb-3"><FaCheck className="mr-3 text-green-500" /> Custom designs</li>
              <li className="flex items-center mb-3"><FaCheck className="mr-3 text-green-500" /> High-quality materials</li>
              <li className="flex items-center mb-3"><FaCheck className="mr-3 text-green-500" /> Revisions if needed</li>
            </ul>
            <button className="w-full bg-green-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-600 transition duration-300 mb-4">
              Continue (${service.price})
            </button>
            <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-bold text-lg hover:bg-gray-300 transition duration-300">
              Contact Seller
            </button>
            <p className="text-center mt-4 text-sm text-gray-600">You won't be charged yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
