import React from 'react';
import { Link } from 'react-router-dom';

const ErrorModal = ({ isOpen, onClose, errorMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-80 p-5">
        <h2 className="text-xl font-bold text-red-600">Error</h2>
        <p className="mt-2 text-gray-700">{errorMessage}</p>
        <Link to="/"><button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button></Link>
      </div>
    </div>
  );
};

export default ErrorModal;
