using JerseyNation.Data;
using JerseyNation.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace JerseyNation.Pages;

public class ReadModel : PageModel
{
    public List<JerseyItem> Jerseys { get; private set; } = new();

    public void OnGet()
    {
        Jerseys = JerseyStore.Jerseys
            .OrderBy(j => j.Team)
            .ThenBy(j => j.Name)
            .ToList();
    }
}