import { useState } from 'react';

const Pay = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = () => {
    setIsLoading(true);
    window.location.href = 'https://razorpay.me/@networkk';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Payment Amount: ₹1</h2>
        <button 
          className={`px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md 
          hover:bg-blue-700 transition-colors duration-200 ease-in-out 
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:ring-opacity-50 text-lg font-semibold
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePayment}
          disabled={isLoading}
        >
          {isLoading ? 'Redirecting...' : 'Pay ₹1'}
        </button>
        <p className="text-sm text-gray-600">
          Please enter ₹1 on the payment page
        </p>
      </div>
    </div>
  );
};

export default Pay;