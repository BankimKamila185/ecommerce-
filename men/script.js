
// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // =====================
    // FILTER FUNCTIONALITY
    // =====================
    
    // Get all filter headers
    const filterHeaders = document.querySelectorAll('.filter-header');
    
    // Add click event listener to each filter header
    filterHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle the arrow icon
            const arrow = this.querySelector('i');
            arrow.textContent = arrow.textContent === '▼' ? '▲' : '▼';
            
            // Toggle the visibility of the filter content
            const filterContent = this.nextElementSibling;
            filterContent.classList.toggle('open');
        });
    });
    
    // =====================
    // SEARCH FUNCTIONALITY
    // =====================
    
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    // Search function
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
            // In a real implementation, this would redirect to search results
            // For demo purposes, we'll just alert the search term
            alert(`Searching for: ${searchTerm}`);
            
            // You could also filter the products on the current page
            filterProductsBySearch(searchTerm);
        }
    }
    
    // Add event listeners for search
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Filter products based on search term
    function filterProductsBySearch(term) {
        const products = document.querySelectorAll('.product');
        
        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            const productDesc = product.querySelector('p').textContent.toLowerCase();
            
            if (productName.includes(term) || productDesc.includes(term)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
    
    // =====================
    // HEADER ICONS FUNCTIONALITY
    // =====================
    
    const headerIcons = document.querySelectorAll('.header-icon');
    
    headerIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const iconType = this.textContent;
            
            switch (iconType) {
                case '👤':
                    alert('User account section will open here');
                    break;
                case '❤️':
                    alert('Wishlist will open here');
                    break;
                case '🛒':
                    alert('Shopping cart will open here');
                    break;
            }
        });
    });
    
    // =====================
    // PRODUCT INTERACTIONS
    // =====================
    
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        // Add click event to the entire product card
        product.addEventListener('click', function(e) {
            // Don't trigger if clicking on the button
            if (!e.target.classList.contains('check-price') && !e.target.classList.contains('buy-online')) {
                const productName = this.querySelector('h3').textContent;
                const productDesc = this.querySelector('p').textContent;
                
                // In a real implementation, this would redirect to the product detail page
                alert(`Viewing details for: ${productName} - ${productDesc}`);
            }
        });
        
        // Add click events to the buttons
        const checkPriceBtn = product.querySelector('.check-price');
        const buyOnlineBtn = product.querySelector('.buy-online');
        
        if (checkPriceBtn) {
            checkPriceBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering the product card click
                const productName = product.querySelector('h3').textContent;
                alert(`Checking special price for: ${productName}`);
            });
        }
        
        if (buyOnlineBtn) {
            buyOnlineBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering the product card click
                const productName = product.querySelector('h3').textContent;
                const productPrice = product.querySelector('.price').textContent;
                alert(`Adding to cart: ${productName} - ${productPrice}`);
            });
        }
    });
    
    // =====================
    // PAGINATION FUNCTIONALITY
    // =====================
    
    const paginationLinks = document.querySelectorAll('.pagination a');
    
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            paginationLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link if it's not the "Next" button
            if (!this.classList.contains('next')) {
                this.classList.add('active');
            }
            
            const page = this.textContent;
            
            // In a real implementation, this would load the new page of products
            if (page === 'Next ▶') {
                // Find the current active page and go to the next one
                const activePage = document.querySelector('.pagination a.active');
                const nextPageNum = parseInt(activePage.textContent) + 1;
                alert(`Loading page ${nextPageNum}`);
            } else {
                alert(`Loading page ${page}`);
            }
        });
    });
    
    // =====================
    // SORTING FUNCTIONALITY
    // =====================
    
    const sortSelect = document.querySelector('.sort-options select');
    
    sortSelect.addEventListener('change', function() {
        const sortOption = this.value;
        alert(`Sorting products by: ${sortOption}`);
        
        // In a real implementation, this would sort the products
        sortProducts(sortOption);
    });
    
    // Function to sort products
    function sortProducts(option) {
        const productsGrid = document.querySelector('.products-grid');
        const products = Array.from(productsGrid.querySelectorAll('.product'));
        
        products.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.price').textContent.replace(/[₹,]/g, ''));
            const priceB = parseFloat(b.querySelector('.price').textContent.replace(/[₹,]/g, ''));
            
            switch(option) {
                case 'PRICE LOW TO HIGH':
                    return priceA - priceB;
                case 'PRICE HIGH TO LOW':
                    return priceB - priceA;
                case 'NEWEST FIRST':
                    // For demo purposes, we'll just randomize
                    return Math.random() - 0.5;
                default: // BESTSELLERS
                    // For demo purposes, we'll just randomize
                    return Math.random() - 0.5;
            }
        });
        
        // Remove existing products
        productsGrid.innerHTML = '';
        
        // Add sorted products back to the grid
        products.forEach(product => {
            productsGrid.appendChild(product);
        });
    }
    
    // =====================
    // NEWSLETTER SUBSCRIPTION
    // =====================
    
    const newsletterForm = document.querySelector('.newsletter');
    const newsletterInput = newsletterForm.querySelector('input');
    const newsletterButton = newsletterForm.querySelector('button');
    
    newsletterButton.addEventListener('click', function() {
        const email = newsletterInput.value.trim();
        
        if (email && validateEmail(email)) {
            alert(`Thank you for subscribing with: ${email}`);
            newsletterInput.value = '';
        } else {
            alert('Please enter a valid email address');
        }
    });
    
    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // =====================
    // FILTER IMPLEMENTATION
    // =====================
    
    // For demonstration purposes, let's add some checkboxes to the first filter
    const brandFilter = document.querySelector('.filter-group:first-child .filter-content');
    
    // Add some brand options
    const brands = ['ROLEX', 'OMEGA', 'TAG HEUER', 'BREITLING', 'CARTIER', 'TISSOT', 'LONGINES', 'PATEK PHILIPPE'];
    
    brands.forEach(brand => {
        const brandOption = document.createElement('div');
        brandOption.className = 'filter-option';
        brandOption.innerHTML = `
            <input type="checkbox" id="${brand}" name="brand" value="${brand}">
            <label for="${brand}">${brand}</label>
        `;
        brandFilter.appendChild(brandOption);
    });
    
    // Make the brand filter visible by default
    brandFilter.classList.add('open');
    brandFilter.previousElementSibling.querySelector('i').textContent = '▲';
    
    // Add event listeners to the brand checkboxes
    const brandCheckboxes = brandFilter.querySelectorAll('input[type="checkbox"]');
    
    brandCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const selectedBrands = Array.from(brandCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            
            if (selectedBrands.length > 0) {
                filterProductsByBrand(selectedBrands);
            } else {
                // If no brands selected, show all products
                document.querySelectorAll('.product').forEach(p => p.style.display = 'block');
            }
        });
    });
    
    // Filter products by brand
    function filterProductsByBrand(brands) {
        const products = document.querySelectorAll('.product');
        
        products.forEach(product => {
            const productBrand = product.querySelector('h3').textContent;
            
            if (brands.some(brand => productBrand.includes(brand))) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
    
    // =====================
    // MOBILE RESPONSIVENESS ENHANCEMENTS
    // =====================
    
    // Create mobile menu toggle
    const nav = document.querySelector('nav');
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.textContent = '☰';
    mobileMenuToggle.style.display = 'none';
    mobileMenuToggle.style.fontSize = '24px';
    mobileMenuToggle.style.cursor = 'pointer';
    mobileMenuToggle.style.padding = '10px';
    
    // Insert before the nav
    document.querySelector('header').after(mobileMenuToggle);
    
    // Function to check window width and adjust UI
    function checkWindowWidth() {
        if (window.innerWidth <= 768) {
            mobileMenuToggle.style.display = 'block';
            nav.style.display = 'none';
        } else {
            mobileMenuToggle.style.display = 'none';
            nav.style.display = 'block';
        }
    }
    
    // Check on page load
    checkWindowWidth();
    
    // Check when window is resized
    window.addEventListener('resize', checkWindowWidth);
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        if (nav.style.display === 'none') {
            nav.style.display = 'block';
        } else {
            nav.style.display = 'none';
        }
    });
    
    // =====================
    // HERO SECTION ENHANCEMENT
    // =====================
    
    // Create a simple auto-rotating text for the hero section
    const heroContent = document.querySelector('.hero-content h1');
    const headlines = [
        'WATCHES FOR HIM',
        'LUXURY AT ITS FINEST',
        'TIMELESS ELEGANCE',
        'CRAFTED PERFECTION'
    ];
    let currentHeadline = 0;
    
    // Change headline every 5 seconds
    setInterval(() => {
        currentHeadline = (currentHeadline + 1) % headlines.length;
        
        // Fade out
        heroContent.style.opacity = '0';
        
        // Change text and fade in after a short delay
        setTimeout(() => {
            heroContent.textContent = headlines[currentHeadline];
            heroContent.style.opacity = '1';
        }, 500);
    }, 5000);
    
    // Add transition style to hero content
    heroContent.style.transition = 'opacity 0.5s ease';
});