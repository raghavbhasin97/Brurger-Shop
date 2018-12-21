import React, {Component} from 'react'
import Aux from '../../hoc/Aux';
import classes from './Layout.css'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer'


class Layout extends Component {

	state = {
		showSideDrawer: false
	}


	toggleSideDrawer = () => {
		let currentState = this.state.showSideDrawer
		this.setState({showSideDrawer: !currentState});
	}

	render() {
		return (
			<Aux>
				<SideDrawer close={this.toggleSideDrawer} open={this.state.showSideDrawer}/>
				<Toolbar toggleSideDrawer={this.toggleSideDrawer}/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		);
	}
} 

export default Layout;