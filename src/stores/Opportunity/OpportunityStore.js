'use strict';

var Reflux = require('reflux');
var Actions = require('../../actions/Opportunity/OpportunityActionCreators');

var OpportunityStore = Reflux.createStore({
    listenables: [Actions],

    data: {
        opportunities: []
    },

    // Return the opportunities for the account ON-DEMAND
    initFor: function(accountId, callback) {
        console.log('Finding opportunities for account id: ' + accountId);

        var opps = [];
        var salesforce = new RemoteObjectModel.Opportunity();

        salesforce.retrieve({
            where : {
                AccountId: { eq: accountId }
            }
        }, function (err, records) {
            if (err) {
                console.error('Error occurred: ' + err);
            }
            if (!err) {
                records.forEach(function(record) {
                    var opp = {
                        "id" : record.get("Id"),
                        "name" : record.get("Name"),
                        "accountId" : record.get("AccountId"),
                        "stageName" : record.get("StageName"),
                        "amount" : record.get("Amount")
                    };
                    opps.push(opp);
                }.bind(this));
                this.data.opportunities = opps;
                callback();
                this.trigger();
            }
        }.bind(this));

        console.log('Opportunity initialization begun');
    },

    getOpportunities: function() {
        return this.data.opportunities;
    },

    onUpdate: function(opportunity, callback) {

        var salesforce = new RemoteObjectModel.Opportunity({
            Id: opportunity.id,
            Name: opportunity.name,
            Amount: opportunity.amount
        });

        salesforce.update(function(err, ids) {
            if (err) {
                console.error('Error occurred: ' + err);
            }
            callback();
        });

        this.trigger();
    },

    onCreate: function(opportunity, callback) {

        var salesforce = new RemoteObjectModel.Opportunity({
            Name: opportunity.name,
            Amount: opportunity.amount,
            StageName: opportunity.stageName,
            AccountId: opportunity.accountId,
            CloseDate: new Date()
        });

        salesforce.create(function(err, ids) {
            if (err) {
                console.error('Error occurred: ' + err);
            }
            callback();
        });

        this.trigger();
    }
});

module.exports = OpportunityStore;
