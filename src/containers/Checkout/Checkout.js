import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux';

export class Checkout extends Component {
    // state={
    //     ingredients:null,
    //     totalPrice:0
    // }

    // constructor(props){
    //     super(props)
    //     const query= new URLSearchParams(this.props.location.search);
    //     const ingredient={};
    //     let price = 0
    //     for ( let params of query.entries() ) {
    //         if (params[0]==='price') {
    //            price=params[1] 
    //         }
    //         else {
    //             ingredient[ params[ 0 ] ] = +params[ 1 ]                
    //         }
    //     }
    //     this.state={ingredients:ingredient, totalPrice:price}
    // }


    checkoutCancelledHandler=()=>{
        this.props.history.goBack()
    }

    
    checkoutContinuedHandler=()=>{
        this.props.history.push('/checkout/contact-data')

    }

    render () {
        let summary = <Redirect to='/' />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                {purchasedRedirect}
                <CheckoutSummary 
                checkoutCancelled={this.checkoutCancelledHandler} 
                checkoutContinued={this.checkoutContinuedHandler} 
                ingredients={this.props.ings} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
            console.log(this.props)


        return (
                
                summary
        )
    }
}

const mapStateToProps = (state) => ({
    ings: state.burderBuilder.ingredients,
    purchased: state.order.purchased
})


export default connect(mapStateToProps)(Checkout);

