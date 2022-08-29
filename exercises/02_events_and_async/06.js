const classSelect = document.getElementById('animal-classifications');
const animalSelect = document.getElementById('animals');
const clearButton = document.getElementById('clear');

const linkedOptions = {
  classifications: {
    Vertebrate: ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
    'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
    'Cold-blooded': ['Salmon', 'Turtle'],
    Mammal: ['Bear', 'Whale'],
    Bird: ['Ostrich'],
    Classifications: ['Animals', 'Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  },
  animals: {
    Bear: ['Vertebrate', 'Warm-blooded', 'Mammal'],
    Turtle: ['Vertebrate', 'Cold-blooded'],
    Whale: ['Vertebrate', 'Warm-blooded', 'Mammal'],
    Salmon: ['Vertebrate', 'Cold-blooded'],
    Ostrich: ['Vertebrate', 'Warm-blooded', 'Bird'],
    Animals: ['Classifications', 'Vertebrate', 'Warm-blooded', 'Cold-blooded', 'Mammal', 'Bird'],
  },
};

function updateSelect(select, optionValues) {
  select.options.length = 0;
  optionValues.forEach(value => {
    select.insertAdjacentElement('beforeend', new Option(value, value));
  });
}

classSelect.addEventListener('change', (event) => {
  let newOptionValues = linkedOptions.classifications[event.target.value];
  updateSelect(animalSelect, newOptionValues);
});

animalSelect.addEventListener('change', (event) => {
  let newOptionValues = linkedOptions.animals[event.target.value];
  updateSelect(classSelect, newOptionValues);
});

clearButton.addEventListener('click', (event) => {
  event.preventDefault();
  updateSelect(classSelect, linkedOptions.animals["Animals"]);
  updateSelect(animalSelect, linkedOptions.classifications["Classifications"]);
});
