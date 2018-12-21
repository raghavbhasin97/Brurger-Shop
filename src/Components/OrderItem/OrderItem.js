import React from 'react';

import classes from './OrderItem.css';
import Button from '../UI/Button/Button'

const orderItem = (props) => (
	<div className={classes.OrderItem}>
		<span>Order Number #{props.orderNo}</span>
		<div className={classes.OrderDetails}>
			<span>{props.name}</span>
			<span style={{fontSize: '14px', color: '#656568'}}>Delivered to {props.customerName} at {props.customerAddress}.</span>
			<Button clicked={props.clicked} success>More...</Button>
		</div>
	</div>
);

export default orderItem;