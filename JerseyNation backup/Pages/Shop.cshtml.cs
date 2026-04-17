using JerseyNation.Data;
using JerseyNation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using static JerseyNation.Data.JerseyStore;

namespace JerseyNation.Pages;

public class ShopModel : PageModel
{
    [BindProperty(SupportsGet = true)]
    public string? Search { get; set; }

    [BindProperty(SupportsGet = true)]
    public string? Team { get; set; }

    [BindProperty(SupportsGet = true)]
    public string? Team1 { get; set; }

    [BindProperty(SupportsGet = true)]
    public string? Team2 { get; set; }

    public List<JerseyItem> FeaturedProducts { get; private set; } = new();
    public List<JerseyItem> PromotionProducts { get; private set; } = new();
    public List<JerseyItem> ForYouProducts { get; private set; } = new();
    public List<JerseyItem> SpecialProducts { get; private set; } = new();
    public List<UpcomingMatch> UpcomingMatches { get; private set; } = new();
    public List<TeamGroup> TeamGroups { get; private set; } = new();

    public void OnGet()
    {
        var allProducts = JerseyStore.Jerseys;

        FeaturedProducts = allProducts.Take(5).ToList();
        PromotionProducts = allProducts.Where(p => p.IsPromotion).Take(4).ToList();
        ForYouProducts = allProducts.ToList();
        SpecialProducts = allProducts.Where(p => p.IsSpecial).Take(4).ToList();
        UpcomingMatches = JerseyStore.UpcomingMatches.OrderBy(m => m.MatchDate).ToList();
        TeamGroups = JerseyStore.TeamGroups;

        IEnumerable<JerseyItem> query = allProducts;

        if (!string.IsNullOrWhiteSpace(Search))
        {
            var term = Search.Trim().ToLower();

            query = query.Where(p =>
                p.Team.ToLower().Contains(term) ||
                p.Name.ToLower().Contains(term) ||
                p.JerseyType.ToLower().Contains(term) ||
                p.Audience.ToLower().Contains(term) ||
                p.Color.ToLower().Contains(term));
        }

        if (!string.IsNullOrWhiteSpace(Team))
        {
            query = query.Where(p => p.Team.Equals(Team, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrWhiteSpace(Team1) && !string.IsNullOrWhiteSpace(Team2))
        {
            query = query.Where(p =>
                p.Team.Equals(Team1, StringComparison.OrdinalIgnoreCase) ||
                p.Team.Equals(Team2, StringComparison.OrdinalIgnoreCase));
        }

        FeaturedProducts = query.Take(5).ToList();
    }
}