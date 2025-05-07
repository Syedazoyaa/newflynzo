// Parallax Effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize simple parallax for elements with class 'parallax'
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(function(element) {
            const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
            const yPos = -(scrollPosition * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
    
    // Advanced parallax for sections with background images
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    function updateParallax() {
        parallaxSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const offset = rect.top + scrollTop;
            const height = rect.height;
            
            // Only animate when section is in view
            if (scrollTop + window.innerHeight > offset && scrollTop < offset + height) {
                const speed = parseFloat(section.getAttribute('data-speed')) || 0.3;
                const yPos = -((scrollTop - offset) * speed);
                section.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    }
    
    window.addEventListener('scroll', updateParallax);
    window.addEventListener('resize', updateParallax);
    updateParallax();
    
    // Parallax for hero video
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const videoHeight = heroVideo.offsetHeight;
            const videoOffset = heroVideo.offsetTop;
            const maxScroll = videoOffset + videoHeight;
            
            if (scrollPosition <= maxScroll) {
                const speed = 0.4;
                const yPos = -(scrollPosition * speed);
                heroVideo.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    }
    
    // Mouse move parallax effect
    const mouseParallaxElements = document.querySelectorAll('[data-parallax-mouse]');
    
    if (mouseParallaxElements.length > 0) {
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            mouseParallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-parallax-mouse')) || 0.1;
                const xMove = x * speed * 100;
                const yMove = y * speed * 100;
                
                element.style.transform = `translate(${xMove}px, ${yMove}px)`;
            });
        });
    }
});