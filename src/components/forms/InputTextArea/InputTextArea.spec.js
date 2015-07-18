'use strict';

describe('InputTextArea', function () {
  var React = require('react/addons');
  var InputTextArea, component;

  beforeEach(function () {
    InputTextArea = require('./InputTextArea.js');
    component = React.createElement(InputTextArea);
  });

  it('should create a new instance of InputTextArea', function () {
    expect(component).toBeDefined();
  });
});
