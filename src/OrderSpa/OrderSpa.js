import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import orderRequests from '../FirebaseRequests/orders.js';
import authRequests from '../FirebaseRequests/auth.js';
import './OrderSpa.css';

class OrderSpa extends Component {
  state = {
    orders: [],
  };

  componentDidMount () {
    orderRequests.getRequest(authRequests.getUid()).then((orders) => {
      this.setState({orders});
    }).catch((err) => {
      console.error('Failed to grab fishes: ', err);
    });
  };

  render () {
    const orderComponents = this.state.orders.map((order) => {
      return (
        <button key={order.id} className='col-xs-12 btn btn-default order-button'>{order.id}
        <span className='col-xs-6'>Order Number: {order.id}</span>
        <span className='col-xs-6'>Order Date: {moment(order.dateTime).format('LLL')}</span>
        </button>
      );
    });
    return (
      <div className='OrderSpa col-xs-12'>
        <h2>Orders</h2>
        <button><Link to='/new'>New Order</Link></button>
        <ul>
          {orderComponents}
        </ul>
      </div>
    );
  };
};

export {OrderSpa};
