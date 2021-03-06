'use strict';

var React = require('react/addons');

require('./TabTitle.less');

var TabTitle = React.createClass({

    getInitialState: function() {
        return {
            title: 'New Tab'
        };
    },

    // Prepare the callback for changing tabs
    handleTabClick: function() {
        if (this.props.createNew) {
            this.props.createNewTab();
        } else {
            this.props.changeTab(this.props.tab);
        }
    },

    render: function () {
        var cls = "TabTitle";
        cls += this.props.active ? " active" : "";

        var title = this.state.title;
        if (this.props.createNew) {
            title = <span className="glyphicon glyphicon-plus"></span>;
        } else {
            if (this.props.tab.account) {
                title = this.props.tab.account.name;
            }
        }

        return (
            <button className={cls} onClick={this.handleTabClick}>
                { title }
                { this.props.createNew ? null : <span className="remove-icon text-danger glyphicon glyphicon-remove" onClick={this.props.removeTab}></span> }
            </button>
        );
    }
});

module.exports = TabTitle;

