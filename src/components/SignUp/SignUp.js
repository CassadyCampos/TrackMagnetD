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
            email = '',
            username = '',
            password = '',
            password2 = ''
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
    
    render() {
        return (
            <div>
                Test
                <input></input>
                <SignUpLink />
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