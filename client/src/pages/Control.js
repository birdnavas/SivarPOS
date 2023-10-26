
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5';
import TransactionChart from '../components/TransactionChart';
import BuyerProfilePieChart from '../components/BuyerProfilePieChart';

const Control = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3030/users')
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  return <div className='dark:text-white flex justify-center pl-48 flex flex-col gap-4'>

    <div className="flex gap-4">

      <div className='dark:bg-gray-800 bg-white rounded-sm p-4 flex-1 border dark:border-gray-600 border-gray-200 flex items-center'>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="dark:text-gray-300 text-gray-500 font-bold">Ventas totales</span>
          <div className="flex items-center">
            <strong className="dark:text-gray-400 text-xl text-gray-700 font-semibold">$54232</strong>
            <span className="text-sm text-green-500 pl-2">+343</span>
          </div>
        </div>
      </div>

      <div className='dark:bg-gray-800 bg-white rounded-sm p-4 flex-1 border dark:border-gray-600 border-gray-200 flex items-center'>
      <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
        <IoPieChart className="text-2xl text-white" />
      </div>
      <div className="pl-4">
        <span className="dark:text-gray-300 text-gray-500 font-bold">Gastos</span>
        <div className="flex items-center">
          <strong className="dark:text-gray-400 text-xl text-gray-700 font-semibold">$3423</strong>
          <span className="text-sm text-green-500 pl-2">-343</span>
        </div>
      </div>
      </div>

      <div className='dark:bg-gray-800 bg-white rounded-sm p-4 flex-1 border dark:border-gray-600 border-gray-200 flex items-center'>
      <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
        <IoPeople className="text-2xl text-white" />
      </div>
      <div className="pl-4">
        <span className="dark:text-gray-300 text-gray-500 font-bold">Clientes</span>
        <div className="flex items-center">
          <strong className="dark:text-gray-400 text-xl text-gray-700 font-semibold">12313</strong>
          <span className="text-sm text-red-500 pl-2">-30</span>
        </div>
      </div>
      </div>

      <div className='dark:bg-gray-800 bg-white rounded-sm p-4 flex-1 border dark:border-gray-600 border-gray-200 flex items-center'>
      <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
        <IoCart className="text-2xl text-white" />
      </div>
      <div className="pl-4">
        <span className="dark:text-gray-300 text-gray-500 font-bold">Ordenes totales</span>
        <div className="flex items-center">
          <strong className="dark:text-gray-400 text-xl text-gray-700 font-semibold">16432</strong>
          <span className="text-sm text-red-500 pl-2">-43</span>
        </div>
      </div>
      </div>

    </div>


    <div className="flex flex-row gap-4 w-full">
				<TransactionChart />
				<BuyerProfilePieChart />
			</div>


    <table className='w-[30rem]'>
      <thead className='bg-gray-50 dark:bg-gray-700'>
        <tr>
          <th className='text-center'>Fecha</th>
          <th className='text-center'>Total</th>
          <th className='text-center'>Opciones</th>
          <th></th>
        </tr>
      </thead>
      <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
        {data.map((d, i) => (
          <tr key={i}>
            <td className='text-center'>{d.fecha}</td>
            <td className='text-center'>${d.total}</td>
            <td className='text-center'>

              <Link className='' to={`/read/${d.id}`}>Ver mas</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  </div>
}

export default Control
