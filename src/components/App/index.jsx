import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import TMBoard from '../TMBoard/TMBoard';
import SignUpForm from '../SignUp/SignUp';
import SignInForm from '../SignIn/SignIn';
import AdminPage from '../Admin/AdminPage'

import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import { withAuthentication } from '../Session';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null
        };
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState({ authUser })
                : this.setState({ authUser: null });
        });
    }

    componentWillUnmount() {
        this.listener();
    }

    render() {
        return (
            <AuthUserContext.Provider value={this.state.authUser}>
                <Router>
                    <Navigation />
                    <hr />
                    <Route path={ROUTES.TMBOARD} component={TMBoard} />
                    <Route path={ROUTES.SIGN_UP} component={SignUpForm} />
                    <Route path={ROUTES.SIGN_IN} component={SignInForm} />
                    <Route path={ROUTES.ADMIN} component={AdminPage} />
                </Router>
            </AuthUserContext.Provider>
        );
    }
}

export default withAuthentication(App);
