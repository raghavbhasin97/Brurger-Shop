import React from 'react';
import classes from './NavigationItem.css'
import { NavLink } from 'react-router-dom';

const navItem = (props) => (
	<li className={classes.NavigationItem} onClick={props.onClick}>
		<NavLink 
			exact
			to={props.link}
			activeClassName={classes.active}
		>
			{props.children}
		</NavLink>
	</li>
	
);


export default navItem;