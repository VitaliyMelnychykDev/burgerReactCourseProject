import React, {Component} from 'react';

import Aox from '../../hoc/Aox/Aox';
import Burger from '../../components/Burger/Burger'
import BuildControlls from '../../components/Burger/BuildControlls/BuildControlls';
import * as Ingredient from '../../components/Burger/BurgerIngredient/BurgerIngredientsInfos';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {};
INGREDIENT_PRICES[Ingredient.SALAD] = 0.5;
INGREDIENT_PRICES[Ingredient.CHEESE] = 0.4;
INGREDIENT_PRICES[Ingredient.MEAT] = 1.3;
INGREDIENT_PRICES[Ingredient.BACON] = 0.7;

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            totalPrice: 4,
            purchasable: false,
            purchasing:  false,
            loading: false,
            error:false
        };

/*        this.state.ingredients[Ingredient.SALAD] = 0;
        this.state.ingredients[Ingredient.CHEESE] = 0;
        this.state.ingredients[Ingredient.MEAT] = 0;
        this.state.ingredients[Ingredient.BACON] = 0;*/
    }

    componentDidMount () {
        axios.get('https://react-burger-df427.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            }).catch(error => {
                this.setState({error: true});
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition= INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction= INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({
            purchasable: sum > 0
        });
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
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Vitalii',
                address: {
                    street: "Test",
                    zipCode: "67020",
                    country: "Ukraine"
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fast'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
            });
    }
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredient can not be loaded</p>: <Spinner/>;

        if(this.state.ingredients) {
            burger = (
                <Aox>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControlls
                        ordered={this.purchaseHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ingredientRemoved={this.removeIngredientHandler}
                        ingredientAdded={this.addIngredientHandler}/>
                </Aox>
            );
            orderSummary = <OrderSummary
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.state.ingredients} />;
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

export default withErrorHandler(BurgerBuilder, axios);