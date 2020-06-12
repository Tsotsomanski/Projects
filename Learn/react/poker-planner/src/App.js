import React, { PureComponent } from 'react';
import {BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import HomePage from "./components/HomePage";
import Session from "./components/Session";

class App extends PureComponent {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/:sessionId" component={Session}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </Router>
        );
    }
}

const PageNotFound = () => <h1>Page not found</h1>;

export default App;
