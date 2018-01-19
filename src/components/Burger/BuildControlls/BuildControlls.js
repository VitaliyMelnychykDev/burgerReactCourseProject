import React from 'react';
import classes from './BuildControlls.css';
import * as Ingredients from '../BurgerIngredient/BurgerIngredientsInfos';
import BuildControll from './BuildControll/BuildControll';

const controlls = [
    { label: Ingredients.SALAD_LABEL, type: Ingredients.SALAD },
    { label: Ingredients.BACON_LABEL, type: Ingredients.BACON },
    { label: Ingredients.CHEESE_LABEL, type: Ingredients.CHEESE },
    { label: Ingredients.MEAT_LABEL, type: Ingredients.MEAT }
];

const buildControlls = (props) => {
    return (
        <div className={classes.BuildControls}>
            {controlls.map((ctrl) => (
                <BuildControll
                    disabled={props.disabled[ctrl.type]}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    key={ctrl.label}
                    label={ctrl.label} />
            ))}
        </div>
    );
}

export default buildControlls;