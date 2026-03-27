document.addEventListener("DOMContentLoaded", () => {

    // 1. Loading Screen
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
        // Simulate premium load time
        setTimeout(() => {
            loadingScreen.classList.add("hidden");
        }, 800);
    }

    // 2. Theme Toggle (Dark/Light Mode)
    const themeToggleBtn = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;

    // Check saved theme
    const savedTheme = localStorage.getItem("velora-theme") || "light";
    htmlElement.setAttribute("data-theme", savedTheme);
    if (themeIcon) {
        themeIcon.setAttribute("data-lucide", savedTheme === "dark" ? "sun" : "moon");
        if (window.lucide) lucide.createIcons();
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = htmlElement.getAttribute("data-theme");
            const newTheme = currentTheme === "light" ? "dark" : "light";
            htmlElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("velora-theme", newTheme);

            if (themeIcon) {
                themeIcon.setAttribute("data-lucide", newTheme === "dark" ? "sun" : "moon");
                if (window.lucide) lucide.createIcons();
            }
        });
    }

    // 3. Scroll Progress and Navbar
    const scrollProgress = document.getElementById("scroll-progress");
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
        // Progress Bar
        if (scrollProgress) {
            const scrollTotal = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTotal / height) * 100;
            scrollProgress.style.width = scrollPercent + "%";
        }

        // Navbar Shrink/Blur
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    });

    // 4. Mobile Menu
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    const mobileNav = document.getElementById("mobile-nav");
    const mobileClose = document.getElementById("close-mobile-nav");

    if (mobileToggle && mobileNav && mobileClose) {
        mobileToggle.addEventListener("click", () => mobileNav.classList.add("open"));
        mobileClose.addEventListener("click", () => mobileNav.classList.remove("open"));

        document.querySelectorAll(".mobile-links .nav-link, .mobile-links .btn").forEach(link => {
            link.addEventListener("click", () => mobileNav.classList.remove("open"));
        });
    }

    // 5. Intersection Observer for Fade-ups
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

    // 6. Menu Filtering
    const filterTabs = document.querySelectorAll(".menu-tab");
    const filterPills = document.querySelectorAll(".filter-pill");
    const menuItems = document.querySelectorAll(".menu-list-item");

    let activeCategory = "starters";
    let activeDiet = "all";

    const updateMenuDisplay = () => {
        menuItems.forEach(item => {
            const itemCategory = item.getAttribute("data-category");
            const itemDiet = item.getAttribute("data-diet");

            const categoryMatch = activeCategory === "all" || itemCategory === activeCategory;
            const dietMatch = activeDiet === "all" || itemDiet === activeDiet;

            if (categoryMatch && dietMatch) {
                item.style.display = "flex";
                item.classList.remove("visible");
                setTimeout(() => item.classList.add("visible"), 50);
            } else {
                item.style.display = "none";
            }
        });
    };

    filterTabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            filterTabs.forEach(t => t.classList.remove("active"));
            e.target.classList.add("active");
            activeCategory = e.target.getAttribute("data-category");
            updateMenuDisplay();
        });
    });

    filterPills.forEach(pill => {
        pill.addEventListener("click", (e) => {
            filterPills.forEach(p => p.classList.remove("active"));
            e.target.classList.add("active");
            activeDiet = e.target.getAttribute("data-filter");
            updateMenuDisplay();
        });
    });

    // 7. Favorite Buttons
    const favBtns = document.querySelectorAll(".favorite-btn");
    favBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            this.classList.toggle("active");
            const icon = this.querySelector("i");
            if (this.classList.contains("active")) {
                icon.style.fill = "currentColor";
            } else {
                icon.style.fill = "none";
            }
        });
    });

    // Default Filter View setup
    updateMenuDisplay();
});
