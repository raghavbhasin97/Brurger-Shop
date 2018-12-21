import React from 'react';
import classes from './Unavailible.css';

import Image from '../../../assets/images/attention.png';

const unavailible = (props) => (
	<div className={classes.Unavailible}>
		<img src={Image} alt="Attention" />
		<br />
		{props.text}
	</div>
);


export default unavailible;
