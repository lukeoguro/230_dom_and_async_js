let success = false;

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    success ? resolve("Launch School") : reject("Not Launch School");
  }, 2000);
});

promise.then(function resolve(str) {
  console.log(`Success: ${str}`);
}, function reject(str) {
  console.log(`Error: ${str}`);
});