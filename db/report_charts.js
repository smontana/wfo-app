var moment = require('moment');
var $ = require("jquery");
var config = require('./db/config');
var sql = require('seriate');
sql.setDefaultConfig(config);

// interactions
var query_interactions = require('./db/query_logic/query-interactions.js');
var sfi_interactions_js = require('./db/sections/interactions/interactions-sfi.js');

// attendance
var query_attendance = require('./db/query_logic/query-attendance.js');
var sfi_attendance_js = require('./db/sections/attendance/attendance-sfi.js');
var dms_attendance_js = require('./db/sections/attendance/attendance-dms.js');

var active_section = global.sharedObj.active_section;
var attendance_query = query_attendance.get_attendance_solution_counts_by_yr;
var interactions_query = query_interactions.call_metrics_by_solution_by_week;

// TODO: refactor the two 'if' s
if (active_section == 'attendance_sec') {
  var query_to_execute = attendance_query;
} else if (active_section == 'interactions_sec') {
  var query_to_execute = interactions_query;
} 

window.onload = function() {
  console.log(query_to_execute);

  sql.execute( {
    query: query_to_execute
  }).then( function( data ) {
    console.log(data);

    if (active_section == 'attendance_sec') {
      sfi_attendance_js.build_solution_absence_counts_by_yr_graph(data);
      sfi_attendance_js.build_solution_late_counts_by_yr_graph(data);
      sfi_attendance_js.build_solution_early_counts_by_yr_graph(data);
      dms_attendance_js.build_solution_absence_counts_by_yr_graph(data);
      dms_attendance_js.build_solution_late_counts_by_yr_graph(data);
      dms_attendance_js.build_solution_early_counts_by_yr_graph(data);

    } else if (active_section == 'interactions_sec') {
      sfi_interactions_js.build_homepage_calls_ans_vs_off_graph(data);
      sfi_interactions_js.build_homepage_calls_abd_flow_tran_graph(data);

    }

  }, function( err ) {
    console.log( err );
  });
}
