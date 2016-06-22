const ipc = require('electron').ipcRenderer
const sfi_attendance_abs_gauge_yr = require('./main-process/db/graph_builders/sfi/attendance/sfi-absence-year-gauge');
const sfi_attendance_late_gauge_yr = require('./main-process/db/graph_builders/sfi/attendance/sfi-late-year-gauge');
const sfi_attendance_leftEarly_gauge_yr = require('./main-process/db/graph_builders/sfi/attendance/sfi-leftEarly-year-gauge');

const attendance_btn = document.getElementById('attendance_')

attendance_btn.addEventListener('click', function (event) {
  ipc.send('attendance-open')
})

ipc.on('attendance-data-retreived', function (event, data) {
  console.log(event)
  console.log(data)
  
  sfi_attendance_abs_gauge_yr.build_solution_absence_counts_by_yr_graph(data)
  // const message = `Attendance Data: ${data}`
  // document.getElementById('pdf-path').innerHTML = message
  g
})
