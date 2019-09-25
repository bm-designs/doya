import React, {Component} from 'react';
import ReactDOM from "react-dom";

class OrderForm extends React.Component {

constructor(props) {
	super(props)
	this.state = {

	}
}
render() {
	return(
		 <div id="form-container">
     <div id="sq-card-number"></div>
     <div class="third" id="sq-expiration-date"></div>
     <div class="third" id="sq-cvv"></div>
     <div class="third" id="sq-postal-code"></div>
     <button id="sq-creditcard" class="button-credit-card" onclick="onGetCardNonce(event)">Pay $1.00</button>
     </div>
     )
}
}
export default OrderForm