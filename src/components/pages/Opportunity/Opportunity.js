'use strict';

var React = require('react/addons');

var InputText = require('../../forms/InputText/InputText');
var OpportunityActions = require('../../../actions/Opportunity/OpportunityActionCreators');
var OpportunityStore = require('../../../stores/Opportunity/OpportunityStore');

require('./Opportunity.less');

var Opportunity = React.createClass({

    getInitialState: function() {
        return {
            opened: false,
            editing: false,
            opportunity: null,
            createMode: false,
            newOpportunity: {
                name: '',
                stageName: '',
                amount: '',
                accountId: this.props.accountId
            },
            opportunities: [],
            opportunityLoaded: false
        };
    },
    componentWillMount: function() {
        OpportunityStore.initFor(this.props.accountId, this.updateOpportunities);
    },
    // Used as a callback when opportunity init has been complete
    updateOpportunities: function() {
        this.setState({
            opportunities: OpportunityStore.getOpportunities(),
            opportunityLoaded: true
        });
        console.log('Opportunities initialized!');
    },
    viewDetails: function(opportunity) {
        this.setState({
            opened: true,
            opportunity: opportunity
        });
    },
    closeView: function() {
        this.setState({
            opened: false,
            editing: false,
            opportunity: null
        });
    },

    /*
     * Edit Methods
     */
    startEditing: function() {
        this.setState({
            editing: true
        });
    },
    stopEditing: function() {
        this.setState({
            editing: false
        });
    },
    onSubmit: function(e) {
        e.preventDefault();

        // Call the action to update the store
        OpportunityActions.update(this.state.opportunity, this.stopEditing);
    },
    onChangeName: function(e) {
        this.state.opportunity.name = e.target.value;
    },

    /*
     * Creation methods
     */
    onCreateName: function(e) {
        this.state.newOpportunity.name = e.target.value;
    },
    onCreateStageName: function(e) {
        this.state.newOpportunity.stageName = e.target.value;
    },
    onCreateAmount: function(e) {
        this.state.newOpportunity.amount = e.target.value;
    },
    onCreateSubmit: function(e) {
        e.preventDefault();

        OpportunityActions.create(this.state.newOpportunity, this.stopCreating);
    },
    startCreating: function() {
        this.setState({
            createMode: true
        });
    },
    stopCreating: function() {
        OpportunityStore.initFor(this.props.accountId, this.updateOpportunities);
        this.setState({
            createMode: false
        });
    },

    render: function () {
        var createView = (
            <form className="form-horizontal" >
                <InputText label="Name" id="name" editable={this.state.createMode} onChange={this.onCreateName} />
                <InputText label="Stage" id="stageName" editable={this.state.createMode} onChange={this.onCreateStageName} />
                <InputText label="Amount" id="amount" editable={this.state.createMode} onChange={this.onCreateAmount} />

                <div className="row form-buttons">
                    <div className="col-md-offset-3 col-md-9">
                        <button type="button" onClick={this.onCreateSubmit} className="btn btn-primary"><span className="glyphicon glyphicon-floppy-save"></span> Submit</button>
                        <button type="button" onClick={this.stopCreating} className="btn btn-primary"><span className="glyphicon glyphicon-ban-circle"></span> Cancel</button>
                    </div>
                </div>
            </form>
        );

        var opportunityView = this.state.opened ?
            // Show selected opportunity
            <div className="view">
                <form className="form-horizontal" >
                    <InputText label="Salesforce ID" value={this.state.opportunity.id} id="id" editable={false} />
                    <InputText label="Name" value={this.state.opportunity.name} id="name" editable={this.state.editing} onChange={this.onChangeName} />
                    <InputText label="Stage" value={this.state.opportunity.stageName} id="stageName" editable={false} />
                    <InputText label="Amount" value={this.state.opportunity.amount} id="amount" editable={false} />
                </form>

                <div className="row form-buttons">
                    <div className="col-xs-3">
                        <button className="btn btn-primary" onClick={this.closeView}>
                            <span className="glyphicon glyphicon-arrow-left"></span> Back
                        </button>
                    </div>
                    {
                        this.state.editing ?
                            <div className="col-xs-9">
                                <button type="button" onClick={this.onSubmit} className="btn btn-primary"><span className="glyphicon glyphicon-floppy-save"></span> Submit</button>
                                <button type="button" onClick={this.stopEditing} className="btn btn-primary"><span className="glyphicon glyphicon-ban-circle"></span> Cancel</button>
                            </div>
                            :
                            <div className="col-xs-9">
                                <button className="btn btn-primary" onClick={this.startEditing}>
                                    <span className="glyphicon glyphicon-edit"></span> Edit
                                </button>
                            </div>
                    }
                </div>
            </div> :
            // Show list of opportunities
            this.state.opportunities.length > 0 ?
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th><th>Stage</th><th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.opportunities.map(function (opp) {
                            return (
                                <tr onClick={this.viewDetails.bind(this,opp)} key={opp.id}>
                                    <td>{opp.name}</td>
                                    <td>{opp.stageName}</td>
                                    <td>${opp.amount}</td>
                                </tr>
                            );
                        }, this)
                    }
                    </tbody>
                </table>
                :
                <div>No opportunities found!</div>;

        // Show status of opportunities. Create mode will override any other mode.
        var opportunities = this.state.createMode ?
            createView
            :
            (this.state.opportunityLoaded ? opportunityView : <div>Loading opportunities</div>);

        return (
            <div className="Opportunity">
                <h2>Opportunities
                    <button className="btn btn-sm btn-success pull-right" onClick={this.startCreating}>
                        <span className="glyphicon glyphicon-plus"></span>
                    </button>
                </h2>
                <hr/>
                {opportunities}
            </div>
        );
    }
});

module.exports = Opportunity;

