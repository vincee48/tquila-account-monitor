'use strict';

var Reflux = require('reflux');
var React = require('react/addons');
var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;

var InputText = require('../../forms/InputText/InputText');
var InputTextArea = require('../../forms/InputTextArea/InputTextArea');
var AccountActions = require('../../../actions/Account/AccountActionCreators');
var AccountsMixin = require('../../../mixins/AccountsMixin');
var Opportunity = require('../Opportunity/Opportunity');

require('./View.less');

var View = React.createClass({
    mixins: [Reflux.ListenerMixin, Navigation, AccountsMixin],

    getInitialState: function() {
        return {
            mounted: false,
            editing: false,
            account: this.props.tab.account ? this.getAccount(this.props.tab.account.id) : null
        };
    },
    componentWillMount: function() {
        // Show the home view when no account has been selected for the tab
        if (!this.props.tab.account) {
            this.transitionTo('home');
        }
    },
    componentDidMount: function() {
        // Only mount the view if an account is selected
        if (this.props.tab.account) {
            this.setState({
                mounted: true
            });
        }
    },

    /*
     * Editing account functions
     */
    onChangeName: function(e) {
        this.state.account.name = e.target.value;
    },

    onChangeAccountNumber: function(e) {
        this.state.account.accountNumber = e.target.value;
    },

    onChangeDescription: function(e) {
        this.state.account.description = e.target.value;
    },
    startEditing: function() {
        this.setState({ editing: true });
    },
    stopEditing: function() {
        this.setState({ editing: false });
    },
    onSubmit: function(e) {
        e.preventDefault();

        // Call the action to update the store
        AccountActions.update(this.state.account, this.stopEditing);
    },

    render: function () {

        var viewContent = this.state.mounted ?
            (
                <div className="View">
                    <div className="col-md-6">
                        <h2>Account</h2>
                        <hr/>
                        <form className="form-horizontal">
                            <InputText label="Salesforce ID" value={this.state.account.id} id="id" editable={false} />
                            <InputText label="Account Number" value={this.state.account.accountNumber} id="accountNumber" editable={this.state.editing} onChange={this.onChangeAccountNumber} />
                            <InputText label="Name" value={this.state.account.name} id="name" editable={this.state.editing} onChange={this.onChangeName} />
                            <InputTextArea label="Description" value={this.state.account.description} id="description" editable={this.state.editing} onChange={this.onChangeDescription} />
                            <div className="row form-buttons">
                            { this.state.editing ?
                                <div className="col-md-offset-3 col-md-9">
                                    <button type="button" onClick={this.onSubmit} className="btn btn-primary"><span className="glyphicon glyphicon-floppy-save"></span> Submit</button>
                                    <button type="button" onClick={this.stopEditing} className="btn btn-primary"><span className="glyphicon glyphicon-ban-circle"></span> Cancel</button>
                                </div>
                                :
                                <div className="col-md-offset-3 col-md-9">
                                    <button type="button" onClick={this.startEditing} className="btn btn-primary"><span className="glyphicon glyphicon-edit"></span> Edit</button>
                                </div>
                            }
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <Opportunity accountId={this.state.account.id} />
                    </div>
                </div>
            ) : null;

        return viewContent;
    }

});

module.exports = View;

