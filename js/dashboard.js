document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const menuBtn = document.querySelector(".menu-btn");

    const profile = document.querySelector(".profile");
    const profileBtn = document.querySelector(".profile-btn");

    const themeBtn = document.querySelectorAll(".header-icon")[1];

    const scrollProgress = document.getElementById("scroll-progress");

    const navItems = document.querySelectorAll(".sidebar-nav li");

    // Sidebar
    menuBtn.addEventListener("click", () => {
        if (window.innerWidth <= 1024) {
            sidebar.classList.toggle("active");
        } else {
            sidebar.classList.toggle("collapsed");
        }
    });

    // Closed Mobile Sidebar
    document.addEventListener("click", (e) => {
        if (
            window.innerWidth <= 1024 &&
            sidebar.classList.contains("active") &&
            !sidebar.contains(e.target) &&
            !menuBtn.contains(e.target)
        ) {
            sidebar.classList.remove("active");
        }
    });

    // Window Resize
    window.addEventListener("resize", () => {
        if (window.innerWidth > 992) {
            sidebar.classList.remove("active");
        } else {
            sidebar.classList.remove("collapsed");
        }
    });

    // Profile Dropdown
    profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        profile.classList.toggle("active");
    });

    // Close profile dropdown
    document.addEventListener("click", (e) => {
        if (!profile.contains(e.target)) {
            profile.classList.remove("active");
        }
    });

    // Theme
    const body = document.body;
    const themeIcon = themeBtn.querySelector("i");
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        body.setAttribute("data-theme", "light");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }

    themeBtn.addEventListener("click", () => {
        if (body.getAttribute("data-theme") === "light") {
            body.removeAttribute("data-theme");
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
            localStorage.setItem("theme", "dark");
        } else {
            body.setAttribute("data-theme", "light");
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
            localStorage.setItem("theme", "light");
        }
    });

    // ACTIVE SIDEBAR LINK
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");
        });
    });

    // ESC KEY CLOSES EVERYTHING
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            profile.classList.remove("active");
            sidebar.classList.remove("active");
        }
    });
});