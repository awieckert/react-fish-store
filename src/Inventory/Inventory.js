import React, { Component } from 'react';
import fishRequests from '../FirebaseRequests/fishes.js';
import Fish from '../Fish/Fish.js';
import './Inventory.css';

class Inventory extends Component {
  state = {
    fishes: [],
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
        <Fish key={fish.id} details={fish} />
      );
    });
    return (
      <div className='Inventory text-center'>
        <h1>Inventory</h1>
        <ul className='fishes'>
          {fishComponents}
        </ul>
      </div>
    );
  };
};

export {Inventory};
