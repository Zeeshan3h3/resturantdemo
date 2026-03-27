// Custom animations using GSAP
// gsap and ScrollTrigger are loaded via CDN in index.html
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("app:ready", () => {
    startAnimations();
});

// Fallback if loading screen completes naturally
setTimeout(() => {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen && loadingScreen.style.display !== "none") {
        gsap.to(".logo-mark-anim", { opacity: 1, duration: 1 });
        gsap.to(".progress-line", {
            width: "100%", duration: 1.5, ease: "power2.inOut", onComplete: () => {
                gsap.to(loadingScreen, {
                    autoAlpha: 0, duration: 0.8, onComplete: () => {
                        document.body.classList.remove("loading");
                        startAnimations();
                    }
                });
            }
        });
    }
}, 100);

function startAnimations() {
    // 0ms Background gradient breathes in (already handled by CSS mostly, but lets run timeline)
    const tl = gsap.timeline();

    // 200ms Left image frame fades + slides from left
    tl.from(".frame-left", { x: -50, opacity: 0, duration: 1, ease: "power2.out" }, 0.2)
        // 400ms Right image frame fades + slides from right
        .from(".frame-right", { x: 50, opacity: 0, duration: 1, ease: "power2.out" }, 0.4)
        // 600ms Tag line appears
        .from(".hero-headline .line-1", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, 0.6)
        // 800ms H1 lines stagger in
        .from(".hero-headline .line-2", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, 0.8)
        .from(".gold-divider .line", { width: 0, duration: 0.8, ease: "power2.inOut" }, 0.9)
        // 1100ms Subtext fades up
        .from(".hero-subtext", { y: 20, opacity: 0, duration: 0.8 }, 1.1)
        // 1300ms CTAs slide up
        .from(".hero-ctas .btn", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, 1.3)
        // 1500ms Scroll indicator bounces
        .from(".scroll-indicator", { opacity: 0, y: -20, duration: 0.8 }, 1.5);

    // Parallax on scroll
    gsap.to(".frame-left .parallax-img", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.to(".frame-right .parallax-img", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.to(".parallax-chef", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
            trigger: ".about-teaser",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // Stagger info strip
    gsap.from(".info-item", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".quick-info",
            start: "top 95%"
        }
    });

    // Animate dishes in
    gsap.from(".dish-card", {
        x: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".signature-dishes",
            start: "top 80%"
        }
    });
}
