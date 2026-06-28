// ======================================================
// TESTIMONIALS SECTION
// ======================================================

const container = document.querySelector(".testimonials-container");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

if (container && nextBtn && prevBtn) {
    // Duplicate cards for infinite slider
    container.innerHTML += container.innerHTML;
    const cards = document.querySelectorAll(".testimonials-box");
    let index = 0;
    const total = cards.length / 2;
    const gap = 50;
    let isAnimating = false;
    function move() {
        const cardWidth =
            cards[0].getBoundingClientRect().width + gap;
        container.style.transform =
            `translateX(-${index * cardWidth}px)`;
    }

    function nextSlide() {
        if (isAnimating) return;
        isAnimating = true;
        index++;
        container.style.transition = "transform .8s ease";
        move();
        if (index >= total) {
            setTimeout(() => {
                container.style.transition = "none";
                index = 0;
                move();
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        container.style.transition =
                            "transform .8s ease";
                        isAnimating = false;
                    });
                });
            }, 800);
        } else {
            setTimeout(() => {
                isAnimating = false;
            }, 800);
        }
    }

    function prevSlide() {
        if (isAnimating) return;
        isAnimating = true;
        if (index === 0) {
            container.style.transition = "none";
            index = total;
            move();
            requestAnimationFrame(() => {
                index--;
                container.style.transition =
                    "transform .8s ease";
                move();
                setTimeout(() => {
                    isAnimating = false;
                }, 800);
            });
        } else {
            index--;
            container.style.transition =
                "transform .8s ease";
            move();
            setTimeout(() => {
                isAnimating = false;
            }, 800);
        }
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);
    // Auto Slide
    setInterval(nextSlide, 3500);
    move();
}

// ======================================================
// FAQ SECTION
// ======================================================

const faqs = document.querySelectorAll(".faq-box");

faqs.forEach((faq) => {
    const question = faq.querySelector(".faq-question");
    if (!question) return;
    question.addEventListener("click", () => {
        // Close other FAQs
        faqs.forEach((item) => {
            if (item !== faq) {
                item.classList.remove("active");
                const otherIcon =
                    item.querySelector(".faq-icon");
                if (otherIcon) {
                    otherIcon.textContent = "+";
                }
            }
        });
        faq.classList.toggle("active");
        const icon = faq.querySelector(".faq-icon");
        if (icon) {
            icon.textContent =
                faq.classList.contains("active")
                    ? "−"
                    : "+";

        }
    });
});

// ======================================================
// MOBILE MENU
// ======================================================

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        mobileMenu.classList.toggle("active");
    });
}

// ======================================================
// BACK TO TOP + SCROLL PROGRESS
// ======================================================

const progressBar = document.getElementById("scroll-progress");
const backTop = document.getElementById("backTop");
const ringProgress = document.getElementById("ringProgress");

const radius = 18;
const circumference = 2 * Math.PI * radius;

if (ringProgress) {
    ringProgress.style.strokeDasharray = circumference;
    ringProgress.style.strokeDashoffset = circumference;
}

function updateBackTop() {
    const scrollTop = window.scrollY;
    const docHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;
    const progress = docHeight
        ? scrollTop / docHeight
        : 0;
    // Update Top Progress Bar
    if (progressBar) {
        progressBar.style.width = `${progress * 100}%`;
    }
    // Update Circular Progress
    if (ringProgress) {
        ringProgress.style.strokeDashoffset =
            circumference * (1 - progress);
    }
    // Show / Hide Back To Top Button
    if (backTop) {
        backTop.classList.toggle(
            "visible",
            scrollTop > 350
        );
    }
}

// Scroll Event
window.addEventListener(
    "scroll",
    updateBackTop,
    { passive: true }
);

// Initial Call
updateBackTop();

// Back To Top Click
if (backTop) {
    backTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}

// ======================================================
// SCROLL REVEAL
// ======================================================

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add(
                    "revealed"
                );
                // Animate only once
                revealObserver.unobserve(
                    entry.target
                );
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin:
            "0px 0px -40px 0px",
    }
);

document
    .querySelectorAll(".reveal-item")
    .forEach((el) => {
        revealObserver.observe(el);
    });


// ======================================================
// THEME TOGGLE
// ======================================================

const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

// Default Theme
const savedTheme =
    localStorage.getItem("theme") || "dark";

html.setAttribute(
    "data-theme",
    savedTheme
);

themeToggle.addEventListener("click", () => {

    const nextTheme =
        html.getAttribute("data-theme") === "dark"
            ? "light"
            : "dark";

    html.setAttribute(
        "data-theme",
        nextTheme
    );

    localStorage.setItem(
        "theme",
        nextTheme
    );

    themeToggle.classList.add("rotate");

    setTimeout(() => {

        themeToggle.classList.remove("rotate");

    }, 450);

});