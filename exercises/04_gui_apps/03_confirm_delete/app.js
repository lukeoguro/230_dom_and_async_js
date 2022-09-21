const todos = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John ' }
];

$(() => {
  const todosTemplate = Handlebars.compile($('#todos-template').html());
  const confirmTemplate = Handlebars.compile($('#confirm-template').html());

  let $todos = $('#todos');
  let $overlay = $('div.overlay');
  let $confirmPrompt = $('div.confirm-prompt');

  $todos.append(todosTemplate({ todos }));
  $todos.on('click', 'span.remove', function (e) {
    e.preventDefault();

    let id = $(this).parent().data('id');

    $overlay.show();
    $confirmPrompt.append(confirmTemplate({ id }));
    $confirmPrompt.show();
  });

  $confirmPrompt.on('click', 'div.actions > a', function (e) {
    e.preventDefault();

    $overlay.hide();
    $confirmPrompt.hide();
    $('div.confirm-wrapper').remove();

    if ($(this).is('a.confirm-yes')) {
      let id = $(this).parents('div.confirm-wrapper').data('id');
      $(`li[data-id="${id}"]`).remove();
    }
  });
});