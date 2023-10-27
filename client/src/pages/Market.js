import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import BarraBusqueda from "./Searchbar";
import StartToastifyInstance from "toastify-js";
import ReactPaginate from "react-paginate"; // Importa el paquete by bladimir
import { useGlobalState } from "../components/GlobalState";

const Market = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [search, setsearch] = useState("");
  const [ListarInformacion, setListarInformacion] = useState([]);
  /*- By Bladimir ----*/
  const [currentPage, setCurrentPage] = useState(0); // Agrega un estado para la página actual
  const PER_PAGE = 10; // Define cuántos elementos quieres por página
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(ListarInformacion.length / PER_PAGE); // Calcula el número total de páginas
  const [myList, setMyList] = useState([]);
  const [formData, setFormData] = useState({
    product: "",
    price: "",
    amount: "1",
  });

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  /*- fin By Bladimir ----*/
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
            arrayTarea.push(tarea);
          }
        }
        console.log(arrayTarea, "1");
        setListarInformacion(arrayTarea);
        setAllProducts(arrayTarea);
      } catch (error) {
        console.error("Error al actualizar valor:", error);
      }
    }
  };

  const searcher = (e) => {
    setsearch(e.target.value);
    setListarInformacion(allProducts);
    console.log(allProducts, "allProducts");

    //Filtrar productos de un array de objetos por coincidencia de letras
    const value = e.target.value.toLowerCase();
    const filter = allProducts.filter((product) => {
      return product.name.toLowerCase().includes(value);
    });

    console.log(filter, "filter");

    setListarInformacion(filter);
  };

  useEffect(() => {
    ListarRegistros();
  }, [props.contractproductos]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("You clicked submit.");
    console.log(formData);
    addItem();
  }
  const {globalState, setGlobalState} = useGlobalState();
  const handleAddButtonClick = (itemId) => {
    // Do something with the itemId,
    setGlobalState(globalState + 1)
    console.log(`Item with ID ${itemId} added`);
    {
      ListarInformacion.filter((item) => item.id == itemId).map((item) =>
        setFormData({ product: item.name, price: item.price, amount: "1" })
      );
    }
    StartToastifyInstance({
      text: "Agregado al carrito",

      position: "center",

      duration: 3000,
    }).showToast();
  };

  const addItem = () => {
    const id = JSON.parse(Cookies.get("myList")).length + 1;
    const { product, price, amount } = formData;
    if (product && price && amount) {
      // Check if all fields are filled

      let cookieValue = JSON.parse(Cookies.get("myList"));

      const ArrayAnterior = [];

      const ArrayNuevo = [];

      cookieValue.map((item) => {
        ArrayAnterior.push(item);
      })

      let contador = 0;

      ArrayAnterior.map((item) => {
        contador = contador + 1;
        ArrayNuevo.push({ id: contador, product: item.product, price: item.price, amount: parseInt(item.amount, 10)})
      })

      const newRow = { id, product, price, amount: parseInt(amount, 10) };

      console.log(cookieValue, "Holaaaaaa")

      ArrayNuevo.push(newRow)

      console.log(ArrayNuevo, "Holaaaaaafbsjfsd")

      setMyList(ArrayNuevo);
      Cookies.set("myList", JSON.stringify(ArrayNuevo), { expires: 7 });
      // Clear the form after adding an item
      setFormData({ product: "", price: "", amount: "1" });

      console.log(formData, "Form data")
    }
  };

  

  return (
    <div className="flex flex-wrap pl-48">
      <div className="bg-opacity-300 rounded-xl flex justify-center items-center w-full">
        <input
          value={search}
          onChange={searcher}
          className="dark:bg-gray-600 mx-auto rounded-md w-[40rem] focus:outline-none text-center p-2 bg-slate-100 focus:border-2 focus:transition"
          type="search"
          name="search"
          placeholder="Buscar"
        />
        <button
          type="submit"
          className="absolute top-0 right-0 mr-4 mt-7"
        ></button>
      </div>

      <div className="dark:text-black w-full flex flex-wrap">
        {/*Inicia modificacion by Bladimir*/}
        {ListarInformacion.slice(offset, offset + PER_PAGE) // Muestra solo los elementos de la página actual
          .filter((item) => item.id > 0)
          .map((item /*Fin modificacion by Bladimir*/) => (
            <form
              onSubmit={handleSubmit}
              className="dark:bg-gray-600 p-3 m-2 mt-5 bg-gray-200 border border-indigo-300 rounded shadow-xl"
            >
              <img src={item.url} className="w-40" />
              <p className="dark:text-white text-xl font-semibold text-center">{item.name}</p>
              <hr/>
              <p className="dark:text-white text-lg text-center">{item.description}</p>
              <p className="text-lg text-center bg-gray-400 dark:bg-gray-500 text-white font-bold rounded-full">${item.price}</p>
              <div className="flex justify-center">
                <button
                  onClick={() => handleAddButtonClick(item.id)}
                  className=" flex justify-center px-4 text-center py-2 mt-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
                >
                  Agregar +
                </button>
              </div>
            </form>
          ))}
      </div>
      {/* Inicia modificacion by Bladimir*/}
      <div className="flex justify-center items-center w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 mx-auto">
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Siguiente"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"flex items-center justify-center my-4 space-x-3"}
          pageLinkClassName={
            "px-3 py-2 border rounded text-blue-500 hover:bg-blue-500 hover:text-white"
          }
          previousLinkClassName={
            "px-3 py-2 border rounded text-blue-500 hover:bg-blue-500 hover:text-white"
          }
          nextLinkClassName={
            "px-3 py-2 border rounded text-blue-500 hover:bg-blue-500 hover:text-white"
          }
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"text-white"}
        />
      </div>
      {/* Inicia modificacion by Bladimir*/}
    </div>
  );
};

export default Market;
