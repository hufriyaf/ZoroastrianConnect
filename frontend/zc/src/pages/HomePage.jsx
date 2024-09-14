import Navbar from '../components/Navbar.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard.jsx';

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getAds = async () => {
      const res = await axios.get('http://localhost:5000/api/auth/events');
      console.log(res.data.data);
      setEvents(res.data.data);
    }
    getAds()
  }, [])

  
  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //     localStorage.setItem('isLoggedIn', 'false');
  //       const response = await axios.get('http://localhost:5000/api/auth/users');
  //       // Adjust the URL to your API endpoint
  //       setEvents(response.data);       
  //     } catch (error) {
  //       console.error('Error fetching events:', error);
  //     }
  //   };

  //   fetchEvents();
  // }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="w-full fixed top-0">
        <Navbar active="home"/>
      </div>
      <div className="flex flex-grow mt-16 p-4">
        <div className="w-full p-4">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Zoroastrian Community!</h1>
          <p className="text-lg">
            Here you can find information about our beliefs, upcoming events, and connect with other members of our community.
            Join us in our journey to foster strong connections and build meaningful relationships.
          </p>

          {/* div of all events */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-8'>
              {events.map((event) => (
               <EventCard event={event}/>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
