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


// import { useState, useEffect } from 'react';
// import axiosInstance from '../../utils/axios';

// const ServiceImages = () => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         setLoading(true);
//         const response = await axiosInstance.get(`services/images/SR01`);
        
//         // Convert base64 strings to image URLs
//         const imageUrls = response.data.images.map(base64String => 
//           `data:image/jpeg;base64,${base64String}`
//         );
        
//         setImages(imageUrls);
//       } catch (err) {
//         console.error('Error fetching images:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//       fetchImages();
    
//   }, []);

//   if (loading) return (
//     <div className="flex justify-center items-center h-48">
//       <p>Loading images...</p>
//     </div>
//   );

//   if (error) return (
//     <div className="text-red-500">
//       Error loading images: {error}
//     </div>
//   );

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//       {images.length === 0 ? (
//         <p className="col-span-full text-center text-gray-500">No images found</p>
//       ) : (
//         images.map((imageUrl, index) => (
//           <div key={index} className="relative aspect-square">
//             <img 
//               src={imageUrl} 
//               alt={`Service image ${index + 1}`}
//               className="w-full h-full object-cover rounded-lg shadow-md"
//               onError={(e) => {
//                 console.error('Image Load Error:', {
//                   url: imageUrl,
//                   error: e
//                 });
//                 e.target.src = '/placeholder-image.jpg'; // Add a placeholder image
//               }}
//             />
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ServiceImages;