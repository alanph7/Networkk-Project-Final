import freelancerImg from '../images/Freelance-worker.jpg';
import brickwork from '../images/brickwork.png';
import carpenter from '../images/carpenter.jpg';
import carpentericon from '../images/carpentericon.png';
import freelance from '../images/Freelance-worker.jpg';
import homerepair from '../images/home repair icon.png';
import painter from '../images/Painter.jpg';
import voltmeter from '../images/voltmeter.png';
import plumbericon from '../images/plumbericon.png';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiAntdesign, SiLinkedin } from "react-icons/si";
import { BsFacebook, BsGithub, BsGlobe, BsInstagram, BsTwitterX, BsYoutube, BsSearch, BsPeople, BsChatDots, BsHandThumbsUp } from "react-icons/bs";
import { SlArrowDown } from "react-icons/sl";
import { toast } from 'react-toastify';
import Navbar from '../components/nav';

// const Home = () => {
//   const TwoColumnSection = () => {
//     return (
//       <div className="flex flex-wrap justify-between items-center mb-20 mt-20 p-5 lg:pl-20">
//         <div className="w-full md:w-1/2 lg:w-auto lg:flex-1 lg:pr-10">
//           <h4 className="text-2xl font-bold mb-4">Discover</h4>
//           <h1 className="text-4xl font-bold mb-6">
//             Find Skilled Workers and <br />
//             Offer Your Services
//           </h1>
//           <div className="btn flex">
//             <button className="px-8 py-4 bg-black text-white rounded-lg mr-4">
//               <a href="/user-auth">Get Started</a>
//             </button>
//             <button className="px-8 py-4 bg-white border-2 border-blue-gray-700 text-black rounded-lg hover:bg-gray-200 ml-4">
//               Learn more
//             </button>
//           </div>
//         </div>
//         <div className="w-full md:w-1/2 lg:w-auto lg:flex-1 lg:pl-10 mt-8 lg:mt-0">
//           <ul>
//             <li className="mb-4">
//               <div className="flex">
//                 <SiAntdesign className="mt-1 mr-6" />
//                 <h2 className="text-lg font-bold mb-2">Step 1</h2>
//               </div>
//               <p className="ml-10">Search for skilled workers in your area using our map-based technology.</p>
//             </li>
//             <li className="mb-4">
//               <div className="flex">
//                 <SiAntdesign className="mt-1 mr-6" />
//                 <h2 className="text-lg font-bold mb-2">Step 2</h2>
//               </div>
//               <p className="ml-10">Signup and choose the skilled person you want to hire.</p>
//             </li>
//             <li className="mb-4">
//               <div className="flex">
//                 <SiAntdesign className="mt-1 mr-6" />
//                 <h2 className="text-lg font-bold mb-2">Step 3</h2>
//               </div>
//               <p className="ml-10">Connect with skilled workers and discuss your work.</p>
//             </li>
//             <li className="mb-4">
//               <div className="flex">
//                 <SiAntdesign className="mt-1 mr-6" />
//                 <h2 className="text-lg font-bold mb-2">Step 4</h2>
//               </div>
//               <p className="ml-10">Get the job done and leave a review for the skilled worker.</p>
//             </li>
//           </ul>
//         </div>
//       </div>
//     );
//   };

//   const FAQToggle = ({ question, answer }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleAccordion = () => {
//       setTimeout(() => {
//         setIsOpen(!isOpen);
//       }, 200);
//     };

//     return (
//       <div>
//         <div className="faq-item">
//           <button
//             className="faq-question flex justify-between items-center w-full px-4 py-2 rounded-md cursor-pointer"
//             onClick={toggleAccordion}
//           >
//             <span className="font-semibold">{question}</span>
//             <span className={`arrow ${isOpen ? 'transform rotate-180' : ''}`}>
//               <SlArrowDown className="justify-items-end" />
//             </span>
//           </button>
//           {isOpen && (
//             <div className="faq-answer p-4 mt-2">
//               <p>{answer}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const Two = () => {
//     return (
//       <div className="home">
//         <div className="flex flex-col lg:flex-row items-center justify-center mb-16">
//           <div className="lg:w-1/2 lg:pl-4 p-10 ml-6">
//             <div className="flex flex-col items-center">
//               <h1 className="text-4xl font-bold mb-4 text-center">
//                 Find Skilled Workers Nearby for Your Freelance Projects
//               </h1>
//             </div>

