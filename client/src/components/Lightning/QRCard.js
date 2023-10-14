import React, {useState, useEffect} from 'react'
import CountdownTimer from './CountdownTimer.js'
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
					<div className='flex justify-center'>
						<div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow mt-10 dark:bg-gray-800 dark:border-gray-700">
							<div className="flex flex-col justify-center items-center p-10 shadow-lg">
								<QRCode className='mb-3 flex justify-center items-center' value={props.invoiceAndQuote.quote.lnInvoice} size={200} />
								<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{props.invoiceAndQuote.quote.targetAmount.currency} : {props.invoiceAndQuote.quote.targetAmount.amount}</h5>
								<span className="text-lg text-gray-500 dark:text-gray-400 flex">
									<CountdownTimer targetDate={targetDate} floatUpExpiredNotice={receiveExpiredNotice} />
								</span>
							</div>
						</div>
					</div>
				</React.Fragment>
			}
			
		</div>
		)
}

export default QRCard;

