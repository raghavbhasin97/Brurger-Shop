import React from 'react';
import classes from './InputField.css'
import Aux from '../../../hoc/Aux'

const inputField = (props) => {
	let inputItem = <input type={props.type} name={props.name} placeholder={props.placeholder} />
	if(props.textArea) {
		inputItem = <textarea name={props.name} placeholder={props.placeholder} />
	}
	return(
		<Aux>
			<div className={classes.InputField}>
				<span>{props.title.toUpperCase()} {props.required ? '*': ''}</span>
				{inputItem}
			</div>
			<br/>
		</Aux>
	);
}
export default inputField;