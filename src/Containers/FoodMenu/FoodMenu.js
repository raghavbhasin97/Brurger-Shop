import React, { Component } from 'react';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Axios from '../../Orders.js';
import Menu from '../../Components/Menu/Menu'

class FoodMenu extends Component {
	render() {
		return(
			<Menu />
		);
	}
}

export default WithErrorHandler(FoodMenu, Axios);