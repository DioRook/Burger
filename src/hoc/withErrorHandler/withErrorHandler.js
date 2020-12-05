import React, {useEffect, useState} from 'react';
import Modal from '../../components/UI/Modal/Modal';
const withErrorHandler = (WrappedComponent, axios) => {
  const WithErrorHandler = props => {
    const [error, setError] = useState(null);
    const requestInterceptor = axios.interceptors.request.use(
      req => {
        setError(null);
        return req;
      }
    );
    const responseInterceptor = axios.interceptors.response.use(
      res => res,
      error => {
        setError(error);
        console.log('WithErrorHandler: ', error);
        return Promise.reject(error);
      }
    );
    useEffect(
      () => {
        return () => {
          axios.interceptors.request.eject(requestInterceptor);
          axios.interceptors.response.eject(responseInterceptor);
        };
      },
      [requestInterceptor, responseInterceptor]
    );
    return <>
      <Modal 
        show={error !== null}
        modalClosed={() => setError(null)}
      >
        {error !== null ? error.message : null}
      </Modal>
      <WrappedComponent {...props}/>
    </>
  };
  return WithErrorHandler;
};
export default withErrorHandler;







/**
 * Class Based Version... Works with warning
 */


// import React, {Component} from 'react'
// import Aux from '../Auxiliary/Auxiliary'
// import Modal from '../../components/UI/Modal/Modal'
// const withErrorHandler = (WrappedComponent,axios) => {
//         return class extends Component{
//             state = {
//             error: null
//         }

//             // constructor (props) {

//             //     super(props);

//             //     this.state = {error: null};

//             //     axios.interceptors.request.use(req => {

//             //         this.state = {error: null};

//             //         return req;

//             //     });



//             //     axios.interceptors.response.use(res => {

//             //         return res;

//             //     }, error => {



//             //         this.state = {error}; //object destructuring

//             //         return error;

//             //     });
//             // }
//         componentWillMount () {
//             this.reqInterceptor = axios.interceptors.request.use( req => {
//                 this.setState( { error: null } );
//                 return req;
//             } );
//             this.resInterceptor = axios.interceptors.response.use( res => res, error => {
//                 this.setState( { error: error } );
//             } );
//         }

//             componentWillUnmount(){
//                 axios.interceptors.request.eject(this.reqInterceptor);
//                 axios.interceptors.response.eject(this.resInterceptor);
//             }

            
//             // componentWillMount(){
                
//             // }
//             errorConfirmedHandler=()=>{
//                 this.setState({error:null})
//             }
//             render () {
//                 return (
//                     <Aux>
//             <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
//                 {this.state.error?this.state.error.message:null}
//             </Modal>
//             <WrappedComponent {...this.props} />
//             </Aux>
//                 )
//             }
//         }
    
// }

// export default withErrorHandler
