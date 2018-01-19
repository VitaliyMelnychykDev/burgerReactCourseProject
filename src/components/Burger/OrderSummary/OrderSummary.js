import React from 'react';

import Aox from '../../../hoc/Aox';

const orderSummary = (props) => {
    console.log(props.ingredients);
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
            <p>Continue to Checkout</p>
        </Aox>
    );
}

export default orderSummary;