//             <div className="text-center lg:py-8 mb-4">
//               <p>
//                 Networkk connects you with skilled workers in your area,
//                 providing convenient access to local job opportunities and
//                 trusted verified services.
//               </p>
//             </div>

//             <div className="flex flex-col lg:flex-row justify-between px-4 lg:px-0">
//               <div className="lg:w-1/2 lg:pr-4 mb-8 lg:mb-0">
//                 <h4 className="text-xl font-bold mb-4">Convenience</h4>
//                 <p>
//                   Easily find and hire skilled workers for your projects, saving
//                   you time and effort.
//                 </p>
//               </div>
//               <div className="lg:w-1/2 lg:pl-4">
//                 <h4 className="text-xl font-bold mb-4">
//                   Local Job Opportunities
//                 </h4>
//                 <p>
//                   Discover job opportunities in your area and connect with
//                   employers seeking your skill.
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="lg:w-1/2 lg:pr-4">
//             <img
//               className="freelancer-img lg:float-right"
//               src={freelancerImg}
//               alt="Freelance-Workers-img"
//             />
//           </div>
//         </div>

//         <section id="services-home-container" className="py-12">
//           <div className="container mx-auto px-4">
//             <div className="text-center">
//               <h1 className="text-4xl font-bold mb-8">
//                 Discover a Diverse Range of Services on Networkk
//               </h1>
//               <p className="text-base text-gray-700 mb-8">
//                 Networkk is your go-to platform for finding skilled workers in
//                 your area. Whether you need a carpenter, plumber, electrician,
//                 or any other service provider, we've got you covered. Our
//                 diverse range of services ensures that you can easily find the
//                 right professional for your needs. With Networkk, you can trust
//                 that you're hiring experienced professionals who will deliver
//                 high-quality work. Don't settle for anything less than the best
//                 - explore our services today and get your project started with
//                 ease.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
//               <div className="lg:col-span-1">
//                 <div className="text-center">
//                   <img
//                     className="mx-auto mb-2 w-8 h-auto"
//                     src={carpentericon}
//                     alt="carpentryicon"
//                   />
//                   <h4 className="text-lg font-semibold mb-2">Carpentry Work</h4>
//                   <p>
//                     Carpenters are skilled craftsmen who specialize in the
//                     construction of wooden furniture and other wooden
//                     structures.
//                   </p>
//                 </div>
//                 <div className="text-center mt-8">
//                   <img
//                     className="mx-auto mb-2 w-8 h-auto"
//                     src={homerepair}
//                     alt="carpentryicon"
//                   />
//                   <h4 className="text-lg font-semibold mb-2">
//                     Home Repairs and Renovation
//                   </h4>
//                   <p>
//                     Hire experienced professionals for all your home repair,
//                     maintenance, and renovation needs.
//                   </p>
//                 </div>
//               </div>

//               <div className="lg:col-span-3">
//                 <div className="text-center">
//                   <img
//                     className="mx-auto mb-4"
//                     src={carpenter}
//                     alt="carpentryicon"
//                   />
//                 </div>
//               </div>

//               <div className="lg:col-span-1">
//                 <div className="text-center">
//                   <img
//                     className="mx-auto mb-2 w-8 h-auto"
//                     src={voltmeter}
//                     alt="carpentryicon"
//                   />
//                   <h4 className="text-lg font-semibold mb-2">
//                     Electrical Work
//                   </h4>
//                   <p>
//                     Find skilled workers in your area for all your home's
//                     electrical and wiring needs and say goodbye to all your
//                     troubles.
//                   </p>
//                 </div>
//                 <div className="text-center mt-8">
//                   <img
//                     className="mx-auto mb-2 w-8 h-auto"
//                     src={brickwork}
//                     alt="carpentryicon"
//                   />
//                   <h4 className="text-lg font-semibold mb-2">Masonry Work</h4>
//                   <p>
//                     Masonry workers are the skilled people you may hire to do
//                     all your construction and building works.
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="button-container1 flex justify-center py-8">
//               <div className="mx-4">
//                 <button className="signup px-6 py-3 bg-white border-2 border-blue-gray-700 text-black rounded-lg hover:bg-gray-200">
//                   Explore
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>

