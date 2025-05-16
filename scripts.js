/**
 * Just In Time - Luxury Watch Store
 * Main JavaScript file for interactive functionality
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeroSlider();
    initWatchCarousels();
    initFeaturedSlider();
    initWatchBrandFeature(); // Add this line to initialize the watch showcase
    initMobileMenu();
    initCartFunctionality();
    initSearchFunctionality();
    initWishlistFunctionality();
    initProductInteractions();
});

/**
 * Hero Slider functionality
 * Manages the main banner slider with automatic rotation
 */
function initHeroSlider() {
    let currentSlide = 1;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    let sliderInterval;
    
    // Start automatic slider rotation
    startSliderInterval();
    
    // Set up click events for dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            // Clear the existing interval when user manually changes slide
            clearInterval(sliderInterval);
            
            // Update slide based on clicked dot
            currentSlide = parseInt(this.getAttribute('data-slide'));
            updateSlider(currentSlide);
            
            // Restart the automatic rotation
            startSliderInterval();
        });
    });
    
    // Function to start the automatic slider interval
    function startSliderInterval() {
        clearInterval(sliderInterval);
        sliderInterval = setInterval(() => {
            currentSlide = currentSlide < totalSlides ? currentSlide + 1 : 1;
            updateSlider(currentSlide);
        }, 8000); // Change slide every 8 seconds
    }
    
    // Function to update the slider display
    function updateSlider(slideNumber) {
        // Update slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        document.getElementById('slide' + slideNumber).classList.add('active');
        
        // Update dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        document.querySelector(`.dot[data-slide="${slideNumber}"]`).classList.add('active');
    }
    
    // Pause slider on hover
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mouseenter', () => {
        clearInterval(sliderInterval);
    });
    
    heroSection.addEventListener('mouseleave', () => {
        startSliderInterval();
    });
}

/**
 * Watch Carousels functionality
 * Handles the men's and women's watch carousel displays
 */
function initWatchCarousels() {
    // Initialize with men's carousel active
    showCarousel('men');
    
    // Add event listeners to gender tabs
    const tabs = document.querySelectorAll('.gender-tabs button');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show the appropriate carousel
            const gender = this.textContent.trim().toLowerCase();
            showCarousel(gender);
        });
    });
}

/**
 * Shows the selected gender carousel and hides the other
 * @param {string} gender - 'men' or 'women'
 */
function showCarousel(gender) {
    const menCarousel = document.getElementById('carousel-men');
    const womenCarousel = document.getElementById('carousel-women');
  
    // Toggle visibility
    if (gender === 'men') {
        menCarousel.classList.remove('hidden');
        womenCarousel.classList.add('hidden');
    } else {
        womenCarousel.classList.remove('hidden');
        menCarousel.classList.add('hidden');
    }
}

/**
 * Scrolls the watch carousel in the specified direction
 * @param {string} gender - 'men' or 'women'
 * @param {number} direction - 1 for right, -1 for left
 */
function scrollCarousel(gender, direction) {
    const carousel = document.getElementById(`carousel-${gender}-track`);
    const scrollAmount = 300; // Adjust scroll amount as needed
    carousel.scrollLeft += (scrollAmount * direction);
}

/**
 * Mobile Menu functionality
 * Handles responsive menu for mobile devices
 */
function initMobileMenu() {
    // Implement mobile menu toggle functionality
    // Code would go here when mobile menu is added to HTML
}

/**
 * Cart Functionality
 * Manages shopping cart interactions
 */
function initCartFunctionality() {
    // Implementation for cart functionality
    // Code would go here for cart interactions
}

/**
 * Search Functionality
 * Handles search bar operations
 */
function initSearchFunctionality() {
    // Implementation for search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
    
    function performSearch(query) {
        // Search implementation would go here
        console.log('Searching for:', query);
        // In a real implementation, this would redirect to search results
    }
}

/**
 * Wishlist Functionality
 * Manages wishlist operations
 */
function initWishlistFunctionality() {
    // Implementation for wishlist functionality
    // Code would go here for wishlist interactions
}

/**
 * Product Interactions
 * Handles user interactions with product displays
 */
function initProductInteractions() {
    // Add hover effects or click handlers for product cards
    const watchCards = document.querySelectorAll('.watch-card');
    
    watchCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        card.addEventListener('click', function() {
            // Product card click handling
            // In a real implementation, this might navigate to product detail page
        });
    });
}

/**
 * Featured Products Slider functionality
 * Auto-rotates 4 slides every 10 seconds
 */
