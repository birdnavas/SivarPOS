const axios = require('axios');
let data = JSON.stringify({
  "webhookUrl": "https://abdf-179-51-59-115.ngrok.io/hook",
  "webhookVersion": "v1",
  "secret": "ScKc2Phr37RzfESKGYPh6CnZqNxc9t",
  "enabled": true,
  "eventTypes": [
    "invoice.created",
    "invoice.updated"
  ]
});

let config = {
  method: 'post',
  url: 'https://api.strike.me/v1/subscriptions',
  headers: { 
    'Content-Type': 'application/json', 
    'Accept': 'application/json', 
    'Authorization': 'Bearer 316DAAA697BD8F4229A7365863AFADD333795089C9EF0715BE2033B7747805F8'
  },
  data : data
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});