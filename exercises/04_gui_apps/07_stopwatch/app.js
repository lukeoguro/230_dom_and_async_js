const MILLISECS_IN_CENTISEC = 10;
const CENTISECS_IN_SEC = 100;
const SECS_IN_MIN = 60;
const MINS_IN_HOUR = 60;

const MILLISECS_IN_SEC = MILLISECS_IN_CENTISEC * CENTISECS_IN_SEC;
const MILLISECS_IN_MIN = MILLISECS_IN_SEC * SECS_IN_MIN;
const MILLISECS_IN_HOUR = MILLISECS_IN_MIN * MINS_IN_HOUR;

$(() => {
  let $app = $('#app');
  let $hoursSpan = $('span.hours');
  let $minsSpan = $('span.mins');
  let $secsSpan = $('span.secs');
  let $centisecsSpan = $('span.centisecs');

  function startStopwatch() {
    $app.data('startTime', Date.now());

    intervalId = setInterval(updateStopwatch, 10);
    $app.data('intervalId', intervalId);
  }

  function updateStopwatch() {
    let millisecs = Date.now() - $app.data('startTime') + ($app.data('offset') || 0);

    let hours = String(Math.floor(millisecs / MILLISECS_IN_HOUR)).padStart(2, '0');
    let mins = String(Math.floor(millisecs / MILLISECS_IN_MIN) % MINS_IN_HOUR).padStart(2, '0');
    let secs = String(Math.floor(millisecs / MILLISECS_IN_SEC) % SECS_IN_MIN).padStart(2, '0');
    let centisecs = String(Math.floor(millisecs / MILLISECS_IN_CENTISEC) % CENTISECS_IN_SEC).padStart(2, '0');

    $hoursSpan.text(hours);
    $minsSpan.text(mins);
    $secsSpan.text(secs);
    $centisecsSpan.text(centisecs);
  }

  function stopStopwatch() {
    clearInterval(intervalId);
    $app.removeData('intervalId');

    let millisecs = Date.now() - $app.data('startTime') + ($app.data('offset') || 0);
    $app.data('offset', millisecs);
  }

  function resetStopwatch() {
    stopStopwatch();

    $hoursSpan.text('00');
    $minsSpan.text('00');
    $secsSpan.text('00');
    $centisecsSpan.text('00');

    $app.removeData('offset');
  }

  $('button.toggle').on('click', function (e) {
    let intervalId = $app.data('intervalId');

    if (intervalId === undefined) {
      startStopwatch();
      $(this).text('Stop');
    } else {
      stopStopwatch();
      $(this).text('Start');
    }
  });

  $('button.reset').on('click', resetStopwatch);
});