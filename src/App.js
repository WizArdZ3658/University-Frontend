
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle";
import React from 'react';
import { Component, Fragment } from "react";
import store from './store';
import Header from './Header';
import Home from './Home';
import Chart from './Chart';
import { Provider } from "react-redux";
import { 
    Route, 
    Switch, 
    HashRouter as Router
} from "react-router-dom";
import College from './College';
import List from './List';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Fragment>
                        <Header />
                        <div className="container">
                            <br />
                            <br />
                            <div className="col-md-12">
                                <Switch>
                                    <Route exact path="/">
                                        <Home />
                                    </Route>
                                    <Route exact path="/chart">
                                        <Chart />
                                    </Route>
                                    <Route exact path="/college">
                                        <College />
                                    </Route>
                                    <Route exact path="/list">
                                        <List />
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </Fragment>
                </Router>
            </Provider>
        )
    }
}

export default App;