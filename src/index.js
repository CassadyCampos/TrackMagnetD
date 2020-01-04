import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import store from './stores';
import App from './components/App/index';
import Firebase, { FirebaseContext } from './components/Firebase/index';
import './index.css';

ReactDOM.render(
    <Provider {...store}>
        <FirebaseContext.Provider value={new Firebase()}>
            <App />
        </FirebaseContext.Provider>
    </Provider>,
    document.getElementById('root')
);
