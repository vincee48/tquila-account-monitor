'use strict';

var React = require('react/addons');

var InputTextArea = React.createClass({

    render: function () {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id} className="control-label col-md-3">{this.props.label}:</label>
                <div className="col-md-9">
                    {
                        this.props.editable ? <textarea className="form-control" id={this.props.id} defaultValue={this.props.value} onChange={this.props.onChange}></textarea>
                            : <span className="pull-left form-control-static">{this.props.value}</span>
                    }
                </div>
            </div>
        );
    }
});

module.exports = InputTextArea;

