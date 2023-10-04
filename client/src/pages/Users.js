import React from 'react'

const Users = (props) => {
 
    return <div className='dark:text-white flex justify-center  gap-12'>

        <form onSubmit={props.registrarInformacion} className=' bg-white-100 p-4 my-200' >
            <label for="nombre" class="block text-gray-700 font-bold mb-2">Nombre</label>
            <input
                type="text"
                id="nombre"
                name="nombre"
                class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Escribe tu nombre" onChange={props.ManejarFormulario} value={props.formulario.title} require

                
            />
            <div class="mb-4">
                <label for="correo" class="block text-gray-700 font-bold mb-2">Cuenta</label>
                <input
                    type="email"
                    id="correo"
                    name="correo"
                    class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="cuenta wallet" onChange={props.ManejarFormulario} value={props.formulario.description} required
                />
                </div>

                <div class="flex items-center justify-between">
                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300">Enviar</button>
                </div>
        </form>






        <table className='table-fixed '>
            <thead>
                <tr>
                    <th className="px-[2rem] py-3 bg-[#3853DA] text-white border-b border-gray-300">Rol</th>
                    <th className="px-[2rem] py-3 bg-[#3853DA] text-white border-b border-gray-300">Nombre</th>
                    <th className="px-[2rem] py-3 bg-[#3853DA] text-white border-b border-gray-300">Direccion</th>
                </tr>
            </thead>
            <tbody>

                {props.ListarInformacion.map((item) => (

                    <tr key={item.id}>
                        <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded pt-2 border-b border-black-100" onClick={() => props.cambioEstadoTarea(item.id)}>
                            {item.done ? 'Gerente' : 'Cajero'}
                        </button></td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                    </tr>

                ))}

            </tbody>
        </table>

    </div>
}

export default Users