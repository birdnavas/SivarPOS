import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

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
    <div className="dark:text-black flex justify-center">
  {ListarInformacion.filter((item) => item.id > 0).map((item) => (
    <form onSubmit={handleSubmit} className="bg-gray-200 p-4 rounded-md shadow-md m-2">
      <p className="text-center text-xl font-semibold">{item.name}</p>
      <p className="text-center text-lg">{item.price}</p>
      <button
        onClick={() => handleAddButtonClick(item.id)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2"
      >
        Agregar +
      </button>
    </form>
  ))}
</div>

  );
};

export default Market;
