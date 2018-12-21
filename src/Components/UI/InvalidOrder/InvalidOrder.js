import React from 'react';
import classes from './InvalidOrder.css';

import Image from '../../../assets/images/burger-unavailible.png';

const invalidOrder = (props) => (
	<div className={classes.InvalidOrder}>
		<img src={Image} alt="Invalid Order" />
		<br />
		{props.text}
	</div>
);


export default invalidOrder;
