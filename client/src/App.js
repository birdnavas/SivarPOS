import React, { useState, useEffect } from 'react'
import io from 'socket.io-client';
import GetAccount from './components/Lightning/GetAccount.js'
import DisplayAccount from './components/Lightning/DisplayAccount.js'
import QRCard from './components/Lightning/QRCard.js'

import Web3 from "web3";
//import smartContractRegistro from "";
import smartContractUsers from "./contratos/usuarios.json";

import Layout from './components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Productos from './pages/Productos.js'
import Ventas from './pages/Ventas.js'
import Recibos from './pages/Recibos.js'
import Control from './pages/Control.js'
import Users from './pages/Users.js';

function App() {


  const [Metamask, setMetamask] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [accountshow, setAccountshow] = useState(null);
  const [balanceshow, setBalanceshow] = useState(null);
  //const [contract, setContract] = useState();
  const [contractusers, setContractUsers] = useState();
  const [Gerente, setGerente] = useState();
  const [Cajero, setCajero] = useState();
  const [ListarInformacion, setListarInformacion] = useState([]);


  const conectarWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      try {
        await window.ethereum.enable();

        const accounts = await web3Instance.eth.getAccounts();
        console.log(accounts[0]);

        setAccount(accounts[0]);
        setAccountshow(accounts[0].slice(0, 6) + '...' + accounts[0].slice(-4));

        const balanceWei = await web3Instance.eth.getBalance(accounts[0]);
        const balanceEth = web3Instance.utils.fromWei(balanceWei, "ether");
        console.log(balanceEth);

        setBalance(balanceEth);
        setBalanceshow(balanceEth.slice(0, 5));

        //const contractInstance = new web3Instance.eth.Contract(
        //  smartContractRegistro,
        //  smartContractRegistro && ""
        //);
        //setContract(contractInstance);
        // console.log("contractInstance ==>", contractInstance);


        const contractusersInstance = new web3Instance.eth.Contract(
          smartContractUsers,
          smartContractUsers && "0xa067b8b63e809eCdDdD51a99d255100551e28F42"
        );
        setContractUsers(contractusersInstance);

      } catch (error) {
        console.error(error);
      }
    } else {
      setMetamask(false);
    }
  };

  const ListarRegistros = async () => {

    if (contractusers) {
      try {
        const taskCounter = await contractusers.methods.taskCounter().call();

        let arrayTarea = [];

        for (let i = 0; i <= taskCounter; i++) {
          const infotarea = await contractusers.methods.tasks(i).call();

          if (infotarea.title != "") {
            const tarea = {
              title: infotarea.title,
              creatAtl: infotarea.creatAtl,
              id: infotarea.id,
              description: infotarea.description,
              done: infotarea.done,
            };
            //console.log(tarea);
            arrayTarea.push(tarea);
          }
        };
        //console.log(arrayTarea);
        setListarInformacion(arrayTarea);

      } catch (error) {
        console.error('Error al actualizar valor:', error);
      }
    }
  };

  const Autenticacion = async () => {
    if (contractusers) {
      const taskCounter = await contractusers.methods.taskCounter().call();
      for (let i = 0; i <= taskCounter; i++) {
        const temp = await contractusers.methods.tasks(i).call();
        console.log(temp.done)
        if (temp.description == account) {
          setCajero(true)
        }

        if (temp.description == account && temp.done == true) {
          setGerente(true)
        } else {
          //setAcceso(false)
        }
      }
    }
  };

  const estadoInicialFormulario = {
    title: "",
    description: "",
  };

  const registrarInformacion = async (e) => {
    e.preventDefault();
    //console.log(formulario);

    try {
      const result = await contractusers.methods.createTask(formulario.title, formulario.description,).send({ from: account });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const ManejarFormulario = ({ target: { name, value } }) => {

    setFormulario({ ...formulario, [name]: value });

  };

  const [formulario, setFormulario] = useState(estadoInicialFormulario);

  const cambioEstadoTarea = async (taskId) => {
    if (contractusers && account) {
      try {
        await contractusers.methods.cambioEstado(taskId).send({ from: account });
        ListarRegistros(); // Refresco
      } catch (error) {
        console.error('Error al cambiar estado:', error);
      }
    }
  };

  useEffect(() => { ListarRegistros(); }, [contractusers]);

  useEffect(() => { Autenticacion(); }, [contractusers]);

  useEffect(() => {
    conectarWallet();
    async function Wallet() {
      if (typeof window.ethereum !== "undefined") {
        console.log("Wallet: SI.");
        setMetamask(true);
      } else {
        console.log("Wallet: NO");
      }
    } Wallet();
  }, []);



  const socket = io();

  const [userInfo, setUserInfo] = useState();
  const [invoiceAndQuote, setInvoiceAndQuote] = useState();
  const [paidIndicator, setPaidIndicator] = useState(false);

  socket.on('message', (res) => {
    //console.log(res);
    handleSocketMessage(res);
  })

  const handleSocketMessage = (res) => {
    if (res.invoiceId == invoiceAndQuote.invoice.invoiceId && res.status == 'PAID') {
      setPaidIndicator(true);
      setInvoiceAndQuote(null);
    }
  }

  const acceptUserInfo = (uInfo) => {
    //console.log(uInfo);
    setUserInfo(uInfo);
  }

  const acceptInvoiceAndQuote = (invoiceObject) => {
    //console.log(invoiceObject);
    setInvoiceAndQuote(invoiceObject);
    setPaidIndicator(false);
  }

  return (
    <div className="className='dark:text-white'">
      <BrowserRouter>
        <Layout Gerente={Gerente} accountshow={accountshow}>
          <Routes>
            <Route path='/' element={<Home
              acceptUserInfo={acceptUserInfo}
              userInfo={userInfo}
              acceptInvoiceAndQuote={acceptInvoiceAndQuote}
              invoiceAndQuote={invoiceAndQuote}
              paidIndicator={paidIndicator} />} />
            <Route path='/productos' element={<Productos />} />
            <Route path='/ventas' element={<Ventas />} />
            <Route path='/recibos' element={<Recibos />} />
            <Route path='/control' element={<Control />} />
            <Route path='/users' element={<Users registrarInformacion={registrarInformacion}
              ManejarFormulario={ManejarFormulario}
              formulario={formulario}
              ListarInformacion={ListarInformacion}
              cambioEstadoTarea={cambioEstadoTarea} />} />
          </Routes>
        </Layout>
      </BrowserRouter>

    </div>
  );
}

export default App;