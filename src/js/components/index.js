import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import sqpay from  "./sqpay.js";
class Index extends Component {
	constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
    //this.openOrderForm = this.openOrderForm.bind(this)
  //  this.check = this.check.bind(this)
    this.nonce = this.nonce.bind(this)
    this.formContainer = React.createRef();
    this.left = {marginLeft:"20%"};
    this.state = {
      showForm: true,
      loaded:false,
      address: '',
      name: '',
      hide: true,
      show: {visibility: "hidden"},
      order: ""
    }

} 
  // componentWillMount() {
  //   const that = this;
  //   let sqpayment = document.createElement('script')
  //   sqpayment.src = "https://js.squareupsandbox.com/v2/paymentform"
  //   sqpayment.type = "text/javascript"
  //   sqpayment.async = false;
  //   sqpayment.onload = ()=>{that.setState({
  //     loaded:true,
  //   })
  //   };
  //   console.log(sqpayment)
  //   document.getElementsByTagName("head")[0].appendChild(sqpayment);
  // }
  // openOrderForm(props) {
  //   //open order form by updating the state of the page
  //   console.log(this.state.showForm)
  //   const showForm = this.state.showForm;
  //   if(showForm==false){
  //     return ""
  //   } else {
  //     return <Orderform />
  //   }
  // }
  // check() {
  //   if(this.state.loaded) {
  //     return <script src="./sqpay.js" onload={this.check.bind(this)}></script>
  //   } else {
      
  //   }
  // }
  handleClick(event, order) {
    if (this.state.hide == true) {
      this.setState({
      show: {visibility: "visible"},
      hide: false,
      order: event,
      })
      sqpay.newForm()
      sqpay.paymentForm.build()
      } else {
      this.setState({
        show: {visibility: "hidden"},
        hide: true,
      })
      var inputs = document.getElementsByTagName("INPUT")
      sqpay.paymentForm.destroy()
       for (var i=1; i<inputs.length;i++) {
        console.log(inputs[i].value)
        inputs[i].value = ""
       }
       
    }
    
    
  }
  componentDidMount() {
    this.setState({

    })
  }
  componentDidUpdate() {
    
  }
  nonce(e) {
    event.preventDefault();
       // Request a nonce from the SqPaymentForm object
       sqpay.paymentForm.requestCardNonce();
       
       
  }
  handleAddressChange(event) {
    this.setState({
      address: event.target.value
    })
  }
   handleNameChange(event) {
    this.setState({
      name: event.target.value
    })
  }
    render() {
        return(
      <div>
        <table>
          <tr style={this.left}>
            <td><img src='./static/doya008.jpg'/></td>
            <br/>
            <td><img src='./static/doya008a.jpg'/></td>
            <br/>
            <td><button id="buy" onClick={this.handleClick.bind(this, "Cherry Tee")}>Preorder</button></td>
          </tr>
          <tr>
            <td><img src='./static/doya009.jpg'/></td>
            <br/>
            <td><img src='./static/doya009a.jpg'/></td>
            <br/>
            <td><button id="buy" onClick={this.handleClick.bind(this, "Moon Tee")}>Preorder</button></td>
          </tr>
          <tr>
            <td><img src='./static/doya011.jpg'/></td>
            <br/>
            <td><img src='./static/doya011a.jpg'/></td>
            <br/>
            <td><button id="buy" onClick={this.handleClick.bind(this, "Zombie Tee")}>Preorder</button></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <div id="form-container" ref="formContainer" style={this.state.show}>
          <button id="close" onClick={this.handleClick}>X</button>
          <h1 id="poh">Preorder</h1>
          <input class="order" name="shirt" id="shirt" value={this.state.order} readonly/>
          <h1 class="size">Choose Size</h1>
          <select id="size">
            <option> S </option>
            <option> M </option>
            <option> L </option>
          </select>
        <div id="sq-card-number"></div>
          <div class="third" id="sq-expiration-date"></div>
           <div class="third" id="sq-cvv"></div>
           <div class="third" id="sq-postal-code"></div>
           <input class="sq-input" id='shippingaddress' type="text" name="shippingaddress" placeholder="123 James St"/>
           <input class="third" class="sq-input" id='shippingname' type="text" name="name" placeholder="John Doe"/>
           <input class="third" class="sq-input" id='email' type="email" name="email" placeholder="john@doya.us"/>
           <input class="third" class="sq-input" id='zipcode' type="text" name="zipcode" placeholder="94949"/>
            <button id="sq-creditcard" class="button-credit-card" onClick={this.nonce}>Pay $30.00</button>
          </div>
            <script src="./sqpay.js"></script>
      </div>
      
    )
    
  };

}
export default Index