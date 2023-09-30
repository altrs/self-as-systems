//ref:
//https://www.w3schools.com/howto/howto_js_draggable.asp

let isDragging = false;

dragElement(document.getElementById("movable"));

  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      isDragging = true;

      // Start the interval only when dragging starts
      if (isDragging) {setInterval(displayRandomImage, 2000);}

      document.onmousemove = elementDrag;
    }

    function elementDrag(e) { //drag
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      //populate environment
      console.log("dragging");
      
      // calculate the boundaries of the parent element
      var parent = document.getElementById("head-space");
      var parentRect = parent.getBoundingClientRect();
      var minX = parentRect.left-15;
      var maxX = parentRect.right - elmnt.offsetWidth;
      var minY = parentRect.top-14;
      var maxY = parentRect.bottom - elmnt.offsetHeight;
      
      // calculate the new position, ensuring it stays within the parent
      var newX = elmnt.offsetLeft - pos1;
      var newY = elmnt.offsetTop - pos2;
      newX = Math.min(Math.max(newX, minX), maxX);
      newY = Math.min(Math.max(newY, minY), maxY);
      
      // set the element's new position:
      elmnt.style.top = newY + "px";
      elmnt.style.left = newX + "px";
    }

    function closeDragElement() { //no drag
      document.onmouseup = null;
      document.onmousemove = null;
      isDragging = false;
    }
  }

  const imageUrls = [
    'assets/1.png',
    'assets/2.png',
    'assets/3.png',
  ];

  function displayRandomImage() {
    if (isDragging) {
      const imgContainer = document.getElementById('img-container');
      const randomIndex = Math.floor(Math.random() * imageUrls.length);
      const randomImageUrl = imageUrls[randomIndex];
      console.log("display random image: " + randomImageUrl);
      
      const img = document.createElement('img');
      img.src = randomImageUrl;
      
      // Set random position within the container
      img.style.left = Math.floor(Math.random() * (imgContainer.offsetWidth - 50)) + 'px';
      img.style.top = Math.floor(Math.random() * (imgContainer.offsetHeight - 50)) + 'px';

      imgContainer.appendChild(img);
    }
  }


