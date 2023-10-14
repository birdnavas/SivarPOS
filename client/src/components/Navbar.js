import StartToastifyInstance from "toastify-js";
import Toggle from "./ThemeToggle";

import React, { useState, useEffect } from "react";

const Navbar = (props) => {
  const copiarAlPortapapeles = (text) => {
    // Crea un elemento de entrada de texto oculto para copiar el texto
    const input = document.createElement("input");
    input.style.opacity = 0;
    input.style.position = "absolute";
    input.value = text;
    document.body.appendChild(input);

    // Selecciona y copia el texto al portapapeles
    input.select();
    document.execCommand("copy");

    // Elimina el elemento de entrada de texto
    document.body.removeChild(input);

    // Muestra una notificación
    StartToastifyInstance({

      text: "Dirección copiada",

      position: "center",
      
      duration: 3000
      
    }).showToast();  };

  return (
    <nav className="bg-white border-gray-200 mx-2 px-2 py-2.5 rounded dark:bg-gray-800">
      <div className="container flex justify-between items-center mx-auto pt-3">
        <div className="flex items-center mx-auto">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            onClick={() => copiarAlPortapapeles(props.account)}
          >
            {props.accountshow}
          </button>
        </div>

        <div className="flex justify-end pr-4">
          <Toggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
