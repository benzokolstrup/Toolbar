const toolButtons = document.querySelectorAll('.nav-item.tool');
toolButtons.forEach( tool => {
    tool.addEventListener('click', (e) => {
        initTool(e.target.closest('.tool').getAttribute('data-tool'));
    });
});
let ToolbarActive = false;
let calcModuleActive = false;
let weatherModuleActive = false;
let gameModuleActive = false;
function initTool(tool){
    switch (tool) {
        case 'logo':
            const logo = document.querySelector('.navbar');
            if(!ToolbarActive){
                logo.style.height = '95vh';
                ToolbarActive = true;
            }else{
                logo.style.height = '9.3vh';
                ToolbarActive = false;
            }
            break;
        case 'calculator':
            const calcWrapper = document.querySelector('#calculator-module-wrapper');
            if(!calcModuleActive){
                calcWrapper.classList.remove('hidden');
                calcModuleActive = true;
                activateCalculator();
            }else{
                calcWrapper.classList.add('hidden');
                calcModuleActive = false;
            }
            break;
        case 'weather':
            const weatherWrapper = document.querySelector('#weather-module-wrapper');
            if(!weatherModuleActive){
                weatherWrapper.classList.remove('hidden');
                weatherModuleActive = true;
                initWeatherModule();
            }else{
                weatherWrapper.classList.add('hidden');
                weatherModuleActive = false;
            }
            break;
        case 'game':
            const gameWrapper = document.querySelector('#draganddrop-module-wrapper');
            if(!gameModuleActive){
                gameWrapper.classList.remove('hidden');
                gameModuleActive = true;
            }else{
                gameWrapper.classList.add('hidden');
                gameModuleActive = false;
            }
            break;
    }
}