function initFeaturedSlider() {
    let currentSlide = 1;
    const slides = document.querySelectorAll('.featured-slide');
    const dots = document.querySelectorAll('.featured-dot');
    const totalSlides = slides.length;
    let sliderInterval;
    
    // Start automatic slider rotation
    startSliderInterval();
    
    // Set up click events for dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            // Clear the existing interval when user manually changes slide
            clearInterval(sliderInterval);
            
            // Update slide based on clicked dot
            currentSlide = parseInt(this.getAttribute('data-slide'));
            updateSlider(currentSlide);
            
            // Restart the automatic rotation
            startSliderInterval();
        });
    });
    
    // Set up click events for navigation arrows
    const prevBtn = document.querySelector('.featured-prev-btn');
    const nextBtn = document.querySelector('.featured-next-btn');
    
    prevBtn.addEventListener('click', function() {
        clearInterval(sliderInterval);
        currentSlide = currentSlide > 1 ? currentSlide - 1 : totalSlides;
        updateSlider(currentSlide);
        startSliderInterval();
    });
    
    nextBtn.addEventListener('click', function() {
        clearInterval(sliderInterval);
        currentSlide = currentSlide < totalSlides ? currentSlide + 1 : 1;
        updateSlider(currentSlide);
        startSliderInterval();
    });
    
    // Function to start the automatic slider interval
    function startSliderInterval() {
        clearInterval(sliderInterval);
        sliderInterval = setInterval(() => {
            currentSlide = currentSlide < totalSlides ? currentSlide + 1 : 1;
            updateSlider(currentSlide);
        }, 10000); // Change slide every 10 seconds
    }
    
    // Function to update the slider display
    function updateSlider(slideNumber) {
        // Update slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        slides[slideNumber - 1].classList.add('active');
        
        // Update dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        dots[slideNumber - 1].classList.add('active');
    }
    
    // Pause slider on hover
    const sliderContainer = document.querySelector('.featured-slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(sliderInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        startSliderInterval();
    });
}

/**
 * Watch Brand Feature Showcase
 * Handles the brand showcase animations and interactions
 */
