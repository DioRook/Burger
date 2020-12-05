import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import {connect} from "react-redux";
import {addIngredients, initIngredients, removeIngredients, purchaseInit} from "../../store/actions/index";
// const INGREDIENTS_PRICES = {
//   salad: 0.5,
//   bacon: 0.7,
//   cheese: 0.4,
//   meat: 1.3,
// };
class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount () {
    // axios.get('https://burger-46888.firebaseio.com/ingredients.json')
    // .then(response=>{
    //   this.setState({ingredients: response.data})
    //   this.updatePurchaseState(this.state.ingredients)
    // })
    // .catch(error=>{
    //   this.setState({error:true})
    // })

    this.props.onInitIngredients()
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }
  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENTS_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENTS_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  // purchaseContinueHandler = () => {
  //   // alert("You Continue!");
  //   const queryParams=[];
  //   for(let i in this.props.ings){
  //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
  //   }
  //   queryParams.push('price='+this.state.totalPrice)

  //   const queryString=queryParams.join('&')
  //   this.props.history.push({
  //     pathname:'/checkout',
  //     search:'?'+queryString
  //   })

  // }

  purchaseContinueHandler = () => {
  this.props.onInitPurchase()
    this.props.history.push('/checkout')

  }
  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary=null
    
  let burger=this.props.error?<p>Ingredients can't be loaded</p>:<Spinner/>

    if (this.props.ings) {
    
    burger=
    <Aux>
    <Burger ingredients={this.props.ings} />
    <BuildControls
      ingredientsAdded={this.props.onIngredientsAdded}
      ingredientsRemoved={this.props.onIngredientsRemoved}
      disabled={disabledInfo}
      totalPrice={this.props.price}
      purchasable={this.updatePurchaseState(this.props.ings)}
      ordered={this.purchaseHandler}
    />
    </Aux>

orderSummary=<OrderSummary
ingredients={this.props.ings}
price={this.props.price}
purchaseContinue={this.purchaseContinueHandler}
purchaseCancel={this.purchaseCancelHandler}
/>
   
  //  if (this.state.loading) {
  //   orderSummary=<Spinner/>
  // }
    }


    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  ings: state.burderBuilder.ingredients,
  price: state.burderBuilder.totalPrice,
  error: state.burderBuilder.error
})

const mapDispatchToProps = dispatch=>({
  onIngredientsAdded:(ingName) => dispatch(addIngredients(ingName)),
  onIngredientsRemoved: (ingName) => dispatch(removeIngredients(ingName)),
  onInitIngredients: () => dispatch(initIngredients()),
  onInitPurchase: () => dispatch(purchaseInit())
})



export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder,axios));
