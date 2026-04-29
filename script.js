const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            themeToggle.textContent = document.body.classList.contains('light-theme') ? 'DARK MODE' : 'LIGHT MODE';
        });
    }

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);
    }

    const ASSET_PATH = 'assets/';

    // Safely load videos
    document.querySelectorAll('[data-video]').forEach(container => {
        const video = document.createElement('video');
        video.src = ASSET_PATH + container.getAttribute('data-video');
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.autoplay = true;
        video.play().catch(() => {});
        container.appendChild(video);
    });

    // Load Images
    document.querySelectorAll('[data-img]').forEach(container => {
        const img = document.createElement('img');
        img.src = ASSET_PATH + container.getAttribute('data-img');
        container.appendChild(img);
    });

    if (typeof gsap !== 'undefined') {
        // Horizontal Scroll Magic
        const horizontalContainer = document.querySelector('.horizontal-container');
        if (horizontalContainer) {
            gsap.to(horizontalContainer, {
                x: () => -(horizontalContainer.scrollWidth - window.innerWidth + 100),
                ease: "none",
                scrollTrigger: {
                    trigger: "#food-experience",
                    pin: true,
                    scrub: 1,
                    start: "center center",
                    end: () => "+=" + horizontalContainer.scrollWidth
                }
            });
        }
        
        // Parallax for sprinkled stickers
        document.querySelectorAll('[data-parallax]').forEach(el => {
            const yOffset = el.getAttribute('data-parallax');
            gsap.to(el, {
                yPercent: yOffset,
                ease: "none",
                scrollTrigger: {
                    trigger: el.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }
});
