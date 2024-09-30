// Select elements

var detailsBox = document.getElementById("details-box");

var submitButton = document.getElementById("submit-button");

var inputField = document.getElementById("userInput"); // Changed to match your HTML

var yearRange = document.getElementById("year-range"); // Changed to match your HTML

var resultBox = document.getElementById("result"); // Changed to match your HTML

// Event listener for mouseover to show tooltip and change color

document.addEventListener("mouseover", function (e) {
  if (e.target.tagName === "path") {
    // Get the name for the tooltip

    const state = e.target.dataset.name; //Example: Michigan
    const year = yearRange.value; // Example: 1976

    detailsBox.style.opacity = "1"; // Use 1 instead of "100%"
    e.target.setAttribute("fill", "rgb(200, 200, 200)"); // Example default color

    console.log("State:", state, year);
    // Example JavaScript code to call the Flask API

    // Construct the API URL with query parameters for 'year' and 'state'
    const apiUrl = `http://127.0.0.1:5000/api/elections?year=${year}&state=${state}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        console.log(data); // Handle the JSON response data
        // Initialize vote counts
        let republicanVotes = 0;
        let democratVotes = 0;
        let totalVotes = 0;

        // Iterate through the results to sum up votes
        data.forEach((candidate) => {
          totalVotes += candidate.candidatevotes;
          if (candidate.party_detailed === "REPUBLICAN") {
            republicanVotes += candidate.candidatevotes;
          } else if (candidate.party_detailed === "DEMOCRAT") {
            democratVotes += candidate.candidatevotes;
          }
        });
        let demratio = (democratVotes / totalVotes) * 100;
        let repratio = (republicanVotes / totalVotes) * 100;
        detailsBox.innerHTML =
          state +
          "\nRepublican: " +
          republicanVotes +
          " | " +
          repratio.toFixed(2) +
          "%" +
          "\nDemocrats: " +
          democratVotes +
          " | " +
          demratio.toFixed(2) +
          "%";

        // Log the results
        console.log(`Republican Votes: ${republicanVotes}`);
        console.log(`Democrat Votes: ${democratVotes}`);
        // Do something with the election data (e.g., display it on the webpage)
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  } else {
    // Hide tooltip if the mouse is not over a path

    detailsBox.style.opacity = "0"; // Use 0 instead of "0%"
  }
});

// Event listener for mouseout to reset color

document.addEventListener("mouseout", function (e) {
  if (e.target.tagName === "path") {
    // Reset to default color

    e.target.setAttribute("fill", "rgb(128, 0, 128)");
  }
});

// Update tooltip position based on mouse movement

window.onmousemove = function (e) {
  var x = e.clientX,
    y = e.clientY;

  detailsBox.style.top = y + 20 + "px";

  detailsBox.style.left = x + "px";
};
