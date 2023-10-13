import React, { useState, useEffect } from "react";
import { GrAdd } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { VscSaveAs } from "react-icons/vsc";
import { AiFillDelete } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";

import DataTable from "react-data-table-component";

const Productos = (props) => {
  const estadoInicialProductos = {
    id: "",
    name: "",
    description: "",
    stock: "",
    expirationDate: "",
    price: "",
    url: "",
  };

  const [producto, setProducto] = useState(estadoInicialProductos);
  const [ListarInformacion, setListarInformacion] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [data, setData] = useState([]);

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
          producto.url
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
            if(tarea.id !== "0"){
              arrayTarea.push(tarea);
            }
          }
        }
        setListarInformacion(arrayTarea);
        setData(arrayTarea);
        console.log(arrayTarea);
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
          editingProduct.url
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

  const columns = [
    {
      name: "NOMBRE",
      width: "210px",
      selector: (row) => (
        <div>
          {editingProductId === row.id ? (
            <input
              className="w-full text-lg p-2 text-black border border-gray-300"
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
            <b>{row.name}</b>
          )}
        </div>
      ),
    },
    {
      name: "DESCRIPCION",
      width: "210px",
      selector: (row) => (
        <div>
          {editingProductId === row.id ? (
            <input
              className="w-full text-lg p-2 text-black border border-gray-300"
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
            row.description
          )}
        </div>
      ),
    },
    {
      name: "EXISTENCIAS",
      width: "210px",
      selector: (row) => (
        <div>
          {editingProductId === row.id ? (
            <input
              className="w-full text-lg p-2 text-black border border-gray-300"
              type="text"
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
            row.stock
          )}
        </div>
      ),
    },
    {
      name: "CADUCIDAD",
      width: "210px",
      selector: (row) => (
        <div>
          {editingProductId === row.id ? (
            <input
              className="w-full text-lg p-2 text-black border border-gray-300"
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
            row.expirationDate
          )}
        </div>
      ),
    },
    {
      name: "PRECIO",
      width: "210px",
      selector: (row) => (
        <div>
          {editingProductId === row.id ? (
            <input
              className="w-full text-lg p-2 text-black border border-gray-300"
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
            <>${row.price}</>
          )}
        </div>
      ),
    },
    {
      name: "IMAGEN URL",
      width: "210px",
      selector: (row) => (
        <div>
          {editingProductId === row.id ? (
            <input
              className="w-full text-lg p-2 text-black border border-gray-300"
              type="text"
              name="url"
              value={editingProduct.url}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  url: e.target.value,
                })
              }
            />
          ) : (
            row.url.slice(0, 25)
          )}
        </div>
      ),
    },
    {
      name: "EDITAR",
      width: "190px",
      selector: (row) => <div className="p-4">
        {editingProductId === row.id ? (  
        <>
          <button
            className="mr-4 bg-[#4CAF50] rounded-[10px] p-2 text-4xl text-black"
            onClick={onSaveEdit}
          >
            <VscSaveAs />
          </button>
          <button
            className=" bg-red-500 rounded-[10px] p-2 text-4xl text-black"
            onClick={onCancelEdit}
          >
            <GiCancel />
          </button>
        </>
      ) : (
        <button
          className="mr-2 bg-[#FFD658] rounded-[10px] p-2 text-4xl text-black"
          onClick={() => onEdit(row.id)}
        >
          <FaEdit />
        </button>
      )}
      </div>
    },
    {
      name: "ELIMINAR",
      width: "170px",
      selector: (row) => (
        <div>
          <button
            className=" bg-red-500 rounded-[10px] p-2 text-4xl text-black"
            onClick={() => onDeleteProduct(row.id)}
          >
            <AiFillDelete />
          </button>
        </div>
      ),
    },
  ];
  const columnsRegistrar = [
    {
      name: "NOMBRE",
      width: "210px",
      selector: (row) => <div className="text-black"><b>{row.name}</b></div>
    },
    {
      name: "DESCRIPCION",
      width: "210px",
      selector: (row) => <div className="text-black"><b>{row.description}</b></div>
    },
    {
      name: "EXISTENCIAS",
      width: "210px",
      selector: (row) => <div className="text-black"><b>{row.stock}</b></div>
    },
    {
      name: "CADUCIDAD",
      width: "210px",
      selector: (row) => <div className="text-black"><b>{row.expirationDate}</b></div>
    },
    {
      name: "PRECIO",
      width: "210px",
      selector: (row) => <div className="text-black"><b>{row.price}</b></div>
    },
    {
      name: "IMAGEN URL",
      width: "400px",
      selector: (row) => <div className="text-black"><b>{row.url}</b></div>
    },
    {
      name: "AGREGAR",
      width: "150px",
      selector: (row) => <div className="text-black"><b>{row.addProduct}</b></div>
    },
  ];

  const dataRegistrar = [
    {
        name: <div>
          <input
            type="text"
            id="name"
            name="name"
            onChange={ManejarFormulario}
            value={producto.name}
            className="w-full text-lg p-2 border border-gray-300"
          />
        </div>,
        description: <div>
          <input
            type="text"
            id="description"
            name="description"
            onChange={ManejarFormulario}
            value={producto.description}
            className="w-full text-lg p-2 border border-gray-300"
          />
        </div>,
        stock: <div>
          <input
            type="number"
            id="stock"
            name="stock"
            onChange={ManejarFormulario}
            value={producto.stock}
            className="w-full text-lg p-2 border border-gray-300"
          />
        </div>,
        expirationDate: <div>
          <input
            type="date"
            id="expirationDate"
            name="expirationDate"
            onChange={ManejarFormulario}
            value={producto.expirationDate}
            className="w-full text-lg p-2 border border-gray-300"
          />
        </div>,
        price: <div>
          <input
            type="number"
            id="price"
            name="price"
            onChange={ManejarFormulario}
            value={producto.price}
            className="w-full text-lg p-2 border border-gray-300"
          />
        </div>,
        url: <div>
          <input
            type="string"
            id="url"
            name="url"
            onChange={ManejarFormulario}
            value={producto.url}
            className="w-full text-lg p-2 border border-gray-300"
          />
        </div>,
        addProduct: <div className="p-3">
          <button
            className="block bg-[#FFD658] rounded-[10px] p-4 text-xl font-sans font-medium"
            type="submit"
          >
            <GrAdd />
          </button>
        </div>,
    },
]

  return (
    <div className="dark:text-white flex justify-center grid grid-cols-1 divide-y">
      <form onSubmit={registrarInformacion}>
        <DataTable columns={columnsRegistrar} data={dataRegistrar} responsive />
      </form>

      
      <DataTable columns={columns} data={data} pagination responsive />
    </div>
  );
};

export default Productos;
