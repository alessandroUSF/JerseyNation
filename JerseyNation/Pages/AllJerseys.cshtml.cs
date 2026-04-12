using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace JerseyNation.Pages;

public class AllJerseysModel : PageModel
{
    [BindProperty(SupportsGet = true)]
    public string? Team { get; set; }

    [BindProperty(SupportsGet = true)]
    public string? Team1 { get; set; }

    [BindProperty(SupportsGet = true)]
    public string? Team2 { get; set; }

    public string CurrentFilterMessage { get; private set; } = "Showing all jerseys.";

    public void OnGet()
    {
        if (!string.IsNullOrWhiteSpace(Team1) && !string.IsNullOrWhiteSpace(Team2))
        {
            CurrentFilterMessage = $"This page would currently show jerseys filtered for '{Team1}' and '{Team2}'.";
        }
        else if (!string.IsNullOrWhiteSpace(Team))
        {
            CurrentFilterMessage = $"This page would currently show jerseys filtered for '{Team}'.";
        }
    }
}