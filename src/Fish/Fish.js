import React, { Component } from 'react';
import formatePrice from '../helpers.js';
import './Fish.css';

class Fish extends Component {
  render () {
    const {details} = this.props;
    const isAvailable = details.status === 'available';
    const image = require(`${details.image}`);
    return (
      <li className='Fish'>
      <img src={image} alt={details.name} />
        <h3>{details.name}
        <span className='price'>{formatePrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailable}>
          {isAvailable ? 'Add To Order' : 'Sold Out!'}
        </button>
      </li>
    );
  };
};

export default Fish;
