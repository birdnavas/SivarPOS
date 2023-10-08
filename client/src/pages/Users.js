import React from 'react'

const Users = (props) => {
 
    return <div className='flex justify-center gap-12 dark:text-white'>

        <form onSubmit={props.registrarInformacion} className='p-4 bg-white-100 my-200' >
            <label for="nombre" class="block text-gray-700 font-bold mb-2">Nombre</label>
            <input
                type="text"
                id="title"
                name="title"
                class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Escribe tu nombre" 
                onChange={props.ManejarFormulario} 
                value={props.formulario.title} 
                require

            />
            <div class="mb-4">
                <label for="correo" class="block text-gray-700 font-bold mb-2">Cuenta</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Cuenta wallet" onChange={props.ManejarFormulario} value={props.formulario.description} required
                />
                </div>

                <div class="flex items-center justify-between">
                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300">Enviar</button>
                </div>
        </form>

        <table className='table-auto'>
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
                        <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-[100px]" onClick={() => props.cambioEstadoTarea(item.id)}>
                            {item.done ? 'Gerente' : 'Cajero'}
                        </button></td>
                        <td className='border rounded-lg table-auto border-slate-200 ' >{item.title}</td>
                        <td className='border rounded-lg table-auto border-slate-200 '>{item.description}</td>
                    </tr>

                ))}

            </tbody>
        </table>

    </div>
}

export default Users