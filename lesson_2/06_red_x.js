document.addEventListener('DOMContentLoaded', () => {

  document.addEventListener('mousemove', (event) => {
    let x = document.querySelector('div.x');
    x.style.top = `${event.clientY}px`;
    x.style.left = `${event.clientX}px`;
  });

  document.addEventListener('keydown', (event) => {
    let color;
    if (event.key === 'b') {
      color = 'blue';
    } else if (event.key === 'r') {
      color = 'red';
    } else if (event.key === 'g') {
      color = 'green';
    }

    let h = document.querySelector('div.horizontal').style.background = color;
    let v = document.querySelector('div.vertical').style.background = color;
  });
});