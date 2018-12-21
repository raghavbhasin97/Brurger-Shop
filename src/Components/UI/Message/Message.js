import React from 'react';

const message = (props) => {
	let attcahedClasses = ['alert']
	if(props.success) {
		attcahedClasses.push('alert-success')
	} else if(props.info) {
		attcahedClasses.push('alert-info')
	} else if(props.warning) {
		attcahedClasses.push('alert-warning')
	} else if(props.danger) {
		attcahedClasses.push('alert-danger')
	}
	return(
			<div className={attcahedClasses.join(' ')}>
			  {props.children}
			</div>
	);	
}

export default message;
