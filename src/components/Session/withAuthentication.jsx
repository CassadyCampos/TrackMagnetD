import React from 'react'

import AuthUserContext from '..context'
import { withFirebase } from '../Firebase'
import { render } from '@testing-library/react';

const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this,.state = { 
                authUser: null
            }
        }
    }

    componentDidMount() {
        this.listneer = this.props.firebase.auth.onAuthStateChanged(
            authUser => {
                authUser 
                ? this.ListeningStateChangedEvent({ authUser })
                : this.ListeningStateChangedEvent({ authUser: null});
            }
        );
    }

    componentWillUnmount() {
        this.listener();
    };

    render() {
        return (
            <AuthUserContext.Provder value={this.state.authUser}>
                <Component {..this.props} />
            </AuthUserContext.Provder>
        )
    }
}