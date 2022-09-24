const questions = [
  {
    id: 1,
    description: "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
    options: ['Dan Simmons', 'Douglas Adams', 'Stephen Fry', 'Robert A. Heinlein'],
  },
  {
    id: 2,
    description: 'Which of the following numbers is the answer to Life, the \
                  Universe and Everything?',
    options: ['66', '13', '111', '42'],
  },
  {
    id: 3,
    description: 'What is Pan Galactic Gargle Blaster?',
    options: ['A drink', 'A machine', 'A creature', 'None of the above'],
  },
  {
    id: 4,
    description: 'Which star system does Ford Prefect belong to?',
    options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri'],
  },
];

const answerKey = { '1': 'Douglas Adams', '2': '42', '3': 'A drink', '4': 'Betelgeuse' };

$(() => {
  const $fieldset = $('fieldset');
  const questionTemplate = Handlebars.compile($('#question_template').html());
  questions.forEach(question => {
    $fieldset.append(questionTemplate(question));
  });

  const $submit = $('.submit');
  const $reset = $('.reset_form');

  $submit.on('click', (e) => {
    if ($submit.hasClass('disabled')) return;

    Object.entries(answerKey).forEach(([id, answer]) => {
      let $div = $(`div.question[data-id=${id}]`);
      let $input = $div.find('input:checked');
      let $result = $div.find('p.result');

      if ($input.length === 0) {
        $result.addClass('wrong');
        $result.text(`You didn't answer this question. Correct answer is: ${answer}`);
      } else if ($input.val() !== answer) {
        $result.addClass('wrong');
        $result.text(`Wrong Answer. Correct answer is: ${answer}`);
      } else {
        $result.addClass('correct');
        $result.text('Correct Answer!');
      }
    });

    $submit.addClass('disabled');
    $reset.removeClass('disabled');
  });

  $reset.on('click', (e) => {
    if ($reset.hasClass('disabled')) return;

    $('form')[0].reset();
    $('.correct').removeClass('correct').empty();
    $('.wrong').removeClass('wrong').empty();

    $submit.removeClass('disabled');
    $reset.addClass('disabled');
  });
});
