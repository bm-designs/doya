const paymentForm = new SqPaymentForm({
       // Initialize the payment form elements
       
       //TODO: Replace with your sandbox application ID
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
       addressLines: {
          elementId: 'sq-address-lines',
          placeholder: "124 College st"
       },
       // SqPaymentForm callback functions
       callbacks: {

           /*
           * callback function: cardNonceResponseReceived
           * Triggered when: SqPaymentForm completes a card nonce request
           */
           cardNonceResponseReceived: function (errors, nonce, cardData, shippingContact) {
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
           }
       }

     });
      //TODO: paste code from step 1.2.5
     // onGetCardNonce is triggered when the "Pay $1.00" button is clicked
     function onGetCardNonce(event) {
       // Don't submit the form until SqPaymentForm returns with a nonce
       event.preventDefault();
       // Request a nonce from the SqPaymentForm object
       paymentForm.requestCardNonce();
     }
     paymentForm.build();