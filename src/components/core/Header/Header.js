'use strict';

var React = require('react/addons');

require('./Header.less');

var Header = React.createClass({

    render: function () {
        return (
            <div className="Header">
                <div className="container">
                    <h1>Account Monitor</h1>
                </div>
            </div>
        );
    }
});

module.exports = Header;

