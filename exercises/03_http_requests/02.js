function retrieveSchedules() {
  let request = new XMLHttpRequest();

  request.open('GET', '/api/schedules');
  request.timeout = 5000;
  request.responseType = 'json';

  request.addEventListener('load', () => {
    let tally = {};

    if (request.response.length > 0) {
      request.response.forEach(schedule => {
        let key = `staff ${schedule.staff_id}`;
        tally[key] = tally[key] || 0;
        tally[key] += 1;
      });
      alert(Object.keys(tally).map((key) => `${key}: ${tally[key]}`).join('\n'))
    } else {
      alert('There are currently no schedules available for booking');
    }
  });

  request.addEventListener('timeout', () => {
    alert('It is taking longer than usual, please try again later.')
  });

  request.addEventListener('loadend', event => {
    alert('The request has completed.');
  });

  request.send();
}

retrieveSchedules();