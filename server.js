const express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var util = require('util');
const crypto = require('crypto');
const squareConnect = require('square-connect');
var app = express();
var nodemailer = require('nodemailer');
var client = squareConnect.ApiClient.instance;
client.basePath = 'https://connect.squareupsandbox.com';
var oauth2 = client.authentications['oauth2'];
oauth2.accessToken = "EAAAECkmJ2Kz2o0AZJTFGfiQQyryl6_q0umjm1YuPNQFx98QJfgqxP5cLyRr1rOi";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));
const {Pool, Client} = require('pg');
//const connectionString = 'postgresql://jlaskk:miami014@localhost:5432/BMDB'
const connectionString = 'postgres://igaadmdcybtzah:ce4e9ef2f4d53070acb7d4c6c80be2e731b0bf7358a7ab2673bd055a433a87f0@ec2-54-225-241-25.compute-1.amazonaws.com:5432/d3b1ct3mjklqlb'
const db = new Client({
  connectionString: connectionString,
  ssl: true,
})
db.connect()
const PORT = process.env.PORT || 3000

var server = app.listen(PORT || 3000, function() {
	console.log("lisening on port number %d", server.address().port);
});
app.get('/', (req, res) => res.sendFile(__dirname+"/public/index.html"));
app.post('/process-payment', async (req, res) => {
  const request_params = req.body;
  var data = Object.keys(request_params)[0].split('\"');
  console.log(data)
  //var params = change.replace('\\/[\\{}"]+/g'," ")
  var nonce = data[3]
  var address = data[11]
  var name = data[7]
  var size = data[15]
  var shirt = data[19]
  var email = data[23]
  var zipcode = data[27]

  // length of idempotency_key should be less than 45
  const idempotency_key = crypto.randomBytes(22).toString('hex');

  // Charge the customer's card
  const payments_api = new squareConnect.PaymentsApi();
  const request_body = {
    source_id: nonce,
    amount_money: {
      amount: 3000, // $30.00 charge
      currency: 'USD'
    },
    idempotency_key: idempotency_key
  };

  try {
    const response = await payments_api.createPayment(request_body);
    var query = "INSERT INTO doya.orders (name, email, shirt, size, address, zipcode) VALUES($1,$2,$3,$4,$5,$6)"
    var values = [name, email, shirt, size, address, zipcode]
    console.log(values)
    db.query(query,values, function(err, result){
    	if(err) {
    		console.log(err)
    	}

    })
    res.status(200).json({
      'title': 'Payment Successful',
      'result': response
    });
  } catch(error) {
    res.status(500).json({
      'title': 'Payment Failure',
      'result': error.response.text
    });
  }

});
// app.get('/doyasecretlink', function(req,res) {
//   res.sendFile(__dirname+"/public/components/orders.html")
// })
// app.get("/orders", function(req, res){
//   db.query("SELECT * FROM doya.orders", function(err, result){
//     if(err){
//       console.log(err)
//       res.sendFile(__dirname+"/public/index.html")
//     }
//     var data = result.rows
//     console.log(data)
//     res.send(data)
//   })
// })






/*Images*/
app.get('/logo',(req,res)=> res.sendFile(__dirname+"/static/imgs/doyalogo.svg"))
app.get('/buynow',(req,res)=> res.sendFile(__dirname+"/static/imgs/buynow.png"))
app.get('/008', (req,res)=> res.sendFile(__dirname+"/static/imgs/doya008.jpg"))
app.get('/008a', (req,res)=> res.sendFile(__dirname+"/static/imgs/doya008a.jpg"))
app.get('/009', (req,res)=> res.sendFile(__dirname+"/static/imgs/doya009.jpg"))
app.get('/009a', (req,res)=> res.sendFile(__dirname+"/static/imgs/doya009a.jpg"))
app.get('/011', (req,res)=> res.sendFile(__dirname+"/static/imgs/doya011.jpg"))
app.get('/011a', (req,res)=> res.sendFile(__dirname+"/static/imgs/doya011a.jpg"))