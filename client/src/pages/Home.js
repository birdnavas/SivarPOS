import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import GetAccount from "../components/Lightning/GetAccount.js";
import DisplayAccount from "../components/Lightning/DisplayAccount.js";
import QRCard from "../components/Lightning/QRCard.js";

const Home = (props) => {
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

  const [myList, setMyList] = useState([]);
  const [formData, setFormData] = useState({
    product: "",
    price: "",
    amount: "1",
  });
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    const cookieValue = Cookies.get("myList");
    const parsedList = cookieValue ? JSON.parse(cookieValue) : [];
    setMyList(parsedList);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
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

  const removeItem = (id) => {
    const updatedList = myList.filter((item) => item.id !== id);
    setMyList(updatedList);
    Cookies.set("myList", JSON.stringify(updatedList), { expires: 7 });
  };

  const deleteAllItems = () => {
    setMyList([]);
    Cookies.remove("myList");
  };

  useEffect(() => {
    // Calculate and update the total sum whenever myList changes
    const sum = myList.reduce((acc, row) => acc + row.price * row.amount, 0);
    setTotalSum(sum);
  }, [myList]);

  const handleAddButtonClick = (itemId) => {
    // Do something with the itemId,
    console.log(`Item with ID ${itemId} added`);
    {
      ListarInformacion.filter((item) => item.id == itemId).map((item) =>
        setFormData({ product: item.name, price: item.price, amount: "1" })
      );
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log("You clicked submit.");
    console.log(formData);
    addItem();
  }

  const updateAmount = (id, increment) => {
    const updatedList = myList.map((item) => {
      if (item.id === id) {
        const newAmount = increment ? item.amount + 1 : item.amount - 1;
        const amount = newAmount >= 1 ? newAmount : 1;
        return {
          ...item,
          amount,
          //amount: increment ? item.amount += 1 : item.amount -= 1,
        };
      }
      return item;
    });
    setMyList(updatedList);
    Cookies.set("myList", JSON.stringify(updatedList), { expires: 7 });
  };

  return (
    <div className="dark:text-white flex justify-center grid grid-cols-1 divide-y">
      <table>
        <thead>
          <tr className="px-4 py-2 text-lg">
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {myList.map((row) => (
            <tr className="text-center" key={row.id}>
              <td>{row.product}</td>
              <td>{row.price}</td>

              <div className="flex justify-center items-center">
                <button
                  onClick={() => updateAmount(row.id, false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                >
                  -
                </button>
                <td>{row.amount}</td>
                <button
                  onClick={() => updateAmount(row.id, true)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ml-2"
                >
                  +
                </button>

              </div>

              <td>
                <button
                  onClick={() => removeItem(row.id)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={deleteAllItems}>Clear</button>
      <p>Total: ${totalSum.toFixed(2)}</p>

      <GetAccount passUpUserInfo={props.acceptUserInfo} />
      {props.userInfo && (
        <DisplayAccount
          passUpInvoice={props.acceptInvoiceAndQuote}
          userInfo={props.userInfo}
          totalSum={totalSum}
        />
      )}
      {props.invoiceAndQuote && (
        <QRCard invoiceAndQuote={props.invoiceAndQuote} />
      )}
      {props.paidIndicator && <h1> Transaccion exitosa. </h1>}
    </div>
  );
};

export default Home;
