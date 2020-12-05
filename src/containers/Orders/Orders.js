import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import {fetchOrders} from '../../store/actions/orders';
import Spinner from '../../components/UI/Spinner/Spinner';
export class Orders extends Component {
    
    componentDidMount () {
        // axios.get('/orders.json')
        //     .then(response => {
        //         const fetchedOrders = [];
        //         for (let key in response.data) {
        //             fetchedOrders.push({
        //                 ...response.data[key],
        //                 id: key
        //             })
        //         }

        //         this.setState({loading:false, orders:fetchedOrders})                
        //     })
        //     .catch(error => {
        //         this.setState({loading:false})                
        //     })

        this.props.onFetchOrders()

    }
    render () {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders=this.props.ord.map(order => (
                    <Order key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                    />
                ))
        }
        return (
            <div>
                {orders}
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return{
        ord: state.order.order,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch=>({
    onFetchOrders:()=>dispatch(fetchOrders())
})


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios))