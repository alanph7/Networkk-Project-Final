import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';
import Collapsible from '@edonec/collapsible';
import '@edonec/collapsible/build/index.css';
import '@edonec/collapsible/build/icons.css';
const BookingsPage = () => {
  //const { user } = useUser();
  const [pendingBookings, setPendingBookings] = useState([]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [rejectedBookings, setRejectedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  

  // const fade = useSpring({
  //   from: { opacity: 0 },
  //   to: { opacity: 1 },
  // });

  return (
    <div className="BookingsPage">
  
          <div>
            <Collapsible open header={<div className="flex items-center"><FiClock className="mr-2" />Pending Bookings</div>}>
              <div className="section bg-white p-4 shadow-md rounded-md mb-4">
                {pendingBookings.length > 0 ? (
                  <ul>
                    {pendingBookings.map((booking) => (
                      <li key={booking.id} className="mb-4 p-4 border-b last:border-b-0">
                        <p className="font-semibold">Address: {booking.address}</p>
                        <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                        <p>Description: {booking.description}</p>
                        <p>Base Payment: {booking.basePayment}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No pending bookings found.</p>
                )}
              </div>
            </Collapsible>
            <Collapsible open header={<div className="flex items-center"><FiCheckCircle className="mr-2" />Accepted Bookings</div>}>
              <div className="section bg-white p-4 shadow-md rounded-md mb-4">
                {acceptedBookings.length > 0 ? (
                  <ul>
                    {acceptedBookings.map((booking) => (
                      <li key={booking.id} className="mb-4 p-4 border-b last:border-b-0">
                        <p className="font-semibold">Address: {booking.address}</p>
                        <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                        <p>Description: {booking.description}</p>
                        <p className="mb-2">Base Payment: {booking.basePayment}</p>
                        <button
                          className="bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700 transition duration-300"
                          onClick={() => handlePayment(booking)}
                        >
                          Pay Now
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No accepted bookings found.</p>
                )}
              </div>
            </Collapsible>
            <Collapsible open header={<div className="flex items-center"><FiXCircle className="mr-2" />Rejected Bookings</div>}>
              <div className="section bg-white p-4 shadow-md rounded-md mb-4">
                {rejectedBookings.length > 0 ? (
                  <ul>
                    {rejectedBookings.map((booking) => (
                      <li key={booking.id} className="mb-4 p-4 border-b last:border-b-0">
                        <p className="font-semibold">Address: {booking.address}</p>
                        <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                        <p>Description: {booking.description}</p>
                        <p>Base Payment: {booking.basePayment}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No rejected bookings found.</p>
                )}
              </div>
            </Collapsible>
          </div>
        
      </div>
    
  );
};

export default BookingsPage;