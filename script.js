const button = document.querySelector('#btn');
const margin = 30; // Define the minimum margin
const segmentSize = 10; // Define the size of segments for collision checking
const siButton = document.getElementById('btnsi');

siButton.addEventListener('click', function() {
    // Redirige a la nueva página
    window.location.href = 'respuesta.html';
});


button.addEventListener('mouseenter', moveButton);

function moveButton() {


  const buttonRect = button.getBoundingClientRect();
  const buttonWidth = buttonRect.width;
  const buttonHeight = buttonRect.height;
   button.style.position = 'absolute';
    button.style.position = 'absolute';

  // Calculate the maximum allowed position
  const maxX = window.innerWidth - buttonWidth - 2 * margin;
  const maxY = window.innerHeight - buttonHeight - 2 * margin;

  let randomX, randomY;

  do {
    randomX = Math.random() * maxX + margin;
    randomY = Math.random() * maxY + margin;
  } while (isColliding(randomX, randomY, buttonWidth, buttonHeight));

  // Set the button's new position
  button.style.left = randomX + 'px';
  button.style.top = randomY + 'px';
}

function isColliding(x, y, width, height) {
  const numSegmentsX = Math.floor(width / segmentSize);
  const numSegmentsY = Math.floor(height / segmentSize);

  for (let i = 0; i <= numSegmentsX; i++) {
    for (let j = 0; j <= numSegmentsY; j++) {
      const offsetX = i * segmentSize;
      const offsetY = j * segmentSize;

      const elements = document.elementsFromPoint(x + offsetX, y + offsetY);

      for (const element of elements) {
        if (element !== button && !element.contains(button)) {
          return true;
        }
      }
    }
  }

  return false;
}

function showAlert() {
  // Check if the device is a mobile device
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (!isMobileDevice) {
    alert('You must click the button!😂');
  }
}

// Check if the device is a mobile device
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Add an event listener for the "Enter" key press
document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter' && !isMobileDevice) {
    audio1.currentTime = 0;
    audio1.play();

    // Prevent the default form submission
    event.preventDefault();

    // Show the alert, but only on non-mobile devices
    showAlert();
  }
});

// Add a tap/touch event listener for mobile devices
if (isMobileDevice) {
  button.addEventListener('click', function () {
    moveButton();
  });
}