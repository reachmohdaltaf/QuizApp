// selecting all element

const resultBox = document.querySelector(".resultbox");

const startbtn = document.querySelector(".start-btn");
const infobox = document.querySelector(".info-box");
const exitbtn = infobox.querySelector(".quit");

const contbtn = infobox.querySelector(".restart");

const quizbox = document.querySelector(".quizbox");
const optionlist = document.querySelector(".option-list");
const nextbtn = document.querySelector("footer .nextbtn");
const timer = document.querySelector(".navbar .timer span");
const quitbtn = resultBox.querySelector(".quit");
const restartbtn = resultBox.querySelector(".restart")

const resultscore = document.querySelector(".score");
const clickSound = new Audio('assets/sounds/1.wav'); // Update the path to your sound file

// if quiz button is clicked then

startbtn.addEventListener("click", () => {
  clickSound.play(); // Play sound on click
  infobox.style.display = "block";
  startbtn.style.display = "none";
});

exitbtn.addEventListener("click", () => {
  clickSound.play(); // Play sound on click
  infobox.style.display = "none";
  startbtn.style.display = "block";
});

contbtn.addEventListener("click", () => {
  clickSound.play(); // Play sound on click
  infobox.style.display = "none";
  quizbox.style.display = "block";

  showQuestion(0);
  counter(1);
});

let count = 0;
let score = 0;
let quecounter = 1;

let interval;

const disableOptions = () => {
  const allOptions = optionlist.children.length;
  for (let i = 0; i < allOptions; i++) {
    optionlist.children[i].classList.add("disabled");
  }
};

const showQuestion = (index) => {
  timer.innerText = "5";
  const question = document.querySelector(".question");
  const optionstag = `<button class="options ">${questions[index].options[0]}</button>
                      <button class="options ">${questions[index].options[1]}</button>
                      <button class="options ">${questions[index].options[2]}</button>
                      <button class="options ">${questions[index].options[3]}</button>`;
  question.innerHTML = `<h1>${questions[index].question}</h1>`;

  optionlist.innerHTML = optionstag;

  const option = optionlist.querySelectorAll(".options");
  console.log(option);

  clearInterval(interval);
  interval = setInterval(() => {
    if (timer.innerText !== "0") timer.innerText = Number(timer.innerText) - 1;
    else {
      clearInterval(interval);
      optionSelected(null);
      disableOptions();
    }
  }, 1000);

  for (i = 0; i < option.length; i++) {
    console.log(option[i]);
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
};

let tick = `<div class="tick"><i class="fa fa-check-circle" style="font-size: 20px"></i></div>`;
let wrong = `<div class = "wrong"><i class="fa fa-close" style="font-size: 20px;"></i></div>`;

const optionSelected = (answer) => {
  if (!answer || optionlist.classList.contains("disabled")) {
    return;
  }
  const userAns = answer.textContent;
  const correctAns = questions[count].answers;

  clearInterval(interval);
  if (userAns == correctAns) {
    score++;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tick);
    console.log("correct answer");
    console.log(`your score is ${score}`);
  } else {
    console.log("wrong anser");
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", wrong);
  }
  disableOptions();
};

const counter = (index) => {
  let total = ` <span><p>${index}</p> of <p>${questions.length}</p> question</span>`;
  qcounter.innerHTML = total;
};

const qcounter = document.querySelector("footer .totalquestion");
nextbtn.onclick = () => {
  if (count < questions.length - 1) {
    count++;
    showQuestion(count);
    quecounter++;
    console.log(quecounter);
    if (quecounter == questions.length) {
      if ((nextbtn.innerText = "Finish")) {
      }
    }
    counter(quecounter);
  } else {
    finishQuiz()
   
  }
};

const finishQuiz = () => {
  // Check if finish button already exists
  let finishBtn = document.querySelector(".finish-btn");
  if (!finishBtn) {
    finishBtn = document.createElement("button");
    finishBtn.classList.add("finish-btn"); // Add a class to identify it
    finishBtn.innerText = "Finish"; // Set text for finish button

    finishBtn.onclick = () => {
      // Add any logic for when the finish button is clicked
      console.log("Finish button clicked");
    };

    // Append the finish button to the footer
    document.querySelector("footer").appendChild(finishBtn);
  }

  nextbtn.style.display = "none"; // Hide the next button
  quizbox.style.display = "none"; // Hide the quizbox
  resultBox.style.display = "block"; // Show result box
  resultscore.innerText = `You got ${score} out of ${quecounter}`;
  
  console.log("Question completed");
};



quitbtn.addEventListener("click", () => {
  resultBox.style.display = "none";
  startbtn.style.display = "block";
  count = 0;
  score = 0;
  quecounter = 1;
  nextbtn.style.display = "inline-block"; 
  nextbtn.innerText = "Next";          
  nextbtn.style.margin = "0";          
  nextbtn.style.float = "none";
  const finishBtn = document.querySelector(".finish-btn");
if (finishBtn) {
  finishBtn.remove();
}
}); 


restartbtn.addEventListener('click', () => {
  resultBox.style.display = "none";  
  startbtn.style.display = "none";     
  infobox.style.display = "block";     
  
  // Reset next button styles
  nextbtn.style.display = "inline-block"; 
  nextbtn.innerText = "Next";          
  nextbtn.style.margin = "0";          
  nextbtn.style.float = "none"; // Add this line

  // Reset game variables
  count = 0;
  score = 0;
  quecounter = 1;
  const finishBtn = document.querySelector(".finish-btn");
if (finishBtn) {
  finishBtn.remove();
}

});
