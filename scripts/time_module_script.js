function initTimeModule(){
    const digitalTime = document.querySelector('.digital-time');
    setInterval( () =>{
        const time = new Date();
        let hour = time.getHours().toString().length == 1 ? time.getHours().toString().replace(/^/, '0') : time.getHours();
        let minute = time.getMinutes().toString().length == 1 ? time.getMinutes().toString().replace(/^/, '0') : time.getMinutes();
        let seconds = time.getSeconds().toString().length == 1 ? time.getSeconds().toString().replace(/^/, '0') : time.getSeconds();
        let milliseconds = time.getMilliseconds().toString().length == 1 ? time.getMilliseconds().toString().replace(/^/, '0') : time.getMilliseconds();
        digitalTime.textContent = `${hour}:${minute}:${seconds}`;
    }, 1000);
}