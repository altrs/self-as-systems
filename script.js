//https://www.w3schools.com/howto/howto_js_draggable.asp
//https://jsfiddle.net/4e3TY/
//https://stackoverflow.com/questions/5419459/how-to-allow-only-one-radio-button-to-be-checked
//https://www.infoworld.com/article/2077176/using-javascript-and-forms.html
//https://www.w3schools.com/jsref/prop_radio_checked.asp


// DRAG ELLEMENT DRAG ELEMNET DRAG ELLEMENT DRAG ELEMNET DRAG ELLEMENT DRAG ELEMNET
// DRAG ELLEMENT DRAG ELEMNET DRAG ELLEMENT DRAG ELEMNET DRAG ELLEMENT DRAG ELEMNET
let isDragging = false;

dragElement(document.getElementById("movable"));
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX; // get the mouse cursor position at startup:
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
    isDragging = true;

    if (isDragging) {
      // const randomInterval = Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000;
      // setInterval(displayRandomImage, randomInterval);
      setInterval(displayRandomImage, 500);
    }

  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX; // calc new cursor position:
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    console.log("dragging");
    
    // boundaries of headspace
    var parent = document.getElementById("head-space");
    var parentRect = parent.getBoundingClientRect();
    var minX = parentRect.left-15;
    var maxX = parentRect.right - elmnt.offsetWidth;
    var minY = parentRect.top-14;
    var maxY = parentRect.bottom - elmnt.offsetHeight;
    
    // calc new position inside head-space
    var newX = elmnt.offsetLeft - pos1;
    var newY = elmnt.offsetTop - pos2;
    newX = Math.min(Math.max(newX, minX), maxX);
    newY = Math.min(Math.max(newY, minY), maxY);
    elmnt.style.top = newY + "px";
    elmnt.style.left = newX + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    isDragging = false;
  }

}

//DISPLAY OBJECTS DISPLAY OBJECTS DISPLAY OBJECTS DISPLAY OBJECTS DISPLAY OBJECTS
//DISPLAY OBJECTS DISPLAY OBJECTS DISPLAY OBJECTS DISPLAY OBJECTS DISPLAY OBJECTS

const textDocumentURL = 'assets/random-text.txt';
let messageDisplaying = false;
var objectsCount = 0;
var objects = [];
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
    objectsCount++;
    console.log("OBJECT COUNT " + objectsCount);
    img.src = randomImageUrl;
    
    // set random position within container
    var imgx = Math.floor(Math.random() * (imgContainer.offsetWidth - 50)) + 'px';
    var imgy = Math.floor(Math.random() * (imgContainer.offsetHeight - 50)) + 'px';
    img.style.left = imgx;
    img.style.top = imgy;

    const objectIndex = objects.length;
    objects.push(img);
    console.log("array: " + objects.length);

    // message popup on object click
    img.addEventListener('click', async function(event) {
      console.log("Image clicked! : " + objectIndex);

      if(messageDisplaying == false){

          // create message div
          var messageDiv = document.createElement('div');
          const imgRect = this.getBoundingClientRect(); // position of the clicked image
          messageDiv.style.top =  imgRect.top + 'px';
          messageDiv.style.left = imgRect.left + 60 + 'px';
          messageDiv.style.zIndex = "5";
          messageDiv.style.position = 'absolute';
          messageDiv.style.width = '150px';
          messageDiv.style.height = 'auto';
          messageDiv.style.border = '1px solid';
          messageDiv.style.backgroundColor = "white";
          
          // fetch random line for message
          var message = document.createElement('p');
          const response = await fetch(textDocumentURL);
          const text = await response.text();
          const lines = text.split('\n');
          const randomIndices = getRandomIndices(lines.length, 3);
          console.log("LINE: " + lines[randomIndices[0]]);
          message.textContent = lines[randomIndices[0]];
          message.style.fontStyle = "italic";

          messageDiv.appendChild(message);
          this.parentElement.appendChild(messageDiv);
          messageDisplaying = true;
          setTimeout(function() {messageDiv.remove(); messageDisplaying = false;}, 5000);
      }

    });
    imgContainer.appendChild(img);
  }
}

//RANDOM TEXT RANDOM TEXT RANDOM TEXT RANDOM TEXT RANDOM TEXT RANDOM TEXT RANDOM TEXT
//RANDOM TEXT RANDOM TEXT RANDOM TEXT RANDOM TEXT RANDOM TEXT RANDOM TEXT RANDOM TEXT
function getRandomIndices(max, count) {
  const indices = [];
  while (indices.length < count) {
    const randomIndex = Math.floor(Math.random() * max);
    if (!indices.includes(randomIndex)) {indices.push(randomIndex);}
  }
  return indices;
}


//------------------------------------------------------------------------------------------


//QUESTION TAB QUESTION TAB QUESTION TAB QUESTION TAB QUESTION TAB QUESTION TAB QUESTION TAB
//QUESTION TAB QUESTION TAB QUESTION TAB QUESTION TAB QUESTION TAB QUESTION TAB QUESTION TAB
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


//ASSESS QUESTIONAIRE ASSESS QUESTIONAIRE ASSESS QUESTIONAIRE ASSESS QUESTIONAIRE ASSESS
//ASSESS QUESTIONAIRE ASSESS QUESTIONAIRE ASSESS QUESTIONAIRE ASSESS QUESTIONAIRE ASSESS

