import React, { Component } from 'react';
import { Route } from 'react-router-dom';

//Custom Components
import Layout from './Containers/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import FoodMenu from './Containers/FoodMenu/FoodMenu'
import SubmitOrder from './Containers/SubmitOrder/SubmitOrder'
import Confirmation from './Containers/Confirmation/Confirmation'
import MyOrders from './Containers/MyOrders/MyOrders'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
        	<Route path="/" exact component={FoodMenu} />
        	<Route path="/burger" component={BurgerBuilder} />
          <Route path="/order" component={SubmitOrder} />
          <Route path="/myOrders" component={MyOrders} />
          <Route path="/confirm" component={Confirmation} />
        </Layout>
      </div>
    );
  }
}

export default App;
