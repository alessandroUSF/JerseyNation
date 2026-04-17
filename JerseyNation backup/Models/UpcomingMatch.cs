namespace JerseyNation.Models;

public class UpcomingMatch
{
    public string HomeTeam { get; set; } = "";
    public string AwayTeam { get; set; } = "";
    public string HomeFlagImage { get; set; } = "";
    public string AwayFlagImage { get; set; } = "";
    public DateTime MatchDate { get; set; }
    public string Venue { get; set; } = "";

    public bool CanArriveBeforeMatch => MatchDate.Date > DateTime.Today.AddDays(4);
}