var React = require("react");

var Link = require("react-router").Link;

var i;
var obj;




const results = ({articles, handle}) => {
  i=0;


  return (
    
      <div>
        {articles.map(item => (
          
         <div key={i} className="alert alert-info" role="alert"><h3 className='articleHeadline'><span className="label label-danger">{++i}</span><strong> {item.headline.main}</strong><span className="badge"><button onClick={() => handle(item)} type="submit" className="btn-right btn-danger navbar-btn" formMethod="post">Save!</button></span></h3></div>
        ))}
      </div>
  );
};
module.exports = results;

