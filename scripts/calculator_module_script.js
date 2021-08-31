function activateCalculator(){
    const calcWrapper = document.querySelector('#calculator-module-wrapper');
    const allButtons = document.querySelectorAll('#calculator-module .button');
    const numButtons = document.querySelectorAll('#calculator-module .value-button');
    const funcButtons = document.querySelectorAll('#calculator-module .function-button');
    const delButton = document.querySelector('#calculator-module .delete-button');
    const calcDisplay = document.querySelector('#calculator-module .display');
    let calculating = false;
    let value1;
    let value2;
    let mathType;
    let operators = {
        'plus': function(a, b){ return a + b },
        'minus': function(a, b){ return a - b },
        'times': function(a, b){ return a * b },
        'divide': function(a, b){ return a / b }
    }
    let displayValue = [];
    allButtons.forEach( button =>{
        button.addEventListener('mousedown', (e) =>{
            e.target.classList.add('clicking');
        });
        document.addEventListener('mouseup', () =>{
            allButtons.forEach( (button) =>{
                button.classList.remove('clicking');
            });
        });
    });
    numButtons.forEach( button =>{
        button.addEventListener('mousedown', (e) =>{
            updateDisplay(e.target.getAttribute('data-button-value'));
        });
    });
    delButton.addEventListener('click', () =>{
        displayValue.pop();
        updateDisplay();
    });
    funcButtons.forEach( button =>{
        button.addEventListener('click', (e) =>{
            e.target.classList.add('active');
            initMath(e.target.getAttribute('data-button-value'));
        });
    });
    function updateDisplay(numInput){
        if(calculating != true && value1 != undefined && numInput != undefined){
            value1 = undefined;
            value2 = undefined;
            displayValue = [0];
        }
        if(numInput != undefined){
            displayValue.push(numInput);
        }
        if(displayValue[0] == '0' && displayValue.length >= 2){
            displayValue.shift();
        }
        if(displayValue.length == 0){
            displayValue.push('0');
        }
        if(displayValue.length >= 13){
            displayValue.pop();
        }
        console.log(displayValue);
        calcDisplay.querySelector('.display-number').textContent = displayValue.join('');
    }
    function initMath(type){
        if(type != 'equal'){
            if(value1 == undefined){
                value1 = parseFloat(displayValue.join(''));
            }else{
                value2 = parseFloat(displayValue.join('')); 
            }
            displayValue = [];
            calculating = true;
        }
        switch (type) {
            case 'plus':
                mathType = type;
                break;
            case 'minus':
                mathType = type;
                break;
            case 'times':
                mathType = type;
                break;
            case 'divide':
                mathType = type;
                break;
            case 'equal':
                value2 = parseFloat(displayValue.join(''));
                if(value1 != undefined && value1 != undefined){
                    var result = operators[mathType](parseFloat(value1), parseFloat(value2));
                    value1 = result;
                    displayValue = value1.toString().split('');
                    updateDisplay();
                }
                funcButtons.forEach( button =>{
                    button.classList.remove('active');
                });
                calculating = false;
                break;
            case 'clear':
                value1 = undefined;
                value2 = undefined;
                mathType = undefined;
                calculating = false;
                displayValue = ['0'];
                funcButtons.forEach( button =>{
                    button.classList.remove('active');
                });
                updateDisplay();
                break;
        }
    }
    function dragElement(element) {
        let pos1,
            pos2,
            pos3,
            pos4;
        element.addEventListener('mousedown', dragMouseDown);
        function dragMouseDown(e) {
            if(e.target.classList.contains('button')) return;
            e = window.event;
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.addEventListener('mouseup', stopDragElement);
            document.addEventListener('mousemove', startDragElement);
        }
        function startDragElement(e) {
            e = window.event;
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + 'px';
            element.style.left = (element.offsetLeft - pos1) + 'px';
        }
        function stopDragElement() {
            document.removeEventListener('mouseup', stopDragElement);
            document.removeEventListener('mousemove', startDragElement);
        }
    }
    dragElement(calcWrapper);
    updateDisplay();
}