//         <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:mr-8 mb-8 lg:mb-0">
//           <div className="mid-page-signup lg:ml-10 py-6 lg:w-1/2 lg:pr-8">
//             <div className="text-container1 text-center lg:text-left">
//               <h1 className="text-4xl font-bold mb-4">
//                 Find Skilled Workers Near You
//               </h1>
//               <div className="py-4">
//                 <p>
//                   Connect with talented freelancers for all your service needs.
//                 </p>
//               </div>
//               <div className="button-container2 flex justify-center lg:justify-start">
//                 <div className="mx-4">
//                   <button className="login1 px-6 py-3 bg-white border-2 border-blue-gray-700 text-black rounded-lg hover:bg-gray-200">
//                     Learn More
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <img
//             className="freelancer-img mb-4 lg:mb-0"
//             alt="Freelance-Workers-img"
//             src={painter}
//           />
//         </div>
//         <div className="mb-8 mt-10 flex justify-center py-8">
//           <div className="p-5">
//             <div className="text-center mb-8">
//               <h1 className="text-4xl font-bold mb-4">What Networkk Offers</h1>
//               <h4 className="text-base">
//                 Empowering skilled workers and users with rewarding opportunities and services.
//               </h4>
//             </div>
//             <div className="mt-6">
//               <div className="flex items-start mb-4">
//                 <div className="rounded-full h-4 w-4 bg-black mr-2 mt-1"></div>
//                 <div>
//                   <h4 className="text-xl font-semibold mb-2">
//                     Connects you to the right person
//                   </h4>
//                   <h6 className="text-sm">
//                     Networkk connects the users with the absolute skilled person to get their job done.
//                   </h6>
//                 </div>
//               </div>
//               <div className="flex items-start mb-4">
//                 <div className="rounded-full h-4 w-4 bg-black mr-2 mt-1"></div>
//                 <div>
//                   <h4 className="text-lg font-semibold mb-2">
//                     Map-based interface
//                   </h4>
//                   <h6 className="text-sm">
//                     Networkk provides a location-based filtering feature which allows you to find the right skilled person within your locality.
//                   </h6>
//                 </div>
//               </div>
//               <div className="flex items-start">
//                 <div className="rounded-full h-4 w-4 bg-black mr-2 mt-1"></div>
//                 <div>
//                   <h4 className="text-lg font-semibold mb-2">
//                     Safe and Secure Services
//                   </h4>
//                   <h6 className="text-sm">
//                     Networkk ensures the safety of the users by thorough checking of the sellers' background.
//                   </h6>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mb-4 flex flex-col justify-center p-10">
//           <div className="w-full flex flex-col justify-center my-10">
//             <h1 className="text-3xl font-bold mb-3">Frequently Asked Questions</h1>
//             <h6 className="text-sm">
//               Find answers to commonly asked questions about our platform and
//               services.
//             </h6>
            
//           </div>

//           <div className="w-full p-5">
//             <hr className="my-4 border-t-2 border-gray-300" />
//             <FAQToggle question={"How does it work ?"} answer={" Signup with networkk. and use the search functionality to find the ideal skilled service provider near you for your needs within 10km radius of your location."}/>
//             <hr className="my-4 border-t-2 border-gray-300" />
            
//             <FAQToggle question={"Is it safe ?"} answer={"Networkk prioritizes customer safety and security by thoroughly screening each service provider for any criminal record. This screening process includes checking the Government-issued Police Clearance Certificate (PCC), which is updated every 6 months to ensure the genuineness and safety of the services offered on the platform."}/>
//             <hr className="my-4 border-t-2 border-gray-300" />

//             <FAQToggle question={"How do I sign up?"} answer={"Signing up is easy. Simply create an account either as a  user or as a service provider by entering your email address and creating a password. Once you've signed up, you can begin browsing for skilled services or complete the verification process to register as a verified service provider."} />
//             <hr className="my-4 border-t-2 border-gray-300" />

