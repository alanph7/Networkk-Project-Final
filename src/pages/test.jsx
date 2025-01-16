import { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";




 const Test = () => {
    const [user, setUser ] = useState(null);
    const [error, setError ] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await axiosInstance.get('/users/');
            setUser(response.data);
          } catch (error) {
            setError(error.response?.data?.error || 'Failed to fetch user details');
          }
        };
    
        fetchUser();
      }, []);
    
      if (error) {
        return <p className="text-red-500">{error}</p>;
      }
    
      if (user) {
        return <p>{user.fname}</p>;
      }

 }

 export default Test;