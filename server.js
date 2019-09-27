const express = require("express")
const bodyParser = require('body-parser');
const crypto = require('crypto');
const squareConnect = require('square-connect');
var nodemailer = require('nodemailer');
const react = require('react');
const reactDOM = require('react-dom')
var client = squareConnect.ApiClient.instance;
client.basePath = 'https://connect.squareupsandbox.com';
var oauth2 = client.authentications['oauth2'];
oauth2.accessToken = "EAAAECkmJ2Kz2o0AZJTFGfiQQyryl6_q0umjm1YuPNQFx98QJfgqxP5cLyRr1rOi";
let  app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
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

app.get('/logo',(req,res) => res.sendFile(__dirname+"/public/static/doyalogo.svg"));
app.get('/orders', function(req, res){
	res.send("<p>Hello</p>")
});
// app.get('/receipts', function(req, res){
// 	var query = "SELECT * FROM doya.orders";
// 	db.query(query, function(err, results){
// 		if(err){
// 			console.log(err)
// 		}
// 		console.log(results.rows)
// 	})
// });
app.post('/pay', async (req,res)=> {
	console.log(req.body)
	res.send("hello")})
app.post('/process-payment', async (req, res) => {
  const request_params = req.body;
  var data = Object.keys(request_params)[0].split('\"');
  //var params = change.replace('\\/[\\{}"]+/g'," ")
  var nonce = data[3]
  var name = data[7]
  var address = data[11]
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