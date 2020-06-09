namespace eFormDashboard.Pn.Infrastructure.Models.Dashboards
{
    public class DashboardPreviewInfoModel
    {
        public int DashboardId { get; set; }
        public int? LocationId { get; set; }
        public int? TagId { get; set; }

        public DashboardEditAnswerDates AnswerDates { get; set; }
            = new DashboardEditAnswerDates();
    }
}