import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useCompanies from "../hooks/useCompanies";
import Alert from "./Alert";

const CompanyForm = () => {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [NIT, setNIT] = useState("");
  const [phone, setPhone] = useState("");

  const params = useParams();
  const { showAlert, alert, submitCompany, company } = useCompanies();

  const validatePhone = /^([0-9]{7,8}|[0-9]{10})$/;

  useEffect(() => {
    if (params.id) {
      setId(company._id);
      setName(company.name);
      setAddress(company.address);
      setNIT(company.NIT);
      setPhone(company.phone);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, address, NIT, phone].includes("")) {
      showAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (!validatePhone.test(phone)) {
      showAlert({
        msg: "Por favor ingresar un teléfono valido, recuerde número fijo 7 u 8 dígitos y celular 10",
        error: true,
      });
      return;
    }

    //Send data to provider
    await submitCompany({ id, name, address, NIT, phone });

    setId(null);
    setName("");
    setAddress("");
    setNIT("");
    setPhone("");
  };

  const { msg } = alert;
  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alert alert={alert} />}
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="company-name"
        >
          Nombre Empresa
        </label>
        <input
          id="company-name"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre de la Empresa"
          aria-label="Nombre de la empresa"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="company-address"
        >
          Dirección Empresa
        </label>
        <input
          id="company-address"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Dirección de la Empresa"
          aria-label="Dirección"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="company-nit"
        >
          NIT
        </label>
        <input
          id="company-nit"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="NIT de la Empresa"
          aria-label="NIT"
          value={NIT}
          onChange={(e) => setNIT(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="company-phone"
        >
          Teléfono
        </label>
        <input
          id="company-phone"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Teléfono de la Empresa"
          aria-label="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={id ? "Actualizar Empresa" : "Crear Empresa"}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default CompanyForm;
