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
    }
  }