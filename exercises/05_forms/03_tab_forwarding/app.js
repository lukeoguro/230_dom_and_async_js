class App {
  constructor() {
    this.$form = $('form');

    this.$form.on('focusin', 'input', this.handleFocusin.bind(this));
    this.$form.on('focusout', 'input', this.handleFocusout.bind(this));
    this.$form.on('submit', this.handleSubmit.bind(this));

    this.$form.on('keypress', '#first_name, #last_name', this.blockNonAlpha.bind(this));
    this.$form.on('keypress', 'input[name="credit_card"]', this.blockNonNumeric.bind(this));
    this.$form.on('keyup', '#cd1, #cd2, #cd3', this.tabForwarding.bind(this));
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

  blockNonAlpha(e) {
    if (!e.key.match(/[a-zA-Z'\s]/)) e.preventDefault();
  }

  blockNonNumeric(e) {
    if (!e.key.match(/[0-9]/)) e.preventDefault();
  }

  tabForwarding(e) {
    let target = e.target;
    if (target.value.length === target.maxLength) {
      target.nextElementSibling.nextElementSibling.focus();
    }
  }
}

$(() => { new App });