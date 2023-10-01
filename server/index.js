
const express = require("express");
const path = require('path');
const bodyParser = require("body-parser")
require('dotenv').config();
const http = require('http');
const {Server} = require('socket.io');
const axios = require('axios');

const PORT = process.env.PORT || 3001;

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.post("/api/getAccount", (req, res) => {
	  //console.log(req.body);
	  let config = {
	  method: 'get',
	  url: `https://api.strike.me/v1/accounts/handle/${req.body.handle}/profile`,
	  headers: { 
	    'Accept': 'application/json', 
	    'Authorization': 'Bearer 316DAAA697BD8F4229A7365863AFADD333795089C9EF0715BE2033B7747805F8'
	  	}
	  };

	axios(config)
	.then((response) => {
	  console.log(JSON.stringify(response.data));
	  res.json(response.data)
	})
	.catch((error) => {
	  console.log(error);
	  res.json('error')
	});

});

app.post("/api/createInvoice", async function(req, res) {
	console.log(req.body);
	let data = JSON.stringify({
		'correlationId' : Math.random()*1000,
		'description': req.body.description,
		'amount': {
			'currency': req.body.currency,
			'amount': req.body.amount
		}
	})

	let config = {
		method: 'post',
		url: `https://api.strike.me/v1/invoices/handle/${req.body.handle}`,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer 316DAAA697BD8F4229A7365863AFADD333795089C9EF0715BE2033B7747805F8'
		},
		data : data
	}

	try {
		let invoiceResponse = await axios(config);
		console.log(invoiceResponse.data);

		let quoteResponse = await getQuote(invoiceResponse.data.invoiceId)
		console.log(quoteResponse)

		let invoiceAndQuote = {
			invoice: invoiceResponse.data,
			quote: quoteResponse
		}

		res.json(invoiceAndQuote)

	} catch(err) {
		console.log(err.response.config.data)
		res.json(err.response.config.data);
	}
})

const getQuote = async function(invoiceId) {

	let config = {
		method: 'post',
		url: `https://api.strike.me/v1/invoices/${invoiceId}/quote`,
		headers: {
			'Accept': 'application/json',
			'Content-Length': '0',
			'Authorization': 'Bearer 316DAAA697BD8F4229A7365863AFADD333795089C9EF0715BE2033B7747805F8'
		}
	}

	try{
		let quoteResponse = await axios(config);
		return quoteResponse.data;

	} catch(err) {
		console.log(err.response.config.data)
		return err.response.config.data;
	}
}

app.post("/hook", async function(req, res) {
  console.log(req.body) 
  res.status(200).end() 

  if (req.body.eventType == 'invoice.created') {
  	return;
  }

  if (req.body.data.changes[0] == 'state') {
  	console.log(`state changed on ${req.body.data.entityId}`);
  	let invoiceStatus = await getInvoiceStatus(req.body.data.entityId);
  	console.log(`invoiceId: ${req.body.data.entityId} : ${invoiceStatus}`)
  	io.emit('message', {invoiceId: req.body.data.entityId, status: invoiceStatus})
  }
})

const getInvoiceStatus = async function(invoiceId) {

	let config = {
		method: 'get',
		url: `https://api.strike.me/v1/invoices/${invoiceId}`,
		headers: {
			'Accept': 'application/json',
			'Authorization': 'Bearer 316DAAA697BD8F4229A7365863AFADD333795089C9EF0715BE2033B7747805F8'
		}
	}

	try{
		let response = await axios(config);
		console.log(response.data)
		return response.data.state;

	} catch(err) {
		console.log(err.response.config.data)
		return err.response.config.data;
	}
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.id);
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});