import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm />
        <SignInLink />
    </div>
);

const INITIAL_STATE = {
    email: '',
    username: '',
    password: '',
    password2: '',
    error: null
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    handleEmailChange = e => {
        this.setState({ email: e.target.value });
    };

    handleUsernameChange = e => {
        this.setState({ username: e.target.value });
    };

    handlePasswordChange = e => {
        this.setState({ password: e.target.value });
    };

    handlePassword2Change = e => {
        this.setState({ password2: e.target.value });
    };

    submitSignUp = e => {
        const { password, password2, email, username } = this.state;

        if (password === password2) {
            this.props.firebase
                .doCreateUserWithEmailAndPassword(email, password)
                .then(authUser => {
                    this.props.firebase.insertUser(
                        username,
                        email,
                        authUser.user.uid
                    );
                })
                .then(() => {
                    this.setState({ ...INITIAL_STATE });
                    this.props.history.push(ROUTES.LANDING);
                })
                .catch(error => {
                    this.setState({ error });
                });
        }
        e.preventDefault();
    };

    render() {
        const { username, email, password, password2 } = this.state;

        const isValid =
            username !== '' &&
            email !== '' &&
            password !== '' &&
            password2 !== '';

        return (
            <div>
                <div>
                    <div>Username</div>
                    <input
                        value={username}
                        onChange={e => this.handleUsernameChange(e)}
                    ></input>
                </div>
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
                <div>
                    <div>Confirm Password</div>
                    <input
                        value={password2}
                        onChange={e => this.handlePassword2Change(e)}
                    ></input>
                </div>
                <button disabled={!isValid} onClick={e => this.submitSignUp(e)}>
                    Sign up!
                </button>
            </div>
        );
    }
}

const SignInLink = () => (
    <div>
        Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </div>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);
export default SignUpPage;
export { SignUpForm };
