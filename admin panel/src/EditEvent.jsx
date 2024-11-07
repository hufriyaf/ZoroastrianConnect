import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams(); // Get event ID from URL
  const navigate = useNavigate();
  
  const [eventData, setEventData] = useState({
    name: "",
    desc: "",
    date: "",
    time: "",
    venue: "",
    tickets_sold: 0,
    price: 0,
    img: "",
  });

  useEffect(() => {
    // Fetch the event details based on the event ID and set it to the state
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEventData(data); // Set the fetched event data
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the updated event data to the backend
      await axios.put(`http://localhost:5000/api/events/${id}/edit-event`, eventData);
      alert("Event updated successfully!");
      navigate("/"); // Redirect to home page after successful update
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Event</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Event Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="desc" className="block text-gray-700">Description</label>
          <textarea
            id="desc"
            name="desc"
            value={eventData.desc}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={eventData.time}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="venue" className="block text-gray-700">Venue</label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={eventData.venue}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tickets_sold" className="block text-gray-700">Tickets Sold</label>
          <input
            type="number"
            id="tickets_sold"
            name="tickets_sold"
            value={eventData.tickets_sold}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
            min="0"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={eventData.price}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
            min="0"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="img" className="block text-gray-700">Image URL</label>
          <input
            type="text"
            id="img"
            name="img"
            value={eventData.img}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
