import React, { Component } from 'react';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
import './App.css';
// import {Fish} from '../Fish/Fish.js';
import {Home} from '../Home/Home.js';
import {Inventory} from '../Inventory/Inventory.js';
// import {Login} from '../Login/Login.js';
import {Navbar} from '../Navbar/Navbar.js';
// import {New} from '../New/New.js';
// import {Order} from '../Order/Order.js';
// import {OrderSpa} from '../OrderSpa/OrderSpa.js';
// import {Register} from '../Register/Register.js';
// import {SingleOrder} from '../SingleOrder/SingleOrder.js';

const PrivateRoute = ({ component: component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

class App extends Component {
  state={
    authed: false,
  }

  render () {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navbar />
            <div className='container'>
              <div className='row'>
                <Switch>
                  <Route path='/' exact component={Home}/>
                  <PrivateRoute path='/inventory' authed={this.state.authed} component={Inventory}/>
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
