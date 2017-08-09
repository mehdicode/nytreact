// Include React
var React = require("react");
var Link = require("react-router").Link;


// Here we include all of the sub-components
var Search = require("./children/search");
var Results = require("./children/results");
var Saved = require("./children/saved");
var helpers = require("./utils/helpers");


var Main = React.createClass({
    getInitialState: function() {
        return { searchTerm: "", results: [], history: [], articleToSave: [] };
    },
    componentDidMount: function() {

        // // Get the latest history.
        // helpers.getSaved().then(function(response) {
        // console.log(response);
        // if (response !== this.state.history) {
        //     console.log("History", response.data);
        //     this.setState({ history: response.data });
        // }
        // }.bind(this));

    },
    componentDidUpdate: function(prevProps, prevState) {
    
        if (prevState.searchTerm !== this.state.searchTerm) {

            helpers.runQuery(this.state.searchTerm).then(function(data) {
                if (data !== this.state.results) {
                    this.setState({ results: data });
                    console.log(data);

                

                }
            }.bind(this));

        };

        if(prevState.articleToSave !== this.state.articleToSave){
           var data = {};
           data.title = this.state.articleToSave.headline.main;
           data.date = this.state.articleToSave.pub_date;
           data.url =  this.state.articleToSave.web_url;


            helpers.saveArticle(data).then(function() {
            console.log("Updated!");

            // helpers.getSaved().then(function(response) {
            //     console.log("Current History", response.data);

            //     console.log("History", response.data);

            //     this.setState({ history: response.data });

            // }.bind(this));
            }.bind(this));


        }
    },
    setTerm: function(term) {
        this.setState({ searchTerm: term });

    },
    handleClick: function(event){
        
        this.setState({ articleToSave: []});
        this.setState({ articleToSave: event});

        

    },
    render: function(){
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="text-center"><strong><i className="fa fa-newspaper-o"></i> New York Times Search</strong></h1>
                </div>   
                <Search setTerm={this.setTerm}/>

                <div className="row">
                    <div className="col-sm-12">
                        <br/>

                        
                        <div className="panel panel-primary">

                        
                            <div className="panel-heading">
                                <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Top Articles</strong></h3>
                            </div>

                            
                            <div className="panel-body" id="well-section">
                                <Results articles={this.state.results} handle={this.handleClick} />
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            
        );
    }
});
module.exports = Main;