'use strict';

var React = require('react/addons');

require('./Footer.less');

var Footer = React.createClass({

    render: function () {
        return (
            <div className="Footer">
                <div className="container text-center">
                    <p>Developed by <a href="//www.vincentsylo.com.au">Vincent Lo</a> for Tquila 2015</p>
                </div>
            </div>
        );
    }
});

module.exports = Footer;

