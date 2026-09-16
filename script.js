document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. FAST ACTIVE NAV LINK HIGHLIGHTER ---
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        if (!linkHref) return;

        // Instant matching logic
        if ((currentPath === "/" || currentPath === "" || currentPath.includes("index.html")) && (linkHref === "index.html" || linkHref === "/")) {
            link.classList.add("active-link");
        }
        else if ((currentPath.includes("team.html") || currentPath.includes("volunteers.html")) && linkHref.includes("team.html")) {
            link.classList.add("active-link");
        }
        else if (linkHref !== "index.html" && linkHref !== "/" && linkHref !== "team.html" && currentPath.includes(linkHref)) {
            link.classList.add("active-link");
        }
    });

    // --- 2. HERO SECTION AUTO-SLIDESHOW ---
    const heroSection = document.querySelector('.hero-section');
    const sliderImages = ["images/78.jpg", "images/26.jpg", "images/39.jpg"];
    
    if (heroSection) {
        let currentHeroIndex = 0;

        function updateHeroBackground() {
            heroSection.style.backgroundImage = `url('${sliderImages[currentHeroIndex]}')`;
        }

        // Cycle backgrounds every 5 seconds
        setInterval(() => {
            currentHeroIndex = (currentHeroIndex + 1) % sliderImages.length;
            updateHeroBackground();
        }, 5000); 
    }

    // --- 3. CONTACT FORM HANDLING (EMAILJS) ---
    const contactForm = document.getElementById("contact-form");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            const btn = contactForm.querySelector('button');
            btn.textContent = 'Sending...';

            // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with your actual keys from EmailJS
            emailjs.sendForm('service_4zqen4o', 'template_x4xyh6b', this)
                .then(() => {
                    btn.textContent = 'Send Message';
                    alert("Message sent successfully!");
                    contactForm.reset();
                }, (error) => {
                    btn.textContent = 'Send Message';
                    alert("Failed to send message. Please try again.");
                    console.error('EmailJS Error:', error);
                });
        });
    }

    // --- 4. IMAGE CAROUSEL LOGIC ---
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselImage = document.getElementById('carouselImage');

    if (prevBtn && nextBtn && carouselImage) {
        let currentIndex = 0;

        function showImage(index) {
            carouselImage.src = sliderImages[index];
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % sliderImages.length; 
            showImage(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length; 
            showImage(currentIndex);
        });
    }
});

// --- 5. SMART DELAYED PRELOADER ---
window.addEventListener("load", () => {
    const imagesToPreload = ["images/78.jpg", "images/26.jpg", "images/39.jpg"];
    imagesToPreload.forEach(imageSrc => {
        const imgPreloader = new Image();
        imgPreloader.src = imageSrc;
    });
});

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });

    }

});

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        
        // If the value is 0, display 0 directly without animating
        if (target === 0) {
            counter.innerText = '0';
            return;
        }

        const duration = 1500; // Animation duration in milliseconds (1.5 seconds)
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;

        const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Smooth ease-out curve
            const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 3)));

            counter.innerText = currentCount;

            if (frame === totalFrames) {
                counter.innerText = target;
                clearInterval(timer);
            }
        }, frameDuration);
    };

    // Trigger count animation when scrolled into view
    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observerInstance.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(counter => observer.observe(counter));
});