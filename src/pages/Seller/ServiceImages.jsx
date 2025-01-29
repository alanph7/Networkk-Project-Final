import axiosInstance from "../../utils/axios";
import { useState, useEffect } from "react";

const ServiceImages = ({ serviceId }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceImages = async () => {
      try {
        const response = await axiosInstance.get(`/services/images/SR02`);
        console.log('Raw Image URLs:', response.data.imageUrls);
        
        // Validate and clean URLs
        const validUrls = response.data.imageUrls.filter(url => {
          console.log('Checking URL:', url);
          return url && typeof url === 'string' && url.trim() !== '';
        });

        console.log('Validated Image URLs:', validUrls);
        setImages(validUrls);
      } catch (error) {
        console.error('Fetch Images Error:', error);
        setError(error.message);
      }
    };

    fetchServiceImages();
  }, [serviceId]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="service-images flex space-x-2">
      {images.length === 0 ? (
        <p>No images found</p>
      ) : (
        images.map((url, index) => (
          <img 
            key={index} 
            src={url} 
            alt={`Service image ${index + 1}`} 
            className="w-80 h-80 object-cover"
            onError={(e) => {
              console.error('Image Load Error:', {
                url,
                errorEvent: e
              });
              e.target.style.display = 'none';
            }}
          />
          
        ))
      )}
     {/* <img className="w-48 h-48 object-cover" src="http://localhost:9000/work-images/SP01/SR01/1737818657784-networkk.jpg" alt="img" /> */}
    </div>
  );
};

  export default ServiceImages;


