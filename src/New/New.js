import React, { Component } from 'react';

import fishRequests from '../FirebaseRequests/fishes.js';
import Fish from '../Fish/Fish.js';
import Order from '../Order/Order.js';
import './New.css';

class New extends Component {
  state = {
    fishes: [],
    order: {},
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
        <Order />
      </div>
    );
  };
};

export {New};
