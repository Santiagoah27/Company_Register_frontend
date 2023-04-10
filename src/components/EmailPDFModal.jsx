
import React from 'react'
import { useState } from "react";

const EmailPDFModal = ({ isOpen, closeModal, sendEmail }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail(email);
    setEmail('')
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        {/* Ajusta esta línea para centrar el modal */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>
        <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full inline-block">
          <form onSubmit={handleSubmit} className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              A qué correo desea enviar este PDF
            </h3>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-200 rounded-md text-base focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="text-sm bg-white hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-md mr-2"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="text-sm bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailPDFModal;
