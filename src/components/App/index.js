import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import TMBoard from '../TMBoard/TMBoard'

import * as ROUTES from '../../constants/routes'

const App = () => (
    <Router>
        <Navigation />
        <hr />
        {/* <Route exact path={ROUTES.LANDING} component={LandingPage} /> */}
        <Route path={ROUTES.TMBOARD} component={TMBoard} />
    </Router>
);

export default App;