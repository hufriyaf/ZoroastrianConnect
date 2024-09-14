import React from 'react';

const RemoveEventDialog = ({ event, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-100">
      <div className="bg-white p-6 rounded-lg shadow-lg z-50">
        <h2 className="text-xl font-semibold mb-4">Remove Event</h2>
        <p>Are you sure you want to remove the event "{event.name}"?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveEventDialog;
