import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import Layout from './components/layout.js';
//import OrderForm from "./components/orderForm.js"
import Index from './components/index.js';
// import form from "./components/form.js";
import './app.css';

//document.getElementsByTagName("head")[0].appendChild(update())
ReactDOM.render(
  <div>
  <Layout/><Index/></div>, 
  document.getElementById('app')
  );