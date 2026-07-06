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
    const sliderImages = ["78.jpg", "26.jpg", "39.jpg"];
    
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

    // --- 3. CONTACT FORM HANDLING ---
    const contactForm = document.getElementById("contact-form");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            const btn = contactForm.querySelector('button');
            btn.textContent = 'Sending...';

            alert("Form submitted! (Add EmailJS keys in script.js to activate)");
            btn.textContent = 'Send Message';
            contactForm.reset();
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

// --- 5. SMART DELAYED PRELOADER (FIXES NAV LAG) ---
// This waits until the page is 100% loaded before downloading background assets
window.addEventListener("load", () => {
    const imagesToPreload = ["78.jpg", "26.jpg", "39.jpg"];
    imagesToPreload.forEach(imageSrc => {
        const imgPreloader = new Image();
        imgPreloader.src = imageSrc;
    });
});