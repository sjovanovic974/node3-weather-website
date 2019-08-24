const msg1 = document.getElementById('msg1');
const msg2 = document.getElementById('msg2');

document.querySelector('form').addEventListener('submit', (e) => {
  const search = document.querySelector('input').value;
  msg1.textContent = 'Loading...';
  msg2.textContent = '';

  fetch(`/weather?address=${search}`).then((response) => {
    response.json().then((data) => {
      if(data.error){
        msg1.textContent = data.error;
      } else {
        msg1.textContent = `${data.location}.`;
        msg2.textContent = `${data.summary} Current temperature is ${data.temp} C. Precipitation probability is ${data.precipitation}.`;
      }
    });
  });

  e.preventDefault();
});

