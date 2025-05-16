// Main JavaScript file for Helios Luxury Watches

document.addEventListener('DOMContentLoaded', function() {
    // Toggle filter sections in sidebar
    const filterHeaders = document.querySelectorAll('.filter-header');
    
    filterHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle content visibility
            content.classList.toggle('open');
            
            // Toggle icon
            if (content.classList.contains('open')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });

    // Product hover effects
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        product.addEventListener('mouseenter', function() {
            this.querySelector('.product-image img').style.transform = 'scale(1.05)';
        });
        
        product.addEventListener('mouseleave', function() {
            this.querySelector('.product-image img').style.transform = 'scale(1)';
        });
    });

    // Mobile menu toggle
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const mainNav = document.querySelector('.main-nav');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Insert before the logo
        header.querySelector('.header-container').insertBefore(mobileMenuBtn, header.querySelector('.logo'));
        
        // Add event listener
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('open');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    };
    
    // Call mobile menu function if screen width is less than 768px
    if (window.innerWidth < 768) {
        createMobileMenu();
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768 && !document.querySelector('.mobile-menu-btn')) {
            createMobileMenu();
        }
    });

    // Dynamic price display feature
    const checkPriceButtons = document.querySelectorAll('.check-price');
    
    checkPriceButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Get the product container
            const product = this.closest('.product');
            
            // Get current price
            const priceElement = product.querySelector('.price');
            const originalPrice = priceElement.textContent;
            
            // Simulate discount calculation (20% off for demo)
            const numericPrice = parseFloat(originalPrice.replace(/[^\d.]/g, ''));
            const discountedPrice = numericPrice * 0.8;
            
            // Update price display
            priceElement.innerHTML = `<span style="text-decoration: line-through; color: #999;">${originalPrice}</span> <span style="color: #d9534f;">₹${discountedPrice.toFixed(0)}</span>`;
            
            // Change button text
            this.textContent = 'ADD TO CART';
            this.style.backgroundColor = '#d9534f';
            this.style.color = '#fff';
        });
    });

    // Newsletter subscription form
    const newsletterForm = document.querySelector('.newsletter');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                // Simulate successful subscription
                emailInput.value = '';
                
                // Create and show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'newsletter-success';
                successMsg.textContent = 'Thank you for subscribing!';
                successMsg.style.color = '#5cb85c';
                successMsg.style.marginTop = '10px';
                
                // Remove any existing messages
                const existingMsg = this.querySelector('.newsletter-success, .newsletter-error');
                if (existingMsg) {
                    this.removeChild(existingMsg);
                }
                
                this.appendChild(successMsg);
            } else {
                // Show error message
                const errorMsg = document.createElement('div');
                errorMsg.className = 'newsletter-error';
                errorMsg.textContent = 'Please enter a valid email address.';
                errorMsg.style.color = '#d9534f';
                errorMsg.style.marginTop = '10px';
                
                // Remove any existing messages
                const existingMsg = this.querySelector('.newsletter-success, .newsletter-error');
                if (existingMsg) {
                    this.removeChild(existingMsg);
                }
                
                this.appendChild(errorMsg);
            }
        });
    }

    // Sort functionality
    const sortSelect = document.querySelector('.sort-options select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const selectedOption = this.value;
            const productsGrid = document.querySelector('.products-grid');
            const products = Array.from(productsGrid.querySelectorAll('.product'));
            
            // Sort products based on selected option
            switch (selectedOption) {
                case 'PRICE LOW TO HIGH':
                    products.sort((a, b) => {
                        const priceA = parseFloat(a.querySelector('.price').textContent.replace(/[^\d.]/g, ''));
                        const priceB = parseFloat(b.querySelector('.price').textContent.replace(/[^\d.]/g, ''));
                        return priceA - priceB;
                    });
                    break;
                case 'PRICE HIGH TO LOW':
                    products.sort((a, b) => {
                        const priceA = parseFloat(a.querySelector('.price').textContent.replace(/[^\d.]/g, ''));
                        const priceB = parseFloat(b.querySelector('.price').textContent.replace(/[^\d.]/g, ''));
                        return priceB - priceA;
                    });
                    break;
                case 'NEWEST FIRST':
                    // For demo, just reverse the order
                    products.reverse();
                    break;
                default: // BESTSELLERS
                    // For demo, use the original order
                    break;
            }
            
            // Remove all products from the grid
            productsGrid.innerHTML = '';
            
            // Add the sorted products back to the grid
            products.forEach(product => {
                productsGrid.appendChild(product);
            });
        });
    }

    // Initialize search functionality
    initializeSearch();

    // Add to cart functionality for Buy Online buttons
    const buyButtons = document.querySelectorAll('.buy-online');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Get product name and price
            const product = this.closest('.product');
            const productName = product.querySelector('h3').textContent;
            const productType = product.querySelector('p').textContent;
            
            // Create shopping bag icon with counter
            let bagIcon = document.querySelector('.icons .fa-shopping-bag');
            let counter = document.querySelector('.cart-counter');
            
            if (!counter) {
                counter = document.createElement('span');
                counter.className = 'cart-counter';
                counter.style.position = 'absolute';
                counter.style.top = '-8px';
                counter.style.right = '-8px';
                counter.style.backgroundColor = '#d9534f';
                counter.style.color = '#fff';
                counter.style.borderRadius = '50%';
                counter.style.width = '18px';
                counter.style.height = '18px';
                counter.style.display = 'flex';
                counter.style.alignItems = 'center';
                counter.style.justifyContent = 'center';
                counter.style.fontSize = '12px';
                counter.textContent = '0';
                
                // Add counter to bag icon
                bagIcon.parentElement.style.position = 'relative';
                bagIcon.parentElement.appendChild(counter);
            }
            
            // Increment counter
            counter.textContent = parseInt(counter.textContent) + 1;
            
            // Animate the counter
            counter.style.transform = 'scale(1.2)';
            setTimeout(() => {
                counter.style.transform = 'scale(1)';
            }, 200);
            
            // Change button text to show added
            this.textContent = 'ADDED TO CART';
            this.style.backgroundColor = '#5cb85c';
            this.style.color = '#fff';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.textContent = 'BUY ONLINE';
                this.style.backgroundColor = '';
                this.style.color = '';
            }, 2000);
            
            // Show popup message
            showNotification(`${productName} ${productType} added to cart!`);
        });
    });

    // Helper function to show notifications
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#5cb85c';
        notification.style.color = '#fff';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '4px';
        notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        notification.style.transition = 'opacity 0.3s, transform 0.3s';
        
        // Add to body
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            // Remove from DOM after animation
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Search functionality
    function initializeSearch() {
        const searchInput = document.querySelector('.search-bar input');
        const searchButton = document.querySelector('.search-bar button');
        
        if (searchInput && searchButton) {
            searchButton.addEventListener('click', function() {
                performSearch(searchInput.value);
            });
            
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch(searchInput.value);
                }
            });
        }
    }
    
    function performSearch(query) {
        query = query.trim().toLowerCase();
        
        if (!query) {
            return;
        }
        
        // Show search feedback
        showNotification(`Searching for "${query}"...`);
        
        // Get all products
        const products = document.querySelectorAll('.product');
        let matchCount = 0;
        
        products.forEach(product => {
            const name = product.querySelector('h3').textContent.toLowerCase();
            const details = product.querySelector('p').textContent.toLowerCase();
            
            // Check if product matches search query
            if (name.includes(query) || details.includes(query)) {
                product.style.display = 'block';
                
                // Highlight the product
                product.style.boxShadow = '0 0 10px rgba(0, 123, 255, 0.5)';
                setTimeout(() => {
                    product.style.boxShadow = '';
                }, 2000);
                
                matchCount++;
            } else {
                product.style.display = 'none';
            }
        });
        
        // Show search results info
        const resultsInfo = document.querySelector('.items-info p');
        if (resultsInfo) {
            resultsInfo.textContent = `ITEMS 1-${matchCount} OF ${matchCount} RESULTS FOR "${query}"`;
        }
    }

    // Helper function to validate email
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    // Add smooth scroll to top for pagination links
    const paginationLinks = document.querySelectorAll('.pagination a');
    
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Smooth scroll to top of products section
            document.querySelector('.content').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Implement lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        // Get all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});