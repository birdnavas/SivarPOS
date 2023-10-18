import StartToastifyInstance from "toastify-js";
import Toggle from "./ThemeToggle";
import React, { useState, useEffect } from "react";
import { BsClipboard2Fill, BsClipboard2CheckFill } from "react-icons/bs";

const Navbar = (props) => {
  const [copiado, setCopiado] = useState(false);

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
      duration: 3000,
    }).showToast();

    // Cambiar el estado para mostrar el ícono de verificación
    setCopiado(true);

    // Después de un tiempo (puedes usar setTimeout), puedes restaurar el ícono
    setTimeout(() => {
      setCopiado(false);
    }, 5000); // Cambiar nuevamente después de 2 segundos (o el tiempo que desees)
  };

  return (
    <nav className="bg-white border-gray-200 mx-2 px-2 py-2.5 rounded dark:bg-gray-800">
      <div className="container flex justify-between items-center mx-auto pt-3">
        <div className="flex items-center mx-auto">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline flex items-center space-x-2"
            onClick={() => copiarAlPortapapeles(props.account)}
          >
            <span>{props.accountshow}</span>
            {copiado ? <BsClipboard2CheckFill /> : <BsClipboard2Fill />}
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
