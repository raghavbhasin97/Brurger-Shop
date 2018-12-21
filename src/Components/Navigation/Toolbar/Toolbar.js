import React from 'react';
import classes from './Toolbar.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import Logo from '../../Logo/Logo';

const toolbar = (props) => (
	<header className={classes.Toolbar}>
		<DrawerToggle toggle={props.toggleSideDrawer}/>
		<div className={[classes.Logo, classes.DesktopOnly].join(' ')}>
            <Logo />
        </div>
		<nav className={classes.DesktopOnly}>
			<NavigationItems />
		</nav>
	</header>
);


export default toolbar;
