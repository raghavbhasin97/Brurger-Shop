import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

//Custom Components
import classes from './MyOrders.css'
import Axios from '../../Orders'
import InvalidOrder from '../../Components/UI/InvalidOrder/InvalidOrder'
import Spinner from '../../Components/UI/Spinner/Spinner';
import OrderItem from '../../Components/OrderItem/OrderItem'

class MyOrders extends Component {
  state = {
    loading: true,
    error: false,
    data:null
  }

  componentDidMount() {
    Axios.get('/orders.json').then(res =>{
      this.setState({loading: false, data: res.data})
    }).catch(err =>{
      this.setState({error: true, loading: false})
    })
  }

  itemClicked = (props) => {
    const query = '?' + 'id='+ props
      this.props.history.push({
            pathname: '/confirm',
            search: query
    });
  }

  render() {
    let childComponents = <Spinner />
    if(!this.state.loading) {
      if(this.state.error) {
        childComponents = <InvalidOrder text="No previous orders found." />
      } else {
        childComponents = []
        const keys = Object.keys(this.state.data)
        for(let i = 0; i <keys.length; i++) {
          const item = this.state.data[keys[i]]
          childComponents.push(
            <OrderItem 
              key = {keys[i]} 
              orderNo = {item.order.orderNumber}
              name = {item.order.name}
              customerName = {item.contact.name}
              customerAddress = {item.contact.address}
              clicked={() => this.itemClicked(keys[i])}
            />
          );
        }
      }
    }
    return (
          <div className={classes.MyOrders}>
            {childComponents}
          </div>
    );
  }
}

export default withRouter(MyOrders);
