using JerseyNation.Data;
using JerseyNation.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace JerseyNation.Pages;

public class CRUDModel : PageModel
{
    public List<AuditLogEntry> RecentLogs { get; private set; } = new();

    public void OnGet()
    {
        RecentLogs = JerseyStore.AuditLogs.Take(10).ToList();
    }
}