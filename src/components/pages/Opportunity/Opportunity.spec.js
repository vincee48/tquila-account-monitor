'use strict';

describe('Opportunity', function () {
  var React = require('react/addons');
  var OpportunityView, component;

  beforeEach(function () {
    OpportunityView = require('./OpportunityView.js');
    component = React.createElement(OpportunityView);
  });

  it('should create a new instance of Opportunity', function () {
    expect(component).toBeDefined();
  });
});
