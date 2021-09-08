const toolButtons = document.querySelectorAll('.nav-item.tool');
const closeButtons = document.querySelectorAll('.module-function-button.close');
const miniButtons = document.querySelectorAll('.module-function-button.minimize');
let ToolbarActive = false,
    calcModuleActive = false,
    weatherModuleActive = false,
    gameModuleActive = false,
    timeModuleActive = false;
toolButtons.forEach( tool => {
    tool.addEventListener('click', (e) => {
        initTool(e.target.closest('.tool').getAttribute('data-tool'));
    });
});
closeButtons.forEach( closeButton => {
    closeButton.addEventListener('click', (e) => {
        initTool(e.target.closest('[data-module]').getAttribute('data-module'));
    });
});
miniButtons.forEach( miniButton => {
    miniButton.addEventListener('click', (e) => {
        if(!e.target.closest('[data-module]').querySelector('div[id$="module"]').getAttribute('style')){
            e.target.closest('[data-module]').querySelector('div[id$="module"]').style.height = '70px';
        }else{
            e.target.closest('[data-module]').querySelector('div[id$="module"]').removeAttribute('style');
        }
    });
});
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
        case 'clock':
            const timeWrapper = document.querySelector('#time-module-wrapper');
            if(!timeModuleActive){
                timeWrapper.classList.remove('hidden');
                timeModuleActive = true;
                initTimeModule();
            }else{
                timeWrapper.classList.add('hidden');
                timeModuleActive = false;
            }
            break;
    }
}