using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace JerseyNation.Pages;

public class ProductDetailsModel : PageModel
{
    [BindProperty(SupportsGet = true)]
    public int? Id { get; set; }

    public string ProductMessage { get; private set; } = "";

    public void OnGet()
    {
        if (Id.HasValue)
        {
            ProductMessage = $"This page would currently show the details for jersey ID '{Id.Value}'.";
        }
        else
        {
            ProductMessage = "No jersey ID was provided.";
        }
    }
}