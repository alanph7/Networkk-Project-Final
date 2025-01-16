import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { DashboardProvider } from './context/DashboardContext';

import Home from "./pages/Home";
import Search from "./pages/Search";
import ServiceDetails from "./pages/ServiceDetails";
import Navbar from "./components/nav";

import AdminLog from "./pages/Admin/AdminLog";

import SellerAuth from "./pages/Seller/SellerAuth";
import GigCreate from "./pages/Seller/GigCreate";

import UserAuth from "./pages/User/UserAuth";
import BookingsPage from "./pages/User/BookingPage";
import Booking from "./pages/User/Booking";
import Payment from "./pages/User/Payment";
import Dashboard from "./pages/SellerDashboard";
import UserDashboard from "./pages/UserDashboard";
import UserDetailsForm from "./pages/User/UserDetails";


function App() {
  return (
    <DashboardProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-login" element={<AdminLog />} />
          <Route path="/seller-auth" element={<SellerAuth />} />
          <Route path="/user-auth" element={<UserAuth />} />
          <Route path="/search" element={<Search />} />
          <Route path="/service" element={<ServiceDetails />} />
          <Route path="/user-booking-status" element={<BookingsPage />} />
          <Route path="/user-booking" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/gigcreate" element={<GigCreate />} />
          <Route path="/seller-dash" element={<Dashboard />} />
          <Route path="/user-dash" element={<UserDashboard />} />
          <Route path="/user-details" element={<UserDetailsForm />} />
        </Routes>
      </div>
    </Router>
    </DashboardProvider>
  );
}

export default App;
