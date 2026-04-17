using JerseyNation.Data;
using JerseyNation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace JerseyNation.Pages;

public class CreateModel : PageModel
{
    [BindProperty]
    public JerseyItem NewJersey { get; set; } = new();

    [BindProperty]
    public string AvailableSizesText { get; set; } = "";

    [BindProperty]
    public string UnavailableSizesText { get; set; } = "";

    [BindProperty]
    public string PerformedBy { get; set; } = "Admin User";

    public void OnGet()
    {
    }

    public IActionResult OnPost()
    {
        NewJersey.Sizes = ParseSizes(AvailableSizesText);
        NewJersey.UnavailableSizes = ParseSizes(UnavailableSizesText);

        JerseyStore.AddJersey(NewJersey, PerformedBy);

        return RedirectToPage("/Read");
    }

    private static List<string> ParseSizes(string text)
    {
        return string.IsNullOrWhiteSpace(text)
            ? new List<string>()
            : text.Split(',', StringSplitOptions.RemoveEmptyEntries)
                  .Select(x => x.Trim())
                  .ToList();
    }
}