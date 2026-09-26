const PRODUCTS = {
  g1: { name: 'PUBG Mobile — 1200 UC', price: 8.99 }
};
const cart = new Map();
const $ = s => document.querySelector(s);
const fmt = n => '$' + n.toFixed(2);

function renderCart() {
  let sub = 0;
  cart.forEach((q, id) => sub += PRODUCTS[id].price * q);
  if ($('#subVal')) $('#subVal').textContent = fmt(sub);
}

document.addEventListener('click', e => {
  const add = e.target.closest('[data-add]');
  if (add) {
    const id = add.dataset.add;
    cart.set(id, (cart.get(id) || 0) + 1);
    renderCart();
    alert('تمت الإضافة إلى السلة بنجاح');
  }
});
