
var display = document.getElementById('display');

function press(val) {
    if(val === 'X') val = '*'
    display.value = display.value += val;
}

function clearDisplay() {
    display.value = "";
}

function delChar() {
    display.value = display.value.slice(0,-1);
}

function calculate () {
    var text = display.value;

    var opt = '+-/*.%'

    if (text === "") {
        display.value = "" ;
        alert('Please enter a number and operator!');
        return;
    }else if(opt.includes(text[0])  ||  opt.includes(text[text.length -1])) {
        display.value = "Error";
        return;
    }

    var errorFound = false;

    for(var i = 0; i < text.length -1; i++) {
        if(opt.includes(text[i]) && opt.includes(text[i + 1])) {
            errorFound = true;
            break;
        }
    }

    text = text.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
    
    if(errorFound) {
        display.value = 'Error';
    }
    else {
        display.value = eval(text);
    }

    try {
      var result = Function('"use strict"; return (' + text + ')')();
      if (result === Infinity || result === -Infinity || Number.isNaN(result)) {
        display.value = "Error";
      } else {
        display.value = result;
      }
    } catch (e) {
      display.value = "Error";
    }

}

