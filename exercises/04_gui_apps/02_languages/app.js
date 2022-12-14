const languages = [
  {
    name: 'Ruby',
    description: 'Ruby is a dynamic, reflective, object-oriented, ' +
      'general-purpose programming language. It was designed and developed in the mid-1990s ' +
      'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
      'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
      'including functional, object-oriented, and imperative. It also has a dynamic type ' +
      'system and automatic memory management.'
  },
  {
    name: 'JavaScript',
    description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
      'programming language. It has been standardized in the ECMAScript language ' +
      'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
      'technologies of World Wide Web content production; the majority of websites employ ' +
      'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
      'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
      'supporting object-oriented, imperative, and functional programming styles.'
  },
  {
    name: 'Lisp',
    description: 'Lisp (historically, LISP) is a family of computer programming languages ' +
      'with a long history and a distinctive, fully parenthesized prefix notation. ' +
      'Originally specified in 1958, Lisp is the second-oldest high-level programming ' +
      'language in widespread use today. Only Fortran is older, by one year. Lisp has changed ' +
      'since its early days, and many dialects have existed over its history. Today, the best ' +
      'known general-purpose Lisp dialects are Common Lisp and Scheme.'
  }
];

function shorten(string) {
  if (string.length <= 120) return string;
  return string.slice(0, 120) + ' ...';
}

$(() => {
  const langTemplate = Handlebars.compile($('#lang-template').html());
  languages.forEach(language => {
    language.shortened = shorten(language.description);
    $('#languages').append(langTemplate(language))
  });

  $('#languages').on('click', 'a.more', function (e) {
    e.preventDefault();

    let languageName = $(this).parent().data('lang');
    let language = languages.find(({ name }) => name === languageName);
    let $p = $(this).siblings('p');

    if ($(this).text() === 'Show More') {
      $p.text(language.description);
      $(this).text('Show Less');
    } else {
      $p.text(language.shortened);
      $(this).text('Show More');
    }
  });
});