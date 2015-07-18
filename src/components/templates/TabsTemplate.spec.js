'use strict';

describe('TabsTemplate', function () {
  var React = require('react/addons');
  var TabsTemplate, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    TabsTemplate = require('./TabsTemplate.js');
    component = React.createElement(TabsTemplate);
  });

  it('should create a new instance of TabsTemplate', function () {
    expect(component).toBeDefined();
  });
});
