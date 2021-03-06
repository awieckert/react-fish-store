import React, { Component } from 'react';

import fishRequests from '../FirebaseRequests/fishes.js';
import Fish from '../Fish/Fish.js';
import Order from '../Order/Order.js';
import authRequests from '../FirebaseRequests/auth.js';
import orderRequests from '../FirebaseRequests/orders.js';
import './New.css';

class New extends Component {
  state = {
    fishes: [],
    order: {},
  };

  removeFromOrder = (key) => {
    const newOrder = {...this.state.order};
    delete newOrder[key];
    this.setState({order: newOrder});
  };

  saveNewOrder = () => {
    const newOrder = {fishes: {...this.state.order}};
    newOrder.uid = authRequests.getUid();
    newOrder.dataTime = Date.now();
    orderRequests.postRequest(newOrder).then(() => {
      this.props.history.push('/orders');
    }).catch((err) => {
      console.error('Could not save order: ', err);
    });
  };

  addToOrder = (key) => {
    const newOrder = {...this.state.order};
    newOrder[key] = newOrder[key] + 1 || 1;
    this.setState({order: newOrder});
  };

  componentDidMount () {
    fishRequests.getRequest().then((fishes) => {
      this.setState({fishes});
    }).catch((err) => {
      console.error('Failed to grab fishes: ', err);
    });
  };

  render () {
    const fishComponents = this.state.fishes.map((fish) => {
      return (
        <Fish key={fish.id} details={fish} addToOrder={this.addToOrder}/>
      );
    });
    return (
      <div className='New text-center'>
        <div className='col-xs-8 inventory-container'>
          <h2>Inventory</h2>
          <ul className='fishes'>
            {fishComponents}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
          saveNewOrder={this.saveNewOrder}
        />
      </div>
    );
  };
};

export {New};
