// Include React
var React = require("react");
// Including the Link component from React Router to navigate within our application without full page reloads
var Link = require("react-router").Link;

var search = React.createClass({
    getInitialState: function() {
        return { term: "" };
    },

    // This function will respond to the user input
    handleChange: function(event) {
        
        this.setState({ term: event.target.value });

    },

    // When a user submits...
    handleSubmit: function(event) {
        // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
        // clicking the button
        event.preventDefault();

        // Set the parent to have the search term
        this.props.setTerm(this.state.term);
        this.setState({ term: "" });
    },
    render: function(){
        return (
            <div className="row">
            <div className="col-sm-12">
                <br/>
                
                <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i>   Search Parameters</strong></h3>
                </div>
                <div className="panel-body">


                    <form role="form" onSubmit={this.handleSubmit}>

            
                    <div className="form-group">
                        <label htmlFor="search">Search Term:</label>
                        <input type="text" className="form-control" value={this.state.term} type="text" id="term" onChange={this.handleChange} required/>
                    </div>

            
                    <div className="form-group">
                        <label htmlFor="start-year">Start Year (Optional):</label>
                        <input type="text" className="form-control" id="start-year"/>
                    </div>

            
                    <div className="form-group">
                        <label htmlFor="end-year">End Year (Optional):</label>
                        <input type="text" className="form-control" id="end-year"/>
                    </div>

                
                    <button type="submit" className="btn btn-default" id="run-search"><i className="fa fa-search" ></i> Search</button>

                    </form>
                </div>
                </div>
            </div>
            </div>
        );
    }
});

module.exports = search;