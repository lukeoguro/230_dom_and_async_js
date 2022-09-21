const todos = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John ' }
];

$(() => {
  const todosTemplate = Handlebars.compile($('#todos-template').html());
  const confirmTemplate = Handlebars.compile($('#confirm-template').html());
  const contextMenuTemplate = Handlebars.compile($('#context-menu-template').html());

  let $todos = $('#todos');
  let $overlay = $('div.overlay');
  let $confirmPrompt = $('div.confirm-prompt');
  let $contextMenu = $('div.context-menu');

  $todos.append(todosTemplate({ todos }));

  function resetContextMenu(e) {
    $contextMenu.hide();
    $contextMenu.empty();
  }

  $(document).on('click', function (e) {
    resetContextMenu();
  });

  $todos.on('contextmenu', 'li', function (e) {
    e.preventDefault();

    resetContextMenu();
    let id = $(this).data('id');
    $contextMenu.append(contextMenuTemplate({ id }));
    $contextMenu.show();
    $contextMenu.offset({ top: e.clientY, left: e.clientX });
  });

  $contextMenu.on('click', 'li.remove', function (e) {
    e.preventDefault();

    let id = $(this).data('id');

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
      $(`#todos > li[data-id="${id}"]`).remove();
    }
  });
});