using JerseyNation.Models;

namespace JerseyNation.Data;

public static class JerseyStore
{
    private static readonly List<JerseyItem> _jerseys = new()
    {
        new JerseyItem
            {
                Id = 1,
                Team = "Argentina",
                Name = "Argentina 2026 Home Jersey",
                JerseyType = "Home Jersey",
                Audience = "Men",
                Color = "Sky Blue / White",
                JerseyNumber = 10,
                IsGoalkeeperJersey = false,
                CostPrice = 48.00m,
                SalePrice = 94.99m,
                PromoPrice = 79.99m,
                IsPromotion = true,
                IsBestSeller = true,
                Sizes = new List<string> { "S", "M", "L" },
                UnavailableSizes = new List<string> { "XL" },
                PrimaryImage = "/images/jerseys/argentina-home-1.jpg",
                SecondaryImage = "/images/jerseys/argentina-home-2.jpg",
                Description = "Official match-inspired home jersey with lightweight performance fabric."
            },
            new JerseyItem
            {
                Id = 2,
                Team = "Brazil",
                Name = "Brazil 2026 Home Jersey",
                JerseyType = "Home Jersey",
                Audience = "Women",
                Color = "Yellow / Green",
                JerseyNumber = 9,
                IsGoalkeeperJersey = false,
                CostPrice = 50.00m,
                SalePrice = 96.99m,
                PromoPrice = 84.99m,
                IsPromotion = true,
                IsBestSeller = true,
                Sizes = new List<string> { "S", "M" },
                UnavailableSizes = new List<string> { "L", "XL" },
                PrimaryImage = "/images/jerseys/brazil-home-1.jpg",
                SecondaryImage = "/images/jerseys/brazil-home-2.jpg",
                Description = "Official women’s home jersey with modern fit and breathable fabric."
            },
            new JerseyItem
            {
                Id = 3,
                Team = "England",
                Name = "England 2026 Away Jersey",
                JerseyType = "Away Jersey",
                Audience = "Men",
                Color = "Navy / Red",
                JerseyNumber = 7,
                IsGoalkeeperJersey = false,
                CostPrice = 52.00m,
                SalePrice = 99.99m,
                PromoPrice = null,
                IsPromotion = false,
                IsBestSeller = true,
                Sizes = new List<string> { "L" },
                UnavailableSizes = new List<string> { "S", "M", "XL" },
                PrimaryImage = "/images/jerseys/england-away-1.jpg",
                SecondaryImage = "/images/jerseys/england-away-2.jpg",
                Description = "Official away jersey designed for comfort and match-day style."
            },
            new JerseyItem
            {
                Id = 4,
                Team = "France",
                Name = "France 2026 Home Jersey",
                JerseyType = "Home Jersey",
                Audience = "Youth",
                Color = "Blue / Gold",
                JerseyNumber = 8,
                IsGoalkeeperJersey = false,
                CostPrice = 40.00m,
                SalePrice = 79.99m,
                PromoPrice = null,
                IsPromotion = false,
                Sizes = new List<string> { "L" },
                UnavailableSizes = new List<string> { "S", "M", "XL" },
                PrimaryImage = "/images/jerseys/france-home-1.jpg",
                SecondaryImage = "/images/jerseys/france-home-2.jpg",
                Description = "Official youth home jersey for young supporters."
            },
            new JerseyItem
            {
                Id = 5,
                Team = "Mexico",
                Name = "Mexico 2026 Training Jersey",
                JerseyType = "Training Jersey",
                Audience = "Men",
                Color = "Green / Black",
                JerseyNumber = 11,
                IsGoalkeeperJersey = false,
                CostPrice = 35.00m,
                SalePrice = 74.99m,
                PromoPrice = 64.99m,
                IsPromotion = true,
                Sizes = new List<string> { "L" },
                UnavailableSizes = new List<string> { "S", "M", "XL" },
                PrimaryImage = "/images/jerseys/mexico-training-1.jpg",
                SecondaryImage = "/images/jerseys/mexico-training-2.jpg",
                Description = "Training jersey with flexible fabric and lightweight construction."
            },
            new JerseyItem
            {
                Id = 6,
                Team = "United States",
                Name = "United States 2026 Women Goalkeeper Jersey",
                JerseyType = "Goalkeeper Jersey",
                Audience = "Women",
                Color = "Black",
                JerseyNumber = 1,
                IsGoalkeeperJersey = true,
                CostPrice = 49.00m,
                SalePrice = 92.99m,
                PromoPrice = null,
                IsPromotion = false,
                Sizes = new List<string> { "XS", "S", "M", "L" },
                UnavailableSizes = new List<string> { "XL" },
                PrimaryImage = "/images/jerseys/usa-w-goalkeeper-1.jpg",
                SecondaryImage = "/images/jerseys/usa-w-goalkeeper-2.jpg",
                Description = "Official women’s goalkeeper jersey with a modern fit and premium match styling."
            },
            new JerseyItem
            {
                Id = 7,
                Team = "Brazil",
                Name = "Brazil Signed 2026 Home Jersey",
                JerseyType = "Home Jersey",
                Audience = "Men",
                Color = "Yellow / Green",
                JerseyNumber = 10,
                IsGoalkeeperJersey = false,
                CostPrice = 130.00m,
                SalePrice = 259.99m,
                PromoPrice = 229.99m,
                IsPromotion = true,
                IsSpecial = true,
                IsSigned = true,
                IsRare = true,
                Sizes = new List<string> { "M", "L", "XL" },
                UnavailableSizes = new List<string> { "S" },
                PrimaryImage = "/images/jerseys/brazil-signed-1.jpg",
                SecondaryImage = "/images/jerseys/brazil-signed-2.jpg",
                Description = "Authenticated signed by Vini Jr, Neymar and Enderson special-edition jersey from the premium collection."
            },
            new JerseyItem
            {
                Id = 8,
                Team = "Argentina",
                Name = "Argentina Match-Worn Special Jersey",
                JerseyType = "Home Jersey",
                Audience = "Men",
                Color = "Sky Blue / White",
                JerseyNumber = 10,
                IsGoalkeeperJersey = false,
                CostPrice = 320.00m,
                SalePrice = 649.99m,
                PromoPrice = null,
                IsPromotion = false,
                IsSpecial = true,
                IsMatchWorn = true,
                IsRare = true,
                Sizes = new List<string> { "L" },
                UnavailableSizes = new List<string> { "S", "M", "XL" },
                PrimaryImage = "/images/jerseys/argentina-matchworn-1.jpg",
                SecondaryImage = "/images/jerseys/argentina-matchworn-2.jpg",
                Description = "Premium authenticated match-worn piece from a tournament special inventory."
            },
            new JerseyItem
            {
                Id = 9,
                Team = "United States",
                Name = "United States Training-Worn Special Jersey",
                JerseyType = "Training Jersey",
                Audience = "Men",
                Color = "Navy / White",
                JerseyNumber = 4,
                IsGoalkeeperJersey = false,
                CostPrice = 180.00m,
                SalePrice = 349.99m,
                PromoPrice = 299.99m,
                IsPromotion = true,
                IsSpecial = true,
                IsTrainingWorn = true,
                IsRare = true,
                Sizes = new List<string> { "M", "L" },
                UnavailableSizes = new List<string> { "S", "XL" },
                PrimaryImage = "/images/jerseys/usa-trainingworn-1.jpg",
                SecondaryImage = "/images/jerseys/usa-trainingworn-2.jpg",
                Description = "Authenticated training-worn item from the premium collector selection."
            },
            new JerseyItem
            {
                Id = 10,
                Team = "France",
                Name = "France Limited Goalkeeper Gold Jersey",
                JerseyType = "Away Jersey",
                Audience = "Men",
                Color = "Gold / Black",
                JerseyNumber = 1,
                IsGoalkeeperJersey = true,
                CostPrice = 110.00m,
                SalePrice = 219.99m,
                PromoPrice = null,
                IsPromotion = false,
                IsSpecial = true,
                IsRare = true,
                Sizes = new List<string> { "L" },
                UnavailableSizes = new List<string> { "S", "M", "XL" },
                PrimaryImage = "/images/jerseys/france-goalkeeper-gold-1.jpg",
                SecondaryImage = "/images/jerseys/france-goalkeeper-gold-2.jpg",
                Description = "Limited premium goalkeeper jersey with collector appeal and gold detailing."
            },

            new JerseyItem
            {
                Id = 11,
                Team = "Brazil",
                Name = "Brazil 2026 Away Jersey",
                JerseyType = "Away Jersey",
                Audience = "Men",
                Color = "Dark Blue / Green",
                JerseyNumber = 10,
                IsGoalkeeperJersey = false,
                CostPrice = 54.00m,
                SalePrice = 104.99m,
                PromoPrice = 94.99m,
                IsPromotion = true,
                IsBestSeller = true,
                Sizes = new List<string> { "S", "M", "L", "XL" },
                UnavailableSizes = new List<string> { "XXL" },
                PrimaryImage = "/images/jerseys/brazil-away-1.jpg",
                SecondaryImage = "/images/jerseys/brazil-away-2.jpg",
                Description = "Official Brazil away jersey with a dark blue design and premium match-inspired styling."
            },
            new JerseyItem
            {
                Id = 12,
                Team = "United States",
                Name = "United States 2026 Men Goalkeeper Jersey",
                JerseyType = "Goalkeeper Jersey",
                Audience = "Men",
                Color = "Green",
                JerseyNumber = 1,
                IsGoalkeeperJersey = true,
                CostPrice = 52.00m,
                SalePrice = 98.99m,
                PromoPrice = null,
                IsPromotion = false,
                Sizes = new List<string> { "S", "M", "L", "XL" },
                UnavailableSizes = new List<string> { "XXL" },
                PrimaryImage = "/images/jerseys/usa-goalkeeper-1.jpg",
                SecondaryImage = "/images/jerseys/usa-goalkeeper-2.jpg",
                Description = "Official men’s goalkeeper jersey with a bold green design and match-ready look."
            },

            new JerseyItem
            {
                Id = 13,
                Team = "South Africa",
                Name = "South Africa 2026 Away Jersey",
                JerseyType = "Away Jersey",
                Audience = "Men",
                Color = "Dark Green",
                JerseyNumber = 9,
                IsGoalkeeperJersey = false,
                CostPrice = 46.00m,
                SalePrice = 89.99m,
                PromoPrice = 79.99m,
                IsPromotion = true,
                Sizes = new List<string> { "S", "M", "L", "XL" },
                UnavailableSizes = new List<string> { "XXL" },
                PrimaryImage = "/images/jerseys/south-africa-away-1.jpg",
                SecondaryImage = "/images/jerseys/south-africa-away-2.jpg",
                Description = "Official South Africa away jersey with a dark green look and performance fabric."

             }
        };

private static readonly List<AuditLogEntry> _auditLogs = new();
    private static int _nextAuditId = 1;

