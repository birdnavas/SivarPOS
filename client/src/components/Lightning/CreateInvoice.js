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
		<div className="CreateInvoice">
			<form onSubmit={getInvoice}>
				<div className="InvoiceDetails">
				<label><p>{/*props.currency*/}</p>
					<input type='hidden' step='.00000001' name='amountInput' value={props.totalSum}/>
				</label>
				</div>
				<input className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' type='submit' value='PAGAR' name='submitButton'/>
			</form>
		</div>
		)
}

export default CreateInvoice;