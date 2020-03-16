
const screen = document.querySelector('.screen');
let buffer = "0";
let currentTotal = "0";
let previousOperator;
const button = document.querySelector('.calc-buttons');


// initial function listens for a click on all the buttons
function init() {
	button.addEventListener('click', function(event) {
		buttonClicked(event.target.innerText);
	});
}

init();

// check to see if value is a number or not, if it is, continue
function buttonClicked(value) {
	if (isNaN(parseInt(value))) {
		handleOperators(value);
		clear(value);
	} else {
		numberManage(value);
	}
	rerender();
}

// manage the inputted number into the calculator
function numberManage(value) {
	// if number is 0 replace it. Otherwise add to it
	if (buffer === "0") {
		buffer = value;
		// console.log(value);
	} else {
		buffer += value;
	}
	// if too many numbers inputted, stop allowing it
	// if (buffer.length > 10) buffer = buffer.substring(0,10);
	// return;

}

function handleMath(value) {
	if (buffer === "0") {
		//do nothing 
		return;
	}

	const bufferInt = parseInt(buffer);
	if (currentTotal === 0) {
		currentTotal = bufferInt;
	} else {
		mathCalculations(bufferInt);
	}

	previousOperator = value;	
	buffer = "0";

}


function mathCalculations(bufferInt) {
 	 if (previousOperator === "+") {
 	 	currentTotal += bufferInt;
 	 } else if (previousOperator === "-") {
 	 	currentTotal -= bufferInt;
 	 } else if (previousOperator === "×") {
 	 	currentTotal *= bufferInt;
 	 } else {
 	 	currentTotal /= bufferInt;
 	 }

}


function handleOperators(value) {
	switch (value) {
		case "=":
			if (previousOperator === null) {
				return;
			}
			mathCalculations(parseInt(buffer));
			previousOperator = null;
			buffer = +currentTotal;
			currentTotal = 0;
      		break;
		case "←":
			if (buffer.length === 1) {
				buffer = "0";
			} else {
				buffer = buffer.substring(0, buffer.length - 1);
			}
			break;
	    case "+":
	    case "-":
	    case "×":
	    case "÷":
      		handleMath(value);
      		break;
  	}
}


// if clear button is selected clear the screen and set it to 0 again
function clear(value) {
	// console.log(value);
	if(value === "C")
	{
		buffer = "0";
	}
}


// re runs everytime new button is clicked to update DOM
function rerender() {
	screen.innerText = buffer;
}
if (buffer.length > 10) buffer = buffer.substring(0,10);