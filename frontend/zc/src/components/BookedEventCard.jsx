import React, { useState } from 'react';
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa6";
import axios from 'axios';
import RemoveEventDialog from './RemoveEventDialog';

const BookedEventCard = ({ stale, setStale, event }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRemoveEvent = async () => {
    try {
        setStale(!stale);
      const data = { eventId: event._id, email: localStorage.getItem("email") };
      const res = await axios.put('http://localhost:5000/api/auth/remove-booked-event', data);
      console.log(res.status, res.data);
    } catch (e) {
      console.log('Error:', e);
    }
    setIsDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md ">
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
        <img src={event.img} alt={event.name} />
      </div>
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {event.name}
        </h5>
        <p className="flex justify-center items-center gap-x-2 font-sans text-base font-light leading-relaxed text-inherit antialiased">
          <IoLocationOutline />{event.venue}
        </p>
        <p className="flex justify-center items-center gap-x-2 font-sans text-base font-light leading-relaxed text-inherit antialiased">
          <FaRegCalendarCheck />{event.date}
        </p>
      </div>
      <div className="p-6 pt-0 flex justify-between">
        <button
          onClick={handleOpenDialog}
          className="select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Remove
        </button>
        <button
          onClick={() => {}}
          className="select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Pay
        </button>
      </div>

      {isDialogOpen && (
        <RemoveEventDialog
          event={event}
          onClose={handleCloseDialog}
          onConfirm={handleRemoveEvent}
        />
      )}
    </div>
  );
};

export default BookedEventCard;
