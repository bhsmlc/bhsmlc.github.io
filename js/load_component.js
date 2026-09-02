function loadComponent(tagName, filePath) {
    const element = document.querySelector(tagName);
    if (!element) return;
    const cacheKey = `component_${filePath}`;
    const cached = sessionStorage.getItem(cacheKey);
    const apply = (html) => {
        element.innerHTML = html;
        if (tagName === "nav") markActiveNavLink();
    };
    if (cached) {
        apply(cached);
        return;
    }
    fetch(filePath)
        .then(response => response.text())
        .then(apply);
}

function markActiveNavLink() {
    const path = location.pathname;
    let id = null;
    if (path === "/" || path.startsWith("/index.html")) id = "home-link";
    else if (path.startsWith("/events")) id = "events-link";
    else if (path.startsWith("/resources")) id = "resources-link";
    else if (path.startsWith("/contact")) id = "contact-link";
    if (id) {
        const link = document.getElementById(id);
        if (link) link.setAttribute("aria-current", "page");
    }
}

let defered = true;