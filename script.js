//ref:
//https://www.w3schools.com/howto/howto_js_draggable.asp
//https://jsfiddle.net/4e3TY/
//https://stackoverflow.com/questions/5419459/how-to-allow-only-one-radio-button-to-be-checked
//https://www.infoworld.com/article/2077176/using-javascript-and-forms.html
//https://www.w3schools.com/jsref/prop_radio_checked.asp

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
var objectsCount = 0;

function displayRandomImage() {
  if (isDragging) {
    const imgContainer = document.getElementById('img-container');
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const randomImageUrl = imageUrls[randomIndex];
    console.log("display random image: " + randomImageUrl);
    
    const img = document.createElement('img');
    objectsCount++;
    console.log("OBJECT COUNT " + objectsCount);
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

//QUESTION TAB
const questionDiv = document.getElementsByClassName("question-container")[0];
const hand = document.getElementById("q-tab");
var open = false;

hand.addEventListener('click', async function(event) {
  if(open == false){
    questionDiv.style.right = "5px";
    open = true;
  }else if (open == true){
    questionDiv.style.right = "-450px";
    open = false;
  }
});


//ASSESS QUESTIONAIRE

var questions = ['', '', '', '', '']; //where selections will be stored  
var q6 = null;
var questionScore = 0;

questionDiv.addEventListener('click', async function(event) {
  
  //questions with only 2 mc answers
  for (var i = 0; i < questions.length; i++) {
    const questionName = "q" + (i + 1) + "-input";
    const radioButton = document.querySelector('input[name="' + questionName + '"]:checked');
    if (radioButton) {questions[i] = radioButton.value;}
    else {questions[i] = '';}
  }

  console.log('Questions:', questions);

  //questions with more than 2 mc answers
  for (var i = 1; i <= 4; i++) {
    const radioName = "q6-input-" + i;
    const radioButton = document.getElementById(radioName);

    if (radioButton && radioButton.checked) {
      q6 = radioButton; // Assign the checked radio button to q6
      break; // Exit the loop once a checked radio button is found
    }
  }

  if (q6 !== null) {console.log("Selected radio button value: " + q6.value);}
  else {console.log("No radio button selected for Q6");}

  updateQuestionScore();

  // for (var i = 0; i < questions.length; i++) {
  //   if(questions[i] === 'a'){questionScore++;}
  //   if(questions[i] === 'b'){questionScore--;}
  // }
  // console.log("Score: " + questionScore);

});

function updateQuestionScore() {
  questionScore = questions.filter(value => value === 'a').length;
  console.log("Score: " + questionScore);
  updateHeads();
}


//CREATE HEADS

var headsRatio = 0;

function updateHeads() {
  if (questionScore <= 3) {
    headsRatio = objects.length; // All objects
    console.log("All objects");
  } else if (questionScore > 3) {
    headsRatio = objects.length - Math.floor(objects.length * 0.8); // 80% OF OBJECTS
    console.log("80% of objects");
  }

  // Create and position heads for objects based on headsRatio
  for (var i = 0; i < objects.length; i++) {
    if (i < headsRatio) {
      console.log("adding head: " + i);
      createAndPositionHead(objects[i]);
    } else {
      console.log("removing head: " + i);
      removeHead(objects[i]);
    }
  }
  console.log("heads ratio: " + headsRatio);
}

function createAndPositionHead(object) {
  var head = document.createElement("div");
  head.className = "head"; // Add a class to the head element
  head.style.backgroundImage = "url(assets/test-imgs/head.png)";
  head.style.position = 'absolute';
  head.style.width = '150px';
  head.style.height = '100px';
  head.style.border = '1px solid';
  object.parentElement.appendChild(head);
  const imgRect = object.getBoundingClientRect();
  head.style.top = imgRect.top + 'px';
  head.style.left = imgRect.left + 'px';
  head.style.zIndex = "10";
}

function removeHead(object) {
  var head = object.parentElement.querySelector('div.head');
  if (head) {
    object.parentElement.removeChild(head);
  }
}

