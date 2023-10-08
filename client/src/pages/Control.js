import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const URI = "http://localhost:8000/factura/";

const Control = () => {
    const [fecha, setFecha] = useState("");
    const [monto, setMonto] = useState("");
    const [cliente, setCliente] = useState("");
    const navigate = useNavigate();

    //procedimiento guardar
    const store = async (e) => {
        e.preventDefault();
        await axios.post(URI, { fecha: fecha, monto: monto, cliente: cliente });
        navigate("/");
    };

    const [factura, setFactura] = useState([]);
    useEffect(() => {
        getFactura();
    }, []);

    //procedimineto para mostrar todos las facturas
    const getFactura = async () => {
        const respuesta = await axios.get(URI);
        setFactura(respuesta.data);
    };

    //procedimineto para eliminar una factura
    const deleteFactura = async (id) => {
        await axios.delete(`${URI}${id}`);
        getFactura();
    };

    return <div className='dark:text-white flex justify-center'>

<div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <form onSubmit={store}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="fecha">Fecha</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={fecha} onChange={(e) => setFecha(e.target.value)} id="fecha" type="date" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="monto">Monto</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={monto} onChange={(e) => setMonto(e.target.value)} id="monto" type="number" placeholder="$0.00" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="cliente">Cliente</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={cliente} onChange={(e) => setCliente(e.target.value)} id="cliente" type="text" placeholder="Nombre del cliente" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-[#162157] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                            <i className="fas fa-paper-plane mr-2"></i>
                            Enviar
                        </button>
                    </div>
                </form>
            </div>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 border">ID</th>
                        <th className="px-4 py-2 border">FECHA</th>
                        <th className="px-4 py-2 border">MONTO</th>
                        <th className="px-4 py-2 border">CLIENTE</th>
                        <th className="px-4 py-2 border"></th>
                    </tr>
                </thead>
                <tbody>
                    {factura.map((datos) => (
                        <tr key={datos.id}>
                            <td className="px-4 py-2 border">{datos.id}</td>
                            <td className="px-4 py-2 border">{datos.fecha}</td>
                            <td className="px-4 py-2 border">{datos.monto}</td>
                            <td className="px-4 py-2 border">{datos.cliente}</td>
                            <td className="px-4 py-2 border flex justify-center items-center space-x-4">

                                <button
                                    onClick={() => deleteFactura(datos.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center cursor-not-allowed opacity-50" disabled
                                >
                                    <i className="fas fa-trash-alt mr-2"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

    </div>
}

export default Control
