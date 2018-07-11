import React from 'react';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
import firebase from 'firebase';
import './App.css';
import {Home} from '../Home/Home.js';
import {Inventory} from '../Inventory/Inventory.js';
import {Login} from '../Login/Login.js';
import {Navbar} from '../Navbar/Navbar.js';
import {New} from '../New/New.js';
import OrderSpa from '../OrderSpa/OrderSpa.js';
import {Register} from '../Register/Register.js';
import SingleOrder from '../SingleOrder/SingleOrder.js';
import fbConnection from '../FirebaseRequests/connection.js';
fbConnection();

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

const PublicRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/orders', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

class App extends React.Component {
  state={
    authed: false,
  }

  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({authed: true});
      } else {
        this.setState({authed: false});
      }
    });
  }

  componentWillUnmount () {
    this.removeListener();
  };

  runAway = () => {
    this.setState({authed: false});
  };

  render () {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navbar authed={this.state.authed} runAway={this.runAway} />
            <div className='container'>
              <div className='row'>
                <Switch>
                  <Route path='/' exact component={Home}/>
                  <PrivateRoute path='/inventory' authed={this.state.authed} component={Inventory}/>
                  <PublicRoute path='/register' authed={this.state.authed} component={Register}/>
                  <PublicRoute path='/login' authed={this.state.authed} component={Login}/>
                  <PrivateRoute path='/orders' authed={this.state.authed} component={OrderSpa}/>
                  <PrivateRoute path='/order/:id' authed={this.state.authed} component={SingleOrder}/>
                  <PrivateRoute path='/New' authed={this.state.authed} component={New}/>
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
