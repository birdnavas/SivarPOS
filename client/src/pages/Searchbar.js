import React, { useState, useEffect } from "react";
const BarraBusqueda = () => {
  // setear los hooks  usestate
  const [users, Setusers] = useState([]);
  const [search, setsearch] = useState("");

  // funcion para obtener datos de una api
  //const URL = "https://jsonplaceholder.typicode.com/users";

  const showData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    /*console.log(data)*/
    Setusers(data);
  };
  // funcion de busqueda

  useEffect(() => {
    showData();
  }, []);

  // funcion buscador
  const searcher = (e) => {
    setsearch(e.target.value);
    console.log(e.target.value);
  };

  //metodo de filtrado
  let resultado = [];
  if (!search) {
    resultado = users;
  } else {
    resultado = users.filter((dato) =>
      dato.name.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  return (
    <section>
      <div>
        <div className="bg-opacity-300 container h-20  rounded-xl flex justify-center items-center mx-auto max-w-[74rem]  ">
          <input
            value={search}
            onChange={searcher}
            className="mx-auto rounded-md w-[50rem] focus:outline-none text-center p-2 bg-slate-100 focus:border-b-2 focus:transition"
            type="search"
            name="search"
            placeholder="Buscar"
          />
          <button
            type="submit"
            className="absolute top-0 right-0 mr-4 mt-7"
          ></button>
        </div>
      </div>
      <div className="flex items-start justify-center">
        <tbody>
          {resultado.map((user) => (
            <tr key={user.id}>
              <td class="px-[5rem] py-4 whitespace-nowrap border-b border-gray-300">
                {user.name}
              </td>
              <td class="px-[5rem] py-4 whitespace-nowrap border-b border-gray-300">
                {user.username}
              </td>
              <td class="px-[10rem] py-4 whitespace-nowrap border-b border-gray-300">
                {user.username}
              </td>
            </tr>
          ))}
        </tbody>
      </div>
    </section>
  );
};

export default BarraBusqueda;
