import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Checkout from './containers/Checkout/Checkout'
import { Route } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
export class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path='/' exact component={BurgerBuilder}/>
          <Route path='/orders' exact component={Orders}/>
          <Route path='/checkout' component={Checkout}/>
          
        </Layout>
      </div>
    );
  }
}

export default App;
