import React, {Component} from 'react';
import Page404 from './pages/Page404';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import GamePage from './pages/Game';

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Redirect
                        path="/"
                        to="/game"
                        exact
                    />
                    <Route
                        path="/game"
                        component={GamePage}
                        exact
                    />

                    <Route
                        component={Page404}
                        path="/404"
                        exact
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
