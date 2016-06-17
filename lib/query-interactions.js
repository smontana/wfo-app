var query_interactions = {

  call_metrics_by_solution_by_week: "SELECT\
                                      ED.WeekEnding AS week_ending, I.Solution AS solution, SUM(I.nEnteredAcd) AS nEnteredAcd, SUM(I.nAnsweredAcd) AS nAnsweredAcd, SUM(I.nAbandonedAcd) AS nAbandonedAcd, SUM(I.nFlowOutAcd) AS nFlowOutAcd, SUM(I.nTransferedAcd) AS nTransferedAcd\
                                    FROM EmployeeServices.dbo.Agent_ININ_Data_By_Day AS I\
                                    INNER JOIN EmployeeServices.dbo.EmployeeDates AS ED\
                                    ON I.FullDate = ED.FullDate\
                                    WHERE I.InteractionType = 'Call'\
                                    GROUP BY ED.WeekEnding, I.Solution\
                                    ORDER BY ED.WeekEnding, I.Solution",

  call_metrics_by_workgroup_by_week: "SELECT\
                                        ED.WeekEnding AS week_ending, I.Solution AS solution, I.WorkGroup AS workgroup, SUM(I.nEnteredAcd) AS nEnteredAcd, SUM(I.nAnsweredAcd) AS nAnsweredAcd, SUM(I.nAbandonedAcd) AS nAbandonedAcd, SUM(I.nFlowOutAcd) AS nFlowOutAcd, SUM(I.nTransferedAcd) AS nTransferedAcd\
                                      FROM EmployeeServices.dbo.Agent_ININ_Data_By_Day AS I\
                                      INNER JOIN EmployeeServices.dbo.EmployeeDates AS ED\
                                      ON I.FullDate = ED.FullDate\
                                      WHERE I.InteractionType = 'Call'\
                                      GROUP BY ED.WeekEnding, I.Solution, I.WorkGroup\
                                      ORDER BY ED.WeekEnding, I.Solution"

};

module.exports = query_interactions;