    public static List<JerseyItem> Jerseys => _jerseys;

    public static List<AuditLogEntry> AuditLogs => _auditLogs
        .OrderByDescending(x => x.Timestamp)
        .ToList();

    public static JerseyItem? GetJerseyById(int id)
    {
        return _jerseys.FirstOrDefault(j => j.Id == id);
    }

    public static void AddJersey(JerseyItem item, string performedBy = "Admin User")
    {
        item.Id = _jerseys.Any() ? _jerseys.Max(j => j.Id) + 1 : 1;
        _jerseys.Add(item);

        AddLog("CREATE", performedBy, item.Id, item.Name,
            $"Created jersey for team '{item.Team}' with sale price ${item.SalePrice:0.00}.");
    }

    public static bool UpdateJersey(JerseyItem updatedItem, string performedBy = "Admin User")
    {
        var existing = _jerseys.FirstOrDefault(j => j.Id == updatedItem.Id);
        if (existing == null) return false;

        var oldValues = $"Old values: Team={existing.Team}, Name={existing.Name}, Type={existing.JerseyType}, Audience={existing.Audience}, SalePrice={existing.SalePrice:0.00}";
        var newValues = $"New values: Team={updatedItem.Team}, Name={updatedItem.Name}, Type={updatedItem.JerseyType}, Audience={updatedItem.Audience}, SalePrice={updatedItem.SalePrice:0.00}";

        existing.Team = updatedItem.Team;
        existing.Name = updatedItem.Name;
        existing.JerseyType = updatedItem.JerseyType;
        existing.Audience = updatedItem.Audience;
        existing.Color = updatedItem.Color;
        existing.JerseyNumber = updatedItem.JerseyNumber;
        existing.IsGoalkeeperJersey = updatedItem.IsGoalkeeperJersey;
        existing.CostPrice = updatedItem.CostPrice;
        existing.SalePrice = updatedItem.SalePrice;
        existing.PromoPrice = updatedItem.PromoPrice;
        existing.Sizes = updatedItem.Sizes;
        existing.UnavailableSizes = updatedItem.UnavailableSizes;
        existing.IsSpecial = updatedItem.IsSpecial;
        existing.IsPromotion = updatedItem.IsPromotion;
        existing.IsBestSeller = updatedItem.IsBestSeller;
        existing.IsSigned = updatedItem.IsSigned;
        existing.IsMatchWorn = updatedItem.IsMatchWorn;
        existing.IsTrainingWorn = updatedItem.IsTrainingWorn;
        existing.IsRare = updatedItem.IsRare;
        existing.InStock = updatedItem.InStock;
        existing.Description = updatedItem.Description;
        existing.PrimaryImage = updatedItem.PrimaryImage;
        existing.SecondaryImage = updatedItem.SecondaryImage;

        AddLog("UPDATE", performedBy, existing.Id, existing.Name, $"{oldValues} | {newValues}");
        return true;
    }

