import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
	{
		name: 'Ene',
		Gasto: 4000,
		Ingreso: 2400
	},
	{
		name: 'Feb',
		Gasto: 3000,
		Ingreso: 1398
	},
	{
		name: 'Mar',
		Gasto: 2000,
		Ingreso: 9800
	},
	{
		name: 'Abr',
		Gasto: 2780,
		Ingreso: 3908
	},
	{
		name: 'May',
		Gasto: 1890,
		Ingreso: 4800
	},
	{
		name: 'Jun',
		Gasto: 2390,
		Ingreso: 3800
	},
	{
		name: 'Jul',
		Gasto: 3490,
		Ingreso: 4300
	},
	{
		name: 'Ago',
		Gasto: 2000,
		Ingreso: 9800
	},
	{
		name: 'Sep',
		Gasto: 2780,
		Ingreso: 3908
	},
	{
		name: 'Oct',
		Gasto: 1890,
		Ingreso: 4800
	},
	{
		name: 'Nov',
		Gasto: 2390,
		Ingreso: 3800
	},
	{
		name: 'Dic',
		Gasto: 3490,
		Ingreso: 4300
	}
]

export default function TransactionChart() {
	return (
		<div className="dark:bg-gray-800 h-[22rem] bg-white p-4 rounded-sm border dark:border-gray-600 border-gray-200 flex flex-col flex-1">
			<strong className="dark:text-white text-gray-700 font-medium">Transacciones</strong>
			<div className="mt-3 w-full flex-1 text-xs">
				<ResponsiveContainer width="99%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 20,
							right: 10,
							left: -10,
							bottom: 0
						}}
					>
						<CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="Ingreso" fill="#0ea5e9" />
						<Bar dataKey="Gasto" fill="#ea580c" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
