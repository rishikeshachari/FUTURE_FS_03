// client/js/main.js
// Auto-updating ticker with live rates

// Mobile navigation
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }
}

// Auto-updating gold ticker with live rates
async function updateGoldTicker() {
    const tickerEl = document.getElementById('tickerText');
    if (!tickerEl) return;
    
    tickerEl.innerHTML = '🔄 Fetching live gold rates...';
    
    try {
        // Get live rate
        const response = await fetch('https://api.metals-api.com/v1/latest?access_key=demo&base=XAU&symbols=INR');
        if (response.ok) {
            const data = await response.json();
            if (data && data.rates && data.rates.INR) {
                const pricePerGram = (data.rates.INR / 31.1035).toFixed(0);
                const rate24K = parseInt(pricePerGram);
                const rate22K = Math.round(rate24K * 0.916);
                const time = new Date().toLocaleTimeString();
                
                tickerEl.innerHTML = `✨ 24K GOLD: ₹${rate24K.toLocaleString()}/g | 22K GOLD: ₹${rate22K.toLocaleString()}/g | ✨ RISHIKESH ACHARI JEWELLERY | ANANTAPUR ✨ | Live: ${time} ✨`;
                return;
            }
        }
        throw new Error('API failed');
    } catch (error) {
        // Show realistic market rates (May 2026)
        tickerEl.innerHTML = `✨ 24K GOLD: ₹15,622/g | 22K GOLD: ₹14,320/g | ✨ RISHIKESH ACHARI JEWELLERY | ANANTAPUR ✨ | Live rates unavailable - showing market rates ✨`;
    }
}

// Load services
async function loadServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;
    
    const services = [
        { name: 'Custom Design', icon: 'fa-gem', desc: 'Bespoke jewellery tailored to you.' },
        { name: 'Gold Exchange', icon: 'fa-exchange-alt', desc: 'Fair value buyback & exchange.' },
        { name: 'Jewellery Repair', icon: 'fa-tools', desc: 'Expert restoration & resizing.' },
        { name: 'Hallmark Cert.', icon: 'fa-certificate', desc: 'BIS hallmark guarantee.' },
        { name: 'Free Gift Wrap', icon: 'fa-gift', desc: 'Elegant festive packaging.' },
        { name: 'Home Delivery', icon: 'fa-truck', desc: 'In Anantapur only.' }
    ];
    
    servicesGrid.innerHTML = services.map(svc => `
        <div class="service-card">
            <i class="fas ${svc.icon}" style="font-size: 2.5rem; color: var(--gold);"></i>
            <h3>${svc.name}</h3>
            <p>${svc.desc}</p>
        </div>
    `).join('');
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    updateGoldTicker();
    loadServices();
    
    // Update ticker every 5 minutes
    setInterval(updateGoldTicker, 300000);
});

// ========================================
// BACK TO TOP BUTTON FUNCTIONALITY
// ========================================

(function() {
    // Get the back to top button
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        // Smooth scroll to top when clicked
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
})();

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================

(function() {
    // Debounce function for scroll/resize events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction() {
            const later = () => {
                clearTimeout(timeout);
                func();
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimize scroll event for back-to-top button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        const handleScroll = debounce(function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }, 100);
        
        window.addEventListener('scroll', handleScroll);
    }
    
    // Check for slow connection and adjust
    if ('connection' in navigator) {
        if (navigator.connection.saveData) {
            // User has data saver enabled - reduce image quality
            document.querySelectorAll('img').forEach(img => {
                img.loading = 'lazy';
            });
        }
    }
    
    // Preload critical images
    const criticalImages = [
        'images/logo.png'
    ];
    
    criticalImages.forEach(imgSrc => {
        const img = new Image();
        img.src = imgSrc;
    });
    
    // Add loading placeholder for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });
})();