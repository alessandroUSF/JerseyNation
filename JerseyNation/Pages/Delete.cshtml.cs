using JerseyNation.Data;
using JerseyNation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace JerseyNation.Pages;

public class DeleteModel : PageModel
{
    public JerseyItem? Jersey { get; private set; }

    [BindProperty]
    public int Id { get; set; }

    [BindProperty]
    public string PerformedBy { get; set; } = "Admin User";

    public IActionResult OnGet(int? id)
    {
        if (id == null) return RedirectToPage("/Read");

        Jersey = JerseyStore.GetJerseyById(id.Value);
        if (Jersey == null) return RedirectToPage("/Read");

        Id = Jersey.Id;
        return Page();
    }

    public IActionResult OnPost()
    {
        JerseyStore.DeleteJersey(Id, PerformedBy);
        return RedirectToPage("/Read");
    }
}