class App {
  constructor() {
    this.$form = $('form');

    this.$form.on('focusin', 'input', this.handleFocusin.bind(this));
    this.$form.on('focusout', 'input', this.handleFocusout.bind(this));
    this.$form.on('submit', this.handleSubmit.bind(this));
  }

  handleFocusin(e) {
    let $target = $(e.target);
    $target.removeClass('invalid_field');
    $target.siblings('.error_message').empty();
  }

  handleFocusout(e) {
    this.validate(e.target);
  }

  validate(target) {
    if (!target.validity.valid) {
      let $target = $(target);
      let $errorMsgField = $target.siblings('.error_message');
      let inputName = $(`label[for="${$target.attr('name')}"]`).text();

      let message;
      if (target.validity.valueMissing) {
        message = `${inputName} is a required field.`;
      } else if (target.validity.patternMismatch) {
        message = `Please enter a valid ${inputName}.`;
      } else if (target.validity.tooShort) {
        message = `${inputName} must be at least ${$target.attr('minlength')} characters long.`;
      }

      $errorMsgField.text(message);
      $target.addClass('invalid_field');
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    if (e.target.checkValidity()) {
      $('.form_errors').text("");
      $('.form_success').text("You're signed up!");
      e.target.reset();
    } else {
      $('.form_errors').text("Form cannot be submitted until errors are corrected.");
      document.querySelectorAll('input').forEach(this.validate);
    }
  }
}

$(() => { new App });