let products = [];
let displayedProducts = [];

async function fetchProducts() {
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    products = data.products;
    displayedProducts = [...products];
    displayProducts(displayedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

function displayProducts(list) {
  const container = document.getElementById('productList');
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = '<p>No products found.</p>';
    return;
  }

  list.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p><strong>Brand:</strong> ${product.brand}</p>
      <p><strong>Price:</strong> $${product.price}</p>
      <p><strong>Rating:</strong> ${product.rating}</p>
    `;

    container.appendChild(card);
  });
}

function searchProducts() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) {
    alert('Search field cannot be empty!');
    return;
  }

  fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      products = data.products;
      displayedProducts = [...products];
      displayProducts(displayedProducts);
    })
    .catch(error => {
      console.error('Search failed:', error);
    });
}

function sortProducts() {
  const option = document.getElementById('sortOption').value;
  let sorted = [...displayedProducts];

  if (option === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (option === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (option === 'rating-desc') {
    sorted.sort((a, b) => b.rating - a.rating);
  } else if (option === 'rating-asc') {
    sorted.sort((a, b) => a.rating - b.rating);
  }

  displayProducts(sorted);
}

function applyFilters() {
  const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
  const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
  const minRating = parseFloat(document.getElementById('minRating').value) || 0;

  displayedProducts = products.filter(product => {
    return (
      product.price >= minPrice &&
      product.price <= maxPrice &&
      product.rating >= minRating
    );
  });

  displayProducts(displayedProducts);
}

fetchProducts();