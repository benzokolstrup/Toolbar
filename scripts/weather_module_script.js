function initWeatherModule(){
    const searchInput = document.querySelector('#weather-module .search-input');
    const errorContainer = document.querySelector('.error-text-container');
    const title = document.querySelector('#weather-module .title.city');
    const cardDate = document.querySelector('#weather-module .title.date');
    const toFrom = document.querySelector('#weather-module .specification[data-spec="to-from"]');
    const temperature = document.querySelector('#weather-module .specification[data-spec="temperature"]');
    const description = document.querySelector('#weather-module .specification[data-spec="description"]');
    let city = 'copenhagen';
        searchInput.addEventListener('keyup', (e) => {
            if(e.keyCode == 13){
                getWeather(searchInput.value);
                searchInput.value = '';
                searchInput.blur();
            }
        });
        searchInput.addEventListener('focus', () => {
            errorContainer.classList.add('hidden');
        });
        function getWeather(cityInput){
            if(cityInput != undefined){
                city = cityInput;
            }
            searchInput.placeholder = city;
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4858766ca9f6a13492313fc4b169c581&units=metric`)
                .then(response => response.json())
                .then(data => {
                    if(data.cod == '404'){
                        errorContainer.classList.remove('hidden');
                        return;
                    }
                    title.textContent = `${data['name']}, ${data['sys']['country']}`;
                    temperature.textContent = `${data['main']['temp'].toFixed(1)}˚c`;
                    description.textContent = `${data['weather'][0]['main']}`;
                    toFrom.textContent = `${data['main']['temp_min'].toFixed(1)}˚c / ${data['main']['temp_max'].toFixed(1)}˚c`;
                });
            }
        function setDate(){
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const date = new Date();
            cardDate.textContent = `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        }
        getWeather();
        setDate();
}