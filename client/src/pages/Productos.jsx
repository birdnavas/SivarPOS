import React, { useState, useEffect } from "react";
import {GrAdd} from "react-icons/gr";
import {FaEdit} from "react-icons/fa";
import {VscSaveAs} from "react-icons/vsc";
import {AiFillDelete} from "react-icons/ai";
import {GiCancel} from "react-icons/gi";


const Productos = (props) => {
  const estadoInicialProductos = {
    id: "",
    name: "",
    description: "",
    stock: "",
    expirationDate: "",
    price: "",
  };

  const [producto, setProducto] = useState(estadoInicialProductos);
  const [ListarInformacion, setListarInformacion] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  // Estado para los campos de edición de productos individuales
  const [editingProduct, setEditingProduct] = useState({
    id: "",
    name: "",
    description: "",
    stock: "",
    expirationDate: "",
    price: "",
    url: "",
  });

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
          producto.price,
          producto.url,
        )
        .send({ from: props.account });
      console.log(result);
      setProducto(estadoInicialProductos);
      ListarRegistros();
    } catch (error) {
      console.error(error);
    }
  };

  const ManejarFormulario = ({ target: { name, value } }) => {
    console.log(name, value);
    setProducto({ ...producto, [name]: value });
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
              stock: infotarea.stock,
              expirationDate: infotarea.expirationDate,
              url: infotarea.url,
            };
            arrayTarea.push(tarea);
          }
        }
        setListarInformacion(arrayTarea);
      } catch (error) {
        console.error("Error al actualizar valor:", error);
      }
    }
  };

  const onEdit = (productId) => {
    setEditingProductId(productId);

    // Inicializa el estado de edición del producto individual
    const productToEdit = ListarInformacion.find(
      (item) => item.id === productId
    );
    if (productToEdit) {
      setEditingProduct(productToEdit);
    }
  };

  const onSaveEdit = async () => {
    if (
      !editingProduct ||
      !editingProduct.id ||
      !editingProduct.name ||
      !editingProduct.description ||
      !editingProduct.stock ||
      !editingProduct.expirationDate ||
      !editingProduct.price ||
      !editingProduct.url
    ) {
      console.error("Los detalles del producto son inválidos.");
      return;
    }

    try {
      const result = await props.contractproductos.methods
        .editProduct(
          editingProduct.id,
          editingProduct.name,
          editingProduct.description,
          editingProduct.stock,
          editingProduct.expirationDate,
          editingProduct.price,
          editingProduct.url,
        )
        .send({ from: props.account });

      console.log(result);
      setEditingProductId(null);
      ListarRegistros();
    } catch (error) {
      console.error("Error al editar el producto:", error);
    }
  };

  const onCancelEdit = () => {
    setEditingProductId(null);
  };

  const onDeleteProduct = async (productId) => {
    try {
      const result = await props.contractproductos.methods
        .deleteProduct(productId)
        .send({ from: props.account });

      console.log(result);
      ListarRegistros();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
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
              <th className="px-4 py-2 text-lg">IMAGEN URL</th>
            </tr>
          </thead>
          
          <tbody className="dark:text-black">
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
            {/*  NUEVO INPUT URL */}
            <td className="px-4 py-2">
              <input
                type="string"
                id="url"
                name="url"
                onChange={ManejarFormulario}
                value={producto.url}
                className="w-full p-2 border border-gray-300"
              />
            </td>

            <td className="">
              <button
                className="block bg-[#FFD658] rounded-[10px] p-4 text-xl font-sans font-medium"
                type="submit"
              >
                <GrAdd />
              </button>
            </td>
          </tbody>
        
        </table>
      </form>

      <table className="min-w-full text-center text-sm font-light">
        <thead>
          <tr className="">
            <th className="px-4 py-2 text-lg">NOMBRE</th>
            <th className="px-4 py-2 text-lg ">DESCRIPCION</th>
            <th className="px-4 py-2 text-lg ">EXISTENCIAS</th>
            <th className="px-4 py-2 text-lg">CADUCIDAD</th>
            <th className="px-4 py-2 text-lg">PRECIO</th>
            <th className="px-4 py-2 text-lg">IMAGEN URL</th>
          </tr>
        </thead>
        <tbody className="dark:text-white">
          {ListarInformacion.filter((item) => item.id > 0).map(
            (item, index) => (
              <tr className="text-center px-4 py-2 text-lg" key={index}>
                <td>
                  {editingProductId === item.id ? (
                    <input
                      className="w-full p-2 text-black border border-gray-300"
                      type="text"
                      name="name"
                      value={editingProduct.name}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>
                  {editingProductId === item.id ? (
                    <input
                      className="w-full p-2 text-black border border-gray-300"
                      type="text"
                      name="description"
                      value={editingProduct.description}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.description
                  )}
                </td>
                <td>
                  {editingProductId === item.id ? (
                    <input
                      className="w-full p-2 text-black border border-gray-300"
                      type="number"
                      name="stock"
                      value={editingProduct.stock}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          stock: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.stock
                  )}
                </td>
                <td>
                  {editingProductId === item.id ? (
                    <input
                      className="w-full p-2 text-black border border-gray-300"
                      type="date"
                      name="expirationDate"
                      value={editingProduct.expirationDate}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          expirationDate: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.expirationDate
                  )}
                </td>
                <td>
                  {editingProductId === item.id ? (
                    <input
                      className="w-full p-2 text-black border border-gray-300"
                      type="text"
                      name="price"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.price
                  )}
                </td>
                <td>
                  {editingProductId === item.id ? (
                    <input
                      className="w-full p-2 text-black border border-gray-300"
                      type="text"
                      name="url"
                      value={editingProduct.url.slice(0,25)}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          url: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.url.slice(0,25)
                  )}
                </td>
                <td className="flex justify-center dark:text-black">
                  {editingProductId === item.id ? (
                    <>
                      <button
                        className="mr-2 bg-[#4CAF50] rounded-[10px] p-2 text-3xl"
                        onClick={onSaveEdit}
                      >
                        <VscSaveAs />
                      </button>
                      <button
                        className="mr-2 bg-red-500 rounded-[10px] p-2 text-3xl"
                        onClick={onCancelEdit}
                      >
                        <GiCancel />
                      </button>
                    </>
                  ) : (
                    <button
                      className="mr-2 bg-[#FFD658] rounded-[10px] p-2 text-3xl"
                      onClick={() => onEdit(item.id)}
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button
                    className="mr-2 bg-red-500 rounded-[10px] p-2 text-3xl"
                    onClick={() => onDeleteProduct(item.id)}
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Productos;

{
  /* <form onSubmit={registrarInformacion}>
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
          <tbody className="dark:text-black">
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
      </form> */
}

{
  /* <tbody className="dark:text-white">
          {ListarInformacion.filter((item) => item.id > 0).map(
            (item, index) => (
              <tr className="text-center px-4 py-2 text-lg" key={index}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.stock}</td>
                <td>{item.expirationDate}</td>
                <td>{item.price}</td>
                <td className="flex justify-center">
                  <button
                    className="mr-2 bg-[#FFD658] rounded-[10px] p-2 text-lg"
                    onClick={() => onEdit(item)} // Pasa el objeto 'item' como argumento
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 rounded-[10px] p-2 text-lg"
                    onClick={() => onDeleteProduct(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody> */
}
