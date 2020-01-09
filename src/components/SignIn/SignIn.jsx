import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

import './SignIn.css'

const SignInPage = () => (
    <div className="page-container">
        <div className="sign-in-container">
        <h1>Sign In</h1>
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
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.LANDING);
            })
            .catch(error => {
                this.setState({ error: error.message });
            })
        e.preventDefault();    
    };

    render() {
        const { email, password, error } = this.state;
        let isValid = email !== '' && password !== '';

        return (
            <div>
                <div>
                    <div>Email</div>
                    <input
                        value={email}
                        onChange={e => this.handleEmailChange(e)}
                    ></input>
                </div>
                <div>
                    <div>Password</div>
                    <input
                        value={password}
                        onChange={e => this.handlePasswordChange(e)}
                    ></input>
                </div>
                <button disabled={!isValid} onClick={e => this.handleSignIn(e)}>
                    Sign In!
                </button>
                {error !== null ? <div>{error}</div> : ''}
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
