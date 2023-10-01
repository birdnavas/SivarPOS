import React, {useState, useEffect} from 'react'
import CountdownTimer from './CountdownTimer'
import QRCode from 'react-qr-code'

const QRCard = (props) => {

	const [expired, setExpired] = useState(false);
	console.log(props);

	const timeInSeconds = props.invoiceAndQuote.quote.expirationInSec*1000;
  	const NOW_IN_MS = new Date().getTime();

  	const targetDate = NOW_IN_MS + timeInSeconds;

  	const receiveExpiredNotice = (isExpired) => {
  		setExpired(isExpired);
  	}

	return (
		<div>
			{!expired &&
				<React.Fragment>
					<h3> {props.invoiceAndQuote.quote.targetAmount.currency} : {props.invoiceAndQuote.quote.targetAmount.amount} </h3>
					<div className = 'QR'>
						<QRCode value={props.invoiceAndQuote.quote.lnInvoice}/>
					</div>
					<h3> </h3>
				</React.Fragment>
			}
			<CountdownTimer targetDate={targetDate} floatUpExpiredNotice={receiveExpiredNotice} />
		</div>
		)
}

export default QRCard;

