// Initialize Google Map
let map;
let infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.8, lng: -96 }, // Center of the US
        zoom: 4
    });

    infoWindow = new google.maps.InfoWindow();

    // Add click event listener to map
    map.addListener('click', function(event) {
        handleMapClick(event.latLng);
    });
}

// Simulate data: Regions with associated candidates
const regionData = {
    "California": [
        { name: "Alice Johnson", party: "Democratic", policy: "Environment: Supports Green New Deal" },
        { name: "Bob Smith", party: "Republican", policy: "Economy: Lower taxes, more job creation" }
    ],
    "Texas": [
        { name: "Jane Doe", party: "Republican", policy: "Healthcare: Against universal healthcare" },
        { name: "Michael Lee", party: "Democratic", policy: "Education: Increase public education funding" }
    ]
};

// Handle map click
function handleMapClick(latLng) {
    const region = prompt("Enter a region (e.g., California, Texas):");
    if (region) {
        showCandidateInfo(region);
        infoWindow.setPosition(latLng);
        infoWindow.setContent(`Region selected: ${region}`);
        infoWindow.open(map);
    }
}

// Display candidate info
function showCandidateInfo(region) {
    const candidateSection = document.getElementById("candidate-info");
    candidateSection.innerHTML = ""; // Clear previous content

    if (regionData[region]) {
        regionData[region].forEach(candidate => {
            const candidateDiv = document.createElement("div");
            candidateDiv.innerHTML = `
                <h3>${candidate.name} (${candidate.party})</h3>
                <p>${candidate.policy}</p>
            `;
            candidateSection.appendChild(candidateDiv);
        });
    } else {
        candidateSection.innerHTML = "<p>No candidates found for this region.</p>";
    }
}

// Quiz Recommendation Logic
const quizForm = document.getElementById("quiz-form");
const quizResult = document.getElementById("quiz-result");

quizForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedPolicy = document.getElementById("policy-priority").value;

    let recommendation;
    if (selectedPolicy === "economy") {
        recommendation = "We recommend candidates who focus on economic policies.";
    } else if (selectedPolicy === "healthcare") {
        recommendation = "We recommend candidates who prioritize healthcare reform.";
    } else if (selectedPolicy === "education") {
        recommendation = "We recommend candidates who aim to improve the education system.";
    } else if (selectedPolicy === "environment") {
        recommendation = "We recommend candidates who focus on environmental protection.";
    }

    quizResult.textContent = recommendation;
});

var detailsBox = document.getElementById('details-box');

document.addEventListener('mouseover', function (e) {
  if (e.target.tagName == 'path') {
    var content = e.target.dataset.name;
    detailsBox.innerHTML = content;
    detailsBox.style.opacity = "100%";
  }
  else {
    detailsBox.style.opacity = "0%";
  }
});

window.onmousemove = function (e) {
  var x = e.clientX,
      y = e.clientY;
  detailsBox.style.top = (y + 20) + 'px';
  detailsBox.style.left = (x) + 'px';
};

