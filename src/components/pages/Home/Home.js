'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

var AccountsMixin = require('../../../mixins/AccountsMixin');

require('./Home.less');

var Home = React.createClass({
    mixins: [AccountsMixin, Navigation],

    componentWillMount: function() {
        // Do not show the home view when an account has been selected for the tab
        if (this.props.tab.account) {
            this.transitionTo('view');
        }
    },

    selectAccount: function(id) {
        var account = this.getAccount(id);
        this.props.updateTabAccount(account);
        this.transitionTo('view');
    },

    render: function () {

        return (
            <div className="Home">
                <h2>Accounts</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Salesforce ID</th><th>Name</th><th>Account Number</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.accounts.map(function(account, i) {
                            return (
                                <tr onClick={this.selectAccount.bind(this,account.id)}>
                                    <td>{account.id}</td>
                                    <td>{account.name}</td>
                                    <td>{account.accountNumber}</td>
                                </tr>
                            );
                        }, this)
                    }
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = Home;

