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
        } else if (this.props.remove) {
            this.props.removeTab();
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
        } else if (this.props.remove) {
            title = <span className="glyphicon glyphicon-remove"></span>;
            cls += " pull-right close-tab btn-danger";
        } else {
            if (this.props.tab.account) {
                title = this.props.tab.account.name;
            }
        }

        return (
            <button className={cls} onClick={this.handleTabClick}>
                { title }
            </button>
        );
    }
});

module.exports = TabTitle;

