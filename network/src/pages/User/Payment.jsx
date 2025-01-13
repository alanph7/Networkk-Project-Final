import React, { useState } from 'react';
import { CreditCard, Clock, Shield } from 'lucide-react';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  const service = {
    title: "Door Fix",
    description: "Bathroom door fix, door handle replacement, and door lock repair.",
    price: 500
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
                  <div className="w-5 h-5 mr-3 text-gray-600">G</div>
                  <div>
                    <h3 className="font-medium">Upi</h3>
                    <p className="text-sm text-gray-500">Connect your Upi account</p>
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
              <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
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
    </div>
  );
};

export default PaymentPage;