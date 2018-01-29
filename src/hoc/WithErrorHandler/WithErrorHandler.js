import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aox from '../Aox/Aox';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
               this.setState({error: null});

               return req;
            });
            this.respInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.respInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Aox>
                    <Modal
                        modalClosed={this.errorConfirmedHandler}
                        show={this.state.error}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aox>
            );
        }
    };
}

export default withErrorHandler;