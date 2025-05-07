document.addEventListener('DOMContentLoaded', () => {
    // Floating WhatsApp Button
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
            console.log('WhatsApp floating button clicked');
        });
    }

    // WhatsApp CTA Buttons
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('WhatsApp CTA clicked');
            const phoneNumber = '1234567890';
            const message = encodeURIComponent("Hi Flynzoe, I'm interested in your digital marketing services!");
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });
    });

    // WhatsApp Availability
    function checkAvailability() {
        const now = new Date();
        const hours = now.getHours();
        const isAvailable = hours >= 9 && hours < 18; // 9AM-6PM
        const availabilityElements = document.querySelectorAll('.whatsapp-availability');
        availabilityElements.forEach(el => {
            el.textContent = isAvailable ? 'Available Now' : 'Available 9AM-6PM';
            el.classList.toggle('available', isAvailable);
            el.classList.toggle('unavailable', !isAvailable);
        });
    }
    checkAvailability();
    setInterval(checkAvailability, 60000);
});