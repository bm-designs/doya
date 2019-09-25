import React, { Component } from "react";
import ReactDOM from "react-dom";
import css from "./layout.css";
//import * as Logo from "./doyalogo.svg"
//const Logo = require("./doyalogo.svg");
class Layout extends Component {
	constructor(props) {
    super(props);
    this.state = {

    }
}
    render() {
    return(
      <div>
        <div id='header'> 
        	<img src='/logo'/>	
        </div>
      </div>
      
    )
  };

}
export default Layout