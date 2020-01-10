import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import TMLogo from '../../media/TMLogo.png';

import './SignIn.css';

const SignInPage = () => (
    <div className="page-container">
        <div className="sign-in-container">
            <h4 className="sign-in-header">Log in to Track Magnet</h4>
            <SignInForm />
            <SignUpLink />
        </div>
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    handleEmailChange = e => {
        this.setState({ email: e.target.value });
    };
    handlePasswordChange = e => {
        this.setState({ password: e.target.value });
    };
    handleSignIn = e => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.LANDING);
            })
            .catch(error => {
                this.setState({ error: error.message });
            });
        e.preventDefault();
    };

    render() {
        const { email, password, error } = this.state;
        let isValid = email !== '' && password !== '';

        return (
            <div className="input-container">
                <div className="fields">
                    <div>
                        <input
                            className="input-field"
                            value={email}
                            onChange={e => this.handleEmailChange(e)}
                            placeholder="Enter email"
                        ></input>
                    </div>
                    <div>
                        <input
                            className="input-field"
                            value={password}
                            type="password"
                            onChange={e => this.handlePasswordChange(e)}
                            placeholder="Enter password"
                        ></input>
                    </div>
                    <button
                        className="login-btn"
                        disabled={!isValid}
                        onClick={e => this.handleSignIn(e)}
                    >
                        Log In
                    </button>
                    {error !== null ? <div>{error}</div> : ''}
                </div>
            </div>
        );
    }
}

const SignUpLink = () => (
    <div>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </div>
);

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
export default SignInPage;
export { SignInForm };
