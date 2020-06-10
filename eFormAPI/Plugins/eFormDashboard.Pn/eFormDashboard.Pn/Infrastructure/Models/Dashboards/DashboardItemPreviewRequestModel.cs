namespace eFormDashboard.Pn.Infrastructure.Models.Dashboards
{
    public class DashboardItemPreviewRequestModel
    {
        public DashboardItemModel Item { get; set; }
            = new DashboardItemModel();

        public DashboardPreviewInfoModel DashboardPreviewInfo { get; set; }
            = new DashboardPreviewInfoModel();
    }
}