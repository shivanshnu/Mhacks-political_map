// Select elements

var detailsBox = document.getElementById("details-box");

var submitButton = document.getElementById("submit-button");

var inputField = document.getElementById("userInput"); // Changed to match your HTML

var resultBox = document.getElementById("result"); // Changed to match your HTML

// Event listener for mouseover to show tooltip and change color

document.addEventListener("mouseover", function (e) {
  if (e.target.tagName === "path") {
    // Get the name for the tooltip

    var content = e.target.dataset.name;

    detailsBox.innerHTML = content;

    detailsBox.style.opacity = "1"; // Use 1 instead of "100%"

    e.target.setAttribute("fill", "rgb(200, 200, 200)"); // Example default color

    // console.log("Hovered element:", e.target);
  } else {
    // Hide tooltip if the mouse is not over a path

    detailsBox.style.opacity = "0"; // Use 0 instead of "0%"
  }
});

// Event listener for mouseout to reset color

document.addEventListener("mouseout", function (e) {
  if (e.target.tagName === "path") {
    // Reset to default color

    e.target.setAttribute("fill", "rgb(230, 230, 230)");
  }
});

// Update tooltip position based on mouse movement

window.onmousemove = function (e) {
  var x = e.clientX,
    y = e.clientY;

  detailsBox.style.top = y + 20 + "px";

  detailsBox.style.left = x + "px";
};
