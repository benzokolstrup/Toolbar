window.addEventListener('mousedown', (e) => {
    if(e.target.closest('.dragable')){
        dragElement(e.target.closest('.dragable'), e.clientY, e.clientX);
    }
});
function dragElement(element, heightPos, widthPos){
    document.addEventListener('mousemove', startDragElement);
    document.addEventListener('mouseup', stopDragElement);
    let elementTopPos = heightPos - element.offsetTop;
    let elementLeftPos = widthPos - element.offsetLeft;
    function startDragElement(e){
        element.style.top = (e.clientY - elementTopPos) + 'px';
        element.style.left = (e.clientX - elementLeftPos) + 'px';
    };
    function stopDragElement(){
        document.removeEventListener('mousemove', startDragElement);
    };
}