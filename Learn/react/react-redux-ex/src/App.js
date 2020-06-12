import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import TodoContainer from './components/TodoPage/TodoContainer';
import Navbar from "./components/ReactRouterEx/Navbar";
import About from "./components/ReactRouterEx/About";
import Home from "./components/ReactRouterEx/Home";
import Contact from "./components/ReactRouterEx/Contact";
import Post from "./components/ReactRouterEx/Post";

class App extends Component {

  render() {
    return (
        <BrowserRouter>
        <div className="todo-app container">
            <Navbar />
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/about' component={About}/>
                <Route path='/contact' component={Contact}/>
                <Route path='/todos' component={TodoContainer}/>
                <Route path='/:post_id' component={Post}/>
            </Switch>
        </div>
        </BrowserRouter>
    );
  }
}

export default App;
