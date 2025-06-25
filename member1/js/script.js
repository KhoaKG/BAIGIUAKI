document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth scrolling for navigation links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (document.querySelector('.navbar').offsetHeight), // Adjust for sticky navbar
                    behavior: 'smooth'
                });
            }

            // Close mobile menu after clicking a link
            if (window.innerWidth <= 768) {
                const navLinks = document.querySelector('.nav-links');
                const burger = document.querySelector('.burger');
                navLinks.classList.remove('nav-active');
                burger.classList.remove('nav-active');
            }
        });
    });

    // --- Mouse Follower Effect ---
    const mouseFollower = document.querySelector('.mouse-follower');
    if (mouseFollower) {
        document.addEventListener('mousemove', (e) => {
            mouseFollower.style.left = `${e.clientX}px`;
            mouseFollower.style.top = `${e.clientY}px`;
        });
    }

    // --- Ripple Effect for Buttons ---
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;

            this.style.setProperty('--x', `${x}px`);
            this.style.setProperty('--y', `${y}px`);
            this.classList.add('ripple');

            // Remove the class after animation to allow it to be re-added on next click
            this.addEventListener('animationend', () => {
                this.classList.remove('ripple');
            }, { once: true });
        });
    });


    // --- Advanced Scroll Reveal Animations ---
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');

        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const revealTop = el.getBoundingClientRect().top;
            const revealPoint = 150; // Adjust this value as needed

            if (revealTop < windowHeight - revealPoint) {
                if (!el.classList.contains('active')) {
                    el.classList.add('active');

                    // If it's a section, add active to its h2::after
                    if (el.classList.contains('section')) {
                        const h2 = el.querySelector('h2');
                        if (h2) {
                            h2.classList.add('active');
                        }
                    }

                    // Handle progress bars animation
                    if (el.classList.contains('skill-category')) {
                        const progressBars = el.querySelectorAll('.progress-bar');
                        progressBars.forEach(bar => {
                            const progress = bar.dataset.progress;
                            if (progress) {
                                bar.style.width = `${progress}%`;
                            }
                        });
                    }
                }
            } else {
                // Optional: Remove active class when out of view if you want re-reveal on scroll back
                // For skills, reset progress bar when out of view
                // if (el.classList.contains('skill-category')) {
                //     const progressBars = el.querySelectorAll('.progress-bar');
                //     progressBars.forEach(bar => {
                //         bar.style.width = '0%';
                //     });
                // }
                // el.classList.remove('active');
                // if (el.classList.contains('section')) {
                //     const h2 = el.querySelector('h2');
                //     if (h2) {
                //         h2.classList.remove('active');
                //     }
                // }
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load to show elements already in view


    // --- Parallax Scrolling Effect for Hero Background Layers ---
    const hero = document.querySelector('.hero');
    const bgLayers = document.querySelectorAll('.hero-bg-layer');

    if (hero && bgLayers.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            const heroHeight = hero.offsetHeight;

            // Only apply parallax if in the hero section
            if (scrollPos < heroHeight) {
                bgLayers.forEach((layer, index) => {
                    let speed = (index + 1) * 0.05; // Different speeds for each layer
                    let transformY = scrollPos * speed;
                    layer.style.transform = `translateY(${transformY}px)`;
                });
            }
        });
    }


    // --- Navbar toggle for mobile ---
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('nav-active'); // Animates the burger icon

        // Add staggered animation to nav links
        navLinks.querySelectorAll('li').forEach((link, index) => {
            if (navLinks.classList.contains('nav-active')) {
                link.style.transitionDelay = `${index * 0.1 + 0.3}s`; // Staggered delay
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            } else {
                link.style.transitionDelay = '0s'; // Reset delay
                link.style.opacity = '0';
                link.style.transform = 'translateY(-20px)';
            }
        });
    });
});