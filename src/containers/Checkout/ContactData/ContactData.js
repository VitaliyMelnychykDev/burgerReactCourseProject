import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        addres: {
            street: '',
            postalCode: ''
        }
    }

    orderHandler = () => {

    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                <form action="">
                    <input type="text" name="name" placeholder="Your Name"/>
                    <input type="text" name="email" placeholder="Your Email"/>
                    <input type="text" name="street" placeholder="Your Street"/>
                    <input type="text" name="postal" placeholder="Your Postal Code"/>
                    <Button
                        clicked={this.orderHandler}
                        btnType="Success">ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;