// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links - FIXED
    const navLinks = document.querySelectorAll('.nav-link, a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                // Smooth scroll to target - FIXED
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update active link immediately
                const allNavLinks = document.querySelectorAll('.nav-link');
                allNavLinks.forEach(navLink => navLink.classList.remove('active'));
                
                // Find the corresponding nav link and make it active
                const correspondingNavLink = document.querySelector(`.nav-link[href="${targetId}"]`);
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    });

    // Active navigation link highlighting - IMPROVED
    const sections = document.querySelectorAll('section[id]');
    const allNavLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                allNavLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Throttle scroll events for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateActiveNavLink);
            ticking = true;
        }
    }

    window.addEventListener('scroll', () => {
        requestTick();
        ticking = false;
    });
    
    updateActiveNavLink(); // Call once on load

    // Curriculum module expansion
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach((card, index) => {
        const header = card.querySelector('.module-header');
        const content = card.querySelector('.module-content');
        const toggle = card.querySelector('.module-toggle');
        
        if (header && content && toggle) {
            header.addEventListener('click', () => {
                const isExpanded = content.classList.contains('expanded');
                
                // Close all other modules
                moduleCards.forEach((otherCard, otherIndex) => {
                    if (otherIndex !== index) {
                        const otherContent = otherCard.querySelector('.module-content');
                        const otherToggle = otherCard.querySelector('.module-toggle');
                        if (otherContent && otherToggle) {
                            otherContent.classList.remove('expanded');
                            otherToggle.classList.remove('expanded');
                        }
                    }
                });
                
                // Toggle current module
                if (isExpanded) {
                    content.classList.remove('expanded');
                    toggle.classList.remove('expanded');
                } else {
                    content.classList.add('expanded');
                    toggle.classList.add('expanded');
                }
            });
        }
    });

    // Contact form handling - FIXED
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !phone || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number.');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Simulate form submission - FIXED
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();
                    
                    // Remove loading state
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    
                    // Show success message - FIXED
                    successMessage.classList.remove('hidden');
                    successMessage.style.display = 'block';
                    successMessage.style.opacity = '1';
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        setTimeout(() => {
                            successMessage.classList.add('hidden');
                            successMessage.style.display = 'none';
                        }, 300);
                    }, 5000);
                    
                }, 1000);
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-card, .benefit-card, .module-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Navbar background opacity on scroll
    const navbar = document.getElementById('navbar');
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            if (currentScrollY > 100) {
                navbar.style.backgroundColor = 'rgba(255, 255, 253, 0.98)';
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 253, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    }

    let navbarTicking = false;
    function requestNavbarTick() {
        if (!navbarTicking) {
            requestAnimationFrame(updateNavbar);
            navbarTicking = true;
        }
    }

    window.addEventListener('scroll', () => {
        requestNavbarTick();
        navbarTicking = false;
    });
    
    updateNavbar(); // Call once on load

    // Button hover effects - FIXED
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '';
        });
    });

    // Progressive reveal animations
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    const benefitObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });

    benefitCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        benefitObserver.observe(card);
    });

    // Module cards staggered animation
    const moduleObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });

    moduleCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = index % 2 === 0 ? 'translateX(-30px)' : 'translateX(30px)';
        card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        moduleObserver.observe(card);
    });

    // Pricing card entrance animation
    const pricingCard = document.querySelector('.pricing-card');
    if (pricingCard) {
        const pricingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }
            });
        }, { threshold: 0.2 });

        pricingCard.style.opacity = '0';
        pricingCard.style.transform = 'scale(0.9)';
        pricingCard.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        pricingObserver.observe(pricingCard);
    }

    // Form field focus effects
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        control.addEventListener('focus', () => {
            if (control.parentElement) {
                control.parentElement.style.transform = 'translateY(-2px)';
            }
        });
        
        control.addEventListener('blur', () => {
            if (control.parentElement) {
                control.parentElement.style.transform = 'translateY(0)';
            }
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
            
            // Close any open modules
            moduleCards.forEach(card => {
                const content = card.querySelector('.module-content');
                const toggle = card.querySelector('.module-toggle');
                if (content && toggle) {
                    content.classList.remove('expanded');
                    toggle.classList.remove('expanded');
                }
            });
        }
    });

    // Hero content reveal
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
        
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
    }

    // Initialize page
    console.log('Power BI Academy website loaded successfully');
    
    // Add loaded class for transitions
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // Set first nav item as active by default
    const firstNavLink = document.querySelector('.nav-link');
    if (firstNavLink) {
        firstNavLink.classList.add('active');
    }
});