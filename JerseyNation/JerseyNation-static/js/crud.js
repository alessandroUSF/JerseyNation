
async function loadCrudCatalog() {
  return await ensureCatalog();
}
function renderReadTable(items) {
  const tbody = document.getElementById('crudReadBody');
  if (!tbody) return;
  const mode = (getQueryParam('mode') || '').toLowerCase();
  tbody.innerHTML = items.map(item => `
    <tr>
      <td>${item.id}</td><td>${item.team}</td><td>${item.name}</td><td>${item.jerseyType}</td>
      <td>${item.audience}</td><td>${item.color}</td><td>${formatCurrency(item.salePrice)}</td><td>${item.isPromotion ? 'Yes' : 'No'}</td>
      <td><div class="crud-actions"><a class="btn btn-sm btn-outline-light" href="update.html?id=${item.id}">Update</a><a class="btn btn-sm btn-outline-danger" href="delete.html?id=${item.id}">Delete</a></div></td>
    </tr>`).join('');
  if (mode === 'delete' || mode === 'update') {
    const heading = document.querySelector('h1');
    const intro = document.querySelector('.section-card p');
    if (heading) heading.textContent = mode === 'delete' ? 'Choose a Jersey to Delete' : 'Choose a Jersey to Update';
    if (intro) intro.textContent = mode === 'delete' ? 'Select a jersey below to open the delete confirmation page.' : 'Select a jersey below to open the update form.';
  }
}
function renderAuditLogs() {
  const target = document.getElementById('auditLogBody');
  if (!target) return;
  const logs = getAuditLogs();
  target.innerHTML = logs.slice(0,10).map(log => `
    <tr><td>${new Date(log.timestamp).toLocaleString()}</td><td>${log.actionType}</td><td>${log.performedBy}</td><td>${log.jerseyName}</td><td>${log.details}</td></tr>
  `).join('') || `<tr><td colspan="5">No audit log entries yet in the static demo.</td></tr>`;
}
async function initCrudHome() {
  renderAuditLogs();
  const quickDelete = document.getElementById('quickDeleteLink');
  if (quickDelete) quickDelete.setAttribute('href', 'read.html?mode=delete');
  const quickUpdate = document.getElementById('quickUpdateLink');
  if (quickUpdate) quickUpdate.setAttribute('href', 'read.html?mode=update');
}
async function initReadPage() {
  renderReadTable(await loadCrudCatalog());
}
async function bindCreateForm() {
  const form = document.getElementById('createForm');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const items = await loadCrudCatalog();
    const fd = new FormData(form);
    const nextId = items.reduce((m,x)=>Math.max(m,x.id),0) + 1;
    const item = {
      id: nextId,
      team: fd.get('team'), name: fd.get('name'), jerseyType: fd.get('jerseyType'),
      audience: fd.get('audience'), color: fd.get('color'), jerseyNumber: parseInt(fd.get('jerseyNumber')||'0',10),
      costPrice: parseFloat(fd.get('costPrice')||'0'), salePrice: parseFloat(fd.get('salePrice')||'0'),
      promoPrice: fd.get('promoPrice') ? parseFloat(fd.get('promoPrice')) : null,
      sizes: String(fd.get('sizes')||'').split(',').map(x=>x.trim()).filter(Boolean),
      unavailableSizes: String(fd.get('unavailableSizes')||'').split(',').map(x=>x.trim()).filter(Boolean),
      isPromotion: fd.get('isPromotion') === 'on', isSpecial: fd.get('isSpecial') === 'on',
      isGoalkeeperJersey: fd.get('isGoalkeeperJersey') === 'on', isSigned: fd.get('isSigned') === 'on',
      primaryImage: fd.get('primaryImage') || 'images/jerseys/argentina-home-1.jpg',
      secondaryImage: fd.get('secondaryImage') || 'images/jerseys/argentina-home-2.jpg',
      description: fd.get('description') || 'Created in the static demo.',
      isBestSeller: false, isMatchWorn:false, isTrainingWorn:false, isRare:false, inStock:true
    };
    items.push(item);
    saveCatalog(items);
    addAuditLog('CREATE', item.name, `Created jersey for team '${item.team}' with sale price ${formatCurrency(item.salePrice)}.`, fd.get('performedBy') || 'Admin User');
    window.location.href = 'read.html';
  });
}
async function bindUpdateForm() {
  const form = document.getElementById('updateForm');
  if (!form) return;
  const id = parseInt(getQueryParam('id') || '0', 10);
  const items = await loadCrudCatalog();
  const item = items.find(x => x.id === id);
  if (!item) return;
  for (const [k,v] of Object.entries(item)) {
    const el = form.querySelector(`[name="${k}"]`);
    if (el && typeof v !== 'object') el.value = v ?? '';
  }
  const sizes = form.querySelector('[name="sizes"]'); if (sizes) sizes.value = (item.sizes||[]).join(', ');
  const unavailableSizes = form.querySelector('[name="unavailableSizes"]'); if (unavailableSizes) unavailableSizes.value = (item.unavailableSizes||[]).join(', ');
  ['isPromotion','isSpecial','isGoalkeeperJersey','isSigned'].forEach(k => { const el=form.querySelector(`[name="${k}"]`); if (el) el.checked=!!item[k]; });
  const promotionToggle = form.querySelector('[name="isPromotion"]');
  const promoPriceInput = form.querySelector('[name="promoPrice"]');
  function syncPromotionFields() {
    if (!promoPriceInput || !promotionToggle) return;
    promoPriceInput.disabled = !promotionToggle.checked;
    if (!promotionToggle.checked) promoPriceInput.value = '';
    else if (!promoPriceInput.value) promoPriceInput.value = item.promoPrice ?? item.salePrice ?? '';
  }
  promotionToggle?.addEventListener('change', syncPromotionFields);
  syncPromotionFields();
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    Object.assign(item, {
      team: fd.get('team'), name: fd.get('name'), jerseyType: fd.get('jerseyType'), audience: fd.get('audience'),
      color: fd.get('color'), jerseyNumber: parseInt(fd.get('jerseyNumber')||'0',10), costPrice: parseFloat(fd.get('costPrice')||'0'),
      salePrice: parseFloat(fd.get('salePrice')||'0'), promoPrice: (fd.get('isPromotion') === 'on' && fd.get('promoPrice')) ? parseFloat(fd.get('promoPrice')) : null,
      sizes: String(fd.get('sizes')||'').split(',').map(x=>x.trim()).filter(Boolean),
      unavailableSizes: String(fd.get('unavailableSizes')||'').split(',').map(x=>x.trim()).filter(Boolean),
      isPromotion: fd.get('isPromotion') === 'on', isSpecial: fd.get('isSpecial') === 'on',
      isGoalkeeperJersey: fd.get('isGoalkeeperJersey') === 'on', isSigned: fd.get('isSigned') === 'on',
      primaryImage: fd.get('primaryImage'), secondaryImage: fd.get('secondaryImage'), description: fd.get('description')
    });
    saveCatalog(items);
    addAuditLog('UPDATE', item.name, `Updated jersey for team '${item.team}' in the static demo.`, fd.get('performedBy') || 'Admin User');
    window.location.href = 'read.html';
  });
}
async function bindDeleteForm() {
  const wrap = document.getElementById('deletePanel');
  if (!wrap) return;
  const id = parseInt(getQueryParam('id') || '0', 10);
  const items = await loadCrudCatalog();
  const item = items.find(x => x.id === id);
  if (!item) { wrap.innerHTML = `<p>Jersey not found.</p>`; return; }
  wrap.innerHTML = `<p>You are about to delete <strong>${item.name}</strong> from team <strong>${item.team}</strong>.</p>
  <p>This action will be recorded in the audit log for the static demo.</p>
  <form id="deleteForm"><div class="mb-3"><label class="form-label">Performed By</label><input name="performedBy" class="form-control" value="Admin User" /></div>
  <button type="submit" class="btn btn-danger">Confirm Delete</button><a href="read.html" class="btn btn-outline-light ms-2">Cancel</a></form>`;
  document.getElementById('deleteForm').addEventListener('submit', e => {
    e.preventDefault();
    const by = e.target.performedBy.value || 'Admin User';
    const filtered = items.filter(x => x.id !== id);
    saveCatalog(filtered);
    addAuditLog('DELETE', item.name, `Deleted jersey from team '${item.team}' in the static demo.`, by);
    window.location.href = 'read.html';
  });
}
document.addEventListener('DOMContentLoaded', () => {
  initCrudHome(); initReadPage(); bindCreateForm(); bindUpdateForm(); bindDeleteForm();
});
