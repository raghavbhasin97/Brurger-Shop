import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
	const ingredientsSummary = Object.keys(props.ingredients).map(ikey => {
		return 	<li key={ikey}>
					<span style={{textTransform: 'capitalize'}}>{ikey}</span>
					: {props.ingredients[ikey]}
				</li>
		});
	return (
		<Aux>
			<h3>Your Order Summary</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>
				{ingredientsSummary}
			</ul>
			<p>Total Price: <strong>${props.price.toFixed(2)}</strong></p>
			<p>
			Do you want to proceed?
			<br/>
				<Button clicked={props.cancelOrder}>Cancel</Button>
				<Button clicked={props.continueOrder} success>Continue</Button>
			</p>
		</Aux>
		);
}


export default orderSummary;