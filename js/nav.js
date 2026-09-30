(function () {
    const getNav = () => document.querySelector("nav");
    const getToggle = () => document.getElementById("nav-toggle");
    const set = (open) => {
        const nav = getNav();
        const toggle = getToggle();
        if (!nav || !toggle) return;
        nav.classList.toggle("nav-open", open);
        toggle.setAttribute("aria-expanded", open);
    };
    const isOpen = () => !!getNav() && getNav().classList.contains("nav-open");
    document.addEventListener("click", (e) => {
        if (e.target.closest("#nav-toggle")) {
            set(!isOpen());
            return;
        }
        const link = e.target.closest("nav a");
        if (link) {
            if (isOpen() && link.href) {
                e.preventDefault();
                set(false);
                setTimeout(() => { location.href = link.href; }, 300);
            }
            return;
        }
        if (isOpen() && !e.target.closest("nav")) set(false);
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && isOpen()) set(false); });
})();