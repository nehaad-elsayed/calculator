// //* Global ***********************//

const screen = document.getElementById("displayResult");
const calcBtns = document.querySelector(".calc-btns");
const btnEqual = document.getElementById("btnEqual");
let currentNumber = "0";
let previousNum = 0;
let prevOperator;

// //* Events ***********************//

calcBtns.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;
  let number = e.target.textContent.trim(); 
  buttonClick(number);
});

// //* functions ***********************//

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbols(value);
  } else {
    handleNumber(value);
  }
  updateScreen();
}

function handleMath(value) {
  if (currentNumber === "0") {
    return;
  }

  const intCurrentNumber = parseInt(currentNumber);
  if (previousNum === 0) {
    previousNum = intCurrentNumber;
  } else {
    excuteOperation(intCurrentNumber);
  }
  prevOperator = value;
  currentNumber = "0";
}

function excuteOperation(intCurrentNumber) {
  if (prevOperator === "+") {
    previousNum += intCurrentNumber;
  } else if (prevOperator === "-") {
    previousNum -= intCurrentNumber;
  } else if (prevOperator === "×") {
    previousNum *= intCurrentNumber;
  } else if (prevOperator === "÷") {
    if (intCurrentNumber === 0) {
      previousNum = "error"; 
    } else {
      previousNum /= intCurrentNumber;
    }
  }
}
function handleNumber(number) {
  if (currentNumber === "0") {
    currentNumber = number;
  } else {
    currentNumber += number;
  }
}

function handleSymbols(symbol) {
  switch (symbol) {
    case "C":
      currentNumber = "0";
      previousNum = 0;
      prevOperator = null;
      break;
    case "←":
      if (currentNumber === "0") {
        return;
      }
      if (currentNumber.length === 1) {
        currentNumber = "0";
      } else {
        currentNumber = currentNumber.slice(0, -1);
      }
      break;

    case "÷":
    case "×":
    case "-":
    case "+":
      handleMath(symbol);
      break;
    case "=":
      if (prevOperator === null) {
        return;
      } else {
        excuteOperation(parseInt(currentNumber));
        prevOperator = null;
        if (typeof previousNum === "string") {
          currentNumber = previousNum;
          previousNum = 0;
        } else {
          currentNumber = previousNum.toString();
          previousNum = 0;
        }
        updateScreen(); 
      }
      break;
  }
}

function updateScreen() {
  screen.textContent = currentNumber;
}
