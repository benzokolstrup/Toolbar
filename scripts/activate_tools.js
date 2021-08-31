const toolButtons = document.querySelectorAll('.nav-item.tool');
toolButtons.forEach( tool => {
    tool.addEventListener('click', (e) => {
        initTool(e.target.closest('.tool').getAttribute('data-tool'));
    });
});
let calcToolActive = false;
function initTool(tool){
    switch (tool) {
        case 'calculator':
            const calcWrapper = document.querySelector('#calculator-module-wrapper');
            if(!calcToolActive){
                calcWrapper.classList.remove('hidden');
                calcToolActive = true;
                activateCalculator();
            }else{
                calcWrapper.classList.add('hidden');
                calcToolActive = false;
            }
            break;
        case 'weather':
            console.log(tool);
            break;
    }
}