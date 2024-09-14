import React from 'react';
import Navbar from '../components/Navbar';

const AboutUsPage = () => {
  return (
    <div className="h-screen flex flex-col bg-white">
      <Navbar active="aboutus"/>
      <div/>
      
      <div className="flex-grow container mx-auto p-6 flex flex-col justify-between">
        {/* About Us and Our Mission Section */}
        <section className="flex flex-col md:flex-row justify-between items-start bg-white p-10 rounded-lg shadow-md mb-8 border border-blue-100">
          <div className="md:w-1/2 md:mr-8 mb-8 md:mb-0">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">About Us</h2>
            <p className="text-gray-600">
              Our app is dedicated to connecting Zoroastrians worldwide, providing a platform where our community can come together to socialize, network, and organize events. With the rich heritage and cultural significance of the Zoroastrian community, our platform seeks to overcome the challenges of geographical dispersion and foster a strong, united community.
            </p>
          </div>

          <div className="md:w-1/2 md:ml-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              We aim to bridge the gap between Zoroastrians across the globe by offering a centralized space for sharing experiences, supporting one another, and promoting cultural preservation.
            </p>
          </div>
        </section>

        {/* Full-Width Image Gallery Section (After About Us and Our Mission) */}
        <section className="bg-white p-10 mb-8 border border-blue-100">
          <div className="w-full -mx-6 px-6 overflow-x-scroll">
            <div className="flex space-x-4">
              {/* Replace these image URLs with your own */}
              <img src="./assets/hpy.jpg" alt="Community Event 1" className="h-40 rounded-lg"/>
              <img src="./assets/navroze.jpg" alt="Community Event 2" className="h-40 rounded-lg"/>
              <img src="./assets/zpl.jpg" alt="Community Event 3" className="h-40 rounded-lg"/>
              <img src="./assets/atashbehram.jpg" alt="Community Event 4" className="h-40 rounded-lg"/>
              <img src="./assets/event1.jpg" alt="Community Event 5" className="h-40 rounded-lg"/>
            </div>
          </div>
        </section>

        {/* Our Objectives Section */}
        <section className="flex flex-col md:flex-row justify-between items-start bg-white p-10 rounded-lg shadow-md mb-8 border border-blue-100">
          <div className="w-full">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Objectives</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Community Building:</strong> Foster a strong sense of community by providing a platform for regular interaction and engagement.</li>
              <li><strong>Networking Opportunities:</strong> Facilitate professional connections within the community, promoting collaborations and business growth.</li>
              <li><strong>Event Management:</strong> Simplify event organization and participation, making it easier for the community to gather and celebrate.</li>
              <li><strong>Resource Sharing:</strong> Support local entrepreneurs by allowing them to offer their services for community events, boosting mutual support.</li>
              <li><strong>Cultural Preservation:</strong> Encourage participation in cultural events to promote and preserve Zoroastrian heritage.</li>
            </ul>
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="flex flex-col md:flex-row justify-between items-start bg-white p-10 rounded-lg shadow-md mb-8 border border-blue-100">
          <div className="w-full">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              We envision a future where Zoroastrians are more connected than ever, working together to preserve their culture, support one another, and thrive both socially and professionally.
            </p>
          </div>
        </section>

        {/* Full-Width Image Gallery Section (Another Gallery) */}
        <section className="bg-white p-10 mb-8 border border-blue-100">
          <div className="w-full -mx-6 px-6 overflow-x-scroll">
            <div className="flex space-x-4">
              {/* Replace these image URLs with your own */}
              <img src="./assets/hpy.jpg" alt="Community Event 1" className="h-40 rounded-lg"/>
              <img src="./assets/navroze.jpg" alt="Community Event 2" className="h-40 rounded-lg"/>
              <img src="./assets/zpl.jpg" alt="Community Event 3" className="h-40 rounded-lg"/>
              <img src="./assets/atashbehram.jpg" alt="Community Event 4" className="h-40 rounded-lg"/>
              <img src="./assets/event1.jpg" alt="Community Event 5" className="h-40 rounded-lg"/>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;
