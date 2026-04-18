
document.addEventListener('DOMContentLoaded', async () => {
  const products = await ensureCatalog();
  const team = getQueryParam('team') || '';
  const team1 = getQueryParam('team1') || '';
  const team2 = getQueryParam('team2') || '';
  let items = [...products];
  if (team) items = items.filter(p => p.team.toLowerCase() === team.toLowerCase());
  if (team1 && team2) items = items.filter(p => [team1.toLowerCase(), team2.toLowerCase()].includes(p.team.toLowerCase()));
  document.getElementById('catalogFilterMessage').innerHTML = team ? `<em>Filtered by team: ${team}</em>` : (team1 && team2 ? `<em>Filtered by teams: ${team1} and ${team2}</em>` : `<em>Showing the complete jersey catalog.</em>`);
  const grid = document.getElementById('allJerseysGrid');
  grid.innerHTML = items.map(item => `
    <div class="col-12 col-md-6 col-xl-3">
      <div class="section-card mini-product h-100">
        <a href="product-details.html?id=${item.id}" class="product-image-link track-product-click" data-team="${item.team}" data-audience="${item.audience}" data-jersey-type="${item.jerseyType}" data-special="${String(!!item.isSpecial)}" data-goalkeeper="${String(!!item.isGoalkeeperJersey)}">
          <div class="product-image-frame" data-primary="${item.primaryImage}" data-secondary="${item.secondaryImage}" data-current-index="0">
            <button type="button" class="image-nav prev-image">&#10094;</button><img src="${item.primaryImage}" alt="${item.name}" class="product-image jersey-zoom" /><button type="button" class="image-nav next-image">&#10095;</button>
          </div>
        </a>
        <div class="mb-2"><strong>${item.team}</strong></div><div>${item.name}</div><div class="small mb-2">${item.jerseyType} - ${item.audience}</div>
        <div class="sizes-row mb-2">${(item.sizes||[]).map(s=>`<span class="size-tag">${s}</span>`).join('')}${(item.unavailableSizes||[]).map(s=>`<span class="size-tag unavailable">${s}</span>`).join('')}</div>
        <div class="mini-product-footer mt-3"><div>${item.isPromotion && item.promoPrice ? `<span class="old-price">${formatCurrency(item.salePrice)}</span><div class="new-price">${formatCurrency(item.promoPrice)}</div>` : `<div class="regular-price">${formatCurrency(item.salePrice)}</div>`}</div><a class="btn btn-plus" href="product-details.html?id=${item.id}">+</a></div>
      </div>
    </div>`).join('');
});
