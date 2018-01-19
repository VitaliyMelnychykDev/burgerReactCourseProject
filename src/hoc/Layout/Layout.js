import React, {Component} from 'react';
import Aox from '../Aox/Aox';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDraw from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    sideDrawToggleHandler = () => {
        this.setState({
            showSideDrawer: true
        });
    }

    sideDrawClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    render() {
        return (
            <Aox>
                <Toolbar  drowToggleClicked={this.sideDrawToggleHandler}/>
                <SideDraw
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aox>
        );
    }
}


export default Layout;