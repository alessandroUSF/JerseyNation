using JerseyNation.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace JerseyNation.Pages
{
    public class ProductDetailsModel : PageModel
    {
        [BindProperty(SupportsGet = true)]
        public int? Id { get; set; }

        public string ProductMessage { get; private set; } = "";
        public string ProductId { get; private set; } = "";
        public string ProductName { get; private set; } = "";

        public void OnGet()
        {
            if (!Id.HasValue)
            {
                ProductMessage = "No jersey ID was provided.";
                ProductId = "Product ID error.";
                ProductName = "Product Name error.";
                return;
            }

            var jersey = JerseyStore.GetJerseyById(Id.Value);

            if (jersey == null)
            {
                ProductMessage = $"No jersey was found for ID '{Id.Value}'.";
                ProductId = Id.Value.ToString();
                ProductName = "Product not found.";
                return;
            }

            ProductId = jersey.Id.ToString();
            ProductName = jersey.Name;
            ProductMessage = $"This page would currently show the details for jersey ID '{jersey.Id}'.";
        }
    }
}