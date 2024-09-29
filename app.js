var detailsBox = document.getElementById('details-box');

// Event listener for mouseover to show tooltip and change color
document.addEventListener('mouseover', function (e) {
  if (e.target.tagName === 'path') {
    var content = e.target.dataset.name;
    var party = e.target.dataset.party;
    detailsBox.innerHTML = content;
    detailsBox.innerHTML = `${content} - ${party}`;
  
    detailsBox.style.opacity = "100%";
  }
  else {
    detailsBox.style.opacity = "0%";
    }

});


// Event listener for mouseout to reset color
document.addEventListener('mouseout', function(e) {
  if (e.target.tagName === 'path') {
    e.target.setAttribute('fill', 'rgb(230, 230, 230)'); // Reset to default color
  }
  console.log("Hovered element:", e.target);
  console.log("Party:", party);
});

// Update tooltip position based on mouse movement
window.onmousemove = function (e) {
  var x = e.clientX,
      y = e.clientY;
  detailsBox.style.top = (y + 20) + 'px';
  detailsBox.style.left = (x) + 'px';
};
