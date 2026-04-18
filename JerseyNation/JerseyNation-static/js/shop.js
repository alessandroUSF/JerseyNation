
function productPrice(product) {
  return product.isPromotion && product.promoPrice ? product.promoPrice : product.salePrice;
}
function normalizeTeamName(name) {
  if (!name) return "";
  const n = name.toLowerCase();
  if (n === 'usa') return 'united states';
  if (n === 'czechia') return 'czech republic';
  if (n === 'korea republic') return 'south korea';
  return n;
}
function filterProducts(products, params) {
  let result = [...products];
  const search = (params.search || "").trim().toLowerCase();
  const team = normalizeTeamName(params.team || "");
  const team1 = normalizeTeamName(params.team1 || "");
  const team2 = normalizeTeamName(params.team2 || "");
  if (search) {
    result = result.filter(p =>
      [p.team, p.name, p.jerseyType, p.audience, p.color].some(v => (v || "").toLowerCase().includes(search))
    );
  }
  if (team) result = result.filter(p => normalizeTeamName(p.team) === team);
  if (team1 && team2) result = result.filter(p => [team1, team2].includes(normalizeTeamName(p.team)));
  return result;
}
function cardMarkup(item, large=false, forYou=false) {
  const displayPrice = productPrice(item);
  const query = `product-details.html?id=${item.id}`;
  const badges = [
    `<span class="jersey-badge">${item.jerseyType}</span>`,
    `<span class="jersey-badge">${item.audience}</span>`,
    item.isGoalkeeperJersey ? `<span class="jersey-badge">Goalkeeper</span>` : '',
    item.isSpecial ? `<span class="jersey-badge">Special</span>` : ''
  ].join('');
  const sizes = (item.sizes||[]).map(s=>`<span class="size-tag">${s}</span>`).join('') +
                (item.unavailableSizes||[]).map(s=>`<span class="size-tag unavailable">${s}</span>`).join('');
  const priceHtml = item.isPromotion && item.promoPrice
    ? `<div><span class="old-price">${formatCurrency(item.salePrice)}</span> <span class="promo-badge">Promotion</span></div><div class="new-price">${formatCurrency(item.promoPrice)}</div>`
    : `<div class="regular-price">${formatCurrency(item.salePrice)}</div>`;
  const outerClass = large ? 'product-card' : 'mini-product';
  const wrapperClass = forYou ? `for-you-item` : '';
  return `<div class="${wrapperClass} ${large ? 'col-12 col-md-6 col-xl-4' : 'col-12 col-md-6 col-xl-3'}"
      ${forYou ? `data-team="${item.team}" data-audience="${item.audience}" data-jersey-type="${item.jerseyType}" data-special="${String(!!item.isSpecial)}" data-goalkeeper="${String(!!item.isGoalkeeperJersey)}" data-promotion="${String(!!item.isPromotion)}" data-sizes="${(item.sizes||[]).join(',')}"`:''}>
      <div class="section-card ${outerClass} h-100 ${item.isSpecial ? 'special-product':''}">
        <a href="${query}" class="product-image-link track-product-click" data-team="${item.team}" data-audience="${item.audience}" data-jersey-type="${item.jerseyType}" data-special="${String(!!item.isSpecial)}" data-goalkeeper="${String(!!item.isGoalkeeperJersey)}">
          <div class="product-image-frame" data-primary="${item.primaryImage}" data-secondary="${item.secondaryImage}" data-current-index="0">
            <button type="button" class="image-nav prev-image" aria-label="Previous image">&#10094;</button>
            <img src="${item.primaryImage}" alt="${item.name}" class="product-image jersey-zoom" />
            <button type="button" class="image-nav next-image" aria-label="Next image">&#10095;</button>
          </div>
        </a>
        ${large ? `<div class="product-card-top"><span class="product-team">${item.team}</span></div>
          <h3>${item.name}</h3><p class="product-meta">${item.jerseyType} - ${item.audience} - ${item.color}</p><p>${item.description}</p><div class="mb-2">${badges}</div>` :
          `<div class="mb-2"><strong>${item.team}</strong></div><div>${item.name}</div><div class="small mb-2">${item.jerseyType} - ${item.audience}</div>`}
        <div class="${large ? 'product-footer' : 'mini-product-footer mt-3'}">
          <div>${priceHtml}${large ? `<div class="sizes-row">${sizes}</div>`:''}</div>
          <a href="${query}" class="btn btn-plus track-product-click" data-team="${item.team}" data-audience="${item.audience}" data-jersey-type="${item.jerseyType}" data-special="${String(!!item.isSpecial)}" data-goalkeeper="${String(!!item.isGoalkeeperJersey)}" title="View product details">+</a>
        </div>
        ${!large ? `<div class="sizes-row mt-2">${sizes}</div>`:''}
      </div></div>`;
}
function matchMarkup(match) {
  const home = normalizeTeamName(match.homeTeam)==='united states' ? 'United States' : match.homeTeam;
  const away = normalizeTeamName(match.awayTeam)==='czech republic' ? 'Czech Republic' : match.awayTeam;
  return `<div class="col-12 col-lg-4"><div class="section-card game-card h-100">
    <div class="game-teams">
      <a href="shop.html?team=${encodeURIComponent(home)}" class="game-team-link game-team-block"><img src="${match.homeFlagImage}" alt="${home} flag" class="match-flag-img" /><span class="match-team-name">${home}</span></a>
      <span class="game-vs">vs</span>
      <a href="shop.html?team=${encodeURIComponent(away)}" class="game-team-link game-team-block"><img src="${match.awayFlagImage}" alt="${away} flag" class="match-flag-img" /><span class="match-team-name">${away}</span></a>
    </div>
    <p class="match-details"><strong>${new Date(match.matchDate).toLocaleString('en-US',{month:'short',day:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'})}</strong></p>
    <p class="match-details">${match.venue}</p>
    <span class="receive-badge">Receive before match</span>
    <div class="mt-3"><a href="all-jerseys.html?team1=${encodeURIComponent(home)}&team2=${encodeURIComponent(away)}" class="btn btn-primary btn-sm">Buy now</a></div>
  </div></div>`;
}
function teamGroupMarkup(group) {
  return `<div class="team-group-block mb-4"><h3 class="team-group-title">${group.groupName}</h3><div class="team-group-grid">${
    group.teams.map(team=>`<a href="all-jerseys.html?team=${encodeURIComponent(team.name)}" class="team-group-link" title="${team.name}"><img src="${team.flagImage}" alt="${team.name} flag" class="flag-img" /><span class="flag-name">${team.name}</span></a>`).join('')
  }</div></div>`;
}
document.addEventListener('DOMContentLoaded', async () => {
  const [products, matches, teamGroups] = await Promise.all([ensureCatalog(), fetchJson('data/matches.json'), fetchJson('data/team-groups.json')]);
  const params = {
    search: getQueryParam('search') || '',
    team: getQueryParam('team') || '',
    team1: getQueryParam('team1') || '',
    team2: getQueryParam('team2') || ''
  };
  const queryProducts = filterProducts(products, params);
  const featured = queryProducts.slice(0, 5);
  const promotions = products.filter(p => p.isPromotion).slice(0, 4);
  const specials = products.filter(p => p.isSpecial).slice(0, 4);
  const forYou = [...products];
  if (params.search) {
    const input = document.getElementById('shopSearchInput');
    if (input) input.value = params.search;
  }
  document.getElementById('featuredProductsGrid').innerHTML = featured.map(x=>cardMarkup(x,true,false)).join('') || `<div class="col-12"><div class="section-card">No products matched the selected filters.</div></div>`;
  document.getElementById('nextMatchesGrid').innerHTML = matches.map(matchMarkup).join('');
  document.getElementById('promotionsGrid').innerHTML = promotions.map(x=>cardMarkup(x,false,false)).join('');
  document.getElementById('forYouGrid').innerHTML = forYou.map(x=>cardMarkup(x,false,true)).join('');
  document.getElementById('specialProductsGrid').innerHTML = specials.map(x=>cardMarkup(x,false,false)).join('');
  document.getElementById('teamGroupsWrap').innerHTML = teamGroups.map(teamGroupMarkup).join('');
  if (params.team || (params.team1 && params.team2)) {
    const banner = document.getElementById('filterMessage');
    if (banner) {
      const msg = params.team ? `Showing items for ${params.team}.` : `Showing items for ${params.team1} and ${params.team2}.`;
      banner.textContent = msg;
      banner.classList.remove('d-none');
    }
  }
  if (window.reorderForYouSection) reorderForYouSection();
});
