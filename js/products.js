/**
 * Products JavaScript file for Clothing Boutique Website
 * Author: Developer
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load products data
    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            // Store products globally
            window.allProducts = data;
            
            // Initialize products on different pages
            initializeFeaturedProducts();
            initializeProductsGrid();
            
            // Handle category parameter in URL (for direct links)
            const urlParams = new URLSearchParams(window.location.search);
            const category = urlParams.get('category');
            if (category) {
                const buttons = document.querySelectorAll('.filter-btn');
                buttons.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-filter') === category) {
                        btn.classList.add('active');
                    }
                });
                filterProducts(category);
            }
        })
        .catch(error => {
            console.error('Error loading products:', error);
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = 'Failed to load products. Please try again later.';
            
            const featuredProducts = document.getElementById('featured-products');
            if (featuredProducts) {
                featuredProducts.innerHTML = '';
                featuredProducts.appendChild(errorMessage);
            }
            
            const productsGrid = document.getElementById('products-grid');
            if (productsGrid) {
                productsGrid.innerHTML = '';
                productsGrid.appendChild(errorMessage);
            }
        });
    
    // Set up event listeners for product filtering
    setupFilterListeners();
});

/**
 * Initialize the featured products section on the home page
 */
function initializeFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featured-products');
    if (!featuredProductsContainer) return;
    
    // Get featured products (first 4 products or those marked as featured)
    const featuredProducts = window.allProducts.filter(product => product.featured).slice(0, 4);
    
    if (featuredProducts.length === 0) {
        featuredProductsContainer.innerHTML = '<p>No featured products available at the moment.</p>';
        return;
    }
    
    featuredProductsContainer.innerHTML = '';
    
    // Create product cards for each featured product
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        featuredProductsContainer.appendChild(productCard);
    });
}

/**
 * Initialize the products grid on the products page
 */
function initializeProductsGrid() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    // Create product cards for all products
    window.allProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

/**
 * Create a product card element
 * @param {Object} product - The product data
 * @returns {HTMLElement} - The product card element
 */
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.setAttribute('data-category', product.category);
    productCard.setAttribute('data-price', product.price);
    
    productCard.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            ${product.tag ? `<div class="product-tag">${product.tag}</div>` : ''}
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">
                <span>₹${product.price}</span>
                <button class="view-btn" data-id="${product.id}">View Details</button>
            </div>
        </div>
    `;
    
    // Add click event to view product details
    productCard.querySelector('.view-btn').addEventListener('click', () => {
        openProductModal(product);
    });
    
    return productCard;
}

/**
 * Open product details modal
 * @param {Object} product - The product data
 */
function openProductModal(product) {
    const modal = document.getElementById('product-modal');
    const productDetails = document.getElementById('product-details');
    
    if (!modal || !productDetails) return;
    
    productDetails.innerHTML = `
        <div class="product-details-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-details-info">
            <h2>${product.name}</h2>
            <div class="product-details-price">₹${product.price}</div>
            <div class="product-details-desc">
                <p>${product.description}</p>
            </div>
            <div class="product-details-meta">
                <span><strong>Category:</strong> ${product.category}</span>
                <span><strong>Availability:</strong> ${product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                ${product.sizes ? `<span><strong>Sizes:</strong> ${product.sizes.join(', ')}</span>` : ''}
                ${product.colors ? `<span><strong>Colors:</strong> ${product.colors.join(', ')}</span>` : ''}
            </div>
            <button class="btn-primary">Contact for Purchase</button>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Close modal on click
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Contact button functionality
    const contactBtn = productDetails.querySelector('.btn-primary');
    contactBtn.addEventListener('click', () => {
        window.location.href = `contact.html?product=${product.id}`;
    });
}

/**
 * Set up event listeners for product filtering
 */
function setupFilterListeners() {
    // Category filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter products
            filterProducts(filter);
        });
    });
    
    // Price range filter
    const priceRange = document.getElementById('price-range');
    if (priceRange) {
        priceRange.addEventListener('input', () => {
            const maxPrice = parseInt(priceRange.value);
            document.getElementById('current-price').textContent = maxPrice < 5000 ? `₹${maxPrice}` : '₹5000+';
            
            // Apply current category filter along with price
            const activeFilter = document.querySelector('.filter-btn.active');
            const category = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
            
            filterProducts(category, maxPrice);
        });
    }
    
    // Sort dropdown
    const sortSelect = document.getElementById('sort-products');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortValue = sortSelect.value;
            sortProducts(sortValue);
        });
    }
    
    // New arrivals button
    const newArrivalsBtn = document.getElementById('new-arrivals-btn');
    if (newArrivalsBtn) {
        newArrivalsBtn.addEventListener('click', () => {
            // Simulate clicking the filter button for all products
            const allProductsBtn = document.querySelector('.filter-btn[data-filter="all"]');
            if (allProductsBtn) {
                allProductsBtn.click();
            }
            
            // Set sort to newest
            const sortSelect = document.getElementById('sort-products');
            if (sortSelect) {
                sortSelect.value = 'newest';
                sortProducts('newest');
            }
        });
    }
}

/**
 * Filter products by category and price
 * @param {string} category - The category to filter by
 * @param {number} maxPrice - The maximum price to filter by
 */
function filterProducts(category, maxPrice) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    const productCards = productsGrid.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const cardPrice = parseInt(card.getAttribute('data-price'));
        
        // Check if card matches both category and price filters
        const matchesCategory = category === 'all' || cardCategory.toLowerCase() === category.toLowerCase();
        const matchesPrice = !maxPrice || cardPrice <= maxPrice;
        
        if (matchesCategory && matchesPrice) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Check if there are no visible products
    const visibleProducts = Array.from(productCards).filter(card => card.style.display !== 'none');
    
    if (visibleProducts.length === 0) {
        // No products match filters, show message
        let noProductsMessage = document.querySelector('.no-products-message');
        
        if (!noProductsMessage) {
            noProductsMessage = document.createElement('div');
            noProductsMessage.classList.add('no-products-message');
            productsGrid.appendChild(noProductsMessage);
        }
        
        noProductsMessage.textContent = 'No products match your filters. Please try different criteria.';
        noProductsMessage.style.display = 'block';
    } else {
        // Hide no products message if it exists
        const noProductsMessage = document.querySelector('.no-products-message');
        if (noProductsMessage) {
            noProductsMessage.style.display = 'none';
        }
    }
}

/**
 * Sort products by the specified criteria
 * @param {string} sortBy - The sorting criteria
 */
function sortProducts(sortBy) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    const productCards = Array.from(productsGrid.querySelectorAll('.product-card'));
    
    // Sort products based on the selected criteria
    productCards.sort((a, b) => {
        const priceA = parseInt(a.getAttribute('data-price'));
        const priceB = parseInt(b.getAttribute('data-price'));
        
        switch (sortBy) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'newest':
                // For demo purposes, we'll just reverse the order
                // In a real application, you would sort by date
                return -1; // Newest at the top
            default:
                return 0; // Default (featured) order
        }
    });
    
    // Remove all products
    while (productsGrid.firstChild) {
        productsGrid.removeChild(productsGrid.firstChild);
    }
    
    // Add sorted products back
    productCards.forEach(card => {
        productsGrid.appendChild(card);
    });
}
