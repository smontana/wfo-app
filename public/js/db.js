var moment = require('moment');
var config = require('./lib/config');

var sql = require('seriate');
sql.setDefaultConfig(config);

// ---------------------------------------------------------

function build_homepage_calls_ans_vs_off_graph(data) {
  var can_stats = _.filter(data, ['solution', 'CAN']);
  var cd_stats = _.filter(data, ['solution', 'CD']);
  var crm_stats = _.filter(data, ['solution', 'CRM']);
  var cso_stats = _.filter(data, ['solution', 'CSO']);
  var dms_stats = _.filter(data, ['solution', 'DMS']);
  var sfi_stats = _.filter(data, ['solution', 'F&I']);
  var rts_stats = _.filter(data, ['solution', 'RTS']);

  // ---------------------------

  SFI_calls_offered = _.map(sfi_stats, function(stats) {
    return stats.nEnteredAcd
  })
  SFI_calls_offered.unshift('SFI_calls_offered');

  SFI_calls_answered = _.map(sfi_stats, function(stats) {
    return stats.nAnsweredAcd
  })
  SFI_calls_answered.unshift('SFI_calls_answered');

  // ---------------------------

  dates = _.map(sfi_stats, function(stats) {
    var week_ending = moment(stats.week_ending).add(1, 'day').format("YYYY-MM-DD");

    return week_ending
  })
  dates.unshift('x');

  // ---------------------------
  
  var chart = c3.generate({
    bindto: "#homepage-first-report",
    data: {
      x: 'x',
      columns: [
        dates,
        SFI_calls_offered,
        SFI_calls_answered
      ],
      names: {
        dates: 'Week Ending',
        SFI_calls_offered: 'F&I - Offered',
        SFI_calls_answered: 'F&I - Answered'
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

// ---------------------------------------------------------

// ---------------------------------------------------------

function build_homepage_calls_abd_flow_tran_graph(data) {
  var can_stats = _.filter(data, ['solution', 'CAN']);
  var cd_stats = _.filter(data, ['solution', 'CD']);
  var crm_stats = _.filter(data, ['solution', 'CRM']);
  var cso_stats = _.filter(data, ['solution', 'CSO']);
  var dms_stats = _.filter(data, ['solution', 'DMS']);
  var sfi_stats = _.filter(data, ['solution', 'F&I']);
  var rts_stats = _.filter(data, ['solution', 'RTS']);

  // ---------------------------

  SFI_calls_abd = _.map(sfi_stats, function(stats) {
    return stats.nAbandonedAcd
  })
  SFI_calls_abd.unshift('SFI_calls_abd');

  SFI_calls_flow = _.map(sfi_stats, function(stats) {
    return stats.nFlowOutAcd
  })
  SFI_calls_flow.unshift('SFI_calls_flow');

  SFI_calls_tran = _.map(sfi_stats, function(stats) {
    return stats.nTransferedAcd
  })
  SFI_calls_tran.unshift('SFI_calls_tran');

  // ---------------------------

  dates = _.map(sfi_stats, function(stats) {
    var week_ending = moment(stats.week_ending).add(1, 'day').format("YYYY-MM-DD");

    return week_ending
  })
  dates.unshift('x');

  // ---------------------------
  
  var chart = c3.generate({
    bindto: "#homepage-second-report",
    data: {
      x: 'x',
      columns: [
        dates,
        SFI_calls_abd,
        SFI_calls_flow,
        SFI_calls_tran
      ],
      names: {
        dates: 'Week Ending',
        SFI_calls_abd: 'F&I - Abandoned',
        SFI_calls_flow: 'F&I - Flow Outs',
        SFI_calls_tran: 'F&I - Transfered'
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

// ---------------------------------------------------------

var query_1 = "SELECT ED.WeekEnding AS week_ending, I.Solution AS solution, SUM(I.nEnteredAcd) AS nEnteredAcd, SUM(I.nAnsweredAcd) AS nAnsweredAcd, SUM(I.nAbandonedAcd) AS nAbandonedAcd, SUM(I.nFlowOutAcd) AS nFlowOutAcd, SUM(I.nTransferedAcd) AS nTransferedAcd FROM EmployeeServices.dbo.Agent_ININ_Data_By_Day AS I INNER JOIN EmployeeServices.dbo.EmployeeDates AS ED ON I.FullDate = ED.FullDate WHERE I.InteractionType = 'Call' GROUP BY ED.WeekEnding, I.Solution ORDER BY ED.WeekEnding, I.Solution";

var query_2 = "SELECT \
  ED.WeekEnding AS week_ending, \
  I.Solution AS solution, \
  SUM(I.nEnteredAcd) AS nEnteredAcd, \
  SUM(I.nAnsweredAcd) AS nAnsweredAcd, \
  SUM(I.nAbandonedAcd) AS nAbandonedAcd, \
  SUM(I.nFlowOutAcd) AS nFlowOutAcd, \
  SUM(I.nTransferedAcd) AS nTransferedAcd \
  FROM EmployeeServices.dbo.Agent_ININ_Data_By_Day AS I \
  INNER JOIN EmployeeServices.dbo.EmployeeDates AS ED \
  ON I.FullDate = ED.FullDate \
  WHERE I.InteractionType = 'Call' \
  AND I.Solution = 'CRM' \
  GROUP BY ED.WeekEnding, I.Solution \
  ORDER BY ED.WeekEnding, I.Solution"

window.onload = function() {
  sql.execute( {
    query: query_1
  }).then( function( data ) {
    console.log(data);
    build_homepage_calls_ans_vs_off_graph(data);
    build_homepage_calls_abd_flow_tran_graph(data);

  }, function( err ) {
    console.log( err );
  });
}

// -------------------------