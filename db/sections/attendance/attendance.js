var moment = require('moment');
var config = require('./db/config');
var query_attendance = require('./db/query_logic/query-attendance');
var sfi_attendance_js = require('./db/sections/attendance/attendance-sfi');
var dms_attendance_js = require('./db/sections/attendance/attendance-dms');

var sql = require('seriate');
sql.setDefaultConfig(config);

window.onload = function() {
  sql.execute( {
    query: query_attendance.get_attendance_solution_counts_by_yr
  }).then( function( data ) {
    console.log(data);

    sfi_attendance_js.build_solution_absence_counts_by_yr_graph(data);
    sfi_attendance_js.build_solution_late_counts_by_yr_graph(data);
    sfi_attendance_js.build_solution_early_counts_by_yr_graph(data);
    dms_attendance_js.build_solution_absence_counts_by_yr_graph(data);
    dms_attendance_js.build_solution_late_counts_by_yr_graph(data);
    dms_attendance_js.build_solution_early_counts_by_yr_graph(data);
    
  }, function( err ) {
    console.log( err );
  });
}
