// src/pages/Events.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [editEventId, setEditEventId] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAds = async () => {
      const res = await axios.get('http://localhost:5000/api/auth/all-events');
      console.log(res.data.data);
      setEvents(res.data.data);
    }
    getAds()
  }, [])

  const handleAddEvent = () => {
    // Redirect to the event creation page
    navigate('/admin/create-event');
  };

  const handleDelete = async (eventId) => {
    try {
      console.log(eventId)
      await axios.delete(`http://localhost:5000/api/auth/delete-event/${eventId}`); // Replace with your DELETE API endpoint
      setEvents(events.filter(event => event._id !== eventId)); // Update the list after deletion
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

  const handleEdit = (event) => {
    // Set the selected event data into state for editing
    setEventData({
      name: event.name,
      desc: event.desc,
      date: event.date,
      time: event.time,
      venue: event.venue,
      tickets_sold: event.tickets_sold,
      price: event.price,
      img: event.img,
    });
  
    // Optionally store the event ID to know which event is being edited
    setEditEventId(event._id);
  
    // Redirect or open the edit form (navigate to edit event page)
    navigate(`/edit-event/${event._id}`);
  };
  

  return (
    <div className="p-4">
  <h1 className="text-2xl font-bold mb-4">All Events</h1>
  <ul>
    {events.map((event) => (
      <li key={event._id} className="py-4 flex justify-between items-center">
        <div>
          <p className="text-lg font-medium text-gray-900">{event.name}</p>
          <p className="text-gray-500">{event.date}</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">{event.venue}</span>
          <button
            onClick={() => handleEdit(event)}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(event._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
  <button 
    onClick={handleAddEvent} 
    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
    Add Event
  </button>
</div>

  );
};

export default Events;
