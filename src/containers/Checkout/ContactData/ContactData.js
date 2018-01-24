import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from "../../../axios-orders";
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        addres: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    render() {
        let form = (
            <form action="">
                <input type="text" name="name" placeholder="Your Name"/>
                <input type="text" name="email" placeholder="Your Email"/>
                <input type="text" name="street" placeholder="Your Street"/>
                <input type="text" name="postal" placeholder="Your Postal Code"/>
                <Button
                    clicked={this.orderHandler}
                    btnType="Success">ORDER</Button>
            </form>);
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;