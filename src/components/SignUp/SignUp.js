import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import Firebase from '../Firebase';

const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm />
    </div>
);

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: '',
            password2: '',
            error: null
        };
    }
    
    handleEmailChange = e => {
        this.setState({email: e.target.value})
    }

    handleUsernameChange = e => {
        this.setState({username: e.target.value})
    }

    handlePasswordChange = e => {
        this.setState({password: e.target.value})
    }

    handlePassword2Change = e => {
        this.setState({password2: e.target.value})
    }

    signUp = () => {
        const {password, password2} = this.state;
        if (password == password2) {

        }
    }
    
    render() {
        const {username, email, password, password2} = this.state; 

        const isValid = username !== '' && 
        email !== "" && password !== '' && password2 !== '';

        return (
            <div>
                <div>
                <div>Username</div>
                <input value={username}
                onChange={e => this.handleUsernameChange(e)}></input>
                </div>
                <div>
                    <div>Email</div>
                    <input value={email}
                    onChange={e => this.handleEmailChange(e)}></input>
                </div>
                <div>
                    <div>Password</div>
                    <input value={password}
                    onChange={e => this.handlePasswordChange(e)}></input>
                </div>
                <div>
                    <div>Confirm Password</div>
                    <input value={password2}
                    onChange={e => this.handlePassword2Change(e)}></input>
                </div>
                <button 
                disabled={!isValid}
                onClick={() => this.signUp}>Sign up!</button>
            </div>
        )
    }
}

const SignUpLink = () => (
    <div>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </div>
);

export default SignUpPage;
export {SignUpForm, SignUpLink };