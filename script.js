// Define variables for the breadcrumbs and locations
const breadcrumbs = document.querySelector(".breadcrumbs");
const locations = document.querySelector(".locations");

// Define an array to keep track of the location history
let locationHistory = [];

// Add a click event listener to the locations container
locations.addEventListener("click", (event) => {
  const clickedLocation = event.target;
  
  // Check if the clicked element is a location button
  if (clickedLocation.classList.contains("location")) {
    const clickedIndex = clickedLocation.dataset.index;

    // Check if the location has already been added to the history
    if (!locationHistory.includes(clickedIndex)) {
      // Add the clicked location to the history array
      locationHistory.push(clickedIndex);

      // Create a new breadcrumb for the clicked location
      const breadcrumb = document.createElement("a");
      breadcrumb.textContent = clickedLocation.textContent;
      breadcrumb.classList.add("breadcrumb");
      breadcrumb.dataset.index = clickedIndex;
      
      // Add a click event listener to the breadcrumb to remove everything after it
      breadcrumb.addEventListener("click", () => {
        const breadcrumbIndex = breadcrumb.dataset.index;
        locationHistory = locationHistory.slice(0, breadcrumbIndex);
        renderBreadcrumbs();
      });

      // Add the breadcrumb to the breadcrumbs container
      breadcrumbs.appendChild(breadcrumb);
    }

    // Update the active class for the location buttons
    const activeLocations = document.querySelectorAll(".location.active");
    activeLocations.forEach((location) => location.classList.remove("active"));
    clickedLocation.classList.add("active");
  }
});

// Add a click event listener to the home breadcrumb to clear the history
breadcrumbs.addEventListener("click", (event) => {
  const clickedBreadcrumb = event.target;

  if (clickedBreadcrumb.classList.contains("breadcrumb") && clickedBreadcrumb.dataset.index === "0") {
    locationHistory = [];
    renderBreadcrumbs();
  }
});

// Define a function to render the breadcrumbs based on the location history
function renderBreadcrumbs() {
  breadcrumbs.innerHTML = "";
  const homeBreadcrumb = document.createElement("a");
  homeBreadcrumb.textContent = "Home";
  homeBreadcrumb.classList.add("breadcrumb");
  homeBreadcrumb.dataset.index = 0;
  breadcrumbs.appendChild(homeBreadcrumb);

  for (let i = 0; i < locationHistory.length; i++) {
    const locationIndex = locationHistory[i];
    const locationButton = document.querySelector(`.location[data-index="${locationIndex}"]`);
    const breadcrumb = document.createElement("a");
    breadcrumb.textContent = locationButton.textContent;
    breadcrumb.classList.add("breadcrumb");
    breadcrumb.dataset.index = i + 1;
    breadcrumbs.appendChild(breadcrumb);
  }
}

// Render the initial breadcrumbs
renderBreadcrumbs();