//             <FAQToggle question={"Can I offer my service?"} answer={"Certainly! You can offer your services on Networkk. Just sign up as a service provider, undergo verification by submitting your Government-issued Police Clearance Certificate, and then you're free to offer any skilled service you desire."} />
//             <hr className="my-4 border-t-2 border-gray-300" />

//             <FAQToggle question={"How can I get paid?"} answer={"You can work on a minimum charge set by yourself and get paid in real time"} />
//             <hr className="my-4 border-t-2 border-gray-300" />
//           </div>
//         </div>
//         <div className="Team py-12">
//           <div className="text-center mb-16">
//             <h6 className="text-lg">Connecting</h6>
//             <h1 className="text-4xl font-bold">Our Team</h1>
//             <h6 className="text-lg">
//               Meet the talented individuals behind Networkk
//             </h6>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
//             <div className="text-center">
//               <h2 className="text-xl font-semibold">Aaron Thomas Blessen</h2>
//               <h3 className="text-lg">CMO</h3>
//               <h4 className="text-base">
//                 Experienced strategist with a passion for innovation and growth.
//               </h4>
//               <div className="flex justify-center mt-4 space-x-8">
//                 <a href="https://www.linkedin.com/in/aaron-thomas-blessen-390200214/" target="_blank" rel="noopener noreferrer">
//                   <SiLinkedin className="text-black-500 text-2xl" />
//                 </a>
//                 <a href="https://twitter.com/aaron_blessen" target="_blank" rel="noopener noreferrer">
//                   <BsTwitterX className="text-black-500 text-2xl" />
//                 </a>
//                 <a href="https://github.com/Aaron-Thomas-Blessen" target="_blank" rel="noopener noreferrer">
//                   <BsGithub className="text-black-500 text-2xl" />
//                 </a>
//               </div>
//             </div>
//             <div className="text-center">
//               <h2 className="text-xl font-semibold">Akshay Gopan</h2>
//               <h3 className="text-lg">CTO</h3>
//               <h4 className="text-base">
//                 Tech enthusiast with expertise in developing cutting-edge
//                 solutions.
//               </h4>
//               <div className="flex justify-center mt-4 space-x-8">
//                 <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
//                   <SiLinkedin className="text-black-500 text-2xl" />
//                 </a>
//                 <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
//                   <BsTwitterX className="text-black-500 text-2xl" />
//                 </a>
//                 <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
//                   <BsGithub className="text-black-500 text-2xl" />
//                 </a>
//               </div>
//             </div>
//             <div className="text-center">
//               <h2 className="text-xl font-semibold">Alan Philip</h2>
//               <h3 className="text-lg">COO</h3>
//               <h4 className="text-base">
//                 Operations expert focused on delivering exceptional user
//                 experiences.
//               </h4>
//               <div className="flex justify-center mt-4 space-x-8">
//                 <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
//                   <SiLinkedin className="text-black-500 text-2xl" />
//                 </a>
//                 <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
//                   <BsTwitterX className="text-black-500 text-2xl" />
//                 </a>
//                 <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
//                   <BsGithub className="text-black-500 text-2xl" />
//                 </a>
//               </div>
//             </div>
//             <div className="text-center">
//               <h2 className="text-xl font-semibold">Chandrasekhar C.A</h2>
//               <h3 className="text-lg">Marketing Director</h3>
//               <h4 className="text-base">
//                 Strategic marketer driving brand awareness and customer
//                 acquisition.
//               </h4>
//               <div className="flex justify-center mt-4 space-x-8">
//                 <a href="https://www.linkedin.com/in/chandrasekharca" target="_blank" rel="noopener noreferrer">
//                   <SiLinkedin className="text-black-500 text-2xl" />
//                 </a>
//                 <a href="https://x.com/ChanduTumba?t=lsvX1R7kTQk41BZk4VKWgQ&s=08" target="_blank" rel="noopener noreferrer">
//                   <BsTwitterX className="text-black-500 text-2xl" />
//                 </a>
//                 <a href="https://github.com/ChanduTumba" target="_blank" rel="noopener noreferrer">
//                   <BsGithub className="text-black-500 text-2xl" />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="contact py-12">
//           <div className="flex flex-col">
//             <div className="py-8 text-center">
//               <h1 className="text-3xl font-bold">Contact Us</h1>
//               <h6 className="text-sm mt-2">
//                 Get in touch with us to explore opportunities, ask questions, or share feedback. We're here to help!
//               </h6>
//             </div>
//             <div className="flex flex-wrap">
//               <div className="w-full md:w-1/3 text-center mt-4">
//                 <h3 className="font-bold text-lg">Email</h3>
//                 <h6 className="text-md">contact@networkk.com</h6>
//               </div>
//               <div className="w-full md:w-1/3 text-center mt-4">
//                 <h3 className="font-bold text-lg">Phone</h3>
//                 <h6 className="text-md">+1 (555) 090-1356</h6>
//               </div>
//               <div className="w-full md:w-1/3 text-center mt-4">
//                 <h3 className="font-bold text-lg">Office</h3>
//                 <h6 className="text-md">Kottayam, Kerala, India</h6>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="news flex flex-wrap justify-center py-8">
//           <div className="w-full lg:w-3/5 lg:pr-8">
//             <img src="https://firebasestorage.googleapis.com/v0/b/network-c70d4.appspot.com/o/login%2Flogo-text1__1_-removebg-preview.png?alt=media&token=ff8304f7-1b98-4d3d-92dc-af6d60f928dc" className="w-44" />
//             <h5 className="text-base">
//               Stay up to date on features and releases by joining our
//               newsletter.
//             </h5>
//             <div className="flex mt-4">
//               <input
//                 type="email"
//                 placeholder="Your Email"
//                 className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-black"
//               />
//               <button className="px-4 py-2 bg-black text-white rounded-r-lg">
//                 Subscribe
//               </button>
//             </div>
//             <h6 className="text-sm mt-4">
//               By subscribing, you agree to our Privacy Policy and consent to
//               receive updates from our company.
//             </h6>
//           </div>
//           <div className="w-full lg:w-2/5 text-center">
//             <h3 className="text-lg font-semibold">Follow us on:</h3>
//             <div className="flex justify-center mt-4 space-x-8">
//               <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
//                 <SiLinkedin className="text-black-500 text-2xl" />
//               </a>
//               <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
//                 <BsTwitterX className="text-black-500 text-2xl" />
//               </a>
//               <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
//                 <BsFacebook className="text-black-500 text-2xl" />
//               </a>
//               <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
//                 <BsYoutube className="text-black-500 text-2xl" />
//               </a>
//             </div>
//           </div>
//         </div>
//         <hr className="border-t-2 border-gray-300 my-2" />

