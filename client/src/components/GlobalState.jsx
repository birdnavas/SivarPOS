// GlobalState.js
import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Crear el contexto
const GlobalStateContext = createContext();

// Crear un proveedor del contexto
export function GlobalStateProvider({ children }) {

    let cookieValue = Cookies.get("myList") !== undefined ? Cookies.get("myList") : [];
    console.log(cookieValue);
    let parsedList = JSON.parse(cookieValue);
    let myList = (parsedList); 

    const [globalState, setGlobalState] = useState(myList.length)

    useEffect(() => {
      cookieValue = Cookies.get("myList");
      console.log(cookieValue);
      parsedList = cookieValue ? JSON.parse(cookieValue) : [];
      myList = (parsedList);  
      setGlobalState(myList.length);
    }, [globalState])

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

// Crear un hook personalizado para acceder al contexto
export function useGlobalState() {
  return useContext(GlobalStateContext);
}
