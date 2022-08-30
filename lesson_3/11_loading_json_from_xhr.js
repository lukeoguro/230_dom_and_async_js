// Run in browser
// Q1
let request = new XMLHttpRequest();
request.responseType = 'json';
// request.open('GET', 'https://api.github.com/repos/rails/rails');
request.open('GET', 'htps://api.github.com/repos/rails/rails');

request.addEventListener('load', () => {
  console.log(request.status);
  console.log(request.response.open_issues_count);
});

request.addEventListener('error', (event) => {
  console.log('The request could not be completed!');
});

request.send();