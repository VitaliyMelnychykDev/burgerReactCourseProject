import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIngredient.css'
import * as Ingredient from './BurgerIngredientsInfos';

class BurgerIngredient extends Component{
    render () {
        let ingredient = null;

        switch (this.props.type) {
            case(Ingredient.BREAD_BOTTOM):
                ingredient = <div className={classes.BreadBottom}></div>;
                break;
            case(Ingredient.BREAD_TOP):
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case(Ingredient.MEAT):
                ingredient = <div className={classes.Meat}></div>;
                break;
            case(Ingredient.CHEESE):
                ingredient = <div className={classes.Cheese}></div>;
                break;
            case(Ingredient.BACON):
                ingredient = <div className={classes.Bacon}></div>;
                break;
            case(Ingredient.SALAD):
                ingredient = <div className={classes.Salad}></div>;
                break;
            default:
                ingredient = null

        }

        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;