import React from 'react';
import classes from './SummaryItem.css';


const summaryItem = (props) => {
	return (
		<div className={classes.SummaryItem}>
			<ul>
				<li><label>{props.title}:</label></li>
				<li><span style={{color: '#656568'}}>{props.text}</span></li>
			</ul>
		</div>
	);
};

export default summaryItem;