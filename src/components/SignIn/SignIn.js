import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import * as ROUTES from '../../constants/routes'
import { withFirebase } from '../Firebase'

const SignInPage = () => (
    <div>
        <h1>Sign In</h1>
        <SignInForm/>
        <SignUpLink/>
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
};

class SignInFormBase extends Component {
    constructor (props) {
        super(props);

        this.state = {...INITIAL_STATE}
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value})
    }
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value})
    }
    render() {
        const {email, password} = this.state;

        return (
            <div>
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
            </div>
        )
    }
};

const SignUpLink = () => (
    <div>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </div>
);

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
export default SignInPage;
export {SignInForm, SignUpLink};