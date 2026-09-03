(function () {
    const items = document.querySelectorAll("main h3, main .info-row, main .divider");
    if (items.length === 0) return;
    const root = document.documentElement;
    root.classList.add("js-anim");
    const revealAll = () => items.forEach((el) => el.classList.add("visible"));
    const reduced = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
    if (reduced || !("IntersectionObserver" in window)) return revealAll();
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -10% 0px" });
    items.forEach((el) => io.observe(el));
})();