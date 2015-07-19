'use strict';

var React = require('react/addons');

var Header = require('../core/Header/Header');
var Footer = require('../core/Footer/Footer');
var Tab = require('../core/Tab/Tab');
var TabTitle = require('../core/TabTitle/TabTitle');

require('normalize.css');
require('./TabsTemplate.less');

var TabsTemplate = React.createClass({

    getInitialState: function() {
        return {
            tabs: [{
                id: 0
            }],
            selectedTabId: 0,
            nextIncrement: 1
        };
    },

    render: function() {
        var tabTitles = this.state.tabs.map(function(tab,i) {
            return (
                <TabTitle key={tab.id} tab={tab} changeTab={this.changeTab} active={this.state.selectedTabId === tab.id}>
                </TabTitle>
            );
        }, this);

        var tabs = this.state.tabs.map(function(tab,i) {
            return (
                <Tab key={tab.id} tab={tab} updateTabAccount={this.updateTabAccount} visible={this.state.selectedTabId === tab.id}>
                </Tab>
            );
        }, this);

        return (
            <div>
                <Header/>

                <div className="main-content">
                    <div className="container">
                        <div className="tab-title-wrapper">
                            { tabTitles }
                            <TabTitle createNew="true" createNewTab={this.createNewTab} />
                            <TabTitle remove="true" removeTab={this.removeTab} />
                        </div>
                        { tabs }
                    </div>
                </div>

                <Footer/>
            </div>
        );
    },

    /*
     * Tab Controls
     */
    changeTab: function(tab) {
        this.setState({
            selectedTabId: tab.id
        });
    },

    createNewTab: function() {
        var tabs = this.state.tabs.slice();
        tabs.push({
            id: this.state.nextIncrement
        });
        this.setState({
            tabs: tabs,
            nextIncrement: this.state.nextIncrement+1,
            selectedTabId: this.state.nextIncrement
        });
    },

    // Remove selected tab
    removeTab: function() {
        var tabs = this.state.tabs.slice();
        for (var i = 0; i < this.state.tabs.length; i++) {
            if (tabs[i].id === this.state.selectedTabId) {
                tabs.splice(i, 1);
                break;
            }
        }
        this.setState({ tabs: tabs });
    },

    // Update the tab state with the selected account ID
    updateTabAccount: function(account) {
        for (var i = 0; i < this.state.tabs.length; i++) {
            if (this.state.tabs[i].id === this.state.selectedTabId) {
                this.state.tabs[i].account = account;
                break;
            }
        }
    }
});

module.exports = TabsTemplate;
