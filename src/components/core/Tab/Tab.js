'use strict';

var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

require('./Tab.less');

/* The Tab component is the route handler for each view
 *
 * The following has been assumed as a user story
 * 1. Each tab will be associated to a single account
 * 2. Each tab will default to the 'View' view if an account is selected. Otherwise display the 'Home' view for selection.
 * 3. Accounts are fairly static and do not require current information from Salesforce (cached)
 * 4. Opportunities are regularly updating and require frequent querying (not cached, on demand)
*/
var Tab = React.createClass({

    render: function () {

        var content;
        if (this.props.visible) {
            content = (
                <div className="Tab">
                    <RouteHandler tab={this.props.tab} updateTabAccount={this.props.updateTabAccount} />
                </div>
            );
        }

        return (
            <div>
                { content }
            </div>
        );
    }
});

module.exports = Tab;

