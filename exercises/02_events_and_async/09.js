const divRed = document.getElementById('red');
const divBlue = document.getElementById('blue');
const divOrange = document.getElementById('orange');
const divGreen = document.getElementById('green');

const tracker = (() => {
  const events = [];

  return {
    list() { return events.slice() },
    elements() { return events.map(({ target }) => target) },
    add(event) { events.push(event) },
    clear() { return events.length = 0 },
  };
})();

function track(callback) {
  return function (event) {
    if (!tracker.list().includes(event)) tracker.add(event);
    callback(event);
  }
}

divRed.addEventListener('click', track(event => {
  document.body.style.background = 'red';
}));

divBlue.addEventListener('click', track(event => {
  event.stopPropagation();
  document.body.style.background = 'blue';
}));

divOrange.addEventListener('click', track(event => {
  event.stopPropagation();
  document.body.style.background = 'orange';
}));

divGreen.addEventListener('click', track(event => {
  event.stopPropagation();
  document.body.style.background = 'green';
}));

tracker.list().length // 4
tracker.elements()