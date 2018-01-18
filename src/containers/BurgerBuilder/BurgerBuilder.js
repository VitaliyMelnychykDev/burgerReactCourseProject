import React, {Component} from 'react';

import Aox from '../../hoc/Aox';
import Burger from '../../components/Burger/Burger'
import BuildControlls from '../../components/Burger/BuildControlls/BuildControlls';
import * as Ingredient from '../../components/Burger/BurgerIngredient/BurgerIngredientsInfos';

const sfds = 'sdsffg';

const INGREDIENT_PRICES = {};
INGREDIENT_PRICES[Ingredient.SALAD] = 0.5;
INGREDIENT_PRICES[Ingredient.CHEESE] = 0.4;
INGREDIENT_PRICES[Ingredient.MEAT] = 1.3;
INGREDIENT_PRICES[Ingredient.BACON] = 0.7;

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
            },
            totalPrice: 4
        };

        this.state.ingredients[Ingredient.SALAD] = 0;
        this.state.ingredients[Ingredient.CHEESE] = 0;
        this.state.ingredients[Ingredient.MEAT] = 0;
        this.state.ingredients[Ingredient.BACON] = 0;
    }

    addIngredientHandler = (type) => {
        const olCount = this.state.ingredients[type];
        const updatedCount = olCount + 1;
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
    }

    removeIngredientHandler = (type) => {

    }

    render () {
        return (
            <Aox>
                <Burger ingredients={this.state.ingredients} />
                <BuildControlls
                    ingrediantAdded={this.addIngredientHandler()} />
            </Aox>
        );
    }
}

export default BurgerBuilder;