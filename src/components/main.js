'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var TabsTemplate = require('./templates/TabsTemplate');
var Home = require('./pages/Home/Home');
var View = require('./pages/View/View');

// Define our routes to be used.
// Ensure that it is scalable in the sense that each route definition is handled by a different template
var Routes = (
    <Route name="app" path="/" handler={TabsTemplate}>
        <Route name="view" handler={View} />
        <DefaultRoute name="home" handler={Home}/>
    </Route>
);

Router.run(Routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('content'));
});
