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

/* TEAM BIOGRAPHY POPUPS */
document.addEventListener("DOMContentLoaded", () => {
    const biographies = {
        godwin: {
            title: "Godwin France's Bio",
            text: "Godwin is our Project Lead; he has been with the team since 2017 as a Product Developer. He loves curating STEM content and working with kids. His expertise cuts across AI & Machine Learning, Web3 Technologies, and experimenting with emerging technologies."
        },
        christian: {
            title: "Christian Tetteh's Bio",
            text: "International trainer/facilitator, talent acquisition and management specialist, people performance strategist, learning & development specialist, leadership development, soft skill trainer, entrepreneurial startup champion."
        },
        martina: {
            title: "Martina Johnson's Bio",
            text: "A highly competent professional with 2+ years work experience within the public, commercial and financial sector. Possesses excellent knowledge of dealing with customers/clients - both face-to-face and over the phone, goal-oriented and commercially aware."
        },
        oluwatoyin: {
            title: "Oluwatoyin Opeodu's Bio",
            text: "I am passionate about God, creativity and social media marketing. Recipient of Sprout Social's Always on Award (Global Top 5). I am Hubspot certified for social media, inbound and content marketing. META certified for Facebook and Instagram advertising. Managed and grown several multinational brands on social media. Masterclass facilitator at Social Media Week Accra 2019. I have worked with brands in various industries including fintech, banking, FMCG, fashion, cryptocurrency, food, television service, telecommunication, banking and ride-hailing. I train. I speak. I consult. I am the Social Media Catalyst, let's blow up campaigns together."
        },
        matthew: {
            title: "Matthew Godwin's Bio",
            text: "Matthew is a volunteer Software Developer at The Akili Foundation. He has an interest in technology, digital innovation and using his skills to support educational and community projects."
        },
        linda: {
            title: "Linda Mensah's Bio",
            text: "Linda is a volunteer Writer at The Akili Foundation. She enjoys creating meaningful content and supporting communication activities that help share the foundation's programmes, stories and community impact."
        },
        jordon: {
            title: "Jordon Aryeetey's Bio",
            text: "Jordon is a volunteer Graphic Designer at The Akili Foundation. He is interested in creative design, visual storytelling and producing engaging materials that support the foundation's educational and community initiatives."
        }
    };

    const overlay = document.getElementById("bioOverlay");
    const closeButton = document.getElementById("bioClose");
    const title = document.getElementById("bioTitle");
    const text = document.getElementById("bioText");
    const buttons = document.querySelectorAll(".see-bio-btn");

    if (!overlay || !closeButton || !title || !text) return;

    let previousFocus = null;

    function closeBio() {
        overlay.hidden = true;
        document.body.style.overflow = "";
        if (previousFocus) previousFocus.focus();
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const bio = biographies[button.dataset.bio];
            if (!bio) return;

            previousFocus = document.activeElement;
            title.textContent = bio.title;
            text.textContent = bio.text;
            overlay.hidden = false;
            document.body.style.overflow = "hidden";
            closeButton.focus();
        });
    });

    closeButton.addEventListener("click", closeBio);

    overlay.addEventListener("click", event => {
        if (event.target === overlay) closeBio();
    });

    document.addEventListener("keydown", event => {
        if (overlay.hidden) return;

        if (event.key === "Escape") {
            closeBio();
        }

        if (event.key === "Tab") {
            event.preventDefault();
            closeButton.focus();
        }
    });
});
