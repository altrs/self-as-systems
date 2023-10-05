//https://www.w3schools.com/howto/howto_js_draggable.asp
//https://jsfiddle.net/4e3TY/
//https://stackoverflow.com/questions/5419459/how-to-allow-only-one-radio-button-to-be-checked
//https://www.infoworld.com/article/2077176/using-javascript-and-forms.html
//https://www.w3schools.com/jsref/prop_radio_checked.asp
//https://stackoverflow.com/questions/3397113/how-to-remove-focus-border-outline-around-text-input-boxes-chrome

//SOUND
const button = document.querySelector("#button");
const audio = document.querySelector("audio");
const binAudio = document.getElementById("bin");

const pencilSound = document.getElementById("pencil");
const generateSound = document.getElementById("comp");
const beepSound = document.getElementById("beep");
const mailSound = document.getElementById("mail");
const robot = document.getElementById("robot");

function openPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "block";
}
function closePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}
window.onload = openPopup;

button.addEventListener("click", () => {
    audio.volume = 0.2;
    audio.loop = true;
    audio.play();
    binAudio.play();
});

// DRAG ELLEMENT DRAG ELEMNET DRAG ELLEMENT DRAG ELEMNET DRAG ELLEMENT DRAG ELEMNET
// DRAG ELLEMENT DRAG ELEMNET DRAG ELLEMENT DRAG ELEMNET DRAG ELLEMENT DRAG ELEMNET

let isDragging = false;

dragElement(document.getElementById("movable"));
document.getElementById("movable").style.top = "50px";
document.getElementById("movable").style.left = "135px";
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    generateSound.play();
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
    isDragging = true;

    if (isDragging) {
      // const randomInterval = Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000;
      // setInterval(displayRandomImage, randomInterval);
      document.body.style.backgroundImage = "url('assets/looking.gif')";
      setInterval(displayRandomImage, 500);
    }

  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    console.log("dragging");
    
    // boundaries of headspace
    var parent = document.getElementById("head-space");
    var parentRect = parent.getBoundingClientRect();
    var minX = 0;
    var maxX = parentRect.right - elmnt.offsetWidth - 21;
    var minY = 0;
    var maxY = parentRect.bottom - elmnt.offsetHeight - 20;
    
    // calc new position inside head-space
    var newX = elmnt.offsetLeft - pos1;
    var newY = elmnt.offsetTop - pos2;
    newX = Math.min(Math.max(newX, minX), maxX);
    newY = Math.min(Math.max(newY, minY), maxY);
    elmnt.style.top = newY + "px";
    elmnt.style.left = newX + "px";
  }

  function closeDragElement() {
    document.body.style.backgroundImage = "url('assets/background_idle.gif')";
    generateSound.pause();
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
  'assets/objects/gem.png',
  'assets/objects/mite.png',
  'assets/objects/coffee.png',
  'assets/objects/tooth.png',
  'assets/objects/cd.png',
  'assets/objects/plant.png',
  'assets/objects/bottle.png',
  'assets/objects/bear.png',
  'assets/objects/shell.png',
  'assets/objects/human.png',
  'assets/objects/spoon.png',
  'assets/objects/cicada.png',
  'assets/objects/rock.png',
  'assets/objects/plate.png'
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

    img.style.width = Math.floor(Math.random() * 100) + 50 + 'px';

    const objectIndex = objects.length;
    objects.push(img);
    console.log("array: " + objects.length);

    // message popup on object click
    img.addEventListener('click', async function(event) {
      console.log("Image clicked! : " + objectIndex);
      beepSound.play();

      //if(messageDisplaying == false){

          // create message div
          var messageDiv = document.createElement('div');
          const imgRect = this.getBoundingClientRect();
          messageDiv.style.top =  imgRect.top + 'px';
          messageDiv.style.left = imgRect.left + 70 + 'px';
          messageDiv.style.zIndex = "5";
          messageDiv.style.position = 'absolute';
          messageDiv.style.width = '150px';
          messageDiv.style.height = 'auto';
          messageDiv.style.border = '1px solid';
          messageDiv.style.padding = '10px';
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
      //}

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
    questionDiv.style.right = "-470px";
    open = false;
  }
});


