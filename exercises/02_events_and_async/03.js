// document.addEventListener('DOMContentLoaded', () => {
//   function makeBold(el, callback) {
//     el.style.fontWeight = 'bold';
//     if (typeof callback === 'function') {
//       callback(el);
//     }
//   }

//   let sectionElement = document.querySelector('section');

//   makeBold(sectionElement, function (elem) {
//     elem.classList.add('highlight');
//   });

//   console.log(sectionElement.classList.contains('highlight'));
//   console.log(sectionElement.style.fontWeight);
// });

document.addEventListener('DOMContentLoaded', () => {
  function makeBold(el) {
    el.style.fontWeight = 'bold';
    el.dispatchEvent(new CustomEvent('bolded'));
  }

  let sectionElement = document.querySelector('section');

  sectionElement.addEventListener('bolded', (event) => {
    event.currentTarget.classList.add('highlight');
  });

  makeBold(sectionElement);


  console.log(sectionElement.classList.contains('highlight'));
  console.log(sectionElement.style.fontWeight);
});