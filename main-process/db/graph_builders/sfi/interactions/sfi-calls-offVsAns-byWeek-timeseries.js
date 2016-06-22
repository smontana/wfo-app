module.exports = {
  build_homepage_calls_ans_vs_off_graph: function (data) {
    var can_stats = _.filter(data, ['solution', 'CAN']);
    var cd_stats = _.filter(data, ['solution', 'CD']);
    var crm_stats = _.filter(data, ['solution', 'CRM']);
    var cso_stats = _.filter(data, ['solution', 'CSO']);
    var dms_stats = _.filter(data, ['solution', 'DMS']);
    var sfi_stats = _.filter(data, ['solution', 'F&I']);
    var rts_stats = _.filter(data, ['solution', 'RTS']);

    SFI_calls_offered = _.map(sfi_stats, function(stats) {
      return stats.nEnteredAcd
    })
    SFI_calls_offered.unshift('SFI_calls_offered');

    SFI_calls_answered = _.map(sfi_stats, function(stats) {
      return stats.nAnsweredAcd
    })
    SFI_calls_answered.unshift('SFI_calls_answered');

    dates = _.map(sfi_stats, function(stats) {
      var week_ending = moment(stats.week_ending).add(1, 'day').format("YYYY-MM-DD");
      return week_ending
    })
    dates.unshift('x');

    var chart = c3.generate({
      bindto: "#homepage-first-report",
      padding: {
        top: 10,
        right: 50,
        bottom: 10,
        left: 70
      },
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
            fit: true,
            outer: false
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
      },
      zoom: {
        enabled: true
      }
    });
  }
};
