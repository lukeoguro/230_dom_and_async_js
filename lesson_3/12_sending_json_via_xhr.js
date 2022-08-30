// Run in browser
let request = new XMLHttpRequest();

request.open('POST', 'https://ls-230-web-store-demo.herokuapp.com/v1/products');
request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
request.setRequestHeader('Authorization', 'token AUTH_TOKEN');

request.addEventListener('load', () => {
  console.log(request.status);
  console.log(request.responseText);
});

let data = { name: 'Sunscreen', sku: 'suns100', price: 10 };
let json = JSON.stringify(data);
request.send(json);