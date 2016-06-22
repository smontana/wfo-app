const electron = require('electron')
const ipc = electron.ipcMain
const config = require('../db/config');
const attendance_queries = require('../db/queries/attendance_queries');
const sql = require('seriate');
sql.setDefaultConfig(config);

ipc.on('attendance-open', function (event) {
  sql.execute({
    query: attendance_queries.get_attendance_solution_counts_by_yr
  }).then( function( data ) {
    console.log(data);

    const attendance_data = data;
    event.sender.send('attendance-data-retreived', data)
    // sfi_attendance_js.build_solution_absence_counts_by_yr_graph(data);
    // sfi_attendance_js.build_solution_late_counts_by_yr_graph(data);
    // sfi_attendance_js.build_solution_early_counts_by_yr_graph(data);
    // dms_attendance_js.build_solution_absence_counts_by_yr_graph(data);
    // dms_attendance_js.build_solution_late_counts_by_yr_graph(data);
    // dms_attendance_js.build_solution_early_counts_by_yr_graph(data);
    
  }, function( err ) {
    console.log( err );
  });
})