//ASSESS QUESTIONAIRE ASSESS QUESTIONAIRE ASSESS QUESTIONAIRE ASSESS QUESTIONAIRE ASSESS
//ASSESS QUESTIONAIRE ASSESS QUESTIONAIRE ASSESS QUESTIONAIRE ASSESS QUESTIONAIRE ASSESS

var questions = ['', '', '', '', '', '', '', '', '','','','','','','','',''];  
var nonbinaryScore = 0; // the higher it is, the  more heads
var form = document.getElementsByClassName("questions");

questionDiv.addEventListener('click', async function(event) {
//form.onchange = function(){

  pencilSound.play();

  const radioButtons1 = document.querySelectorAll('input[name="q1-input"]');
  const radioButtons2 = document.querySelectorAll('input[name="q2-input"]');
  const radioButtons3 = document.querySelectorAll('input[name="q3-input"]');
  const radioButtons4 = document.querySelectorAll('input[name="q4-input"]');
  const radioButtons5 = document.querySelectorAll('input[name="q5-input"]');
  const radioButtons6 = document.querySelectorAll('input[name="q6-input"]');
  const radioButtons7 = document.querySelectorAll('input[name="q7-input"]');
  const radioButtons8 = document.querySelectorAll('input[name="q8-input"]');
  const radioButtons9 = document.querySelectorAll('input[name="q9-input"]');
  const radioButtons10 = document.querySelectorAll('input[name="q10-input"]');
  const radioButtons11 = document.querySelectorAll('input[name="q11-input"]');
  const radioButtons12 = document.querySelectorAll('input[name="q12-input"]');
  const radioButtons13 = document.querySelectorAll('input[name="q13-input"]');
  const radioButtons14 = document.querySelectorAll('input[name="q14-input"]');
  const radioButtons15 = document.querySelectorAll('input[name="q15-input"]');
  const radioButtons16 = document.querySelectorAll('input[name="q16-input"]');
  const radioButtons17 = document.querySelectorAll('input[name="q17-input"]');

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
    for (const radioButton7 of radioButtons7) {
        if (radioButton7.checked) {
          questions[6] = radioButton7.value;
          break;
        }
    }
    for (const radioButton8 of radioButtons8) {
        if (radioButton8.checked) {
          questions[7] = radioButton8.value;
          break;
        }
    }
    for (const radioButton9 of radioButtons9) {
        if (radioButton9.checked) {
          questions[8] = radioButton9.value;
          break;
        }
    }
    for (const radioButton10 of radioButtons10) {
        if (radioButton10.checked) {
          questions[9] = radioButton10.value;
          break;
        }
    }
    for (const radioButton11 of radioButtons11) {
        if (radioButton11.checked) {
          questions[10] = radioButton11.value;
          break;
        }
    }
    for (const radioButton12 of radioButtons12) {
        if (radioButton12.checked) {
          questions[11] = radioButton12.value;
          break;
        }
    }
    for (const radioButton13 of radioButtons13) {
        if (radioButton13.checked) {
          questions[12] = radioButton13.value;
          break;
        }
    }
    for (const radioButton14 of radioButtons14) {
        if (radioButton14.checked) {
          questions[13] = radioButton14.value;
          break;
        }
    }
    for (const radioButton15 of radioButtons15) {
        if (radioButton15.checked) {
          questions[14] = radioButton15.value;
          break;
        }
    }
    for (const radioButton16 of radioButtons16) {
        if (radioButton16.checked) {
          questions[15] = radioButton16.value;
          break;
        }
    }
    for (const radioButton17 of radioButtons17) {
        if (radioButton17.checked) {
          questions[16] = radioButton17.value;
          break;
        }
    }

  var result = hasNoNullOrEmptySpaces(questions);

  if(result){ //if quiz is complete
    console.log("QUIZ COMPLETE");
    showResults();
  }else{
    console.log("QUIZ UNFINISHED");
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
var objectsAreTalking = false;
const binary = document.getElementById("binary");

function updateHeads() {

  for (var i = 0; i < objects.length; i++) {
    removeTalking(objects[i]);
  }

  // calculate the number of heads based on nonbinaryScore
  var numHeads = 0;
  if (nonbinaryScore >= 15) {
    if(nonbinaryScore === 17){
      // change images to be all the same
    }
    numHeads = objects.length;
    console.log("All objects");
    for (var i = 0; i < 5; i++) {
      const randomDelay = (Math.random() * 2000) + 1000;
      setTimeout(objectsTalk, randomDelay);
      emails++;
      objectsAreTalking = true;
    }
  } else if (nonbinaryScore >= 12) {
    numHeads = Math.floor(objects.length * 0.8);
    console.log("80% of objects");
    for (var i = 0; i < 2; i++) {
      const randomDelay = (Math.random() * 2000) + 1000;
      setTimeout(objectsTalk, randomDelay);
      emails++;
    }
    objectsAreTalking = false;
  } else if (nonbinaryScore >= 9) {
    numHeads = Math.floor(objects.length * 0.6);
    const randomDelay = (Math.random() * 2000) + 1000;
    setTimeout(objectsTalk, randomDelay);
    emails++;
    console.log("60% of objects");
  } else if (nonbinaryScore >= 6) {
    numHeads = Math.floor(objects.length * 0.4);
    objectsTalk();
    binary.style.display = 'none';
    console.log("40% of objects");
  } else if (nonbinaryScore >= 3) {
    numHeads = Math.floor(objects.length * 0.2);
    binary.style.display = 'block';
    console.log("40% of objects");
  } else if (nonbinaryScore >= 0) {
    numHeads = 0;
    console.log("40% of objects");
  }

  for (var i = 0; i < objects.length; i++) {
    removeHead(objects[i]);
  }

  // create and position the calculated num of heads for objects
  for (var i = 0; i < numHeads; i++) {
    console.log("adding head: " + i);
    createAndPositionHead(objects[i]);
  }
  console.log("numHeads: " + numHeads);
}


function createAndPositionHead(object) {
  var head = document.createElement("div");
  head.className = "head";
  head.style.backgroundImage = "url(assets/sprout.png)";
  head.style.backgroundSize = "contain";
  head.style.position = 'absolute';
  head.style.width = '60px';
  head.style.height = '60px';
  // head.style.border = '1px solid';
  object.parentElement.appendChild(head);
  const imgRect = object.getBoundingClientRect();
  head.style.top = imgRect.top - 70 + 'px';
  head.style.left = imgRect.left + 10 + 'px';
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
  mailSound.play();

  randomIndex = Math.floor(Math.random() * objects.length);
  var email = document.createElement("div");
  email.className = "email";
  email.style.backgroundImage = "url(assets/mail.png)";
  email.style.backgroundSize = "cover";
  email.style.position = 'absolute';
  email.style.width = '40px';
  email.style.height = '30px';

  // append  email element to the object at random index
  const selectedObject = objects[randomIndex];
  const existingEmail = selectedObject.parentElement.querySelector('.email');

  selectedObject.parentElement.appendChild(email);

  const imgRect = selectedObject.getBoundingClientRect();
  email.style.top = imgRect.top - 50 + 'px';
  email.style.left = imgRect.left + 40 + 'px';
  email.style.zIndex = "15";

  email.addEventListener("click", openMail);
}

function removeTalking(object) {
  var email = object.parentElement.querySelector('div.email');
  if (email) {object.parentElement.removeChild(email);}
  //updateHeads();
  console.log(email);
}

const textDocumentURL2 = 'assets/email-random-text.txt';

async function openMail() {
  console.log("OPEN MAIL");
  removeTalking(this);
  emails--;

  robot.play();

  //popup
  var email_popup = document.createElement("div");
  email_popup.className = "email_popup";
  email_popup.style.width = '300px';
  email_popup.style.height = '200px';
  email_popup.style.border = '1px solid';
  email_popup.style.position = "fixed";
  email_popup.style.top = "50%";
  email_popup.style.left = "50%";
  email_popup.style.transform = "translate(-50%, -50%)";
  email_popup.style.zIndex = "20";
  email_popup.style.backgroundColor = "white";
  email_popup.style.padding = "30px";
  email_popup.style.paddingTop = "60px";

  document.body.appendChild(email_popup);

  //messgage
  var emailMessage = document.createElement('p');
  const emailResponse = await fetch(textDocumentURL2);
  const emailText = await emailResponse.text();
  const emailLines = emailText.split('\n');
  const emailRandomIndices = getRandomIndices(emailLines.length, 3);
  console.log("LINE: " + emailLines[emailRandomIndices[0]]);
  emailMessage.textContent = emailLines[emailRandomIndices[0]];
  emailMessage.style.fontStyle = "italic";

  email_popup.appendChild(emailMessage);
  //this.parentElement.appendChild(email_popup);

  //close
  var close = document.createElement("div");
  close.className = "close";
  close.style.width = '30px';
  close.style.height = '30px';
  close.style.border = '1px solid';
  close.style.position = 'absolute';
  close.style.top = '10px';
  close.style.right = '10px';
  close.style.backgroundImage = "url('assets/x.png')";
  close.style.backgroundSize = "cover";
  email_popup.appendChild(close);
  
  close.addEventListener('click', function() {
    robot.pause();
    document.body.removeChild(email_popup);
  });
}

function updateEmails(){
  if(objectsAreTalking){
    if(emails < 1){
      var randomNum = (Math.random() * 4);
      for (var i = 0; i < randomNum; i++) {
        console.log("generating emails: " + randomNum);
        const randomDelay = (Math.random() * 2000) + 1000;
        setTimeout(objectsTalk, randomDelay);
        emails++;
      }
    }
  }
  if(emails < (objects.length/2) && objectsAreTalking){
    setTimeout(objectsTalk, 3000);
  }
}

setInterval(updateEmails, 1000);


async function showResults(){
  var finPopup = document.createElement("div");

    finPopup.className = "finPopup";
    finPopup.style.width = '300px';
    finPopup.style.height = '200px';
    finPopup.style.border = '1px solid';
    finPopup.style.position = "fixed";
    finPopup.style.top = "50%";
    finPopup.style.left = "50%";
    finPopup.style.transform = "translate(-50%, -50%)";
    finPopup.style.zIndex = "20";
    finPopup.style.backgroundColor = "white";
    finPopup.style.padding = "30px";
    finPopup.style.paddingTop = "60px";
    finPopup.style.textAlign = "center";

    document.body.appendChild(finPopup);

    //messgage
    var quizResults = document.createElement('p');
    var scoreSummary1 = -(nonbinaryScore-17) / 17 * 100; //2ND SYSTEM OF THOUGHT LEANING
    var scoreSummary2 = nonbinaryScore / 17 * 100; //2ND SYSTEM OF THOUGHT LEANING
    quizResults.innerHTML = "QUIZ RESULTS:<br><br>" + scoreSummary1 + "% BINARY LEANING<br>" + scoreSummary2 + "% NUANCE LEANING.<br><br>Feel free to change your answers at any time; see how your answers change the object's behaviors.";

    finPopup.appendChild(quizResults);

    //close
    var closeR = document.createElement("div");
    closeR.className = "close";
    closeR.style.width = '30px';
    closeR.style.height = '30px';
    closeR.style.border = '1px solid';
    closeR.style.position = 'absolute';
    closeR.style.top = '10px';
    closeR.style.right = '10px';
    closeR.style.backgroundImage = "url('assets/x.png')";
    closeR.style.backgroundSize = "cover";
    finPopup.appendChild(closeR);
    
    closeR.addEventListener('click', function() {
      document.body.removeChild(finPopup);
    });
}


function hasNoNullOrEmptySpaces(arr) {
  return arr.every(element => element !== null && element !== "");
}