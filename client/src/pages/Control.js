
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Control = () => {
    const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3030/users')
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

    return <div className='dark:text-white flex justify-center'>
        
        <table className=''>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.fecha}</td>
                <td>${d.total}</td>
                <td>

                  <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' to={`/read/${d.id}`}>Ver</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

    </div>
}

export default Control
