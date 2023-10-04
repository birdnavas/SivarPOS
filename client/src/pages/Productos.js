import React, { useState, useEffect } from "react";

const Productos = (props) => {
  const estadoInicialProductos = {
    name: "",
    description: "",
    stock: "",
    expirationDate: "",
    price: "",
  };

  const registrarInformacion = async (e) => {
    e.preventDefault();
    console.log(producto);

    try {
      const result = await props.contractproductos.methods
        .addProduct(
          producto.name,
          producto.description,
          producto.stock,
          producto.expirationDate,
          producto.price
        )
        .send({ from: props.account });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    //ListarRegistros();
  };

  const ManejarFormulario = ({ target: { name, value } }) => {
    console.log(name, value);
    setProducto({ ...producto, [name]: value });
  };

  const [producto, setProducto] = useState(estadoInicialProductos);

  const [ListarInformacion, setListarInformacion] = useState([]);
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
              stock: infotarea.stock,
              expirationDate: infotarea.expirationDate,
            };
            //console.log(tarea);
            arrayTarea.push(tarea);
          }
        }
        //console.log(arrayTarea);
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
    <div className="dark:text-white flex justify-center grid grid-cols-1 divide-y">
      <form onSubmit={registrarInformacion}>
        <table className="min-w-full text-center text-sm font-light">
          <thead>
            <tr className="bg-[#3853DA] text-white">
              <th className="px-4 py-2 text-lg">NOMBRE</th>
              <th className="px-4 py-2 text-lg ">DESCRIPCION</th>
              <th className="px-4 py-2 text-lg ">EXISTENCIAS</th>
              <th className="px-4 py-2 text-lg">CADUCIDAD</th>
              <th className="px-4 py-2 text-lg">PRECIO</th>
            </tr>
          </thead>
          <tbody className="">
            <td className="px-4 py-2">
              <input
                type="text"
                id="name"
                name="name"
                onChange={ManejarFormulario}
                value={producto.name}
                className="w-full p-2 border border-gray-300"
              />
            </td>

            <td className="px-4 py-2">
              <input
                type="text"
                id="description"
                name="description"
                onChange={ManejarFormulario}
                value={producto.description}
                className="w-full p-2 border border-gray-300"
              />
            </td>

            <td className="px-4 py-2">
              <input
                type="number"
                id="stock"
                name="stock"
                onChange={ManejarFormulario}
                value={producto.stock}
                className="w-full p-2 border border-gray-300"
              />
            </td>

            <td className="px-4 py-2">
              <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                onChange={ManejarFormulario}
                value={producto.expirationDate}
                className="w-full p-2 border border-gray-300"
              />
            </td>

            <td className="px-4 py-2">
              <input
                type="number"
                id="price"
                name="price"
                onChange={ManejarFormulario}
                value={producto.price}
                className="w-full p-2 border border-gray-300"
              />
            </td>

            <td className="">
              <button
                className="block bg-[#FFD658] rounded-[10px] p-4 text-xl font-sans font-medium"
                type="submit"
              >
                AÑADIR
              </button>
            </td>
          </tbody>
        </table>
      </form>

      <table>
        <thead>
          <tr className="">
            <th className="px-4 py-2 text-lg">NOMBRE</th>
            <th className="px-4 py-2 text-lg ">DESCRIPCION</th>
            <th className="px-4 py-2 text-lg ">EXISTENCIAS</th>
            <th className="px-4 py-2 text-lg">CADUCIDAD</th>
            <th className=" py-2 text-lg">PRECIO</th>
          </tr>
        </thead>
        <tbody className="dark:text-white">
          {ListarInformacion.filter((item) => item.id > 0).map((item) => (
            <tr className="text-center px-4 py-2 text-lg">
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.stock}</td>
              <td>{item.expirationDate}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Productos;
