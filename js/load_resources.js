async function loadResources() {
    const response = await fetch("/resources/resources.json");
    const resourcesObject = (await response.json())[1];
    const target = document.getElementsByTagName("main")[0].querySelector("#resource-list");
    
    for (let category in resourcesObject) {
        const newCategory = document.createElement("div");
        newCategory.className = "resource-category";

        const title = document.createElement("h4");
        title.className = "category-title";
        title.innerHTML = category+'<div class="category-length">'+resourcesObject[category].length+'</div>';
        newCategory.appendChild(title);
        
        const contents = document.createElement("div");
        contents.className = "category-contents";
        for (let resource of resourcesObject[category]) {
            const newResource = document.createElement("a");
            newResource.className = "resource-box";
            newResource.href = `${resource["reference"]}`;
            newResource.target = "_blank";
            newResource.rel = "noreferrer";

            // a icon, title, and a desc
            newResource.innerHTML = `<div class="resource-icon">${resource["icon"]}</div><h5 class="resource-title">${resource["title"]}</h5><p class="resource-description">${resource["description"]}</p>`;

            contents.appendChild(newResource);
        }

        newCategory.appendChild(contents);
        target.appendChild(newCategory);
    }

    const resources = document.getElementsByClassName("resource-box")

}
loadResources();