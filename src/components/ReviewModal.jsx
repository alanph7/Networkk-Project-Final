import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewModal = ({ isOpen, onClose, onSubmit, booking }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, description });
    setRating(0);
    setDescription('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
        <form onSubmit={handleSubmit}>
          {/* Star Rating */}
          <div className="flex items-center mb-4">
            <span className="text-gray-600 mr-2">Rating:</span>
            <div className="flex">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <FaStar
                    key={index}
                    className="cursor-pointer"
                    size={24}
                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    onClick={() => setRating(ratingValue)}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(rating)}
                  />
                );
              })}
            </div>
          </div>

          {/* Review Description */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Review:</label>
            <textarea
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your review here..."
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!rating}
              className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;