(function () {
    document.addEventListener("click", (e) => {
        if (!e.target.closest("#theme-control")) return;
        const root = document.documentElement;
        const theme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", theme);
        try { localStorage.setItem("theme", theme); } catch (_) {}
    });
})();