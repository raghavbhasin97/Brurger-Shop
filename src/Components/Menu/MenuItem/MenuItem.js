import React, { Component } from 'react';
import classes from './MenuItem.css'

class MenuItem extends Component {
	render() {
		return(
			<li className={classes.MenuItem} onClick={this.props.clicked}>
				<img src={this.props.src} alt={this.props.name} />
				<div className={classes.MenuItemContainer}>
					<h4>{this.props.name}</h4>
					<p>{this.props.description}</p>  
				</div>
			</li>
		);
	}
}

export default MenuItem