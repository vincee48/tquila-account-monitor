'use strict';

describe('InputText', function () {
  var React = require('react/addons');
  var InputText, component;

  beforeEach(function () {
    InputText = require('./InputText.js');
    component = React.createElement(InputText);
  });

  it('should create a new instance of InputText', function () {
    expect(component).toBeDefined();
  });
});
