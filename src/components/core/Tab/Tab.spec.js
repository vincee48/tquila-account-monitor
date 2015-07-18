'use strict';

describe('Tab', function () {
  var React = require('react/addons');
  var Tab, component;

  beforeEach(function () {
    Tab = require('./Tab.js');
    component = React.createElement(Tab);
  });

  it('should create a new instance of Tab', function () {
    expect(component).toBeDefined();
  });
});
