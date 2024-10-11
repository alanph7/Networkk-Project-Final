import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import UserSignUp from "./pages/User/UserSignUp";
import SellerSignUp from "./pages/Seller/SellerSignUp";
import LogIn from "./pages/LogIn";
import UserLog from "./pages/User/UserLog";
import AdminLog from "./pages/Admin/AdminLog";
import SellerLog from "./pages/Seller/SellerLog";
import SellerAuth from "./pages/Seller/SellerAuth";
import UserAuth from "./pages/User/UserAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user-signup" element={<UserSignUp />} />
        <Route path="/seller-signup" element={<SellerSignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/user-login" element={<UserLog />} />
        <Route path="/admin-login" element={<AdminLog />} />
        <Route path="/seller-login" element={<SellerLog />} />
        <Route path="/seller-auth" element={<SellerAuth />} />
        <Route path="/user-auth" element={<UserAuth />} />
      </Routes>
    </Router>
  );
}

export default App;
