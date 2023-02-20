const mainDisplay = document.querySelector(".main");
const historyDisplay = document.querySelector(".history");
const history = [];

const numbers = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  decimal: ".",
};

const operators = {
  plus: '+',
  minus: '-',
  multiply: '*',
  divide: '/',
  power: '^',
};

const keyboardToId = {
  "Escape": "AC",
  "^": "power",
  "/": "divide",
  "7": "seven",
  "8": "eight",
  "9": "nine",
  "*": "multiply",
  "4": "four",
  "5": "five",
  "6": "six",
  "-": "minus",
  "1": "one",
  "2": "two",
  "3": "three",
  "+": "plus",
  "0": "zero",
  ".": "decimal",
  "Backspace": "del",
  "=": "equal",
  "Enter": "equal",
}

const addNumberToMainDisplay = (number) => {
  mainDisplay.innerHTML = mainDisplay.innerHTML + number;
};

const displayHistory = () => {
  let equation = "";

  for (let index = 0; index < history.length; index++) {
    const element = history[index];
    if (!isNaN(element) && element < 0) {
      equation += `(${element}) `;
    } else {
      equation += element + ' ';
    }
  }
  historyDisplay.innerHTML = equation;
}

const addOperatorToMainDisplay = (operator) => {
  history.push(Number(mainDisplay.innerHTML));
  history.push(operator);

  console.log(history);

  displayHistory();
  mainDisplay.innerHTML = "";
};

const performOperation = (term1, operator, term2) => {
  if (operator === '+') {
    return term1 + term2;
  } else if (operator === '-') {
    return term1 - term2;
  } else if (operator === '*') {
    return term1 * term2;
  } else if (operator === '/') {
    return term1 / term2;
  } else if (operator === '^') {
    return Math.pow(term1, term2);
  }
};

const calculate = () => {
  //Push current number into history
  if (mainDisplay.innerHTML.length > 0) {
    history.push(Number(mainDisplay.innerHTML));
    displayHistory();
    mainDisplay.innerHTML = "";
  }

  let result = 0;
  if (history.length >= 3) {
    for (let index = 2; index <= history.length - 1; index = index + 2) {
      const term1 = history[index - 2];
      const operator = history[index - 1];
      const term2 = history[index];
      console.log(term1, operator, term2);
      result = performOperation(term1, operator, term2);
      console.log(result);
    }

    if (result === Infinity) {
      console.log("inside infinity");
      result = '∞ & beyond!';
    }

    //Convert to expnential if number is long
    if (result.toString().length > 11) {
      result = result.toExponential(4);
    }

    mainDisplay.innerHTML = result;
    history.length = 0;
  }
};

const resetCalculator = () => {
  mainDisplay.innerHTML = "";
  historyDisplay.innerHTML = "";
  history.length = 0;
};

const deleteLastCharFromMainDisplay = () => {
  console.log(history);
  if (mainDisplay.innerHTML.length > 0) {
    mainDisplay.innerHTML = mainDisplay.innerHTML.substring(0, mainDisplay.innerHTML.length - 1);
  } else if (history.length > 0) {
    history.pop();
    displayHistory();
  }
  console.log(history);
};

const toggleSign = () => {
  let currentNumber = mainDisplay.innerHTML;
  if (currentNumber.length > 0) {
    if (currentNumber.startsWith("-")) {
      mainDisplay.innerHTML = currentNumber.slice(1);
    } else {
      mainDisplay.innerHTML = '-' + currentNumber;
    }
  }
};

const parseClickKey = (keyId) => {
  //Reset Calculator
  if (keyId === "AC") {
    resetCalculator();
    return;
  }
  //Del key
  if (keyId === "del") {
    deleteLastCharFromMainDisplay();
    return;
  }
  //Sign Key
  if (keyId === "sign") {
    toggleSign();
    return;
  }

  if (Object.hasOwn(numbers, keyId)) {
    addNumberToMainDisplay(numbers[keyId]);
  } else if (Object.hasOwn(operators, keyId)) {
    addOperatorToMainDisplay(operators[keyId]);
  }
  //End Calculation
  if (keyId === 'equal') {
    console.log(history);
    calculate();
  }
};

const keyClick = (event) => {
  // console.log(event.target.id);
  parseClickKey(event.target.id);
};

const keyUp = (event) => {
  //console.log(event.key, event.code);
  //Convert keyUp to key.id and call parseClickKey()
  if (Object.hasOwn(keyboardToId, event.key)) {
    parseClickKey(keyboardToId[event.key]);
  }
};

const allKeys = document.querySelectorAll('.key');
allKeys.forEach(key => {
  key.addEventListener('click', keyClick);
});

document.addEventListener('keyup', keyUp);
