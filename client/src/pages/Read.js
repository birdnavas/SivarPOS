import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';

function Read() {
  const { id } = useParams();
  const [Data, setData] = useState(null); // Initialize Data as null

  useEffect(() => {
    axios
      .get(`http://localhost:3030/users/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]); // Include 'id' as a dependency

  return (
    <div>
      {Data ? (
        <div>

          {Data.myList ? (
            <div>
              <div id="invoice-POS">

<center id="top">
  <div class="logo"></div>
  <div class="info">
    <h2>Sivar POS</h2>
  </div>
</center>

<div id="mid">
  <div class="info">
    <p>
      Col San Benito #759<br />
      Tel: 22577777<br />
      Transaccion ID: #{Data.id}<br />
      Fecha: {Data.fecha}
    </p>
  </div>
</div>

<div id="bot">

  <div id="table">
    <table>
      <tr className="tabletitle">
        <td className="item"><h2>Qty</h2></td>
        <td className="Hours"><h2>Item</h2></td>
        <td className="Rate"><h2>Precio</h2></td>
      </tr>
      {Data.myList.map((item) => (
      <tr class="service">
        <td className="tableitem"><p className="itemtext">{item.amount} x</p></td>
        <td className="tableitem"><p className="itemtext">{item.product}</p></td>
        <td className="tableitem"><p className="itemtext">${item.price}</p></td>
      </tr>
      ))}

      <tr className="tabletitle">
        <td></td>
        <td className="Rate"><h2>IVA (13%)</h2></td>
        <td className="payment"><h2></h2></td>
      </tr>

      <tr className="tabletitle">
        <td></td>
        <td className="Rate"><h2>Total: USD</h2></td>
        <td className="payment"><h2>$ {Data.total}</h2></td>
      </tr>

    </table>
  </div>

  <div id="legalcopy">
    <p className="legal"><strong>Gracias por su compra!</strong>
      Esta factura es con fines ilustrativos, como referecia de lo que se almacena en factura electronica.</p>
  </div>

</div>
</div>
            </div>
          ) : null}

          <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pl-60' to="/control">Atras</Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Read;
