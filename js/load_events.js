async function loadEvents() {
    // Fethc the data from json
    const response = await fetch("/events/events.json");
    const segments = await response.json();
    const futureEvents = segments["future"];
    const pastEvents = segments["past"];
    // Find the container in html
    const futureContainer = document.getElementById("future-events");
    const pastContainer = document.getElementById("past-events-list");
    // Loop through each segment in json array thing
    function renderEvents(events, container) {
        events.forEach((i, k) => {
            const eventRow = document.createElement("div");
            const isEven = (k + 1) % 2 === 0;
            eventRow.className = `event-row ${isEven ? "even" : "odd"}`;

            const newDiv = document.createElement("div");
            newDiv.className = "future-box";
            newDiv.innerHTML = "<h4>"+i["title"]+"</h4>"+
                            "<h5>"+i["location"]+"</h5>"+
                            "<p>"+i["content"]+"</p>";

            const date = document.createElement("div");
            date.className = "event-date";
            date.textContent = i["date"];

            const references = Array.isArray(i["references"]) ? i["references"] : [];
            if (references.length > 0) {
                const referencesContainer = document.createElement("div");
                referencesContainer.className = "event-references";

                references.forEach((reference, referenceIndex) => {
                    const link = document.createElement("a");
                    link.href = reference;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    link.textContent = references.length === 1
                        ? "View resource"
                        : `View resource ${referenceIndex + 1}`;
                    referencesContainer.appendChild(link);
                });

                newDiv.appendChild(referencesContainer);
            }
            
            eventRow.append(isEven ? date : newDiv, isEven ? newDiv : date);
            container.appendChild(eventRow);
        });
    }

    renderEvents(futureEvents, futureContainer);
    const recentPastEvents = [...pastEvents].sort((a, b) => {
        return Date.parse(b["date"]) - Date.parse(a["date"]);
    });
    renderEvents(recentPastEvents, pastContainer);


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
