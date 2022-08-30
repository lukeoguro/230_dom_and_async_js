// Run in browser
let request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/repos/rails/rails');
request.send();

request.addEventListener('load', () => {
  console.log(request.status);
  console.log(request.response);
});