var questions = ['', '', '', '', '', '']; // where selections will be stored  
var nonbinaryScore = 0; // the higher it is, the  more heads
var form = document.getElementsByClassName("questions");

questionDiv.addEventListener('click', async function(event) {
//form.onchange = function(){

  const radioButtons1 = document.querySelectorAll('input[name="q1-input"]');
  const radioButtons2 = document.querySelectorAll('input[name="q2-input"]');
  const radioButtons3 = document.querySelectorAll('input[name="q3-input"]');
  const radioButtons4 = document.querySelectorAll('input[name="q4-input"]');
  const radioButtons5 = document.querySelectorAll('input[name="q5-input"]');
  const radioButtons6 = document.querySelectorAll('input[name="q6-input"]');

    for (const radioButton1 of radioButtons1) {
        if (radioButton1.checked) {
          questions[0] = radioButton1.value;
          break;
        }
    }
    for (const radioButton2 of radioButtons2) {
        if (radioButton2.checked) {
          questions[1] = radioButton2.value;
          break;
        }
    }
    for (const radioButton3 of radioButtons3) {
        if (radioButton3.checked) {
          questions[2] = radioButton3.value;
          break;
        }
    }
    for (const radioButton4 of radioButtons4) {
        if (radioButton4.checked) {
          questions[3] = radioButton4.value;
          break;
        }
    }
    for (const radioButton5 of radioButtons5) {
        if (radioButton5.checked) {
          questions[4] = radioButton5.value;
          break;
        }
    }
    for (const radioButton6 of radioButtons6) {
        if (radioButton6.checked) {
          questions[5] = radioButton6.value;
          break;
        }
    }

  console.log('Questions:', questions);
  updateQuestionScore();
});
//}

function updateQuestionScore() {
  nonbinaryScore = questions.filter(value => value === 'nonbinary').length;
  console.log("Score: " + nonbinaryScore);
  updateHeads();
}

//--------------------------------------------------------------------------------------------


//CREATE HEADS CREATE HEADS CREATE HEADS CREATE HEADS CREATE HEADS CREATE HEADS CREATE HEADS 
//CREATE HEADS CREATE HEADS CREATE HEADS CREATE HEADS CREATE HEADS CREATE HEADS CREATE HEADS 

var emails = 0;

function updateHeads() {

  for (var i = 0; i < objects.length; i++) {
    removeTalking(objects[i]);
  }

  // Calculate the number of heads based on nonbinaryScore
  var numHeads = 0;
  if (nonbinaryScore >= 6) {
    numHeads = objects.length;
    console.log("All objects");
    for (var i = 0; i < 5; i++) {
      const randomDelay = (Math.random() * 2000) + 1000; // Random delay between 1 and 3 seconds
      setTimeout(objectsTalk, randomDelay);
      emails++;
    }
  } else if (nonbinaryScore >= 4) {
    numHeads = Math.floor(objects.length * 0.8);
    console.log("80% of objects");
  } else if (nonbinaryScore >= 1) {
    numHeads = Math.floor(objects.length * 0.6);
    console.log("60% of objects");
  } else if (nonbinaryScore === 0) {
    numHeads = Math.floor(objects.length * 0.4);
    console.log("40% of objects");
  }

  // Remove all heads from objects
  for (var i = 0; i < objects.length; i++) {
    removeHead(objects[i]);
  }

  // Create and position the calculated number of heads for objects
  for (var i = 0; i < numHeads; i++) {
    console.log("adding head: " + i);
    createAndPositionHead(objects[i]);
  }
  console.log("numHeads: " + numHeads);
}


function createAndPositionHead(object) {
  var head = document.createElement("div");
  head.className = "head";
  head.style.backgroundImage = "url(assets/test-imgs/head.png)";
  head.style.backgroundSize = "contain";
  head.style.position = 'absolute';
  head.style.width = '100px';
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
  if (head) {object.parentElement.removeChild(head);}
  console.log(head);
}


//OBJECTS TALK OBJECTS TALK OBJECTS TALK OBJECTS TALK OBJECTS TALK OBJECTS
//OBJECTS TALK OBJECTS TALK OBJECTS TALK OBJECTS TALK OBJECTS TALK OBJECTS

var randomIndex = 0;

function objectsTalk(){
  console.log("objects talking");

  randomIndex = Math.floor(Math.random() * objects.length);
  var email = document.createElement("div");
  email.className = "email";
  email.style.backgroundImage = "url(assets/test-imgs/mail.png)";
  email.style.backgroundSize = "contain";
  email.style.position = 'absolute';
  email.style.width = '50px';
  email.style.height = '50px';
  email.style.border = '1px solid';

  // Append the email element to the object at the random index
  const selectedObject = objects[randomIndex];
  const existingEmail = selectedObject.parentElement.querySelector('.email');

  selectedObject.parentElement.appendChild(email);

  // Position the email element relative to the selected object
  const imgRect = selectedObject.getBoundingClientRect();
  email.style.top = imgRect.top + 'px';
  email.style.left = imgRect.left + 'px';
  email.style.zIndex = "15";

  email.addEventListener("click", openMail);
}

function removeTalking(object) {
  var email = object.parentElement.querySelector('div.email');
  if (email) {object.parentElement.removeChild(email);}
  console.log(email);
}

function openMail(){
  
}





