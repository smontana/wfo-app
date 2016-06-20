var moment = require('moment');
var config = require('./db/config');
var query_interactions = require('./db/query_logic/query-interactions');
var sfi_interactions_js = require('./db/sections/interactions/interactions-sfi');

var sql = require('seriate');
sql.setDefaultConfig(config);

window.onload = function() {
  sql.execute( {
    query: query_interactions.call_metrics_by_solution_by_week
  }).then( function( data ) {
    // console.log(data);

    sfi_interactions_js.build_homepage_calls_ans_vs_off_graph(data);
    sfi_interactions_js.build_homepage_calls_abd_flow_tran_graph(data);

  }, function( err ) {
    console.log( err );
  });
}