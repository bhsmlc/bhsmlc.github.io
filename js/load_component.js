function loadComponent(tagName, filePath) {
    // const element = document.getElementById(placeholderID);
    const element = document.querySelector(tagName);
    if (!element) return;
    
    fetch(filePath)
        .then(response => response.text())
        .then(response => {
            element.innerHTML = response;
        });
}
let defered = true;