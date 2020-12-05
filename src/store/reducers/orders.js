import {FETCH_ORDERS_FAILED, FETCH_ORDERS_START, FETCH_ORDERS_SUCCESS, PURCHASE_BURGER_FAILED, PURCHASE_BURGER_START, PURCHASE_BURGER_SUCCESS, PURCHASE_INIT} from "../actions/actionTypes";
import {updateObject} from "../utility";

const initialState = {
    order: [],
    loading: false,
    purchased: false

}

const purchaseBurgerSuccess = (state, action) => {
    
            const newOrder= updateObject(action.orderData,{id:action.orderId})
            return updateObject(state,{
                loading: false,
                order: state.order.concat(newOrder),
                purchased: true
            })
}

const fetchOrderSuccess = (state, action) => {
    
            return updateObject(state,{
                loading: false,
                order: action.order,
            })
}


const reducer = (state = initialState, action) => {
    switch (action.type) {

        case PURCHASE_INIT: return updateObject(state, {purchased: false});
        case PURCHASE_BURGER_START: return updateObject(state,{loading:true})
        case PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state,action)
        case PURCHASE_BURGER_FAILED: return updateObject(state,{loading:false})
        case FETCH_ORDERS_START: return updateObject(state,{loading:true})
        case FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state,action)
        case FETCH_ORDERS_FAILED:  return updateObject(state,{loading:false})


    default:
        return state
    }
}

export default reducer
