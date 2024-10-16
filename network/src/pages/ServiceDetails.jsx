import React from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaCheck, FaClock, FaRedo, FaThumbsUp } from "react-icons/fa";

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
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
          <div className="flex items-center mb-4">
            <img src={service.sellerAvatar} alt={service.sellerName} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <p className="font-semibold">{service.sellerName}</p>
              <p className="text-sm text-gray-600">{service.sellerLevel}</p>
            </div>
          </div>
          <div className="mb-8">
            <img src="https://picsum.photos/seed/carpentry/800/400" alt="Service" className="w-full rounded-lg" />
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">About This Gig</h2>
            <p>{service.description}</p>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">About The Seller</h2>
            <div className="flex items-center mb-4">
              <img src={service.sellerAvatar} alt={service.sellerName} className="w-24 h-24 rounded-full mr-4" />
              <div>
                <p className="font-semibold">{service.sellerName}</p>
                <p className="text-sm text-gray-600">{service.sellerLevel}</p>
                <button className="mt-2 bg-gray-200 text-gray-800 py-1 px-4 rounded">Contact Me</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Languages</p>
                <p>{service.languages.join(", ")}</p>
              </div>
              <div>
                <p className="font-semibold">Skills</p>
                <p>{service.skills.join(", ")}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            {service.reviews.map(review => (
              <div key={review.id} className="mb-4 p-4 bg-gray-100 rounded">
                <p className="font-semibold">{review.user}</p>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                  ))}
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="sticky top-4 bg-white p-6 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">${service.price}</h2>
            <p className="text-gray-600 mb-4">{service.description.substring(0, 100)}...</p>
            <div className="flex justify-between mb-4">
              <span className="flex items-center"><FaClock className="mr-2" /> {service.responseTime} response time</span>
              <span className="flex items-center"><FaRedo className="mr-2" /> {service.lastDelivery}</span>
            </div>
            <ul className="mb-6">
              <li className="flex items-center mb-2"><FaCheck className="mr-2 text-green-500" /> Custom designs</li>
              <li className="flex items-center mb-2"><FaCheck className="mr-2 text-green-500" /> High-quality materials</li>
              <li className="flex items-center mb-2"><FaCheck className="mr-2 text-green-500" /> Revisions if needed</li>
            </ul>
            <button className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition duration-300">Continue (${service.price})</button>
            <p className="text-center mt-4 text-sm text-gray-600">You won't be charged yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}

