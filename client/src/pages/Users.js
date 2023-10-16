import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "../index.css";

import Web3 from "web3";

const Users = (props) => {
  const [formTouched, setFormTouched] = useState(false);
  const [formTouched1, setFormTouched1] = useState(false);

  const handleBlur = (fieldName) => {
    if (fieldName === "name") {
      setFormTouched(true);
    } else if (fieldName === "walletAddress") {
      setFormTouched1(true);
    }
  };

  function isValidAddress(address) {
    return Web3.utils.isAddress(address);
  }

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8; // Cambia esto al número de elementos por página que desees

  // Calcula la cantidad total de páginas
  const pageCount = Math.ceil(props.ListarInformacion.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const currentItems = props.ListarInformacion.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="flex justify-center gap-20 dark:text-white">
      <form
        onSubmit={props.registrarInformacion}
        className="p-4 bg-white-100 my-2"
      >
        <label
          for="name"
          className="block text-gray-700 pt-6 pb-2 font-bold mb-2 dark:text-white"
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="border rounded w-96 py-3 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Escribe tu nombre"
          onChange={props.ManejarFormulario}
          value={props.formulario.name}
          onBlur={() => handleBlur("name")}
          required
        />

        {props.formulario.name === "" && formTouched && (
          <div className="text-red-500">
            Este campo no puede estar en blanco.
          </div>
        )}

        <label
          for="walletAddress"
          className="block text-gray-700 pt-6 pb-2 font-bold mb-2 dark:text-white"
        >
          Cuenta
        </label>
        <input
          type="text"
          id="walletAddress"
          name="walletAddress"
          className="border rounded w-96 py-3 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Cuenta wallet"
          onChange={props.ManejarFormulario}
          value={props.formulario.walletAddress}
          onBlur={() => handleBlur("walletAddress")}
          required
        />

        {props.formulario.walletAddress === "" && formTouched1 && (
          <div className="text-red-500">
            Este campo no puede estar en blanco.
          </div>
        )}

        {!isValidAddress(props.formulario.walletAddress) && formTouched1 && (
          <div className="text-red-500">La dirección no es válida</div>
        )}

        <div className="flex items-center pt-6 justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            Registrar
          </button>
        </div>
      </form>

      <div className="table-container">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-2 text-xl py-3 bg-[#3853DA] text-white border-b border-gray-300">
                ROL
              </th>
              <th className="px-[2rem] py-3 text-xl bg-[#3853DA] text-white border-b border-gray-300">
                NOMBRE
              </th>
              <th className="px-[2rem] py-3 text-lg bg-[#3853DA] text-white border-b border-gray-300">
                DIRECCION
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr className="text-center" key={item.id}>
                <td className="align-middle">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-[125px] mx-auto my-auto text-xl"
                    onClick={() => props.cambioEstadoTarea(item.id)}
                  >
                    {item.registered ? "Gerente" : "Cajero"}
                  </button>
                </td>
                <td className="border rounded-lg table-auto border-slate-200 px-4 text-xl">
                  {item.name}
                </td>
                <td className="border rounded-lg table-auto border-slate-200 px-4 text-xl">
                  {item.walletAddress}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="text-center mt-4">
          <ReactPaginate
            previousLabel="Anterior"
            nextLabel="Siguiente"
            breakLabel="..."
            breakClassName="break-me"
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-4"
            subContainerClassName="pages pagination"
            activeClassName="bg-[#3853DA] text-white font-semibold px-3 py-2 rounded-lg mx-1"
            previousClassName="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded-lg mx-1"
            nextClassName="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded-lg mx-1"
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
