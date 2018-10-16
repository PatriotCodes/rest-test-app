import React from 'react';

import {LoginForm} from "./LoginForm";
import {RegisterForm} from "./RegisterForm";

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            registerScreen: false,
            registered: false,
        };
        this.submitRegister = this.submitRegister.bind(this);
    }

    render() {
        return (
            <div className="row login-row">
                {this.state.registered &&
                    <div className="alert alert-success">
                        You have been registered. You can now log in using your credentials.
                    </div>
                }
                {!this.state.registerScreen &&
                <div className="login-form-wrap">
                    <LoginForm/>
                    <div className="login-footer">
                        <span>Don't have an account?</span>
                        <button className="btn btn-primary ml-15"
                                onClick={() => this.showRegisterForm()}>Register
                        </button>
                    </div>
                </div>
                }
                {this.state.registerScreen &&
                    <div className="login-form-wrap">
                        <RegisterForm submitHandler={this.submitRegister}/>
                        <div className="login-footer">
                            <button className="btn btn-primary ml-15"
                                    onClick={() => this.hideRegisterForm()}>Cancel
                            </button>
                        </div>
                    </div>
                }
            </div>
        );
    }

    showRegisterForm() {
        this.setState({registerScreen: true, registered: false});
    };

    hideRegisterForm() {
        this.setState({registerScreen: false});
    };

    submitRegister() {
        this.setState({registered: true});
    }
}

const connectedLoginPage = LoginPage;
export {connectedLoginPage as LoginPage};