import { useState } from "react";
import axios from "axios";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    name: "",
    desc: "",
    date: "",
    time: "",
    venue: "",
    tickets_sold: 0,
    price: 0,
    img: "/assets/atashbehram.jpg",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the field should be a number and parse it
    setEventData({
      ...eventData,
      [name]: name === "price" || name === "tickets_sold" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend endpoint for creating events
      console.log(eventData);
      if (new Date(eventData.date) <= new Date()) {
        alert("Please enter an appropriate date.");
        return;
      }
      const response = await axios.post("http://localhost:5000/api/auth/create-event", eventData);
      if (response.status === 201) {
        alert("Event created successfully!");
        setEventData({
          name: "",
          desc: "",
          date: "",
          time: "",
          venue: "",
          tickets_sold: 0,
          price: 0
        });
      }
    } catch (error) {
      console.error("There was an error creating the event!", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
    <h2 className="text-2xl font-bold mb-6 text-center">Create Event</h2>

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
        step="0.01"
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
      <label htmlFor="image" className="block text-gray-700">Event Image</label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        className="w-full p-2 border border-gray-300 rounded mt-1"
      />
    </div>

    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
      Create Event
    </button>
  </form>
</div>

  );
};

export default CreateEvent;
