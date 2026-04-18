
document.addEventListener("DOMContentLoaded", function () {
  const statusMessage = document.getElementById("cartStatusMessage");
  const itemsList = document.getElementById("cartItemsList");
  const clearBtn = document.getElementById("clearCartBtn");
  const subtotalEl = document.getElementById("cartSubtotal");
  function renderCart() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    itemsList.innerHTML = "";
    if (cartItems.length === 0) {
      statusMessage.textContent = "The cart is currently empty.";
      subtotalEl.textContent = formatCurrency(0);
      clearBtn.style.display = "none";
      updateCartCountUI();
      return;
    }
    let subtotal = 0;
    statusMessage.textContent = `The cart currently contains ${cartItems.length} item(s).`;
    cartItems.forEach((item, idx) => {
      subtotal += (item.price || 0) * (item.quantity || 1);
      const li = document.createElement("li");
      li.className = "mb-2";
      li.innerHTML = `${item.name} - Size ${item.size || 'N/A'} - Qty ${item.quantity} - ${formatCurrency((item.price||0) * (item.quantity||1))} <button class="btn btn-sm btn-outline-danger ms-2" data-index="${idx}">Remove</button>`;
      itemsList.appendChild(li);
    });
    subtotalEl.textContent = formatCurrency(subtotal);
    clearBtn.style.display = "inline-block";
    updateCartCountUI();
    itemsList.querySelectorAll('button[data-index]').forEach(btn => btn.addEventListener('click', () => {
      const arr = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const removed = arr.splice(parseInt(btn.dataset.index,10),1)[0];
      localStorage.setItem("cartItems", JSON.stringify(arr));
      const current = Math.max(0, parseInt(localStorage.getItem("cartCount") || "0", 10) - (removed?.quantity || 1));
      localStorage.setItem("cartCount", String(current));
      renderCart();
    }));
  }
  clearBtn.addEventListener("click", function () {
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartCount");
    renderCart();
  });
  renderCart();
});
