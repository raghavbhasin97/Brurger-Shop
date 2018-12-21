import React from 'react';
import classes from './Button.css'

const button = (props) => {
	let attachedClasses = [classes.Button, classes.Danger]
	if(props.success) {
		attachedClasses = [classes.Button, classes.Success]
	}
	return (
		<button onClick={props.clicked} className={attachedClasses.join(' ')}>
			{props.children}
		</button>
	);
}
export default button;