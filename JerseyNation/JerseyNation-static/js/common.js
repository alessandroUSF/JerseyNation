
async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to load ${path}`);
  return await response.json();
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'}).format(value);
}

function getCatalog() {
  const local = localStorage.getItem('jerseyCatalog');
  return local ? JSON.parse(local) : null;
}

async function ensureCatalog() {
  let catalog = getCatalog();
  if (!catalog) {
    catalog = await fetchJson('data/products.json');
    localStorage.setItem('jerseyCatalog', JSON.stringify(catalog));
  }
  return catalog;
}

function saveCatalog(items) {
  localStorage.setItem('jerseyCatalog', JSON.stringify(items));
}

function getAuditLogs() {
  const local = localStorage.getItem('auditLogs');
  return local ? JSON.parse(local) : [];
}

function saveAuditLogs(logs) {
  localStorage.setItem('auditLogs', JSON.stringify(logs));
}

function addAuditLog(actionType, jerseyName, details, performedBy='Static Demo User') {
  const logs = getAuditLogs();
  logs.unshift({
    id: Date.now(),
    timestamp: new Date().toISOString(),
    actionType,
    performedBy,
    jerseyName,
    details
  });
  saveAuditLogs(logs.slice(0, 50));
}

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function setCurrentNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar .nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page) a.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded', setCurrentNav);
