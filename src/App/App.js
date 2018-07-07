import React, { Component } from 'react';
import './App.css';
import {Fish} from '../Fish/Fish.js';
import {Home} from '../Home/Home.js';
import {Inventory} from '../Inventory/Inventory.js';
import {Login} from '../Login/Login.js';
import {Navbar} from '../Navbar/Navbar.js';
import {New} from '../New/New.js';
import {Order} from '../Order/Order.js';
import {OrderSpa} from '../OrderSpa/OrderSpa.js';
import {Register} from '../Register/Register.js';
import {SingleOrder} from '../SingleOrder/SingleOrder.js';

class App extends Component {
  render () {
    return (
      <div>
        <Fish />
        <Home />
        <Inventory />
        <Login />
        <Navbar />
        <New />
        <Order />
        <OrderSpa />
        <Register />
        <SingleOrder />
      </div>
    );
  }
}

export default App;
