module.exports = {
  build_solution_absence_counts_by_yr_graph: function (data) {
    var dms_stats = _.filter(data, ['Solution', 'DMS']);
    
    DMS_abs_count = _.map(dms_stats, function(stats) {
      return stats.absence_count
    })

    var chart = c3.generate({
      bindto: "#attendance_dms_abs_cnt_gauge",
      data: {
        columns: [
          ['DMS ABS #', DMS_abs_count]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      },
      gauge: {
        label: {
          format: function(value, ratio) {
            return value;
          },
          show: true // turn off the min/max labels.
        },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 300, // 100 is default
        // units: ' %',
        width: 25 // arc thickness
      },
      color: {
        pattern: ['#FF0000', '#60B044', '#F6C600', '#F97600'], // the three color levels for the percentage values.
        threshold: {
          unit: 'value', // percentage is default
          // max: 200, // 100 is default
          values: [30, 60, 90, 100]
        }
      },
      size: {
        height: 100
      }
    });
  }
};
