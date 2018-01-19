import React from 'react';

import Aox from '../../../hoc/Aox/Aox';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>);
        });

    return (
        <Aox>
            <h3>Your Order</h3>
            <p>Burger with ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout</p>
            <Button
                clicked={props.purchaseCancelled}
                btnType="Danger">Cancel</Button>
            <Button
                clicked={props.purchaseContinued}
                btnType="Success">Continue</Button>
        </Aox>
    );
}

export default orderSummary;