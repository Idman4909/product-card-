// main.js
import { renderProducts } from "./product.js";
import { addToCart, getCart, removeFromCart, updateQuantity } from "./cart.js";
import { saveCart, loadCart } from "./storage.js";


const cartSidebar = document.getElementById("cart-sidebar");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const subtotalEl = document.getElementById("subtotal");
const taxEl = document.getElementById("tax");
const totalEl = document.getElementById("total");

renderProducts(handleAddToCart);

document.querySelector(".cart-icon").addEventListener("click", () => {
  cartSidebar.classList.toggle("hidden");
});

function handleAddToCart(product) {
  addToCart(product);
  renderCart();
}

function renderCart() {
  const cart = getCart();
  cartItems.innerHTML = "";

  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;

    const div = document.createElement("div");
    div.innerHTML = `
      <p>${item.name} - $${item.price}</p>
      <input type="number" min="1" value="${item.quantity}" />
      <button>Remove</button>
      <hr>
    `;

    div.querySelector("input").addEventListener("change", e => {
      updateQuantity(item.id, parseInt(e.target.value));
      renderCart();
    });

    div.querySelector("button").addEventListener("click", () => {
      removeFromCart(item.id);
      renderCart();
    });

    cartItems.appendChild(div);
  });

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  subtotalEl.textContent = subtotal.toFixed(2);
  taxEl.textContent = tax.toFixed(2);
  totalEl.textContent = total.toFixed(2);
  cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
}

renderCart();
