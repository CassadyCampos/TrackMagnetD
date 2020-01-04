import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut/SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const Navigation = () => (
    // console.log(authUser),
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ?  <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>
);

const NavigationAuth = () => (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="navbar-brand">Track Magnet</div>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={ROUTES.LANDING}>Landing</Link>
                </li>
                <li className="nav-item">
                    <Link to={ROUTES.TMBOARD}>Board</Link>
                </li>
                <li className="nav-item">
                    <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                </li>
                <li className="nav-item">
                    <Link to={ROUTES.ADMIN}>Admin</Link>
                </li>
                <li>
                    <SignOutButton />
                </li>
            </ul>
        </div>
    </nav>
);

const NavigationNonAuth = () => (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
    <div className="navbar-brand">Track Magnet</div>
    <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
    >
        <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to={ROUTES.LANDING}>Lakknding</Link>
            </li>
            <li className="nav-item">
                <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
            <li>
                {/* <SignOutButton /> */}
            </li>
        </ul>
    </div>
</nav>
)

export default Navigation;
