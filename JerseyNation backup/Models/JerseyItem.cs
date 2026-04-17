namespace JerseyNation.Models;

public class JerseyItem
{
    public int Id { get; set; }
    public string Team { get; set; } = "";
    public string Name { get; set; } = "";
    public string JerseyType { get; set; } = "";
    public string Audience { get; set; } = "";
    public string Color { get; set; } = "";
    public int JerseyNumber { get; set; }
    public bool IsGoalkeeperJersey { get; set; }

    public decimal CostPrice { get; set; }
    public decimal SalePrice { get; set; }
    public decimal? PromoPrice { get; set; }

    public List<string> Sizes { get; set; } = new();
    public List<string> UnavailableSizes { get; set; } = new();

    public bool IsSpecial { get; set; }
    public bool IsPromotion { get; set; }
    public bool IsBestSeller { get; set; }
    public bool IsSigned { get; set; }
    public bool IsMatchWorn { get; set; }
    public bool IsTrainingWorn { get; set; }
    public bool IsRare { get; set; }
    public bool InStock { get; set; } = true;
    

    public string Description { get; set; } = "";
    public string PrimaryImage { get; set; } = "";
    public string SecondaryImage { get; set; } = "";

    public string SizesDisplay => string.Join(", ", Sizes);
    public decimal DisplayPrice => IsPromotion && PromoPrice.HasValue ? PromoPrice.Value : SalePrice;
}