import React, { useState } from 'react';
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa6";
import axios from 'axios';
import Dialog from './Dialog';

const EventCard = ({ event }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);  // State to control the dialog visibility

  const bookEvent = async () => {
    try {
      const email = localStorage.getItem("email");
  
      // Step 1: Fetch booked events for the user
      const res = await axios.get(`http://localhost:5000/api/auth/user-events/${email}`);
      const bookedEvents = res.data; // Array of booked events
  
      // Step 2: Check if the current event is already in the booked events
      const isAlreadyBooked = bookedEvents.some(bookedEvent => bookedEvent._id === event._id);
  
      if (isAlreadyBooked) {
        alert("Event already booked.");
        return; // Stop the function if the event is already booked
      }
  
      // Step 3: Proceed with booking the event if not already booked
      const data = { eventId: event._id, email };
      const bookRes = await axios.post('http://localhost:5000/api/auth/book-event', data);
      
      if (bookRes.status === 200) {
        alert("Event booked successfully.");
      }
  
    } catch (e) {
      console.log('Error:', e);
      alert('Error booking the event. Please try again.');
    }
  };
  

  const handleReadMore = () => {
    setIsDialogOpen(true);  // Open the dialog when "Read More" is clicked
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);  // Close the dialog when the close button is clicked
  };

  return (
    <div className="flex w-80 flex-col rounded-xl bg-white shadow-md mb-10"> {/* Added mb-8 for vertical gap */}
  <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl">
    <img src={event.img} alt={event.name} className="w-full h-full object-cover" />
  </div>
  <div className="p-6">
    <h5 className="mb-2 text-xl font-semibold">{event.name}</h5>
    <p className="flex items-center gap-x-2">
      <IoLocationOutline />{event.venue}
    </p>
    <p className="flex items-center gap-x-2">
      <FaRegCalendarCheck />{event.date}
    </p>
  </div>
  <div className="p-6 pt-0 flex justify-between">
    <button onClick={handleReadMore} className="bg-blue-500 text-white px-6 py-3 rounded-lg">
      Read More
    </button>
    <button onClick={bookEvent} className="bg-blue-500 text-white px-6 py-3 rounded-lg">
      Book
    </button>
  </div>
  {isDialogOpen && <Dialog event={event} onClose={handleCloseDialog} />}
</div>

  );
};

export default EventCard;
