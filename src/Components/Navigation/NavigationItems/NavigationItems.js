import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/" >Order</NavigationItem>
		<NavigationItem link="/myOrders">My Orders</NavigationItem>
	</ul>
);


export default navItems;
