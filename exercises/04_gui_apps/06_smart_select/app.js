const cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

function filterCars(selection) {
  let { make, model, year, price } = selection;

  return cars.filter(car => {
    return (make === '' || make === car.make)
      && (model === '' || model === car.model)
      && (year === '' || year === String(car.year))
      && (price === '' || price === String(car.price));
  });
}

$(() => {
  Handlebars.registerPartial('model_options_template', $('#model_options_template').html());
  Handlebars.registerPartial('car_template', $('#car_template').html());
  const carsTemplate = Handlebars.compile($('#cars_template').html());
  const filtersTemplate = Handlebars.compile($('#filters_template').html());
  const modelOptionsTemplate = Handlebars.compile($('#model_options_template').html());


  let $cars = $('#cars');
  $cars.append(carsTemplate({ cars }));

  let $filters = $('#filters');
  $filters.append(filtersTemplate({
    makes: [...new Set(cars.map(({ make }) => make))],
    models: [...new Set(cars.map(({ model }) => model))],
    prices: [...new Set(cars.map(({ price }) => price))].sort((a, b) => a - b),
    years: [...new Set(cars.map(({ year }) => year))].sort((a, b) => a - b),
  }));

  let $filterBtn = $('button.filter_btn');
  $filterBtn.on('click', function (e) {
    let selection = {
      make: $('#make_select').val(),
      model: $('#model_select').val(),
      price: $('#price_select').val(),
      year: $('#year_select').val(),
    }

    let filtered = filterCars(selection);
    $cars.html(carsTemplate({ cars: filtered }));
  });

  $filters.on('change', '#make_select', function (e) {
    let make = $('#make_select').val();

    if (make === '') {
      $('#model_select').html(modelOptionsTemplate({
        models: [...new Set(cars.map(({ model }) => model))],
      }))
    } else {
      let filtered = cars.filter(car => car.make === make);
      $('#model_select').html(modelOptionsTemplate({
        models: [...new Set(filtered.map(({ model }) => model))],
      }));
    }
  });
});