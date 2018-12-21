import React from 'react';

import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl'
const controls = [
	{label: 'Salad', type: 'salad'},
	{label: 'Meat', type: 'meat'},
	{label: 'Bacon', type: 'bacon'},
	{label: 'Cheese', type: 'cheese'}
];

const buildControls = (props) => (
	<div className={classes.BuildControls}>
		<p> Current Price: <strong>${props.price.toFixed(2)}</strong></p>
		{ controls.map(item => {
				return <BuildControl 
					key={item.label} 
					label={item.label}
					added={() => props.ingredientAdded(item.type)}
					removed = {() => props.ingredientRemoved(item.type)}
					shouldDisable = {props.disabledInfo[item.type]}
					/>
		})}
		<button 
			className={classes.OrderButton} 
			disabled={!props.purchasable} 
			onClick={props.orderPressed}>
		Order Now</button>
	</div>
);

export default buildControls;