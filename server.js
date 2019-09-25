const express = require("express")
const bodyParser = require('body-parser');
const crypto = require('crypto');
const squareConnect = require('square-connect');
var nodemailer = require('nodemailer');
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
app.listen(3000,  () => console.log("Example app listening on port 3000!"));
app.get('/', (req, res) => res.sendFile(__dirname+"/src/js/app.js"));

app.get('/logo',(req,res) => res.sendFile(__dirname+"/public/static/doyalogo.svg"));
app.get('/email', function(req, res){
	var params  = req.body
	var data = Object.keys(params)[0].split('\"');
  //var params = change.replace('\\/[\\{}"]+/g'," ")
  var nonce = data[3]
  var name = data[7]
  var address = data[11]
  var size = data[15]
  var shirt = data[19]
  var email = data[23]
  var zipcode = data[27]
	console.log(data)
	var transporter = nodemailer.createTransport({
  		service: 'Zoho',
  		auth: {
    		user: 'james@bareminimum.site',
    		pass: 'NE_patriots12'
  		}
	});
	var mailOptions = {
  		from: 'james@bareminimum.site',
  		to: 'eric@doya.us',
  		subject: 'New Preorder from '+name,
  		html: '<h3>Name:</h3><p>'+name+'</p><br><h3>Email:</h3><p>'+email+'</p><h3>Address:</h3><p>'+address+'</p><h3>Zipcode:</h3><p>'+zipcode,
	}
	var preorderConfirmation = {
		from: 'james@bareminimum.site',
		to: email,
		subject: 'Preorder Confirmation',
		html: '<h1>Thank you for preordering a '+size+':'+shirt+'</h1><br><p>You can reach out to this email directly or contact DOYA through Instagram for more information on your order</p>'
	}
	transporter.sendMail(preorderConfirmation, function(error, info){
  		if (error) {
    		console.log(error);
  		} else {
    		console.log('Email sent: ' + info.response);
  			}
		})
	transporter.sendMail(preorderConfirmation, function(error, info){
		if (error){
			console.log(error)
		} else {
			console.log('Email sent: ' + info.response)
		}
	})
});
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