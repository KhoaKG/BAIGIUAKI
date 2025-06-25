document.addEventListener('DOMContentLoaded', () => {
    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500); // Thời gian fade-out của preloader
        });
    }

    // --- Header Scroll Effect & Navigation ---
    const header = document.getElementById('main-header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Hide/Show Header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) { // Scroll Down
            header.classList.add('hidden');
        } else { // Scroll Up or at Top
            header.classList.remove('hidden');
        }
        lastScrollTop = scrollTop;

        // Active Nav Link on Scroll
        updateActiveNavLink();

        // Parallax effect for Hero section background
        handleHeroParallax(scrollTop);
    });

    // Initial check for active nav link
    updateActiveNavLink();

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu after clicking a link
            const navLinks = document.querySelector('.nav-links');
            const burger = document.querySelector('.burger');
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });

    // Burger Menu Toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    // Function to update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        let currentActive = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 50; // Offset for header height
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
                currentActive = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('nav-active-link');
            if (link.getAttribute('href').includes(currentActive)) {
                link.classList.add('nav-active-link');
            }
        });
    }

    // --- Hero Section Parallax Effect ---
    const heroSection = document.getElementById('hero');
    const particlesJsElement = document.getElementById('particles-js');
    const heroContent = document.querySelector('.hero-content');

    function handleHeroParallax(scrollTop) {
        if (heroSection && particlesJsElement && heroContent) {
            const scrollFactorBackground = 0.1; // Nền di chuyển rất chậm
            const scrollFactorContent = 0.05; // Nội dung di chuyển cực kỳ chậm

            // Áp dụng Parallax cho nền (particles-js)
            gsap.to(particlesJsElement, {
                y: scrollTop * scrollFactorBackground,
                ease: "none",
                duration: 0 // GSAP will handle smoothness
            });

            // Áp dụng Parallax và fade out cho nội dung chính
            gsap.to(heroContent, {
                y: scrollTop * scrollFactorContent,
                opacity: 1 - (scrollTop / (heroSection.offsetHeight * 0.8)),
                ease: "none",
                duration: 0 // GSAP will handle smoothness
            });
        }
    }

    // --- About Section Animation (Dynamic Bubbles/Orbs) ---
    const aboutAnimationContainer = document.getElementById('about-animation-container');
    if (aboutAnimationContainer) {
        // Thêm nền gradient động ban đầu bằng JS (nếu chưa có)
        let gradientBg = aboutAnimationContainer.querySelector('.gradient-bg-js');
        if (!gradientBg) {
            gradientBg = document.createElement('div');
            gradientBg.className = 'gradient-bg-js'; // Sử dụng class CSS đã định nghĩa
            aboutAnimationContainer.appendChild(gradientBg);
        }

        const numBubbles = 25; // Tăng số lượng bong bóng để sinh động hơn
        // Updated: Adjusted bubble colors for better harmony with the new palette
        const bubbleColors = [ 
            'rgba(255, 255, 255, 0.15)', 
            'rgba(255, 255, 255, 0.25)',
            'rgba(255, 255, 255, 0.35)',
            'rgba(255, 255, 255, 0.45)'
        ];

        for (let i = 0; i < numBubbles; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'circle-js'; // Sử dụng class CSS đã định nghĩa
            aboutAnimationContainer.appendChild(bubble);

            // Đặt thuộc tính ngẫu nhiên ban đầu
            gsap.set(bubble, {
                x: Math.random() * aboutAnimationContainer.offsetWidth,
                y: Math.random() * aboutAnimationContainer.offsetHeight,
                width: Math.random() * 100 + 40, // Kích thước từ 40px đến 140px (lớn hơn)
                height: Math.random() * 100 + 40,
                opacity: 0, // Bắt đầu ẩn
                scale: 0,
                backgroundColor: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
                zIndex: 1
            });

            // Tạo animation cho từng bong bóng
            animateBubble(bubble);
        }

        function animateBubble(bubble) {
            const tl = gsap.timeline({ repeat: -1, delay: Math.random() * 5 }); // Lặp vô hạn, delay ngẫu nhiên

            tl.to(bubble, {
                opacity: Math.random() * 0.6 + 0.3, // Opacity từ 0.3 đến 0.9 (rõ hơn)
                scale: Math.random() * 0.8 + 0.5, // Scale từ 0.5 đến 1.3
                duration: 2 + Math.random() * 3, // Thời gian fade in và scale up
                ease: "power2.out"
            })
            .to(bubble, {
                x: () => Math.random() * aboutAnimationContainer.offsetWidth,
                y: () => Math.random() * aboutAnimationContainer.offsetHeight,
                duration: 8 + Math.random() * 7, // Thời gian di chuyển lâu hơn (8-15s)
                ease: "none",
                onComplete: () => {
                    // Khi animation di chuyển kết thúc, chuẩn bị fade out và reset
                    gsap.to(bubble, {
                        opacity: 0,
                        scale: 0,
                        duration: 1.5,
                        ease: "power1.in",
                        onComplete: () => {
                            // Reset vị trí và opacity/scale để animation lặp lại mượt mà
                            gsap.set(bubble, {
                                x: Math.random() * aboutAnimationContainer.offsetWidth,
                                y: Math.random() * aboutAnimationContainer.offsetHeight,
                                opacity: 0,
                                scale: 0
                            });
                        }
                    });
                }
            }, "-=1"); // Bắt đầu fade out trước khi di chuyển hoàn tất 1s
        }
    }

    // --- Scroll Reveal Animation ---
    const animateElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-left, .animate-fade-in-right, .animate-slide-up, .animate-zoom-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Khi 10% phần tử hiển thị thì kích hoạt animation

    animateElements.forEach(el => observer.observe(el));

    // --- Current Year for Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Particles.js Initialization (tuned for subtle effect) ---
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 40, /* Giảm số lượng hạt */
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#9CCCE4" /* Màu xanh lam nhạt, dịu hơn */
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.4, /* Giảm độ mờ */
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 2, /* Giảm kích thước hạt */
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 120, /* Giảm khoảng cách liên kết */
                    "color": "#BBDDEB", /* Màu đường nối dịu hơn */
                    "opacity": 0.3, /* Giảm độ mờ của đường nối */
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 4, /* Tốc độ di chuyển chậm hơn */
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
});