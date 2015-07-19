'use strict';

var Reflux = require('reflux');

var OpportunityActionCreators  =  Reflux.createActions([
    'getOpportunities',
    'update',
    'create'
]);


module.exports = OpportunityActionCreators;
