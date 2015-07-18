'use strict';

var React = require('react/addons');

var InputText = React.createClass({

    render: function () {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id} className="control-label col-md-3">{this.props.label}:</label>
                <div className="col-md-9">
                    {
                        this.props.editable ? <input className="form-control" type="text" id={this.props.id} defaultValue={this.props.value} onChange={this.props.onChange} />
                            : <span className="pull-left form-control-static">{this.props.value}</span>
                    }
                </div>
            </div>
        );
    }
});

module.exports = InputText;

