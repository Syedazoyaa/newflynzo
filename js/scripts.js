document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Sticky Header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax Effects
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
            const yPos = -(scrollPosition * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });

    // WhatsApp Button
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        let lastScrollPosition = 0;
        window.addEventListener('scroll', () => {
            const currentScrollPosition = window.pageYOffset;
            whatsappFloat.style.transform = currentScrollPosition > lastScrollPosition 
                ? 'translateY(100px)' 
                : 'translateY(0)';
            lastScrollPosition = currentScrollPosition;
        });

        whatsappFloat.addEventListener('click', () => {
            const phoneNumber = '1234567890';
            const message = encodeURIComponent("Hi Flynzoe, I'm interested in your digital marketing services!");
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });
    }

    // Particle.js Background
    const canvas = document.getElementById('bgCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50; // Reduced for subtler effect

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 4 + 1;
                this.speedX = Math.random() * 0.3 - 0.15;
                this.speedY = Math.random() * 0.3 - 0.15;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.fillStyle = 'rgba(0, 161, 167, 0.2)'; // Lower opacity
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Stats Counter
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let count = 0;
        const increment = target / 100;

        const updateCount = () => {
            if (count < target) {
                count += increment;
                stat.textContent = Math.round(count);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };

        updateCount();
    });

    // Content Animations
    const animateElements = document.querySelectorAll('.animate');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(element => observer.observe(element));

    // Service Card Interactive Animations
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        // Hover effect: scale up and add shadow
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 8px 32px rgba(0, 161, 167, 0.15)';
            card.style.zIndex = '2';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
            card.style.zIndex = '1';
        });

        // Click effect: subtle tap animation
        card.addEventListener('mousedown', () => {
            card.style.transform = 'scale(0.97)';
        });
        card.addEventListener('mouseup', () => {
            card.style.transform = 'scale(1.05)';
        });
    });

    // Animate service cards on scroll into view with slide-in effect
    const serviceCardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                serviceCardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    serviceCards.forEach((card, idx) => {
        // Set initial state for slide-in (alternate left/right)
        card.style.opacity = '0';
        card.style.transform = idx % 2 === 0 ? 'translateX(-40px)' : 'translateX(40px)';
        serviceCardObserver.observe(card);
    });

    // Animated Creative Cursor
    const cursor = document.getElementById('cursor');
    if (cursor) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        // Update mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.opacity = '1';
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });

        // Animate cursor position for smooth trailing
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.18;
            cursorY += (mouseY - cursorY) * 0.18;
            cursor.style.transform = `translate(-50%, -50%) translate(${cursorX}px, ${cursorY}px)`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Helper: Detect background color at cursor position
        function getBgColorAtCursor(x, y) {
            // Check elements under the cursor
            const el = document.elementFromPoint(x, y);
            if (!el) return null;
            let bg = window.getComputedStyle(el).backgroundColor;
            // If transparent, walk up the DOM
            let parent = el;
            while ((bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') && parent.parentElement) {
                parent = parent.parentElement;
                bg = window.getComputedStyle(parent).backgroundColor;
            }
            return bg;
        }

        // Set cursor color based on background
        function setCursorColor() {
            const bg = getBgColorAtCursor(mouseX, mouseY);
            // If background is blue-ish, use black border, else use blue border
            let useBlack = false;
            if (bg) {
                // Parse rgb/rgba
                const match = bg.match(/rgba?\((\d+), (\d+), (\d+)/);
                if (match) {
                    const r = parseInt(match[1]), g = parseInt(match[2]), b = parseInt(match[3]);
                    // If background is blue-ish (hue between 170-200, or high blue value)
                    if ((b > 120 && b > r && b > g) || (r < 80 && g < 180 && b > 150)) {
                        useBlack = true;
                    }
                }
            }
            cursor.dataset.theme = useBlack ? 'black' : 'blue';
        }

        // Interactive elements hollow effect
        const interactive = 'a, button, .service-card, .cta-btn, input, textarea, select, .learn-more';
        document.querySelectorAll(interactive).forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hollow');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hollow');
            });
        });

        // Update cursor color on mousemove
        document.addEventListener('mousemove', setCursorColor);
    }
});