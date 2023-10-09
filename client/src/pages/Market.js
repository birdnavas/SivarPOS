import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import BarraBusqueda from "./Searchbar";


const Market = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [search, setsearch] = useState("");
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
    setsearch(e.target.value)
    setListarInformacion(allProducts);
    console.log(allProducts, "allProducts");

    //Filtrar productos de un array de objetos por coincidencia de letras
    const value = e.target.value.toLowerCase();
    const filter = allProducts.filter((product) => {
      return product.name.toLowerCase().includes(value);
    });

    console.log(filter,"filter")

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

  const handleAddButtonClick = (itemId) => {
    // Do something with the itemId,
    console.log(`Item with ID ${itemId} added`);
    {
      ListarInformacion.filter((item) => item.id == itemId).map((item) =>
        setFormData({ product: item.name, price: item.price, amount: "1" })
      );
    }
  };

  const addItem = () => {
    const id = myList.length + 1;
    const { product, price, amount } = formData;
    if (product && price && amount) {
      // Check if all fields are filled
      const newRow = { id, product, price, amount: parseInt(amount, 10) };
      const updatedList = [...myList, newRow];
      setMyList(updatedList);
      Cookies.set("myList", JSON.stringify(updatedList), { expires: 7 });
      // Clear the form after adding an item
      setFormData({ product: "", price: "", amount: "1" });
    }
  };

  const [myList, setMyList] = useState([]);
  const [formData, setFormData] = useState({
    product: "",
    price: "",
    amount: "1",
  });

  return (
    <div className="flex flex-wrap">

      <div className="bg-opacity-300 rounded-xl flex justify-center items-center w-full">
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
    
      <div className="dark:text-black w-full flex flex-wrap">
        {ListarInformacion.filter((item) => item.id > 0).map((item) => (
          <div
            className="p-3 mt-5 w-1/4"
          >
<<<<<<< HEAD
            <div className="bg-gray-200 p-3 rounded-md shadow-lg">
              <img src={item.url} className="w-full" />
              <p className="text-xl font-semibold text-center">{item.name}</p>
              <p className="text-lg text-center">{item.price}</p>
              <div className="flex justify-center">
                <button
                  onClick={() => handleAddButtonClick(item.id)}
                  className=" flex justify-center px-4 text-center py-2 mt-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
                >
                  Agregar +
                </button>
              </div>
=======
            <img src={item.url} className="w-40" />
            <p className="text-xl font-semibold text-center">{item.name}</p>
            <p className="text-lg text-center">${item.price}</p>
            <div className="flex justify-center">
              <button
                onClick={() => handleAddButtonClick(item.id)}
                className=" flex justify-center px-4 text-center py-2 mt-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
              >
                Agregar +
              </button>
>>>>>>> 976a13495e82558c53d010c693aba0966e22e0c2
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;
