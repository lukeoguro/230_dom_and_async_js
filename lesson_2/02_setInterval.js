const [startCounting, stopCounting] = (() => {
  let id;

  function startCounting() {
    let num = 0;
    id = setInterval(() => {
      num += 1;
      console.log(num);
    }, 1000);
  }

  function stopCounting() {
    clearInterval(id);
  }

  return [startCounting, stopCounting];
})();

startCounting();

setTimeout(stopCounting, 5 * 1000);