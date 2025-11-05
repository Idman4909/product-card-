// cart.js
import { saveCart, loadCart } from "./storage.js";

let cart = loadCart();

export function getCart() {
  return cart;
}

export function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
}

export function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart(cart);
}

export function updateQuantity(id, qty) {
  const item = cart.find(i => i.id === id);
  if (item) item.quantity = qty;
  saveCart(cart);
}

export function clearCart() {
  cart = [];
  saveCart(cart);
}
