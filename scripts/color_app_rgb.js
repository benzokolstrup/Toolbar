// Number input

/*const inputRangeCursor = document.querySelector('.input-range_cursor');
const addValue = document.querySelector(".number-input-buttons .add");
const deductValue = document.querySelector(".number-input-buttons .deduct");
let colorValueInput = document.querySelector(".number-input");
let redValue = 0;


let inputColorRange = document.querySelector(".color-slider");
let closestInput = inputColorRange.closest(".color-range-container");
let yeet = closestInput.querySelector(".number-input-container .number-input");

inputColorRange.style.background = "linear-gradient(45deg, #000, #ff0000)"






    inputColorRange.addEventListener('input', ()=>{
        colorValueInput.value = parseInt(inputColorRange.value);
        updateRedValue(parseInt(inputColorRange.value));
        console.log(inputColorRange.closest(".number-input-container"))
    });
    addValue.addEventListener("click", () => {
        if(redValue < 255){
        redValue ++;
        colorValueInput.value = redValue;
        moveRangeCursor();
        }
    });
    addValue.addEventListener("mousedown", () => {
        let addInterval = setInterval(function(){
            if(redValue < 255){
                redValue++;
            }
            colorValueInput.value = redValue;
            moveRangeCursor();
        }, 150);
        window.addEventListener("mouseup", () => {
            clearInterval(addInterval);
        });
    });
    deductValue.addEventListener("click", () => {
        if(redValue > 0){
            redValue --;
            colorValueInput.value = redValue;
            moveRangeCursor();
        }
    });
    deductValue.addEventListener("mousedown", () => {
        let deductInterval = setInterval(function(){
            if(redValue > 0){
                redValue--;
            }
            colorValueInput.value = redValue;
            moveRangeCursor();
        }, 150);
        window.addEventListener("mouseup", () => {
            clearInterval(deductInterval);
        });
    });
    colorValueInput.addEventListener("focusin", ()=>{
        if(colorValueInput.value == 0){
            colorValueInput.value = "";
        }
    }); 
    colorValueInput.addEventListener("focusout", ()=>{
        if(colorValueInput.value == ""){
            colorValueInput.value = 0;
        }
        if(colorValueInput.value.match(/^0\d+/g)){
            let trimmedString = colorValueInput.value.substring(1, 3);
            colorValueInput.value = trimmedString;
        }
        updateRedValue(colorValueInput.value);
    });

    colorValueInput.addEventListener("input", ()=>{
        if(colorValueInput.value.match(/[^0-9]/g)){
            colorValueInput.value = colorValueInput.value.replace(/[^0-9]/g, "");
            console.error("Not a number detected!");
        }
        if(colorValueInput.value.length > 3){
            colorValueInput.value = 255;
        }
        if(colorValueInput.value.length >= 2 && colorValueInput.value.match(/^0/g)){
            let trimmedString = colorValueInput.value.substring(1, 3);
            colorValueInput.value = trimmedString;
        }
        if(parseInt(colorValueInput.value) >= 255){
            colorValueInput.value = 255;
        }
        if(colorValueInput.value == ""){
            colorValueInput.value = 0;
        }
        updateRedValue(colorValueInput.value);
    });
    function updateRedValue(inputValue){
        redValue = inputValue;
        console.log("Red value updated to: " + redValue);
        moveRangeCursor();
    }
    function moveRangeCursor(){
        inputColorRange.value = redValue;
    }*/






















    let redValue = Math.floor(Math.random() * (255 - 1) + 1),
        greenValue = Math.floor(Math.random() * (255 - 1) + 1),
        blueValue = Math.floor(Math.random() * (255 - 1) + 1),
        values = {
            red: redValue,
            green: greenValue,
            blue: blueValue
        };
        window.addEventListener('load', (e) => {
        let colors = [redValue, greenValue, blueValue];
        let inputColorRange = document.querySelectorAll(".color-slider");
        let valueInput = document.querySelectorAll(".number-input-container .number-input");
        for(let i = 0; i < inputColorRange.length; i++){
            inputColorRange[i].value = colors[i];
            valueInput[i].value = colors[i];
        }
        changeColor('all', values);
    });
    let inputColorRange = document.querySelectorAll(".color-slider");
    for(let i = 0; i < inputColorRange.length; i++){
        inputColorRange[i].addEventListener('input', (e)=>{
            let colorValueInput = e.target.closest(".color-range-container").querySelector(".number-input-container .number-input");
            colorValueInput.value = e.target.value;
            changeColor(e.target.getAttribute('name'), e.target.value);
        });
    }
    function changeColor(color, value){
        console.log(color, value)
        if(color == 'red'){
            document.querySelector('.red-color').textContent = value;
            values.red = value;
        }else if(color == 'green'){
            document.querySelector('.green-color').textContent = value;
            values.green = value;
        }else if(color == 'blue'){
            document.querySelector('.blue-color').textContent = value;
            values.blue = value;
        }else if(color == 'all'){
            document.querySelector('.red-color').textContent = value.red;
            document.querySelector('.green-color').textContent = value.green;
            document.querySelector('.blue-color').textContent = value.blue;
        }
        changeRangeColor(values.red, values.green, values.blue);
        changeColorValue();
    }
    function changeColorValue(){
        document.querySelector('.preview-color').style.background = `rgb(${values.red},${values.green},${values.blue})`;
    }
    function changeRangeColor(red, green, blue){
        let redInputRange = document.querySelector('.color-slider[name="red"]');
        let greenInputRange = document.querySelector('.color-slider[name="green"]');
        let blueInputRange = document.querySelector('.color-slider[name="blue"]');
        redInputRange.style.background = `-webkit-linear-gradient(left, rgb(0, ${green}, ${blue}), rgb(128, ${green}, ${blue}), rgb(255, ${green}, ${blue}))`;
        greenInputRange.style.background = `-webkit-linear-gradient(left, rgb(${red}, 0, ${blue}), rgb(${red}, 128, ${blue}), rgb(${red}, 255, ${blue}))`;
        blueInputRange.style.background = `-webkit-linear-gradient(left, rgb(${red}, ${green}, 0), rgb(${red}, ${green}, 128), rgb(${red}, ${green}, 255))`;
        redInputRange.value = red;
        greenInputRange.value = green;
        blueInputRange.value = blue;
        redInputRange.closest(".color-range-container").querySelector(".number-input-container .number-input").value = red;
        greenInputRange.closest(".color-range-container").querySelector(".number-input-container .number-input").value = green;
        blueInputRange.closest(".color-range-container").querySelector(".number-input-container .number-input").value = blue;
    }
    function getColor(){
        values.red = this.dataset.red;
        values.green = this.dataset.green;
        values.blue = this.dataset.blue;
        changeColor('all', values);
    }
    let saveColorButton = document.querySelector(".save-color");
        saveColorButton.addEventListener('click', ()=>{
            console.log(values.red,values.green,values.blue)  
            let paletteColor = document.querySelector('.preview-color');
            let colorPaletteContainer = document.querySelector('.color-palette-container');
            let newColor = paletteColor.cloneNode(true);
                newColor.classList.remove('preview-color');
                newColor.classList.add('palette-color');
                newColor.style.background = `rgb(${values.red},${values.green},${values.blue})`;
                newColor.setAttribute('data-red', values.red);
                newColor.setAttribute('data-green', values.green);
                newColor.setAttribute('data-blue', values.blue);
                newColor.addEventListener('click', getColor);
                colorPaletteContainer.prepend(newColor);
        });













    const letters = '0123456789ABCDEF'; 
    const generateColorContainer = document.querySelector('.random-color-container');
    const generateColorButton = document.querySelector('.random-color-button');
    const generateColorTitle = document.querySelector('.random-color-title');

    generateColorButton.addEventListener('click', e => {
        generateRandomColor();
    });
    function generateRandomColor(){
        let hexCode = '#'; 
        for (let i = 0; i < 6; i++) {
            hexCode += letters[(Math.floor(Math.random() * 16))]; 
        }
        generateColorContainer.style.backgroundColor = hexCode;
        generateColorTitle.innerText = hexCode;
    }