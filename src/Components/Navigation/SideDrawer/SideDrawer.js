import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'
import Logo from '../../Logo/Logo';

const sideDrawer = (props) => {
	let attchedClasses = [classes.SideDrawer, classes.Close];
	if(props.open) {
		attchedClasses = [classes.SideDrawer, classes.Open];
	}
	return (
		<Aux>
			<Backdrop show={props.open} clicked={props.close}/>
			<div className={attchedClasses.join(' ')}>
				<div className={classes.Logo}>
		            <Logo clicked={props.close}/>
		        </div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Aux>
	);
}


export default sideDrawer;
