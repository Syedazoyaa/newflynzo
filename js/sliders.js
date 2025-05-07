// Portfolio Slider
document.addEventListener('DOMContentLoaded', function() {
    // Portfolio Slider
    const portfolioSlider = document.querySelector('.slider-container');
    if (portfolioSlider) {
        const track = portfolioSlider.querySelector('.slider-track');
        const slides = Array.from(track.children);
        const nextBtn = portfolioSlider.querySelector('.next-btn');
        const prevBtn = portfolioSlider.querySelector('.prev-btn');
        
        const slideWidth = slides[0].getBoundingClientRect().width;
        
        // Arrange slides next to each other
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });
        
        const moveToSlide = (track, currentSlide, targetSlide) => {
            track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
        };
        
        // Next button click
        nextBtn.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling || slides[0];
            
            moveToSlide(track, currentSlide, nextSlide);
        });
        
        // Previous button click
        prevBtn.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide');
            const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
            
            moveToSlide(track, currentSlide, prevSlide);
        });
        
        // Auto-rotate slides
        let slideInterval = setInterval(() => {
            const currentSlide = track.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling || slides[0];
            moveToSlide(track, currentSlide, nextSlide);
        }, 5000);
        
        // Pause on hover
        portfolioSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        portfolioSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                const currentSlide = track.querySelector('.current-slide');
                const nextSlide = currentSlide.nextElementSibling || slides[0];
                moveToSlide(track, currentSlide, nextSlide);
            }, 5000);
        });
    }
    
    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
        const dots = testimonialSlider.querySelectorAll('.dot');
        const prevBtn = testimonialSlider.querySelector('.testimonial-prev');
        const nextBtn = testimonialSlider.querySelector('.testimonial-next');
        let currentIndex = 0;
        
        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        };
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= slides.length) newIndex = 0;
            showSlide(newIndex);
        });
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = slides.length - 1;
            showSlide(newIndex);
        });
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Auto-rotate slides
        let testimonialInterval = setInterval(() => {
            let newIndex = currentIndex + 1;
            if (newIndex >= slides.length) newIndex = 0;
            showSlide(newIndex);
        }, 6000);
        
        // Pause on hover
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                let newIndex = currentIndex + 1;
                if (newIndex >= slides.length) newIndex = 0;
                showSlide(newIndex);
            }, 6000);
        });
        
        // Initialize first slide
        showSlide(0);
    }
    
    // Image hover zoom effect
    const zoomImages = document.querySelectorAll('.zoom-on-hover');
    zoomImages.forEach(img => {
        img.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = (e.clientX - left) / width * 100;
            const y = (e.clientY - top) / height * 100;
            this.style.transformOrigin = `${x}% ${y}%`;
            this.style.transform = 'scale(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});