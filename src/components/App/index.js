import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import TMBoard from '../TMBoard/TMBoard'
import SignUpForm from '../SignUp/SignUp'
import SignInForm from '../SignIn/SignIn'

import * as ROUTES from '../../constants/routes'

const App = () => (
    <Router>
        <Navigation />
        <hr />
        {/* <Route exact path={ROUTES.LANDING} component={LandingPage} /> */}
        <Route path={ROUTES.TMBOARD} component={TMBoard} />
        <Route path={ROUTES.SIGN_UP} component={SignUpForm} />
        <Router path ={ROUTES.SIGN_IN} component={SignInForm} />
    </Router>
);

export default App;