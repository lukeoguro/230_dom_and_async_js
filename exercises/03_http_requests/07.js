function cancelSchedule(scheduleId) {
  let request = new XMLHttpRequest();
  request.open('DELETE', `/api/schedules/${scheduleId}`);
  request.addEventListener('load', () => {
    if (request.status === 204) {
      console.log('Schedule successfully deleted.');
    } else {
      console.log(request.responseText);
    }
  });

  request.send();
}

function cancelBooking(bookingId) {
  let request = new XMLHttpRequest();
  request.open('PUT', `/api/bookings/${bookingId}`);
  request.addEventListener('load', () => {
    if (request.status === 204) {
      console.log('Booking successfully cancelled.');
    } else {
      console.log(request.responseText);
    }
  });

  request.send();
}

cancelSchedule(1);
cancelBooking(5);