function initWatchBrandFeature() {
    // Sample watch data - in a real implementation, this could come from an API
    const watches = [
        {
            id: 1,
            brand: "ROLEX",
            model: "Submariner",
            description: "The Rolex Submariner is a classic dive watch known for its durability, precision, and timeless design.",
            price: "₹895,000",
            img: "media/image/Rolex-Cosmograph-Daytona-M126508-0008.jpg",
            logo: "media/image/rolex-logo-preview.png"
        },
        {
            id: 2,
            brand: "OMEGA",
            model: "Seamaster",
            description: "The Omega Seamaster combines elegant styling with robust performance and innovative technology.",
            price: "₹650,000",
            img: "media/image/OMEGA-Speedmaster-Moonwatch-Professional-Chronograph-06.jpg",
            logo: "media/image/omega-logo_brandlogos.net_teruv-768x384.png"
        },
        {
            id: 3,
            brand: "TAG HEUER",
            model: "Carrera",
            description: "The TAG Heuer Carrera is a motorsport-inspired chronograph with a legacy of precision and style.",
            price: "₹410,000",
            img: "media/image/TH_Top_Banner_Carrera-chrono_mobile.jpg",
            logo: "media/image/tag_heuer-logo-768x768.png"
        },
        {
            id: 4,
            brand: "PATEK PHILIPPE",
            model: "Nautilus",
            description: "The Patek Philippe Nautilus represents the pinnacle of luxury sports watches with unmatched craftsmanship.",
            price: "₹2,350,000",
            img: "media/image/patek-philippe-5261R-001-rosegold-titlepicture-new-1600x1067.jpg",
            logo: "media/image/logo.png .png"
        },
        {
            id: 5,
            brand: "AUDEMARS PIGUET",
            model: "Royal Oak",
            description: "The Audemars Piguet Royal Oak revolutionized watch design with its iconic octagonal bezel and integrated bracelet.",
            price: "₹1,895,000",
            img: "media/image/1Z2A6835-2-scaled.png",
            logo: "/api/placeholder/100/100?text=AP"
        },
        {
            id: 6,
            brand: "TUDOR",
            model: "Black Bay",
            description: "The Tudor Black Bay combines vintage-inspired aesthetics with modern reliability and performance.",
            price: "₹345,000",
            img: "media/image/tudor-black-bay-chrono-flamingo-blue-m79360n-0024-cover.png",
            logo: "/api/placeholder/100/100?text=TUDOR"
        },
        {
            id: 7,
            brand: "CARTIER",
            model: "Santos",
            description: "The Cartier Santos is an iconic square-faced watch that blends elegance with a spirit of adventure.",
            price: "₹785,000",
            img: "media/image/AS09223_40950246_CARTIER_BAIGNOIRE_WHITE_GOLD-1.png",
            logo: "/api/placeholder/100/100?text=CARTIER"
        },
        {
            id: 8,
            brand: "BREITLING",
            model: "Navitimer",
            description: "The Breitling Navitimer is a pilot's watch with a distinctive slide rule bezel for aviation calculations.",
            price: "₹580,000",
            img: "media/image/BR-Navitimer_B01_Chrono43_UB01384A1B1P1_US_Edition_StillLife_RVB.jpg",
            logo: "/api/placeholder/100/100?text=BREITLING"
        },
        {
            id: 9,
            brand: "JAEGER-LECOULTRE",
            model: "Reverso",
            description: "The Jaeger-LeCoultre Reverso features a unique reversible case developed for polo players in the 1930s.",
            price: "₹925,000",
            img: "media/image/jaeger-lecoultre-master-ultra-thin-q114842j-multiple-2.png",
            logo: "/api/placeholder/100/100?text=JLC"
        }
    ];

    // Get DOM elements
    const brandLogosContainer = document.getElementById("brand-logos");
    const watchDisplay = document.querySelector(".watch-display");
    const watchInfo = document.getElementById("watch-info");
    
    // Create brand logos grid
    watches.forEach(watch => {
        const div = document.createElement("div");
        div.classList.add("brand-logo");
        div.setAttribute("data-brand", watch.brand);
        div.setAttribute("data-id", watch.id);
        div.innerHTML = `<img src="${watch.logo}" alt="${watch.brand} logo" />`;
        brandLogosContainer.appendChild(div);
    });
    
    // Get all logo elements after they've been created
    const logoElements = document.querySelectorAll(".brand-logo");
    
    // Set initial active watch (first one)
    updateActiveWatch(watches[0].id);
    
    // Add click events to each logo
    logoElements.forEach(logo => {
        logo.addEventListener("click", function() {
            const watchId = parseInt(this.getAttribute("data-id"));
            updateActiveWatch(watchId);
        });
    });
    
    // Function to update the active watch display
    function updateActiveWatch(watchId) {
        // Find the watch data
        const watchData = watches.find(w => w.id === watchId);
        
        if (!watchData) return;
        
        // Update logo active states
        logoElements.forEach(logo => {
            const logoWatchId = parseInt(logo.getAttribute("data-id"));
            logo.classList.toggle("active", logoWatchId === watchId);
        });
        
        // Create new image and set up transition
        const newImg = document.createElement("img");
        newImg.src = watchData.img;
        newImg.alt = `${watchData.brand} ${watchData.model}`;
        
        // Remove existing active class from any images
        const currentActiveImages = watchDisplay.querySelectorAll("img.active");
        currentActiveImages.forEach(img => {
            img.classList.remove("active");
            
            // Add a short timeout before removing to allow for transition
            setTimeout(() => {
                if (img.parentElement) {
                    img.parentElement.removeChild(img);
                }
            }, 500);
        });
        
        // Add the new image to the display
        watchDisplay.appendChild(newImg);
        
        // Force browser reflow before adding active class for animation
        void newImg.offsetWidth;
        
        // Add active class to trigger animation
        newImg.classList.add("active");
        
        // Update watch info
        watchInfo.innerHTML = `
            <h3>${watchData.brand} ${watchData.model}</h3>
            <p>${watchData.description}</p>
            <div class="price">${watchData.price}</div>
            <button class="cta-button">EXPLORE COLLECTION</button>
        `;
        
        // Animate the info panel
        watchInfo.classList.remove("active");
        setTimeout(() => {
            watchInfo.classList.add("active");
        }, 100);
    }
    
    // Auto-rotate watches every 8 seconds if no interaction
    let autoRotateInterval;
    let currentIndex = 0;
    
    function startAutoRotate() {
        clearInterval(autoRotateInterval);
        autoRotateInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % watches.length;
            updateActiveWatch(watches[currentIndex].id);
        }, 8000);
    }
    
    // Start auto-rotation
    startAutoRotate();
    
    // Pause auto-rotation when interacting with brand logos
    brandLogosContainer.addEventListener("mouseenter", () => {
        clearInterval(autoRotateInterval);
    });
    
    brandLogosContainer.addEventListener("mouseleave", () => {
        startAutoRotate();
    });
    
    // Additional event for touch devices
    brandLogosContainer.addEventListener("touchstart", () => {
        clearInterval(autoRotateInterval);
    });
    
    // Optional: Add responsive behavior for mobile
    function checkMobileView() {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            // Adjust mobile-specific behavior if needed
        }
    }
    
    window.addEventListener("resize", checkMobileView);
    checkMobileView(); // Initial check
}
