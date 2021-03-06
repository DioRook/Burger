import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import {purchaseBurger} from '../../../store/actions/index';

export class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                touched:false,
                valid:false
        },
        street:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                touched:false,
                valid:false
        },
        pinCode:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'Pin Code'
                },
                value:'',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength:5
                },
                touched:false,
                valid:false
        },
        country:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                touched:false,
                valid:false
        },
        email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder:'Your E-Mail'
                },
                value:'',
                validation:{
                    required:true
                },
                touched:false,
                valid:false
        },
        deliveryMethod:{
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
            value: 'fastest',
            validation: {},
            valid:true
                
        }  
        },
        isValid:false,
        loading: false,
    }  

    checkValidity (value, rules) {
        let isValid = true;

        if (!rules) {
            return true
        }

        if (rules.required) {
            isValid = (value.trim() !== '') && isValid;
        }
        if (rules.minLength) {
            isValid = (value.trim().length >= rules.minLength) && isValid;
        }
        if (rules.maxLength) {
            isValid = (value.trim().length <= rules.maxLength) && isValid;
        }
        return isValid;
    }

    orderHandler = ( event ) => {
        event.preventDefault()
        const formData = {}
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value
        }
        this.setState({loading: true})
        
        const order={
            ingredients:this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        console.dir(order)
        this.props.onOrderBurger(order)
    // axios.post("/orders.json",order)
    // .then(response=>{
    //     this.setState({loading: false})
    //     this.props.history.push('/')
    // })
    // .catch(error=>{
    //   this.setState({loading:false})
    // });
    }

    inputChangeHandler = (event,inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedOrderForm[inputIdentifier] = updatedFormElement
        updatedFormElement.touched = true;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});


    }


    render () {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config:this.state.orderForm[key]
            })
        }


        let form = (
            <form action="" onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => {
                    return(
                        <Input key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event) => this.inputChangeHandler(event, formElement.id)}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}

                        />)

                })}
                <Button btnType='Success' disabled={!this.state.formIsValid} >Order</Button>
                </form>)
        if (this.props.loading) {
            form=<Spinner/>
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact details</h4>
                {form}
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    ings: state.burderBuilder.ingredients,
    price: state.burderBuilder.totalPrice,
    loading:state.order.loading
})

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger : (orderData)=>dispatch(purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));

