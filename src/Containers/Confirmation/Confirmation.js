import React, { Component } from 'react';

//Custom Components
import Unavailible from '../../Components/UI/Unavailible/Unavailible'
import Spinner from '../../Components/UI/Spinner/Spinner';
import Axios from '../../Orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import InvalidOrder from '../../Components/UI/InvalidOrder/InvalidOrder'
import classes from './Confirmation.css'
import ConfirmationSummary from '../../Components/Burger/ConfirmationSummary/ConfirmationSummary'

class Comfirmation extends Component {
  state = {
    orderData: null,
    isLoading:true,
    error: false,
    loadingComplete:false
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)
    let id = null;
    for (let entry of query.entries()) {
      id = entry[1];
    }
    Axios.get('/orders/' + id + '.json').then(res => {
      this.setState({isLoading:false, orderData: res.data, loadingComplete: true})
    }).catch(err =>{
      this.setState({isLoading:false, error: true, loadingComplete: true})
    });
  }

  render() {
    let main = <Spinner />
    if(this.state.error) {
      main = <Unavailible text="Application unavailible at this time. Please try again later." />
    }
    if(this.state.loadingComplete) {
      if(this.state.orderData) {
          main = (
                <div className={classes.Confirmation}>
                  <ConfirmationSummary order={this.state.orderData.order} contact={this.state.orderData.contact}/>
                </div>
          );
      } else if (!this.state.error){
        main = <InvalidOrder text="Order Number not found!"/>
      }
    }
    return (
          <div>
            {main}
          </div>
    );
  }
}

export default withErrorHandler(Comfirmation, Axios);
