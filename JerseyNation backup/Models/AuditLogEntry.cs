namespace JerseyNation.Models;

public class AuditLogEntry
{
    public int Id { get; set; }
    public DateTime Timestamp { get; set; }
    public string ActionType { get; set; } = "";
    public string PerformedBy { get; set; } = "";
    public int JerseyId { get; set; }
    public string JerseyName { get; set; } = "";
    public string Details { get; set; } = "";
}