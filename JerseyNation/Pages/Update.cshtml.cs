using JerseyNation.Data;
using JerseyNation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace JerseyNation.Pages;

public class UpdateModel : PageModel
{
    [BindProperty]
    public JerseyItem Jersey { get; set; } = new();

    [BindProperty]
    public string AvailableSizesText { get; set; } = "";

    [BindProperty]
    public string UnavailableSizesText { get; set; } = "";

    [BindProperty]
    public string PerformedBy { get; set; } = "Admin User";

    public IActionResult OnGet(int? id)
    {
        if (id == null) return RedirectToPage("/Read");

        var item = JerseyStore.GetJerseyById(id.Value);
        if (item == null) return RedirectToPage("/Read");

        Jersey = new JerseyItem
        {
            Id = item.Id,
            Team = item.Team,
            Name = item.Name,
            JerseyType = item.JerseyType,
            Audience = item.Audience,
            Color = item.Color,
            JerseyNumber = item.JerseyNumber,
            IsGoalkeeperJersey = item.IsGoalkeeperJersey,
            CostPrice = item.CostPrice,
            SalePrice = item.SalePrice,
            PromoPrice = item.PromoPrice,
            Sizes = new List<string>(item.Sizes),
            UnavailableSizes = new List<string>(item.UnavailableSizes),
            IsSpecial = item.IsSpecial,
            IsPromotion = item.IsPromotion,
            IsBestSeller = item.IsBestSeller,
            IsSigned = item.IsSigned,
            IsMatchWorn = item.IsMatchWorn,
            IsTrainingWorn = item.IsTrainingWorn,
            IsRare = item.IsRare,
            InStock = item.InStock,
            Description = item.Description,
            PrimaryImage = item.PrimaryImage,
            SecondaryImage = item.SecondaryImage
        };

        AvailableSizesText = string.Join(", ", Jersey.Sizes);
        UnavailableSizesText = string.Join(", ", Jersey.UnavailableSizes);

        return Page();
    }

    public IActionResult OnPost()
    {
        Jersey.Sizes = ParseSizes(AvailableSizesText);
        Jersey.UnavailableSizes = ParseSizes(UnavailableSizesText);

        JerseyStore.UpdateJersey(Jersey, PerformedBy);

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