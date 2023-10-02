import React from 'react'
import GetAccount from '../components/Lightning/GetAccount.js'
import DisplayAccount from '../components/Lightning/DisplayAccount.js'
import QRCard from '../components/Lightning/QRCard.js'

const Home = (props) => {
    return <div className='dark:text-white flex justify-center'>
        <GetAccount passUpUserInfo={props.acceptUserInfo} />
        {props.userInfo && <DisplayAccount passUpInvoice={props.acceptInvoiceAndQuote} userInfo={props.userInfo} />}
        {props.invoiceAndQuote && <QRCard invoiceAndQuote={props.invoiceAndQuote} />}
        {props.paidIndicator && <h1> Transaccion exitosa. </h1>}
    </div>
}

export default Home
