import Navbar from '../components/Navbar.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BookedEventCard from '../components/BookedEventCard.jsx';

function MyEventsPage() {
  const [events, setEvents] = useState([]);
  const [stale,setStale] = useState(false);

  useEffect(() => {
    console.log("Fetched events")
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/user-events/${localStorage.getItem('email')}`);
        console.log(res.data); // Ensure that the response is what you expect
        setEvents((events)=>res.data); // Update state with the correct data format
        console.log(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [stale]);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="w-full fixed top-0">
        <Navbar active="events"/>
      </div>
      <div className="flex flex-grow mt-16 p-4">
        <div className="w-full p-4">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Zoroastrian Community!</h1>
          <p className="text-lg">My Events</p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-8'>
            {events.length > 0 ? (
              events.map((event) => (
                <BookedEventCard key={event._id} event={event} stale={stale} setStale={setStale}/>
              ))
            ) : (
              <p>No upcoming events.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyEventsPage;
