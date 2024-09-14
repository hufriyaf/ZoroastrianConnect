import React from 'react';
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";

const Dialog = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{event.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-lg">
            <MdOutlineClose />
          </button>
        </div>
        <img src={event.img} alt={event.name} className="w-full h-60 object-cover rounded-lg mb-4" />
        
        {/* Event Description */}
        <p className="text-gray-600 mb-4">{event.description}</p>

        {/* Event Description */}
        <div className="text-gray-600 mb-2">
          <strong>Description:</strong> {event.desc}
        </div>
        
        {/* Event Venue */}
        <div className="text-gray-600 mb-2">
          <strong>Location:</strong> <IoLocationOutline className="inline mr-1"/>{event.venue}
        </div>
        
        {/* Event Date and Time */}
        <div className="text-gray-600 mb-2">
          <strong>Date:</strong> <FaRegCalendarCheck className="inline mr-1"/>{event.date}
        </div>
        <div className="text-gray-600 mb-2">
          <strong>Time:</strong> {event.time}
        </div>
        
        {/* Event Price */}
        <div className="text-gray-600 mb-4">
          <strong>Price:</strong> Rs. {event.price}
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Dialog;
