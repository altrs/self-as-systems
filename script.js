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
      if (isDragging) {
        // const randomInterval = Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000;
        // setInterval(displayRandomImage, randomInterval);
        setInterval(displayRandomImage, 500);
      }

      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

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

    function closeDragElement() {
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

  var objects = [];
  const textDocumentURL = 'assets/random-text.txt';
  let val = 0;
  let messageDisplaying = false;

  function displayRandomImage() {
    if (isDragging) {
      const imgContainer = document.getElementById('img-container');
      const randomIndex = Math.floor(Math.random() * imageUrls.length);
      const randomImageUrl = imageUrls[randomIndex];
      console.log("display random image: " + randomImageUrl);
      
      const img = document.createElement('img');
      img.src = randomImageUrl;
      
      // Set random position within container
      var imgx = Math.floor(Math.random() * (imgContainer.offsetWidth - 50)) + 'px';
      var imgy = Math.floor(Math.random() * (imgContainer.offsetHeight - 50)) + 'px';
      img.style.left = imgx;
      img.style.top = imgy;

      const objectIndex = objects.length;
      objects.push(img);

      console.log("array: " + objects.length);

      img.addEventListener('click', async function(event) {
        console.log("Image clicked! : " + objectIndex);

        if(messageDisplaying == false){
          var messageDiv = document.createElement('div');
          messageDiv.style.position = 'absolute';
          messageDiv.style.width = '150px';
          messageDiv.style.height = 'auto';
          messageDiv.style.border = '1px solid';
          messageDiv.style.backgroundColor = "white";
          var message = document.createElement('p');
          const response = await fetch(textDocumentURL);
          const text = await response.text();
          const lines = text.split('\n');
          const randomIndices = getRandomIndices(lines.length, 3);
          console.log("LINE: " + lines[randomIndices[0]]);
          val = Math.floor(Math.random() * 5) + 1;
          message.textContent = lines[randomIndices[0]];
          message.style.fontStyle = "italic";

          messageDiv.appendChild(message);
          this.parentElement.appendChild(messageDiv);
          messageDisplaying = true;

          // Get the position of the clicked image
          const imgRect = this.getBoundingClientRect();

          // Set the top and left positions for the messageDiv
          messageDiv.style.top =  imgRect.top + 'px';
          messageDiv.style.left = imgRect.left + 60 + 'px';
          messageDiv.style.zIndex = "5";

          setTimeout(function() {
            messageDiv.remove();
            messageDisplaying = false;
          }, 5000);

        }

      });

      imgContainer.appendChild(img);
    }
  }

  //RANDOM TEXT
  function getRandomIndices(max, count) {
      const indices = [];
      while (indices.length < count) {
        const randomIndex = Math.floor(Math.random() * max);
        if (!indices.includes(randomIndex)) {
          indices.push(randomIndex);
        }
      }
      return indices;
    }


