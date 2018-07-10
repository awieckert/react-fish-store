import React, { Component } from 'react';
import fishRequests from '../FirebaseRequests/fishes.js';
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
        <h2>{fish.name}</h2>
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
