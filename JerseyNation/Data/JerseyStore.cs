using JerseyNation.Models;

namespace JerseyNation.Data;

public static class JerseyStore
{
    public static List<JerseyItem> Jerseys => new List<JerseyItem>
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
            Name = "United States 2026 Goalkeeper Jersey",
            JerseyType = "Home Jersey",
            Audience = "Women",
            Color = "Black / Blue",
            JerseyNumber = 1,
            IsGoalkeeperJersey = true,
            CostPrice = 49.00m,
            SalePrice = 92.99m,
            PromoPrice = null,
            IsPromotion = false,
            Sizes = new List<string> { "L" },
            UnavailableSizes = new List<string> { "S", "M", "XL" },
            PrimaryImage = "/images/jerseys/usa-goalkeeper-1.jpg",
            SecondaryImage = "/images/jerseys/usa-goalkeeper-2.jpg",
            Description = "Official goalkeeper jersey with modern fit and premium match styling."
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
            Description = "Authenticated signed special-edition jersey from the premium collection."
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
        }
    };

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

    public static List<TeamLink> Teams => new List<TeamLink>
{
    new TeamLink { Name = "Argentina", FlagImage = "/images/flags/ar.png" },
    new TeamLink { Name = "Brazil", FlagImage = "/images/flags/br.png" },
    new TeamLink { Name = "England", FlagImage = "/images/flags/gb-eng.png" },
    new TeamLink { Name = "France", FlagImage = "/images/flags/fr.png" },
    new TeamLink { Name = "Mexico", FlagImage = "/images/flags/mx.png" },
    new TeamLink { Name = "United States", FlagImage = "/images/flags/us.png" }
}
    .OrderBy(t => t.Name)
    .ToList();
}