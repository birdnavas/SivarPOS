import React, {useState, useEffect} from 'react'
import axios from 'axios';

const CreateInvoice = props => {

	const getInvoice = (e) => {
		e.preventDefault();
		console.log(e.target.amountInput.value)

		let data = JSON.stringify({
			"handle": props.handle,
			"amount": e.target.amountInput.value,
			"currency": props.currency
		})

		let config = {
			method: 'post',
			url: '/api/createInvoice',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			data : data
		}

		axios(config)
		.then((response) => {
			console.log(JSON.stringify(response.data))
			props.passUpInvoice(response.data);
		})
		.catch((error) => {
			console.log(error)
		})
	}
	
	return (
		<div className='flex justify-center'>
			<form onSubmit={getInvoice}>
				<div className="InvoiceDetails">
				<label><p>{/*props.currency*/}</p>
					<input type='hidden' step='.00000001' name='amountInput' value={props.totalSum}/>
				</label>
				</div>
				<input className='text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2' type='submit' value='Pagar con Bitcoin o USDT' name='submitButton'/>
			</form>
		</div>
		)
}

export default CreateInvoice;