import axios from "axios";
var nytimesAPI = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(term) {


    // Figure out the geolocation
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytimesAPI + "&q=" + term;
    return axios.get(queryURL).then(function(response) {
      // If get get a result, return that result's formatted address property
      if (response) {
        return response.data.response.docs;
        // console.log(response.data.response.docs[0].headline.main)
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getSaved: function() {
    return axios.get("/");
  },

  // This function posts new searches to our database.
  saveArticle: function(text) {
    return axios.post("/", { text: text });
  }
};

// We export the API helper
module.exports = helper;