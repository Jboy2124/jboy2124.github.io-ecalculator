let displayText = document.getElementById("display-text"); //use to display
let buttonList = Array.from(document.getElementsByClassName("btn")); //convert the div button class btn to array
// let operators = ["+","-","/","%","*"];
let collection = "";


buttonList.map(btn => { //mapping & adding the evenlistener to get the value btn
    btn.addEventListener("click", (event) => {
        let result = "";

        if(event.target.value == "C") {
            displayText.innerHTML = "";
        }
            
        else if (event.target.value == "←"){
            displayText.innerHTML = displayText.innerHTML.slice(0, -1);
        }

        else if (event.target.value == "=") {
                if(displayText.innerHTML.includes('÷')) {
                    result = (displayText.innerHTML.replace('÷','/'));

                }else if (displayText.innerHTML.includes('×')) {
                    result = (displayText.innerHTML.replace('×','*'));
                }
                else {
                    result = displayText.innerHTML;
                }
                let evalResult = evaluateCollection(result);
                // let evalResult = eval(result);
                displayText.innerHTML = evalResult;
            }
        else {
            displayText.innerHTML += event.target.value
        }
    });
});




let evaluateCollection = (collection) => {

    let result = "";
    let op = "";
    
    let opCount = 0;
    let opChar = "*/+-÷×%";

    for (let index = 0; index < collection.length; index++) {
        if(opChar.includes(collection[index])){
            opCount++;
        }
    }

    let opAtBeginning = collection.substring(0,1);
    let opAtEnd = collection.substring(collection.length - 1);

    for (const p of opChar) {
        if(p == opAtBeginning || p == opAtEnd) {
            result = "Invalid";
        } else if (opCount > 1) {
            result = "Invalid";
        } else {

            for (let i = 0; i < collection.length; i++) {
                if(opChar.includes(collection[i]))
                     op = collection[i];
            }
            let splitValue = collection.split(op);
            result = calculateValues(splitValue, op);           
        }
    }
    return result;
}





let calculateValues = (theValue, operator) => {
    let val1 = Number(theValue[0]);
    let val2 = Number(theValue[1]);
    let result = 0;

    switch(operator){
        case "+":
            result = val1 + val2;
            break;
        case "-":
            result = val1 - val2;
            break;
        case "/":
            result = val1 / val2;
            break;
        case "*":
            result = val1 * val2;
            break;
        case "%":
            result = val1 % val2;
            break;
        default:
            result = 0;
            break;
    }
    return (result.toString().length > 10) ? result.toFixed(10) : result;
}