'use strict';

var Reflux = require('reflux');
var Actions = require('../../actions/Account/AccountActionCreators');

var AccountStore = Reflux.createStore({
    listenables: [Actions],

    data: {
        accounts: [
            // Testing data

            {
                id: '01a',
                name: 'SAI Global',
                description: 'Stuff',
                accountNumber: '123'
            },
            {
                id: '02a',
                name: 'Tquila',
                description: 'More stuff',
                accountNumber: '456'
            }

        ]
    },
/*
    init: function() {
        var salesforce = new RemoteObjectModel.Account();

        salesforce.retrieve({ limit : 5 }, function (err, records, cb) {
            if (err) {
                console.error('Error occurred: ' + err);
            }
            if (!err) {
                records.forEach(function(record) {
                    var acc = {
                        "id" : record.get("Id"),
                        "name" : record.get("Name"),
                        "accountNumber" : record.get("AccountNumber"),
                        "description" : record.get("Description")
                    };
                    this.data.accounts.push(acc);
                }.bind(this));
                this.trigger();
            }
        }.bind(this));
    },
*/
    // Return the entire array of accounts
    getAccounts: function() {
        console.log('Retrieving all accounts.');
        return this.data.accounts;
    },

    // Return a single account
    getAccount: function(id) {
        var accounts = this.data.accounts;
        console.log('Finding account: ' + id);

        // Consider using _.find() ...
        for (var i = 0; i < accounts.length; i++ ) {
            if (accounts[i].id === id) {
                return accounts[i];
            }
        }

        console.warn('Could not found account with ID: ' + id);
        return null;
    },

    onUpdate: function(account) {
/*
        var salesforce = new RemoteObjectModel.Account({
            Id: account.id,
            Name: account.name,
            AccountNumber: account.accountNumber,
            Description: account.description
        });

        salesforce.update(function(err, ids) {
            if (err) {
                console.error('Error occurred: ' + err);
            }
        });
*/
        this.trigger();
    }

});

module.exports = AccountStore;
