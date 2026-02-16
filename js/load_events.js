async function loadEvents() {
    // Fethc the data from json
        const response = await fetch("/events/events.json");
        const segments = await response.json();
        const futureEvents = segments["future"];
        const pastEvents = segments["past"];
    // Find the container in html
    let futureContainer = document.getElementById("events-list").querySelector("#future-events");
    let pastContainer = document.getElementById("events-list").querySelector("#past-events");
    // Loop through each segment in json array thing
    futureEvents.forEach((i, k) => {
        const newDiv = document.createElement("div");
        newDiv.className = "future-box " + ((k+1) % 2 == 0 ? "even" : "odd");
        newDiv.innerHTML = "<h4>"+i["title"]+"</h4>"+
                           "<div id=\"date\"><h5>"+i["date"]+"</h5></div>"+
                           "<h5>"+i["location"]+"</h5>"+
                           "<p>"+i["content"]+"</p>";
        
        futureContainer.appendChild(newDiv);
    });


    // Box height for mobile layout 
    const boxes = document.querySelectorAll(".future-box");

    const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
            const height = entry.target.offsetHeight;
            entry.target.style.setProperty("--box-height", `${height}px`)
        }
    });

    boxes.forEach((box) => {
        observer.observe(box);
    });
}

loadEvents();