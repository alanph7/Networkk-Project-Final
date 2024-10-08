import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import UserSignUp from "./pages/User/UserSignUp";
import SellerSignUp from "./pages/Seller/SellerSignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user-signup" element={<UserSignUp />} />
        <Route path="/seller-signup" element={<SellerSignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
