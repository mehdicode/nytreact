// on.("click") function associated with the Search Button
$("#run-search").on("click", function(event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks).
  event.preventDefault();

  // Initially sets the articleCounter to 0
  articleCounter = 0;

  // Empties the region associated with the articles
  $("#well-section").empty();

  // Grabbing text the user typed into the search input
  searchTerm = $("#search-term").val().trim();
  var queryURL = queryURLBase + searchTerm;

  // Number of results the user would like displayed
  numResults = $("#num-records-select").val();

  // Start Year
  startYear = $("#start-year").val().trim();

  // End Year
  endYear = $("#end-year").val().trim();

  // If the user provides a startYear -- the startYear will be included in the queryURL
  if (parseInt(startYear)) {
    queryURL = queryURL + "&begin_date=" + startYear + "0101";
  }

  // If the user provides a startYear -- the endYear will be included in the queryURL
  if (parseInt(endYear)) {
    queryURL = queryURL + "&end_date=" + endYear + "0101";
  }

  // Then we will pass the final queryURL and the number of results to
  // include to the runQuery function
  runQuery(numResults, queryURL);
});
// ------------------------------------------------------------------------------------------------------------

