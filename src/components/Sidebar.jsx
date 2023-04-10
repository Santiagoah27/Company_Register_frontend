import React from 'react'
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const Sidebar = () => {
  const { auth } = useAuth();
  const admin = useAdmin();
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
      <p className="text-xl font-bold">Hola: {auth.name}</p>
      {admin && (
        <Link
          to="create-companies"
          className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
        >
          Nueva Empresa
        </Link>
      )}
    </aside>
  );
};

export default Sidebar;
