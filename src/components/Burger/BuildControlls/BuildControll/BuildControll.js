import React from 'react';
import classes from './BuildControll.css'

const buildControll = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button
                onClick={props.removed}
                disabled={props.disabled}
                className={classes.Less}>Less</button>
            <button
                onClick={props.added}
                className={classes.More}>More</button>
        </div>
    );
}

export default buildControll;