const commands = [{
  selector: '.bold',
  name: 'bold',
}, {
  selector: '.italicize',
  name: 'italic',
}, {
  selector: '.underline',
  name: 'underline',
}, {
  selector: '.strikethrough',
  name: 'strikeThrough',
}, {
  selector: '.link',
  name: 'createLink',
  callback() {
    return prompt("Enter the URL to link to: ");
  },
}, {
  selector: '.ul',
  name: 'insertUnorderedList',
}, {
  selector: '.ol',
  name: 'insertOrderedList',
}, {
  selector: '.al_left',
  name: 'justifyLeft',
}, {
  selector: '.al_right',
  name: 'justifyRight',
}, {
  selector: '.al_center',
  name: 'justifyCenter',
}, {
  selector: '.al_justify',
  name: 'justifyFull',
}];

$(() => {
  commands.forEach(({ selector, name, callback }) => {
    $(selector).on('click', (e) => {
      let val = (callback !== undefined ? callback() : "");
      document.execCommand(name, false, val);
      toggleButtons();
    });
  });

  function toggleButtons() {
    commands.forEach(({ selector, name }) => {
      $(selector).toggleClass('pushed', document.queryCommandState(name));
    });
  }

  $(document).on('selectionchange', toggleButtons);
});