﻿using System.Collections.Generic;

 namespace eFormDashboard.Pn.Infrastructure.Models.Dashboards.RawData
{
    public class DashboardViewChartRawDataModel
    {
        public List<string> RawHeaders { get; set; } // Table headers
            = new List<string>();

        public List<DashboardViewChartRawDataItemModel> RawDataItems { get; set; }
            = new List<DashboardViewChartRawDataItemModel>();
    }
}