    public static bool DeleteJersey(int id, string performedBy = "Admin User")
    {
        var item = _jerseys.FirstOrDefault(j => j.Id == id);
        if (item == null) return false;

        _jerseys.Remove(item);

        AddLog("DELETE", performedBy, item.Id, item.Name,
            $"Deleted jersey from team '{item.Team}' with sale price ${item.SalePrice:0.00}.");

        return true;
    }

    private static void AddLog(string actionType, string performedBy, int jerseyId, string jerseyName, string details)
    {
        _auditLogs.Add(new AuditLogEntry
        {
            Id = _nextAuditId++,
            Timestamp = DateTime.Now,
            ActionType = actionType,
            PerformedBy = performedBy,
            JerseyId = jerseyId,
            JerseyName = jerseyName,
            Details = details
        });
    }


    /* In the real webpage all the games would be in a database and we get results for next 3 games */

    public static List<UpcomingMatch> UpcomingMatches => new List<UpcomingMatch>
{
    new UpcomingMatch
    {
        HomeTeam = "Mexico",
        AwayTeam = "South Africa",
        HomeFlagImage = "/images/flags/mx.png",
        AwayFlagImage = "/images/flags/za.png",
        MatchDate = new DateTime(2026, 6, 11, 20, 0, 0),
        Venue = "Mexico City"
    },
    new UpcomingMatch
    {
        HomeTeam = "Korea Republic",
        AwayTeam = "Czechia",
        HomeFlagImage = "/images/flags/kr.png",
        AwayFlagImage = "/images/flags/cz.png",
        MatchDate = new DateTime(2026, 6, 11, 20, 0, 0),
        Venue = "Guadalajara"
    },
    new UpcomingMatch
    {
        HomeTeam = "USA",
        AwayTeam = "Paraguay",
        HomeFlagImage = "/images/flags/us.png",
        AwayFlagImage = "/images/flags/py.png",
        MatchDate = new DateTime(2026, 6, 12, 18, 0, 0),
        Venue = "Los Angeles"
    }
};

