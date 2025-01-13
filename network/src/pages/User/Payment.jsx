import React, { useState } from 'react';
import { CreditCard, Clock, Shield, X } from 'lucide-react';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showModal, setShowModal] = useState(false);

  const service = {
    title: "Door Fixing Service",
    description: "Bathroom door was fixed ",
    price: 500
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    alert('Payment submitted successfully!');
  };

  const Modal = ({ onClose, children }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );

  const CreditCardForm = () => (
    <>
      <h2 className="text-xl font-semibold mb-6">Enter Card Details</h2>
      <form onSubmit={handlePaymentSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <input
              type="text"
              placeholder="123"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cardholder Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors mt-6"
        >
          Pay Rs {(service.price * 1.05).toFixed(2)}
        </button>
      </form>
    </>
  );

  const UPIForm = () => (
    <>
      <h2 className="text-xl font-semibold mb-6">Enter UPI Details</h2>
      <form onSubmit={handlePaymentSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            UPI ID
          </label>
          <input
            type="text"
            placeholder="yourname@upi"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <p className="text-sm text-gray-500">
          Please enter your UPI ID to proceed with the payment
        </p>
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors mt-6"
        >
          Pay Rs {(service.price * 1.05).toFixed(2)}
        </button>
      </form>
    </>
  );

  const handleProceedToPayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method first');
      return;
    }
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Order Summary */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{service.title}</h3>
                  <p className="text-sm text-gray-500">{service.description}</p>

                </div>
                <span className="font-medium">Rs {service.price}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-3 text-gray-600" />
                  <div>
                    <h3 className="font-medium">Credit & Debit Cards</h3>
                    <p className="text-sm text-gray-500">Visa, Mastercard, RuPay</p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('upi')}
              >
                <div className="flex items-center">
                  <div className="w-5 h-5 mr-3 text-gray-600">U</div>
                  <div>
                    <h3 className="font-medium">UPI</h3>
                    <p className="text-sm text-gray-500">Pay using UPI ID</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Details */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span>Rs {service.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Service Fee</span>
                <span>Rs {(service.price * 0.05).toFixed(2)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center font-medium">
                  <span>Total</span>
                  <span>Rs {(service.price * 1.05).toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={handleProceedToPayment}
                className="w-full bg-sky-500 text-white py-3 rounded-lg font-medium hover:bg-sky-600 transition-colors"
              >
                Confirm & Pay
              </button>
              <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
                <Shield className="w-4 h-4 mr-2" />
                SSL Secure Payment
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {paymentMethod === 'card' && <CreditCardForm />}
          {paymentMethod === 'upi' && <UPIForm />}
        </Modal>
      )}
    </div>
  );
};

export default PaymentPage;