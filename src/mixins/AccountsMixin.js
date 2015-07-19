'use strict';

var Reflux = require('reflux');

var AccountStore = require('../stores/Account/AccountStore');

// Mixin to be used for handling actions with multiple accounts
var AccountsMixin = {

    getInitialState: function() {
        return {
            accounts: AccountStore.getAccounts()
        };
    },

    componentDidMount: function() {
        this.listenTo(AccountStore, this.refresh);
    },

    refresh: function() {
        console.log('Refreshing...');
        this.setState({
            accounts: AccountStore.getAccounts()
        });
    },

    getAccount: function(accountId) {
        return AccountStore.getAccount(accountId);
    }
};

module.exports = AccountsMixin;
