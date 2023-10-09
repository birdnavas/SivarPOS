import React, { useState, useEffect } from "react";
const BarraBusqueda = (props) => {
  // setear los hooks  usestate
  const [users, Setusers] = useState([]);
  const [search, setsearch] = useState("");
  const [ListarInformacion, setListarInformacion] = useState([]);

  // funcion buscador
  const searcher = (e) => {
    setsearch(e.target.value);
    console.log(e.target.value);
  };



  
  const ListarRegistros = async () => {
    if (props.contractproductos) {
      try {
        const Counter = await props.contractproductos.methods
          .productCount()
          .call();

        let arrayTarea = [];

        for (let i = 0; i <= Counter; i++) {
          const infotarea = await props.contractproductos.methods
            .products(i)
            .call();

          if (infotarea) {
            const tarea = {
              id: infotarea.id,
              name: infotarea.name,
              price: infotarea.price,
              description: infotarea.description,
              url: infotarea.url,
            };
            //console.log(tarea);
            arrayTarea.push(tarea);
          }
        }
        console.log(arrayTarea, "Holaaaaa");
        setListarInformacion(arrayTarea);
      } catch (error) {
        console.error("Error al actualizar valor:", error);
        }
    }
  };

  useEffect(() => {
    ListarRegistros();
  }, [props.contractproductos]);
 
 
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
          {ListarInformacion.length === 0 ? (
            <p>No se encontraron resultados.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Descripción</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                {ListarInformacion.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>Hola</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>{item.url}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}


        </tbody>
      </div>
    </section>
  );
};

export default BarraBusqueda;



// // funcion para obtener datos de una api
// //const URL = "https://jsonplaceholder.typicode.com/users";

// const showData = async () => {
//   const response = await fetch(URL);
//   const data = await response.json();
//   /*console.log(data)*/
//   Setusers(data);
// };
// // funcion de busqueda

// useEffect(() => {
//   showData();
// }, []);