    public class TeamGroup
    {
        public string GroupName { get; set; } = "";
        public List<TeamLink> Teams { get; set; } = new();
    }

    public static List<TeamGroup> TeamGroups => new List<TeamGroup>
    {
        new TeamGroup
        {
            GroupName = "UEFA",
            Teams = new List<TeamLink>
            {
                new TeamLink { Name = "Austria", FlagImage = "/images/flags/at.png" },
                new TeamLink { Name = "Belgium", FlagImage = "/images/flags/be.png" },
                new TeamLink { Name = "Bosnia and Herzegovina", FlagImage = "/images/flags/ba.png" },
                new TeamLink { Name = "Croatia", FlagImage = "/images/flags/hr.png" },
                new TeamLink { Name = "Czech Republic", FlagImage = "/images/flags/cz.png" },
                new TeamLink { Name = "England", FlagImage = "/images/flags/gb-eng.png" },
                new TeamLink { Name = "France", FlagImage = "/images/flags/fr.png" },
                new TeamLink { Name = "Germany", FlagImage = "/images/flags/de.png" },
                new TeamLink { Name = "Netherlands", FlagImage = "/images/flags/nl.png" },
                new TeamLink { Name = "Norway", FlagImage = "/images/flags/no.png" },
                new TeamLink { Name = "Portugal", FlagImage = "/images/flags/pt.png" },
                new TeamLink { Name = "Scotland", FlagImage = "/images/flags/gb-sct.png" },
                new TeamLink { Name = "Spain", FlagImage = "/images/flags/es.png" },
                new TeamLink { Name = "Sweden", FlagImage = "/images/flags/se.png" },
                new TeamLink { Name = "Switzerland", FlagImage = "/images/flags/ch.png" },
                new TeamLink { Name = "Turkey", FlagImage = "/images/flags/tr.png" }
            }
        },
        new TeamGroup
        {
            GroupName = "CAF",
            Teams = new List<TeamLink>
            {
                new TeamLink { Name = "Algeria", FlagImage = "/images/flags/dz.png" },
                new TeamLink { Name = "Cape Verde", FlagImage = "/images/flags/cv.png" },
                new TeamLink { Name = "DR Congo", FlagImage = "/images/flags/cd.png" },
                new TeamLink { Name = "Egypt", FlagImage = "/images/flags/eg.png" },
                new TeamLink { Name = "Ghana", FlagImage = "/images/flags/gh.png" },
                new TeamLink { Name = "Ivory Coast", FlagImage = "/images/flags/ci.png" },
                new TeamLink { Name = "Morocco", FlagImage = "/images/flags/ma.png" },
                new TeamLink { Name = "Senegal", FlagImage = "/images/flags/sn.png" },
                new TeamLink { Name = "South Africa", FlagImage = "/images/flags/za.png" },
                new TeamLink { Name = "Tunisia", FlagImage = "/images/flags/tn.png" }
            }
        },
        new TeamGroup
        {
            GroupName = "AFC",
            Teams = new List<TeamLink>
            {
                new TeamLink { Name = "Australia", FlagImage = "/images/flags/au.png" },
                new TeamLink { Name = "Iran", FlagImage = "/images/flags/ir.png" },
                new TeamLink { Name = "Iraq", FlagImage = "/images/flags/iq.png" },
                new TeamLink { Name = "Japan", FlagImage = "/images/flags/jp.png" },
                new TeamLink { Name = "Jordan", FlagImage = "/images/flags/jo.png" },
                new TeamLink { Name = "Qatar", FlagImage = "/images/flags/qa.png" },
                new TeamLink { Name = "Saudi Arabia", FlagImage = "/images/flags/sa.png" },
                new TeamLink { Name = "South Korea", FlagImage = "/images/flags/kr.png" },
                new TeamLink { Name = "Uzbekistan", FlagImage = "/images/flags/uz.png" }
            }
        },
        new TeamGroup
        {
            GroupName = "CONCACAF",
            Teams = new List<TeamLink>
            {
                new TeamLink { Name = "Canada", FlagImage = "/images/flags/ca.png" },
                new TeamLink { Name = "Curaçao", FlagImage = "/images/flags/cw.png" },
                new TeamLink { Name = "Haiti", FlagImage = "/images/flags/ht.png" },
                new TeamLink { Name = "Mexico", FlagImage = "/images/flags/mx.png" },
                new TeamLink { Name = "Panama", FlagImage = "/images/flags/pa.png" },
                new TeamLink { Name = "United States", FlagImage = "/images/flags/us.png" }
            }
        },
        new TeamGroup
        {
            GroupName = "CONMEBOL",
            Teams = new List<TeamLink>
            {
                new TeamLink { Name = "Argentina", FlagImage = "/images/flags/ar.png" },
                new TeamLink { Name = "Brazil", FlagImage = "/images/flags/br.png" },
                new TeamLink { Name = "Colombia", FlagImage = "/images/flags/co.png" },
                new TeamLink { Name = "Ecuador", FlagImage = "/images/flags/ec.png" },
                new TeamLink { Name = "Paraguay", FlagImage = "/images/flags/py.png" },
                new TeamLink { Name = "Uruguay", FlagImage = "/images/flags/uy.png" }
            }
        },
        new TeamGroup
        {
            GroupName = "OFC",
            Teams = new List<TeamLink>
            {
                new TeamLink { Name = "New Zealand", FlagImage = "/images/flags/nz.png" }
            }
        }
    };
}