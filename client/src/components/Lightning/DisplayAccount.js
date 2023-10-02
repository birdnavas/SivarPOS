import React, {useState, useEffect} from 'react'
import CreateInvoice from './CreateInvoice.js'
import CountdownTimer from './CountdownTimer.js'

const DisplayAccount = props => {

	const [handle, setHandle] = useState();
	const [canReceive, setCanReceive] = useState();
	const [currencyDisplay, setCurrencyDisplay] = useState();
	const [invoiceAndQuote, setInvoiceAndQuote] = useState();

	const passUpInvoice = (invoiceAndQuote) => {
		setInvoiceAndQuote(invoiceAndQuote);
		props.passUpInvoice(invoiceAndQuote);
	}

	useEffect(()=>{
		if (props.userInfo) {
			console.log(props.userInfo);
			setHandle(props.userInfo.handle);
			setCanReceive(props.userInfo.canReceive? 'True' : 'False');

			setCurrencyDisplay(
				props.userInfo.currencies.map(curr=> {
					if (curr.isInvoiceable && curr.currency == "USDT"){
					return (
						<div className='CurrencyDisplay' key={curr.currency}>
							<CreateInvoice currency={curr.currency} 
								handle={props.userInfo.handle}
								passUpInvoice={passUpInvoice}
								/>
						</div>
						)
					} 
				}))
		}
		
	}, [props])

	return (
		<div>
			<div className='DisplayAccount'>
				<div>
					<p> {/*handle*/} </p>
				</div>

				<div>
					<p> {/*canReceive*/} </p>
				</div>
			</div>
		{!invoiceAndQuote && currencyDisplay}
		</div>
		)
}

export default DisplayAccount;