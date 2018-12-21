import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

//Custom Components
import Aux from '../../hoc/Aux';
import classes from './SubmitOrder.css'
import InputField from '../../Components/UI/InputField/InputField'
import Axios from '../../Orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Unavailible from '../../Components/UI/Unavailible/Unavailible'
import Modal from '../../Components/UI/Modal/Modal';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Message from '../../Components/UI/Message/Message';

class SubmitOrder extends Component {
  state = {
    order: null,
    error: false,
    errorMessage: null,
    isSubmitting:false
  }

  componentDidMount() {
    try{
          let param = this.props.location.search
          param = atob(param.substring(1,));
          const query = new URLSearchParams(param)
          let order = {};
          for (let entry of query.entries()) {
            order[entry[0]] = entry[1];
          }
          this.setState({order:order})
    } catch(e) {
      this.setState({error: true})
    }
  }

  dissmissErrors = () => {
    this.setState({errorMessage: null})
  }

  handleSubmit = (event) => {
    this.setState({isSubmitting: true})
    let errors = []
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const address = event.target.address.value;
    const instructions = event.target.instructions.value;
    if(!/^([a-zA-Z]+ [a-zA-Z]+)$/.test(name)) {
      errors.push("Invalid Name")
    }

    if(!/^([a-zA-Z0-9_]+@[a-zA-Z]+\.[a-zA-Z]{2,3})$/.test(email)) {
      errors.push("Invalid Email")
    }

    if(!/^([0-9]{10})$/.test(phone)) {
      errors.push("Invalid Phone")
    }

    if(address.length < 3) {
      errors.push("Invalid Address")
    }

    if(errors.length > 0) {
      this.setState({errorMessage: errors, isSubmitting: false})
      return
    }
    const orderNumber = Math.floor(Math.random() * 9000000) + 1000000;
    const contactInfo = {
                          name: name, 
                          email: email, 
                          phone: phone, 
                          address: address,
                          instructions: instructions
                        }
    const order = {order: {...this.state.order, orderNumber: orderNumber}, contact: contactInfo}
    Axios.post('/orders.json', order).then(res => {
      this.setState({isSubmitting: false})
      const key = res.data.name
      const query = '?' + 'id='+ key
      this.props.history.push({
            pathname: '/confirm',
            search: query
      });
    }).catch(err => {
      this.setState({isSubmitting: false})
    });
  }

  render() {
    let item = (
              
                <div className={classes.SubmitOrderBox}>
                  <div className={classes.SubmitLabel}>Place Order </div>
                  <form onSubmit={this.handleSubmit} method="post">
                    <InputField type="text" title="Full Name" name="name" placeholder="Enter Your Name" required/>
                    <InputField type="email" title="Email" name="email" placeholder="Enter Your Email" required/>
                    <InputField type="text" title="Phone" name="phone" placeholder="Enter Your Phone" required/>
                    <InputField type="text" title="Address" name="address" placeholder="Enter Your Address" required/>
                    <InputField title="Delivery Instructions" name="instructions" placeholder="Your message here..." textArea/>
                    <div className={classes.SubmitButtonContainer}>
                      <button className={classes.SubmitButton}>
                        <span>
                          Submit <b className={classes.Arrow}>&#8594;</b>
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
      );

    if(this.state.error) {
      item = <Unavailible text="Something went wrong. Please start over." />
    }
    let errors = null
    if(this.state.errorMessage) {
      errors = []
      const errorMessages = this.state.errorMessage
      for (let i = 0; i < errorMessages.length; i++) {
          errors.push(<Message key={i} danger>{errorMessages[i]}</Message>)
      }
    }
    let form = <Spinner />
    if(!this.state.isSubmitting) {
        form = (
            <div className={this.state.error? '' : classes.SubmitOrder}>
              {item}
            </div>
        );
    }
    return (
          <Aux>
            <Modal 
              show={this.state.errorMessage}
              clicked={this.dissmissErrors}
            >
              {errors}
            </Modal>
            {form}
          </Aux>
    );
  }
}

export default withErrorHandler(withRouter(SubmitOrder), Axios);
