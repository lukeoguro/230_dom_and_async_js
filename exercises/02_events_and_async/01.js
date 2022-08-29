function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer(...callbacks) {
  const maxDelay = callbacks.length * 2;
  const ms = 1000;
  const randomDelay = () => Math.random() * maxDelay * ms;

  callbacks.forEach(callback => setTimeout(callback, randomDelay()));
  for (let i = 1; i <= maxDelay; i += 1) setTimeout(() => console.log(i), i * ms);
}

randomizer(callback1, callback2, callback3);

// Output:
// 1
// 2
// "callback2"
// 3
// "callback3"
// 4
// 5
// "callback1"
// 6