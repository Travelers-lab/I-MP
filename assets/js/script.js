/**
 * Main JavaScript file for Robot Motion Planner research page
 * Handles navigation, smooth scrolling, video controls, and responsive behavior
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initVideoControls();
    initMobileMenu();
    initIntersectionObserver();
    initLazyLoading();
});

/**
 * Navigation and smooth scrolling functionality
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
                
                // Update active link
                updateActiveNavLink(this);
            }
        });
    });
    
    // Update active navigation link on scroll
    function updateActiveNavLink(activeLink = null) {
        if (activeLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            activeLink.classList.add('active');
        } else {
            // Auto-detect based on scroll position
            let currentSection = '';
            const navHeight = document.querySelector('.navbar').offsetHeight;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - navHeight - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

/**
 * Scroll effects for navbar
 */
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for styling
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttle scroll events for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });
}

/**
 * Video controls and optimization
 */
function initVideoControls() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Ensure autoplay videos are muted (browser requirement)
        if (video.hasAttribute('autoplay')) {
            video.muted = true;
        }
        
        // Add loading states
        video.addEventListener('loadstart', function() {
            this.classList.add('loading');
        });
        
        video.addEventListener('canplay', function() {
            this.classList.remove('loading');
        });
        
        // Error handling
        video.addEventListener('error', function() {
            console.warn('Video failed to load:', this.src);
            this.style.display = 'none';
            
            // Show poster image if available
            if (this.poster) {
                const img = document.createElement('img');
                img.src = this.poster;
                img.alt = 'Video poster';
                img.style.width = '100%';
                img.style.height = 'auto';
                this.parentNode.appendChild(img);
            }
        });
        
        // Pause other videos when one starts playing
        if (!video.hasAttribute('autoplay')) {
            video.addEventListener('play', function() {
                videos.forEach(otherVideo => {
                    if (otherVideo !== this && !otherVideo.hasAttribute('autoplay')) {
                        otherVideo.pause();
                    }
                });
            });
        }
    });
    
    // Pause videos when page becomes hidden (performance optimization)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            videos.forEach(video => {
                if (!video.paused && !video.hasAttribute('autoplay')) {
                    video.pause();
                    video.dataset.wasPaused = 'false';
                } else if (video.paused) {
                    video.dataset.wasPaused = 'true';
                }
            });
        } else {
            videos.forEach(video => {
                if (video.dataset.wasPaused === 'false') {
                    video.play().catch(e => console.warn('Could not resume video:', e));
                }
            });
        }
    });
}

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });
        
        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }
    
    function toggleMobileMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Make closeMobileMenu available globally
    window.closeMobileMenu = closeMobileMenu;
}

/**
 * Intersection Observer for animations and lazy loading
 */
function initIntersectionObserver() {
    // Options for the intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };
    
    // Create observer for section animations
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger any section-specific animations
                animateSection(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        sectionObserver.observe(section);
    });
    
    // Video intersection observer for performance
    const videoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const video = entry.target;
            
            if (entry.isIntersecting) {
                // Load video when it comes into view
                if (video.dataset.src && !video.src) {
                    video.src = video.dataset.src;
                    video.load();
                }
                
                // Auto-play non-autoplay videos when in view (optional)
                if (!video.hasAttribute('autoplay') && video.paused) {
                    // Uncomment the next line if you want videos to auto-play when scrolled into view
                    // video.play().catch(e => console.warn('Could not auto-play video:', e));
                }
            } else {
                // Pause video when out of view for performance
                if (!video.hasAttribute('autoplay') && !video.paused) {
                    video.pause();
                }
            }
        });
    }, {
        root: null,
        rootMargin: '50px 0px 50px 0px',
        threshold: 0.25
    });
    
    // Observe all videos
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        videoObserver.observe(video);
    });
}

/**
 * Lazy loading for images and videos
 */
function initLazyLoading() {
    // Lazy load poster images
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    }
}

/**
 * Section-specific animations
 */
function animateSection(section) {
    const sectionId = section.getAttribute('id');
    
    switch (sectionId) {
        case 'overview':
            animateOverviewSection(section);
            break;
        case 'videos':
            animateVideoGallery(section);
            break;
        case 'acknowledgements':
            animateAcknowledgements(section);
            break;
        case 'contact':
            animateContact(section);
            break;
    }
}

function animateOverviewSection(section) {
    const video = section.querySelector('.overview-video');
    const abstract = section.querySelector('.abstract');
    
    if (video) {
        setTimeout(() => video.classList.add('slide-in-left'), 200);
    }
    if (abstract) {
        setTimeout(() => abstract.classList.add('slide-in-right'), 400);
    }
}

function animateVideoGallery(section) {
    const videoItems = section.querySelectorAll('.video-item');
    
    videoItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('fade-in-up');
        }, index * 200);
    });
}

function animateAcknowledgements(section) {
    const content = section.querySelector('.acknowledgements-content');
    if (content) {
        setTimeout(() => content.classList.add('fade-in-up'), 200);
    }
}

function animateContact(section) {
    const contactItem = section.querySelector('.contact-item');
    if (contactItem) {
        setTimeout(() => contactItem.classList.add('fade-in-up'), 200);
    }
}

/**
 * Utility functions
 */

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Error handling and fallbacks
 */
window.addEventListener('error', function(e) {
    console.warn('JavaScript error occurred:', e.error);
    // You can add error reporting here if needed
});

/**
 * Performance monitoring (optional)
 */
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.info('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }
        }, 1000);
    });
}

/**
 * Keyboard navigation support
 */
document.addEventListener('keydown', function(e) {
    // Allow keyboard navigation for better accessibility
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

/**
 * Print support
 */
window.addEventListener('beforeprint', function() {
    // Pause all videos before printing
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (!video.paused) {
            video.pause();
            video.dataset.wasPausedForPrint = 'false';
        } else {
            video.dataset.wasPausedForPrint = 'true';
        }
    });
});

window.addEventListener('afterprint', function() {
    // Resume videos after printing if they were playing
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (video.dataset.wasPausedForPrint === 'false') {
            video.play().catch(e => console.warn('Could not resume video after print:', e));
        }
    });
});

/**
 * Export functions for testing or external use
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        throttle,
        debounce,
        isInViewport
    };
}