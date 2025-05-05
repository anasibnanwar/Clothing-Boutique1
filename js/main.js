/**
 * Main JavaScript file for Clothing Boutique Website
 * Author: Developer
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // In a real scenario, you would send this to a server
            // For now, we just show a success message
            this.innerHTML = `<div class="success-message">Thank you for subscribing! We'll keep you updated with our latest collections and offers.</div>`;
        });
    }

    // Scroll to top button
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            if (!document.querySelector('.scroll-top')) {
                const scrollBtn = document.createElement('div');
                scrollBtn.classList.add('scroll-top');
                scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
                document.body.appendChild(scrollBtn);
                
                scrollBtn.addEventListener('click', function() {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }
        } else {
            const scrollBtn = document.querySelector('.scroll-top');
            if (scrollBtn) {
                scrollBtn.remove();
            }
        }
    });

    // Add animation classes on scroll for elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-box, .category-box, .product-card, .testimonial, .team-member, .mission-box, .contact-box');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fadeIn');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on page load
    animateOnScroll();

    // Create and append dynamic styles for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .fadeIn {
            animation: fadeIn 0.6s ease forwards;
        }
        
        .scroll-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 40px;
            height: 40px;
            background-color: var(--primary-color);
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 99;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        }
        
        .scroll-top:hover {
            background-color: var(--secondary-color);
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(style);
});
