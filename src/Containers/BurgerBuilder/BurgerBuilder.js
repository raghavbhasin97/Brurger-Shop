import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Axios from '../../Orders.js'
import Spinner from '../../Components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Unavailible from '../../Components/UI/Unavailible/Unavailible'
import classes from './BurgerBuilder.css'

let INGREDIENT_PRICES = {};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		purchasable: false,
		isPurchasing:false,
		totalPrice: null,
		loading: false,
		error: false,
		name: null
	}


	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search)
		let id = null;
		for (let entry of query.entries()) {
			id = entry[1];
		}
		Axios.get('/prices.json').then(res => {
			INGREDIENT_PRICES = res.data.ingredients
		}).catch(err => {
			this.setState({error: true})
		});
		Axios.get('/Items/' + id + '.json').then(res =>{
			const item = res.data
			let ingredients = item.Ingredients
			let price = item.BasePrice
			let name = item.Name
			this.setState({ingredients:ingredients, totalPrice:price, name: name})
			this.updatePurchaseable(ingredients)
		}).catch(err => {
			this.setState({error: true})
		})
	}

	updatePurchaseable (ingredients) {

		const sum = Object.keys(ingredients).map(ikey => {
			return ingredients[ikey]
		}).reduce((sum, ig) => {
			return sum + ig
		}, 0);
		this.setState({purchasable: sum > 0});
	}

	purchaseNow = () => {
		this.setState({isPurchasing: true});
	}

	cancelPurchaseNow = () => {
		this.setState({isPurchasing: false});
	}

	continuePurchaseNow = () => {
		let queryString = []
		for(var item in this.state.ingredients) {
			queryString.push(item + '=' + this.state.ingredients[item])
		}
		queryString.push('price=' + this.state.totalPrice)
		queryString.push('name=' + this.state.name)
		this.props.history.push({
			pathname: '/order',
			search: '?' + btoa(queryString.join('&'))
		});
	}

	addIngredientHandler = (type) => {
		let newCount = this.state.ingredients[type] + 1
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = newCount;
		const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseable(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		let oldCount = this.state.ingredients[type]
		let newCount = Math.max(0,  oldCount - 1)
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = newCount;
		let newPrice = this.state.totalPrice
		if(oldCount > 0) {
			newPrice -= INGREDIENT_PRICES[type]
		}
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
		this.updatePurchaseable(updatedIngredients);
	}

	render() {
		const disableInfo = {
			...this.state.ingredients
		};

		for(let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0 
		}
		let modalChild = null
		let burgerDisplay = this.state.error ? <Unavailible text="Application unavailible at this time. Please try again later." /> : <Spinner />
		if (this.state.totalPrice) {
			burgerDisplay = (<Aux>
								<Burger ingredients = {this.state.ingredients}/>
								<div className={classes.BurgerBuilderName}>
									{this.state.name}
								</div>
								<BuildControls ingredientAdded={this.addIngredientHandler}
								ingredientRemoved={this.removeIngredientHandler}
								disabledInfo={disableInfo}
								price={this.state.totalPrice}
								purchasable={this.state.purchasable}
								orderPressed={this.purchaseNow}/>
							</Aux>)
			modalChild = <OrderSummary 
							ingredients={this.state.ingredients}
							cancelOrder={this.cancelPurchaseNow}
							continueOrder={this.continuePurchaseNow}
							price={this.state.totalPrice}
						/>
		}

		if (this.state.loading) {
			modalChild = <Spinner />
		}

		return(
			<Aux>
				<Modal 
					show={this.state.isPurchasing}
					clicked={this.cancelPurchaseNow}
				>
					{modalChild}
				</Modal>
				{burgerDisplay}
			</Aux>
		);
	}
}

export default WithErrorHandler(BurgerBuilder, Axios);
