'use strict';

describe('TabTitle', function () {
  var React = require('react/addons');
  var TabTitle, component;

  beforeEach(function () {
    TabTitle = require('./TabTitle.js');
    component = React.createElement(TabTitle);
  });

  it('should create a new instance of TabTitle', function () {
    expect(component).toBeDefined();
  });
});
