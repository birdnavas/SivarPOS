import React, { useState } from "react";
import Web3 from "web3";

const Users = (props) => {
  const [formTouched, setFormTouched] = useState(false);
  const [formTouched1, setFormTouched1] = useState(false);

  const handleBlur = (fieldName) => {
    if (fieldName === "title") {
      setFormTouched(true);
    } else if (fieldName === "description") {
      setFormTouched1(true);
    }
  };

  function isValidAddress(address) {
    return Web3.utils.isAddress(address);
  }

  return (
    <div className="flex justify-center gap-20 dark:text-white">
      <form
        onSubmit={props.registrarInformacion}
        className="p-4 bg-white-100 my-2"
      >
        <label
          for="nombre"
          className="block text-gray-700 pt-6 pb-2 font-bold mb-2 dark:text-white"
        >
          Nombre
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="border rounded w-96 py-3 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Escribe tu nombre"
          onChange={props.ManejarFormulario}
          value={props.formulario.name}
          onBlur={() => handleBlur("title")}
          required
        />

        {props.formulario.name === "" && formTouched && (
          <div className="text-red-500">
            Este campo no puede estar en blanco.
          </div>
        )}

        <label
          for="correo"
          className="block text-gray-700 pt-6 pb-2 font-bold mb-2 dark:text-white"
        >
          Cuenta
        </label>
        <input
          type="text"
          id="description"
          name="description"
          className="border rounded w-96 py-3 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Cuenta wallet"
          onChange={props.ManejarFormulario}
          value={props.formulario.walletAddress}
          onBlur={() => handleBlur("description")}
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            Enviar
          </button>
        </div>
      </form>

      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-[2rem] py-3 bg-[#3853DA] text-white border-b border-gray-300">
              Rol
            </th>
            <th className="px-[2rem] py-3 bg-[#3853DA] text-white border-b border-gray-300">
              Nombre
            </th>
            <th className="px-[2rem] py-3 bg-[#3853DA] text-white border-b border-gray-300">
              Direccion
            </th>
          </tr>
        </thead>
        <tbody>
          {props.ListarInformacion.map((item) => (
            <tr key={item.id}>
              <td>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-[100px]"
                  onClick={() => props.cambioEstadoTarea(item.id)}
                >
                  {item.done ? "Gerente" : "Cajero"}
                </button>
              </td>
              <td className="border rounded-lg table-auto border-slate-200 ">
                {item.title}
              </td>
              <td className="border rounded-lg table-auto border-slate-200 ">
                {item.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
