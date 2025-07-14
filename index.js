// //* Global ***********************//

const screen = document.getElementById("displayResult");
const calcBtns = document.querySelector(".calc-btns");
const btnEqual = document.getElementById("btnEqual");
let currentNumber = "";
let totalValue = 0;
let prevOperator;

// //* Events ***********************//

calcBtns.addEventListener("click", (e) => {
  let number = e.target.textContent;
  buttonClick(number);
});

// //* functions ***********************//

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbols(value);
  } else {
    handleNumber(value);
  }
  updateScreen(); // عشان اعرض الرقم اللي هيكون في الشاشة اللي نتج من الداله handle number
}

function handleMath(value) {
  if (currentNumber === 0) {
    return;
  }

  const intCurrentNumber = parseInt(currentNumber);
  if (totalValue === 0) {
    totalValue = intCurrentNumber;
  } else {
    excuteOperation(intCurrentNumber);
  }

  prevOperator = value;
  currentNumber = "0";
  console.log(totalValue);
}

function excuteOperation(intCurrentNumber) {
  if (prevOperator === "+") {
    totalValue += intCurrentNumber;
  } else if (prevOperator === "-") {
    totalValue -= intCurrentNumber;
  } else if (prevOperator === "×") {
    totalValue *= intCurrentNumber;
  } else if (prevOperator === "÷") {
    totalValue /= intCurrentNumber;
  }
}
function handleNumber(number) {
  if (currentNumber == 0) {
    currentNumber = number;
  } else {
    currentNumber += number;
  }
  //   displayResult.textContent = currentNumber;
}

function handleSymbols(symbol) {
  switch (symbol) {
    case "C":
      currentNumber = 0;
      break;
    case "←":
      if (currentNumber === 0) {
        return;
      }
      if (currentNumber.length === 1) {
        currentNumber = 0;
      } else {
        currentNumber = currentNumber.slice(0, -1);
        // عندي طريقتين ارجع بيهم خطوه واقص التكست => currentNumber = currentNumber.substring(0, currentNumber.length - 1);
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
      }
      excuteOperation(parseInt(currentNumber));
      prevOperator = null;
      currentNumber = totalValue.toString();
      totalValue = 0;
      break;
  }
}

function updateScreen() {
  screen.textContent = currentNumber;
}