//         <div className="footer flex flex-wrap justify-between items-center mb-2">
//           <div className="w-full lg:w-auto">
//             <h6>© 2024 Networkk All rights reserved.</h6>
//           </div>
//           <div className="flex flex-wrap">
//             <h6 className="mr-4">Privacy Policy</h6>
//             <h6 className="mr-4">Terms of Service</h6>
//             <h6>Cookies Settings</h6>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="home bg-offwhite">
//       <Navbar />
//       <TwoColumnSection />
//       <Two />
//     </div>
//   );
// };

// export default Home;



const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-sky-50 to-indigo-50 py-16 lg:py-24">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="h-full w-full bg-[url('/pattern-bg.svg')] bg-repeat"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <span className="inline-block px-4 py-2 rounded-full bg-sky-100 text-sky-800 font-medium text-sm mb-6">
              The skilled workforce platform
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find Skilled Workers <span className="text-sky-600">Near You</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Connect with verified local professionals for your home, office, or any project needs. Quality service at your fingertips.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="/user-auth" className="px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Get Started
              </a>
              <button className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-all flex items-center justify-center gap-2">
                Watch How It Works <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="relative bg-white p-2 rounded-2xl shadow-2xl">
              <img 
                src={freelance} 
                alt="Service professionals at work" 
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg flex items-center gap-3">
                <div className="bg-green-500 rounded-full p-2">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold">TRUSTED & VERIFIED PROFESSIONALS</p>
                  {/* <p className="text-sm font-bold">Verified & Background Checked</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



const HowItWorksSection = () => {
  const steps = [
    {
      icon: <BsSearch />,
      title: "Search",
      description: "Signip and find skilled professionals in your area using our location-based search."
    },
    {
      icon: <BsPeople />,
      title: "Connect",
      description: "Browse profiles, reviews, and portfolios to find the perfect match."
    },
    {
      icon: <BsChatDots />,
      title: "Discuss",
      description: "Connect with skilled workers and discuss your work."
    },
    {
      icon: <BsHandThumbsUp />,
      title: "Complete",
      description: "Get your work done by verified professionals and leave a review."
    }
  ];
  
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Networkk Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Our simple four-step process connects you with the perfect professional for your needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-sky-50 rounded-xl p-8 h-full border-2 border-sky-100 transition-all hover:shadow-lg hover:border-sky-200">
                <div className="text-4xl mb-4 text-sky-700">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-1/2 h-0.5 bg-sky-200 transform translate-x-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: carpentericon,
      title: "Carpentry",
      description: "Expert woodworking and furniture services for your home or office."
    },
    {
      icon: plumbericon,
      title: "Plumbing",
      description: "Professional plumbing services for repairs, installations, and maintenance."
    },
    {
      icon: voltmeter,
      title: "Electrical Work",
      description: "Qualified electricians for all your electrical repairs and installations."
    },
    {
      icon: homerepair,
      title: "Home Renovation",
      description: "Complete home renovation and remodeling services by experts."
    },
    {
      icon: brickwork,
      title: "Masonry",
      description: "Professional masonry services for construction and building works."
    },
    {
      icon: "/painting-icon.svg", // Add this icon
      title: "Painting",
      description: "Transform your space with professional painting services."
    }
  ];
  
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-sky-100 text-sky-800 font-medium text-sm mb-4">OUR SERVICES</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Our Range of Services</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            From home repairs to professional installations, find the right service for your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center mb-4">
                  <img src={service.icon} alt={service.title} className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <a href="#" className="text-sky-600 font-medium flex items-center hover:text-sky-700">
                  Learn More <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="/search" className="inline-block px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-all shadow hover:shadow-lg">
            Browse All Services
          </a>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      content: "Networkk connected me with a fantastic carpenter who built custom shelving for my home office. The quality of work was excellent and the pricing transparent.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Office Manager",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "We needed urgent electrical repairs in our office. Found an electrician through Networkk who came the same day. Professional service with great attention to detail.",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Restaurant Owner",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "The plumber I hired through Networkk fixed our restaurant's plumbing issues quickly and efficiently. Will definitely use the platform again for future needs.",
      rating: 4
    }
  ];
  
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-sky-100 text-sky-800 font-medium text-sm mb-4">TESTIMONIALS</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from customers who have found the perfect service professionals through Networkk
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 relative">
              <div className="absolute -top-5 right-8 text-6xl text-sky-100">"</div>
              <div className="relative">
                <p className="text-gray-700 mb-6">{testimonial.content}</p>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="flex items-center">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqs = [
    {
      question: "How does Networkk work?",
      answer: "Networkk connects you with skilled service providers near your location. Simply sign up, search for the service you need, browse professionals within a 10km radius, and book the one that best fits your requirements."
    },
    {
      question: "Is Networkk safe to use?",
      answer: "Absolutely. Networkk prioritizes user safety by verifying all service providers with Government-issued Police Clearance Certificates, which are updated every 6 months. This ensures that you're connected with legitimate and trustworthy professionals."
    },
    {
      question: "How do I sign up?",
      answer: "Signing up is easy. Simply create an account as either a user or service provider with your email address and password. Users can start browsing immediately, while service providers need to complete a verification process."
    },
    {
      question: "Can I offer my services on Networkk?",
      answer: "Yes! To offer your services, sign up as a service provider, complete the verification process by submitting your Government-issued Police Clearance Certificate, and then set up your profile with the services you offer."
    },
    {
      question: "How do service providers get paid?",
      answer: "Service providers set their own rates and get paid directly by clients after completing the service. You can set a minimum charge for your services and receive payment in real-time."
    }
  ];
  
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-sky-100 text-sky-800 font-medium text-sm mb-4">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to commonly asked questions about our platform and services
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="flex justify-between items-center w-full p-6 bg-white rounded-lg shadow-sm hover:shadow transition-all"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-left text-lg">{faq.question}</span>
                <svg 
                  className={`w-6 h-6 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="p-6 bg-gray-50 rounded-b-lg border-t border-gray-100">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TeamSection = () => {
  const team = [
    {
      name: "Aaron Thomas Blessen",
      role: "Chief Marketing Officer",
      bio: "Experienced strategist with a passion for innovation and growth.",
      image: "/team/aaron.jpg", // Replace with actual image paths
      social: {
        linkedin: "https://www.linkedin.com/in/aaron-thomas-blessen-390200214/",
        twitter: "https://twitter.com/aaron_blessen",
        github: "https://github.com/Aaron-Thomas-Blessen"
      }
    },
    {
      name: "Akshay Gopan",
      role: "Chief Technology Officer",
      bio: "Tech enthusiast with expertise in developing cutting-edge solutions.",
      image: "/team/akshay.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/example",
        twitter: "https://twitter.com/example",
        github: "https://github.com/example"
      }
    },
    {
      name: "Alan Philip",
      role: "Chief Operations Officer",
      bio: "Operations expert focused on delivering exceptional user experiences.",
      image: "/team/alan.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/example",
        twitter: "https://twitter.com/example",
        github: "https://github.com/example"
      }
    },
    {
      name: "Chandrasekhar C.A",
      role: "Marketing Director",
      bio: "Strategic marketer driving brand awareness and customer acquisition.",
      image: "/team/chandrasekhar.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/chandrasekharca",
        twitter: "https://x.com/ChanduTumba?t=lsvX1R7kTQk41BZk4VKWgQ&s=08",
        github: "https://github.com/ChanduTumba"
      }
    }
  ];
  
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-sky-100 text-sky-800 font-medium text-sm mb-4">OUR TEAM</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet The Team Behind Networkk</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dedicated professionals working together to connect skilled workers with those who need them
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-gray-50 rounded-xl overflow-hidden transition-all hover:shadow-lg">
              <div className="h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D8ABC&color=fff&size=256`;
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-sky-600 mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex space-x-4">
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-sky-600 transition-colors">
                    <SiLinkedin className="text-xl" />
                  </a>
                  <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-sky-600 transition-colors">
                    <BsTwitterX className="text-xl" />
                  </a>
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-sky-600 transition-colors">
                    <BsGithub className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you for subscribing!");
    setEmail("");
  };
  
  return (
    <div className="py-20 bg-gradient-to-r from-sky-600 to-indigo-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Connected With Networkk</h2>
            <p className="text-sky-100 mb-8 text-lg">
              Get the latest updates, news, and special offers delivered directly to your inbox.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="px-6 py-4 rounded-lg text-gray-900 flex-grow focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button 
                type="submit"
                className="px-8 py-4 bg-white text-sky-600 font-medium rounded-lg hover:bg-sky-50 transition-colors shadow-lg"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sky-200 mt-4 text-sm">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from Networkk.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-6 h-6 mr-3 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>contact@networkk.com</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 mr-3 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 (555) 090-1356</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 mr-3 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Kottayam, Kerala, India</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                  <SiLinkedin className="text-xl" />
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                  <BsTwitterX className="text-xl" />
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                  <BsFacebook className="text-xl" />
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors">
                  <BsInstagram className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/network-c70d4.appspot.com/o/login%2Flogo-text1__1_-removebg-preview.png?alt=media&token=ff8304f7-1b98-4d3d-92dc-af6d60f928dc" 
              alt="Networkk Logo" 
              className="h-12 mb-6"
            />
            <p className="text-gray-400 mb-6">
              Connecting skilled professionals with those who need their services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <SiLinkedin className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <BsTwitterX className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <BsFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <BsInstagram className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Find Professionals</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Become a Provider</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Carpentry</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Plumbing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Electrical Work</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home Renovation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Masonry</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Support</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center md:text-left md:flex md:justify-between md:items-center">
          <p className="text-gray-500">© 2024 Networkk. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


const Home = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <ServicesSection />
      <TestimonialsSection />
      <FAQSection />
      <TeamSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Home;