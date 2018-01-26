import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aox from '../../hoc/Aox/Aox';
import Burger from '../../components/Burger/Burger'
import BuildControlls from '../../components/Burger/BuildControlls/BuildControlls';
import * as Ingredient from '../../components/Burger/BurgerIngredient/BurgerIngredientsInfos';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {};
INGREDIENT_PRICES[Ingredient.SALAD] = 0.5;
INGREDIENT_PRICES[Ingredient.CHEESE] = 0.4;
INGREDIENT_PRICES[Ingredient.MEAT] = 1.3;
INGREDIENT_PRICES[Ingredient.BACON] = 0.7;

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasing:  false,
            loading: false,
            error:false
        };
    }

    componentDidMount () {

        /*axios.get('https://react-burger-df427.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            }).catch(error => {
                this.setState({error: true});
        });*/
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({
            purchasing:true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing:false
        });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout',);
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredient can not be loaded</p>: <Spinner/>;

        if(this.props.ings) {
            burger = (
                <Aox>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControlls
                        ordered={this.purchaseHandler}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        ingredientAdded={this.props.onIngredientAdded}/>
                </Aox>
            );
            orderSummary = <OrderSummary
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ings} />;
        }

        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aox>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aox>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingName
        }),
        onIngredientRemoved: (ingName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingName
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));