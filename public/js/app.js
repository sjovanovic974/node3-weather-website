const msg = document.getElementById('msg');
const results = document.getElementById('results');

document.querySelector('form').addEventListener('submit', (e) => {
  const search = document.querySelector('input').value;
  msg.textContent = 'Loading...';
  results.innerHTML = '';

  fetch(`/weather?address=${search}`).then((response) => {
    response.json().then((data) => {
      if(data.error){
        msg.textContent = data.error;
        results.innerHTML = '';
      } else {
        msg.textContent = `${data.location}.`;
        results.innerHTML = `<ul>
                              <li>${data.summary}</li>
                              <li>Current temperature is ${data.temp} C.</li>
                              <li>Precipitation probability is ${data.precipitation}.</li>
                              <li>Daily minimum temperature is ${data.minTemp} C.</li>
                              <li>Daily maximum temp is ${data.maxTemp} C.</li> 
                              <li>Wind speed is ${data.windSpeed}.</li>
                              <li>Humidity is ${data.humidity}.</li>
                              <li>Pressure is ${data.pressure}.</li>
                            </ul>`;
      }
    });
  });

  e.preventDefault();
});

