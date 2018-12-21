import React from 'react';
import classes from './ConfirmationSummary.css';
import SummaryItem from './SummaryItem/SummaryItem'

const confirmationSummary = (props) => {
	return (
		<div className={classes.ConfirmationSummary}>
			<span>Order Number #{props.order.orderNumber}</span>
			<SummaryItem title="Name" text={props.order.name} />
			<SummaryItem title="Price" text={'$' + props.order.price} />
			<SummaryItem title="Customer Name" text={props.contact.name} />
			<SummaryItem title="Customer Email" text={props.contact.email} />
			<SummaryItem title="Customer Phone" text={props.contact.phone} />
			<SummaryItem title="Customer Address" text={props.contact.address} />
			<SummaryItem title="Delivery Instructions" text={props.contact.instructions.length > 0? props.contact.instructions : 'N/A'} />
		</div>
	);
};

export default confirmationSummary;