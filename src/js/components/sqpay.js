  // export const Update = () => {
    // let sqpayment = document.createElement('script')
    // sqpayment.src = "https://js.squareupsandbox.com/v2/paymentform"
    // sqpayment.type = "text/javascript"
    // sqpayment.async = false;
    // sqpayment.onload = ()=>{console.log('loaded')
    // };
    // return sqpayment
    // <script type="text/javascript">
import ReactDOM from "react-dom";
import React, { Component } from "react";

     const paymentForm = new SqPaymentForm({
       applicationId: "sandbox-sq0idb-83yhh8wDPX7DTS099mTFwg",
       inputClass: 'sq-input',
       autoBuild: false,
       // Customize the CSS for SqPaymentForm iframe elements
       inputStyles: [{
           fontSize: '16px',
           lineHeight: '24px',
           padding: '16px',
           placeholderColor: '#a0a0a0',
           backgroundColor: 'transparent',
       }],
       // Initialize the credit card placeholders
       cardNumber: {
           elementId: 'sq-card-number',
           placeholder: 'Card Number'
       },
       cvv: {
           elementId: 'sq-cvv',
           placeholder: 'CVV'
       },
       expirationDate: {
           elementId: 'sq-expiration-date',
           placeholder: 'MM/YY'
       },
       postalCode: {
           elementId: 'sq-postal-code',
           placeholder: 'Postal'
       },
       // SqPaymentForm callback functions
       callbacks: {
           /*
           * callback function: cardNonceResponseReceived
           * Triggered when: SqPaymentForm completes a card nonce request
           */
           cardNonceResponseReceived: function (errors, nonce, cardData) {
           if (errors) {
               // Log errors from nonce generation to the browser developer console.
               console.error('Encountered errors:');
               errors.forEach(function (error) {
                   console.error('  ' + error.message);
               });
               alert('Encountered errors, check browser developer console for more details');
               return;
           }
              alert(`The generated nonce is:\n${nonce}`);
              //TODO: Replace alert with code in step 2.1
                    // alert(`The generated nonce is:\n${nonce}`);
              var body = {};
              body.nonce = nonce
              body.address = document.getElementById("shippingaddress").value
              body.name = document.getElementById("shippingname").value
              body.size = document.getElementById("size").value
              // var body = JSON.stringify(body).split(",")
              console.log(body)
              fetch('process-payment', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                  'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                  },
                body:JSON.stringify(body)
                  // body: {
                  //   nonce: JSON.stringify(nonce),
                  //   address: JSON.stringify(addressDOM),
                  //   name: JSON.stringify(nameDOM),
                  // }
              })
              .catch(err => {
                alert('Network error: ' + err);
              })
              .then(response => {
                if (!response.ok) {
                  return response.text().then(errorInfo => Promise.reject(errorInfo));
                }
                return response.text();
              })
              .then(data => {
                console.log(JSON.stringify(data));
                // fetch("home", {method:"GET"}).then(response => {console.log(JSON.stringify(response.body))});
                  alert('Payment complete successfully!\nCheck browser developer consolf form more details');
              })
              .catch(err => {
                console.error(err);
                alert('Payment failed to complete!\nCheck browser developer consolf form more details');
              });
           }
       }

     });
     var form = paymentForm;
     console.log(form)

      //TODO: paste code from step 1.2.5
     // onGetCardNonce is triggered when the "Pay $1.00" button is clicked
     function onGetCardNonce(event){
       // Don't submit the form until SqPaymentForm returns with a nonce
       event.preventDefault();
       // Request a nonce from the SqPaymentForm object
       form.requestCardNonce();
     }
     form.build();
     //TODO: paste code from step 1.2.4
module.exports = {
  paymentForm: form,
  newForm: function(){
    const newForm = new SqPaymentForm({
       applicationId: "sandbox-sq0idb-83yhh8wDPX7DTS099mTFwg",
       inputClass: 'sq-input',
       autoBuild: false,
       // Customize the CSS for SqPaymentForm iframe elements
       inputStyles: [{
           fontSize: '16px',
           lineHeight: '24px',
           padding: '16px',
           placeholderColor: '#a0a0a0',
           backgroundColor: 'transparent',
       }],
       // Initialize the credit card placeholders
       cardNumber: {
           elementId: 'sq-card-number',
           placeholder: 'Card Number'
       },
       cvv: {
           elementId: 'sq-cvv',
           placeholder: 'CVV'
       },
       expirationDate: {
           elementId: 'sq-expiration-date',
           placeholder: 'MM/YY'
       },
       postalCode: {
           elementId: 'sq-postal-code',
           placeholder: 'Postal'
       },
       // SqPaymentForm callback functions
       callbacks: {
           /*
           * callback function: cardNonceResponseReceived
           * Triggered when: SqPaymentForm completes a card nonce request
           */
           cardNonceResponseReceived: function (errors, nonce, cardData) {
           if (errors) {
               // Log errors from nonce generation to the browser developer console.
               console.error('Encountered errors:');
               errors.forEach(function (error) {
                   console.error('  ' + error.message);
               });
               alert('Encountered errors, check browser developer console for more details');
               return;
           }
              alert(`The generated nonce is:\n${nonce}`);
              //TODO: Replace alert with code in step 2.1
                    // alert(`The generated nonce is:\n${nonce}`);
              var body = {};
              body.nonce = nonce
              body.address = document.getElementById("shippingaddress").value
              body.name = document.getElementById("shippingname").value
              body.size = document.getElementById("size").value
              body.shirt = document.getElementById("shirt").value
              body.email = document.getElementById("email").value
              body.zipcode = document.getElementById("zipcode").value
              // var body = JSON.stringify(body).split(",")
              console.log(body)
              fetch('process-payment', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                  },
                body:JSON.stringify(body)
                  // body: {
                  //   nonce: JSON.stringify(nonce),
                  //   address: JSON.stringify(addressDOM),
                  //   name: JSON.stringify(nameDOM),
                  // }
              })
              .catch(err => {
                alert('Network error: ' + err);
              })
              .then(response => {
                if (!response.ok) {
                  return response.text().then(errorInfo => Promise.reject(errorInfo));
                }
                return response.text();
              })
              .then(data => {
                console.log(JSON.stringify(data));
              //   fetch("email", {
              //     method:"POST",
              //     body:JSON.stringify(body)
              // }).then(response => {console.log(JSON.stringify(response.body))});
                  alert('Payment complete successfully!\nCheck browser developer consolf form more details');
              })
              .catch(err => {
                console.error(err);
                alert('Payment failed to complete!\nCheck browser developer consolf form more details');
              });
           }
       }

     }); 
    module.exports.paymentForm = newForm;
  }
}