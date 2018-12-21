import React, { Component } from 'react';
import classes from './Menu.css';
import MenuItem from './MenuItem/MenuItem';
import Axios from '../../Orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../UI/Spinner/Spinner'
import Unavailible from '../UI/Unavailible/Unavailible'
import { withRouter } from 'react-router-dom'

class Menu extends Component {

	state = {
		items: null,
		error:false
	}

	componentWillMount() {
		Axios.get('/Items.json').then(res => {

			this.setState({items: res.data})
		}).catch(err => {
			this.setState({error: true})
		});
	}

	handleClickEvent = (item) => {
		const query = "id=" + item.Key;
		this.props.history.push({
			pathname: '/burger',
			search: '?' + query
		});
	}


	render() {
		let menuItems = <Spinner />
		if(this.state.error) {
			menuItems = <Unavailible text="Application unavailible at this time. Please try again later."/>
		}
		if(this.state.items) {
			menuItems = []
			for (var ikey in this.state.items) {
				let item = this.state.items[ikey]
				item.Key = ikey
				menuItems.push(
					<MenuItem 
						key={ikey}
						src={item.Image} 
						name={item.Name} 
						description={item.Description}
						clicked={() => this.handleClickEvent(item)}
					/>
				);
			};
		}
		return (
			<div className={this.state.items !== null ? classes.Menu : classes.MenuSpinner}>
				<p>Our Menu</p>
				<ul>
					{menuItems}
				</ul>
			</div>
		);
	}
};

export default withErrorHandler(withRouter(Menu), Axios);