import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css'
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aox from '../../../hoc/Aox/Aox';

const sideDrawer = (props) => {
    let attechecedClasses = [classes.SideDrawer, classes.Close];

    if(props.open) {
        attechecedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <Aox>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={attechecedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>

            </div>
        </Aox>
    );
}

export default sideDrawer;