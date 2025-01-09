import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";  // Import Axios instance

export default function UserAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const toggleView = () => {
    setIsLogin(!isLogin);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      if (isLogin) {
        // Login request
        const response = await axiosInstance.post('/users/signin', {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        // Signup request
        const response = await axiosInstance.post('/users/signup', {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('token', response.data.token);
        navigate('/');
      }
    } catch (error) {
      // Handle error properly
      if (error.response) {
        console.error('Error during authentication:', error.response.data);
      } else if (error.request) {
        console.error('No response from server:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  };
  

  return (
    <section className="h-screen overflow-hidden">
      <div className="h-full px-12 py-12 lg:px-16 relative">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* Image container */}
          <div
            className={`shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 transition-all duration-500 ease-in-out absolute z-20 ${
              isLogin ? "left-[calc(0%+32px)]" : "left-[calc(50%-32px)]"
            }`}
          >
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          {/* Form container */}
          <div
            className={`mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 transition-all duration-500 ease-in-out absolute z-10 ${
              isLogin ? "left-[calc(50%+48px)]" : "left-[calc(0%+80px)]"
            }`}
          >
            <form
              className="bg-white p-8 rounded-lg shadow-lg"
              onSubmit={(e) => {
                e.preventDefault(); // Prevent default form submission
                handleSubmit();     // Call handleSubmit to send API request
              }}
            >
              {/* Log in as Seller button */}
              <button
                type="button"
                onClick={() => navigate("/seller-auth")}
                className="w-full mb-4 py-2.5 px-7 text-sm font-medium uppercase leading-normal text-white bg-blue-600 rounded shadow-md"
              >
                Log in as Seller
              </button>

              {/* Sign in/up section */}
              <div className="flex flex-col items-center justify-center mb-6">
                <p className="mb-4 text-lg">
                  {isLogin ? "Sign in with" : "Sign up with"}
                </p>
              </div>

              {/* Username input (only for sign-up) */}
              {/* {!isLogin && (
                <div className="relative mb-6">
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="username"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Username
                  </label>
                </div>
              )} */}

              {/* Email input */}
              <div className="relative mb-6">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Email address
                </label>
              </div>

              {/* Password input */}
              <div className="relative mb-6">
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Password
                </label>
              </div>

              {/* Submit button */}
              <div className="flex flex-col items-center justify-center mt-6">
                <button
                  type="submit"
                  className="inline-block rounded bg-blue-600 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-md"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </button>

                {/* Toggle link */}
                <p className="mb-0 mt-4 pt-1 text-sm font-semibold">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                  <a
                    href="#!"
                    onClick={toggleView}
                    className="text-red-600 transition duration-150 ease-in-out hover:text-red-700 focus:text-red-700 active:text-red-800"
                  >
                    {isLogin ? "Register" : "Login"}
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
