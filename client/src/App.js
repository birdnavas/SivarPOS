import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import GetAccount from "./components/Lightning/GetAccount.js";
import DisplayAccount from "./components/Lightning/DisplayAccount.js";
import QRCard from "./components/Lightning/QRCard.js";

import Web3 from "web3";
import smartContractProductos from "./contratos/productos.json";
import smartContractUsers from "./contratos/usuarios.json";

import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Productos from "./pages/Productos.jsx";
import Ventas from "./pages/Ventas.js";
import Recibos from "./pages/Recibos.js";
import Control from "./pages/Control.js";
import Users from "./pages/Users.js";
import Tienda from "./pages/Market.js";

import Read from "./pages/Read.js";

function App() {
  const [Metamask, setMetamask] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [accountshow, setAccountshow] = useState(null);
  const [balanceshow, setBalanceshow] = useState(null);
  const [contractProductos, setContractproductos] = useState();
  const [contractUsers, setContractUsers] = useState();
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
        setAccountshow(accounts[0].slice(0, 6) + "..." + accounts[0].slice(-4));

        const balanceWei = await web3Instance.eth.getBalance(accounts[0]);
        const balanceEth = web3Instance.utils.fromWei(balanceWei, "ether");
        console.log(balanceEth);

        setBalance(balanceEth);
        setBalanceshow(balanceEth.slice(0, 5));

        const contractproductosInstance = new web3Instance.eth.Contract(
          smartContractProductos,
          smartContractProductos && "0x104366ADA081D44d3C3dCc518b120f2b2F19Dedc"
        );
        setContractproductos(contractproductosInstance);

        const contractusersInstance = new web3Instance.eth.Contract(
          smartContractUsers,
          smartContractUsers && "0xAEfC6e7728FcdEb8a3c022c78965dCC1dFF0F79f"
          // ! VIEJO COTRATO smartContractUsers && "0xE213BD7f3e7B3Ca7f3c73c4C67d594BD499c5e9f"
        );
        setContractUsers(contractusersInstance);
      } catch (error) {
        console.error(error);
      }
    } else {
      setMetamask(false);
    }
  };
  {
    /*-------------------------------------SMARTCONTRACT--USUARIOS------------------------------------------------------*/
  }
  const ListarRegistros = async () => {
    if (contractUsers) {
      try {
        const taskCounter = await contractUsers.methods.userCounter().call();

        let arrayUsuarios = [];

        for (let i = 0; i <= taskCounter; i++) {
          const infoUsuario = await contractUsers.methods.users(i).call();

          if (infoUsuario.name !== "") {
            const usuario = {
              name: infoUsuario.name,
              creatAtl: infoUsuario.creatAtl,
              id: infoUsuario.id,
              walletAddress: infoUsuario.walletAddress,
              registered: infoUsuario.registered,
            };
            //console.log(tarea);
            arrayUsuarios.push(usuario);
          }
        }
        //console.log(arrayTarea);
        setListarInformacion(arrayUsuarios);
      } catch (error) {
        console.error("Error al actualizar valor:", error);
      }
    }
  };

  const Autenticacion = async () => {
    if (contractUsers) {
      const taskCounter = await contractUsers.methods.userCounter().call();
      for (let i = 0; i <= taskCounter; i++) {
        const temp = await contractUsers.methods.users(i).call();
        console.log(temp.done);
        if (temp.walletAddress === account) {
          setCajero(true);
        }

        if (temp.description === account && temp.done === true) {
          setGerente(true);
        }
      }
    }
  };

  const estadoInicialFormulario = {
    name: "",
    walletAddress: "",
  };

  const registrarInformacion = async (e) => {
    e.preventDefault();

    try {
      const result = await contractUsers.methods
        .registerUser(formulario.name, formulario.walletAddress)
        .send({ from: account });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const ManejarFormulario = ({ target: { name, value } }) => {
    setFormulario({ ...formulario, [name]: value });
  };

  const [formulario, setFormulario] = useState(estadoInicialFormulario);

  const cambioEstadoTarea = async (userId) => {
    if (contractUsers && account) {
      try {
        await contractUsers.methods
          .changeStatus(userId)
          .send({ from: account });
        ListarRegistros();
      } catch (error) {
        console.error("Error al cambiar estado:", error);
      }
    }
  };

  useEffect(() => {
    ListarRegistros();
  }, [contractUsers]);

  useEffect(() => {
    Autenticacion();
  }, [contractUsers]);
  {
    /*-------------------------------------SMARTCONTRACT--USUARIOS------------------------------------------------------*/
  }

  useEffect(() => {
    conectarWallet();
    async function Wallet() {
      if (typeof window.ethereum !== "undefined") {
        console.log("Wallet: SI.");
        setMetamask(true);
      } else {
        console.log("Wallet: NO");
      }
    }
    Wallet();
  }, []);

  const socket = io();

  const [userInfo, setUserInfo] = useState();
  const [invoiceAndQuote, setInvoiceAndQuote] = useState();
  const [paidIndicator, setPaidIndicator] = useState(false);

  socket.on("message", (res) => {
    //console.log(res);
    handleSocketMessage(res);
  });

  const handleSocketMessage = (res) => {
    if (
      res.invoiceId === invoiceAndQuote.invoice.invoiceId &&
      res.status === "PAID"
    ) {
      setPaidIndicator(true);
      setInvoiceAndQuote(null);
    }
  };

  const acceptUserInfo = (uInfo) => {
    //console.log(uInfo);
    setUserInfo(uInfo);
  };

  const acceptInvoiceAndQuote = (invoiceObject) => {
    //console.log(invoiceObject);
    setInvoiceAndQuote(invoiceObject);
    setPaidIndicator(false);
  };

  return (
    <div className="dark:text-white">
      <BrowserRouter>
        <Layout Gerente={Gerente} accountshow={accountshow} account={account}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  account={account}
                  contractproductos={contractProductos}
                  acceptUserInfo={acceptUserInfo}
                  userInfo={userInfo}
                  acceptInvoiceAndQuote={acceptInvoiceAndQuote}
                  invoiceAndQuote={invoiceAndQuote}
                  paidIndicator={paidIndicator}
                />
              }
            />
            <Route
              path="/productos"
              element={
                <Productos
                  account={account}
                  contractProductos={contractProductos}
                />
              }
            />
            <Route
              path="/tienda"
              element={
                <Tienda
                  account={account}
                  contractproductos={contractProductos}
                />
              }
            />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/recibos" element={<Recibos />} />
            <Route path="/control" element={<Control />} />
            <Route
              path="/users"
              element={
                <Users
                  registrarInformacion={registrarInformacion}
                  ManejarFormulario={ManejarFormulario}
                  formulario={formulario}
                  ListarInformacion={ListarInformacion}
                  cambioEstadoTarea={cambioEstadoTarea}
                />
              }
            />
            <Route path="/read/:id" element={<Read />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
