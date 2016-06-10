var config = {
  user: process.env.DB_UN,
  password: process.env.DB_PW,
  host: process.env.DB_SERVER,
  database: process.env.DB_NAME
};

var sql = require('seriate');
sql.setDefaultConfig(config);

// --------------------------

function build_solution_inin_data_report(data) {

  calls_offered = _.map(data, function(stats) {
    return stats.nEnteredAcd
  })
  calls_offered.unshift('calls_offered');

  calls_answered = _.map(data, function(stats) {
    return stats.nAnsweredAcd
  })
  calls_answered.unshift('calls_answered');

  calls_abandoned = _.map(data, function(stats) {
    return stats.nAbandonedAcd
  })
  calls_abandoned.unshift('calls_abandoned');

  calls_flowed_out = _.map(data, function(stats) {
    return stats.nFlowOutAcd
  })
  calls_flowed_out.unshift('calls_flowed_out');

  calls_transfered = _.map(data, function(stats) {
    return stats.nTransferedAcd
  })
  calls_transfered.unshift('calls_transfered');

  solutions = _.map(data, function(stats) {
    return stats.solution
  })
  solutions.unshift('solutions');

  dates = _.map(data, function(stats) {
    return stats.week_ending
  })
  dates.unshift('x');
  
  var chart = c3.generate({
    bindto: "#solution-inin-data-report",
    data: {
      x: 'x',
      columns: [
        dates,
        solutions,
        calls_offered,
        calls_answered,
        calls_abandoned,
        calls_flowed_out,
        calls_transfered
      ],
      names: {
        dates: 'Week Ending',
        solutions: 'Solutions',
        calls_offered: 'Offered',
        calls_answered: 'Answered',
        calls_abandoned: 'Abandoned',
        calls_flowed_out: 'Flowed Out',
        calls_transfered: 'Transfered'
      }
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%m-%d-%y',
          fit: true
        }
      }
    },
    grid: {
      x: {
        show: true
      },
      y: {
        show: true
      }
    }
  });
}

// --------------------------

window.onload = function() {
  sql.execute( {
    query: "SELECT ED.WeekEnding AS week_ending, I.Solution AS solution, SUM(I.nEnteredAcd) AS nEnteredAcd, SUM(I.nAnsweredAcd) AS nAnsweredAcd, SUM(I.nAbandonedAcd) AS nAbandonedAcd, SUM(I.nFlowOutAcd) AS nFlowOutAcd, SUM(I.nTransferedAcd) AS nTransferedAcd FROM EmployeeServices.dbo.Agent_ININ_Data_By_Day AS I INNER JOIN EmployeeServices.dbo.EmployeeDates AS ED ON I.FullDate = ED.FullDate WHERE I.InteractionType = 'Call' GROUP BY ED.WeekEnding, I.Solution ORDER BY ED.WeekEnding, I.Solution"
  }).then( function( data ) {
    console.log(data);
    build_solution_inin_data_report(data);

  }, function( err ) {
    console.log( err );
  });
}

// -------------------------