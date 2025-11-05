// product.js
export const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Mouse", price: 25 },
  { id: 3, name: "Keyboard", price: 75 },
  { id: 4, name: "Monitor", price: 150 }
];

export function renderProducts(addToCartCallback) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button>Add to Cart</button>
    `;
    div.querySelector("button").addEventListener("click", () => addToCartCallback(p));
    productList.appendChild(div);
  });
}
