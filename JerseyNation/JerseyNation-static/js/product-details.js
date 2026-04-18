
document.addEventListener('DOMContentLoaded', async () => {
  const id = parseInt(getQueryParam('id') || '0', 10);
  const products = await ensureCatalog();
  const product = products.find(p => p.id === id);
  const detail = document.getElementById('productDetailArea');
  if (!product) {
    detail.innerHTML = `<div class="section-card"><h1>Product not found</h1><p>No jersey matched the selected ID.</p><a class="btn btn-outline-light" href="shop.html">Back to Shop</a></div>`;
    return;
  }
  registerProductClick({
    team: product.team, audience: product.audience, jerseyType: product.jerseyType,
    isSpecial: !!product.isSpecial, isGoalkeeperJersey: !!product.isGoalkeeperJersey
  });
  const recommended = [...products].filter(p => p.id !== product.id && (p.team === product.team || p.audience === product.audience)).slice(0, 4);
  detail.innerHTML = `
  <div class="section-card">
    <div class="row g-4 align-items-start">
      <div class="col-lg-5">
        <div class="product-image-frame" data-primary="${product.primaryImage}" data-secondary="${product.secondaryImage}" data-current-index="0">
          <button type="button" class="image-nav prev-image" aria-label="Previous image">&#10094;</button>
          <img src="${product.primaryImage}" alt="${product.name}" class="product-image jersey-zoom" />
          <button type="button" class="image-nav next-image" aria-label="Next image">&#10095;</button>
        </div>
      </div>
      <div class="col-lg-7">
        <h1>${product.name}</h1>
        <p class="product-meta">${product.team} - ${product.jerseyType} - ${product.audience} - ${product.color}</p>
        <p>${product.description}</p>
        <div class="mb-3">
          ${product.isPromotion && product.promoPrice ? `<span class="old-price">${formatCurrency(product.salePrice)}</span><span class="promo-badge">Promotion</span><div class="new-price">${formatCurrency(product.promoPrice)}</div>` : `<div class="regular-price">${formatCurrency(product.salePrice)}</div>`}
        </div>
        <div class="mb-3"><strong>Available sizes</strong><div class="sizes-row mt-2">${(product.sizes||[]).map(s=>`<button type="button" class="size-tag size-option" data-size="${s}">${s}</button>`).join('')}${(product.unavailableSizes||[]).map(s=>`<span class="size-tag unavailable">${s}</span>`).join('')}</div></div>
        <div class="row g-3 mb-3">
          <div class="col-sm-4"><label class="form-label">Number</label><input id="jerseyNumberInput" class="form-control" type="number" value="${product.jerseyNumber || ''}"></div>
          <div class="col-sm-4"><label class="form-label">Quantity</label><input id="quantityInput" class="form-control" type="number" min="1" value="1"></div>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <button type="button" class="btn btn-primary" id="addToCartBtn">Add to Cart</button>
          <a class="btn btn-outline-light" href="shop.html">Back to Shop</a>
        </div>
      </div>
    </div>
  </div>
  <section class="mt-4">
    <h2 class="mb-3">You may also like</h2>
    <div class="row g-4">${recommended.map(item=>`
      <div class="col-12 col-md-6 col-xl-3">
        <div class="section-card mini-product h-100">
          <a href="product-details.html?id=${item.id}" class="product-image-link track-product-click" data-team="${item.team}" data-audience="${item.audience}" data-jersey-type="${item.jerseyType}" data-special="${String(!!item.isSpecial)}" data-goalkeeper="${String(!!item.isGoalkeeperJersey)}">
            <div class="product-image-frame" data-primary="${item.primaryImage}" data-secondary="${item.secondaryImage}" data-current-index="0">
              <button type="button" class="image-nav prev-image">&#10094;</button>
              <img src="${item.primaryImage}" alt="${item.name}" class="product-image jersey-zoom" />
              <button type="button" class="image-nav next-image">&#10095;</button>
            </div>
          </a>
          <div class="mb-2"><strong>${item.team}</strong></div><div>${item.name}</div>
          <div class="mini-product-footer mt-3"><div>${item.isPromotion && item.promoPrice ? `<span class="old-price">${formatCurrency(item.salePrice)}</span><div class="new-price">${formatCurrency(item.promoPrice)}</div>` : `<div class="regular-price">${formatCurrency(item.salePrice)}</div>`}</div><a class="btn btn-plus" href="product-details.html?id=${item.id}">+</a></div>
        </div>
      </div>`).join('')}</div>
  </section>`;
  let selectedSize = '';
  detail.querySelectorAll('.size-option').forEach(btn => btn.addEventListener('click', () => {
    detail.querySelectorAll('.size-option').forEach(b => b.classList.remove('btn-primary'));
    btn.classList.add('btn-primary');
    selectedSize = btn.dataset.size;
    registerSizePreference(selectedSize);
  }));
  document.getElementById('addToCartBtn').addEventListener('click', () => {
    const qty = Math.max(1, parseInt(document.getElementById('quantityInput').value || '1', 10));
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    cartItems.push({id: product.id, name: product.name, quantity: qty, size: selectedSize || product.sizes?.[0] || '', price: product.isPromotion && product.promoPrice ? product.promoPrice : product.salePrice});
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartCount', String((parseInt(localStorage.getItem('cartCount')||'0',10))+qty));
    updateCartCountUI();
    window.location.href = 'cart.html';
  });
});
