import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import BarraBusqueda from "./Searchbar";

const Market = (props) => {
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
    <section>
      <BarraBusqueda />
      <div className="flex justify-center p-4 dark:text-black">
        {ListarInformacion.filter((item) => item.id > 0).map((item) => (
          <form
            onSubmit={handleSubmit}
            className="p-4 m-2 mt-5 bg-gray-200 rounded-md shadow-md"
          >
            <img src={item.url} className="w-40" />
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
          </form>
        ))}
      </div>
    </section>
  );
};

export default Market;
