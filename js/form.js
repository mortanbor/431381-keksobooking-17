'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var fieldTitle = adForm.querySelector('#title');
  var minTitle = +fieldTitle.getAttribute('minlength');
  var maxTitle = +fieldTitle.getAttribute('data-maxlength');
  var fieldAddress = adForm.querySelector('#address');
  var fieldRent = adForm.querySelector('#type');
  var fieldMinPrice = adForm.querySelector('#price');
  var maxPrice = fieldMinPrice.max;
  var fieldTimein = adForm.querySelector('#timein');
  var fieldTimeout = adForm.querySelector('#timeout');
  var fieldRoomNumber = adForm.querySelector('#room_number');
  var fieldCapacity = adForm.querySelector('#capacity');
  var submitButton = adForm.querySelector('.ad-form__submit');
  var resetButton = adForm.querySelector('.ad-form__reset');

  var validities = window.data.VALIDITIES;
  var titleValidity = '';
  var capacityValidity = '';
  var priceValidity = '';
  var url = adForm.action;

  // находим цену соответствующего жилья
  var getRentPrice = function (rent) {
    var currentType = window.utils.findTypeById(rent);
    return currentType.price;
  };

  // функция применения минимальной цены к полю
  var changeMinPrice = function (minPrice) {
    fieldMinPrice.placeholder = minPrice;
    fieldMinPrice.min = minPrice;
  };

  // сообщение об ошибке для заголовка (title)
  var titleInputHandler = function () {
    var count = fieldTitle.value.length;
    if (!count) {
      titleValidity = validities.required;
    } else if (count < minTitle) {
      titleValidity = window.utils.templateRender(validities.minTitle, [count]);
    } else if (count > maxTitle) {
      titleValidity = window.utils.templateRender(validities.maxTitle, [count]);
    } else {
      titleValidity = '';
    }
    fieldTitle.setCustomValidity(titleValidity);
  };

  var priceInputHandler = function () {
    // сообщение об ошибке неправильной цены за тип жилья (price)
    var minPrice = fieldMinPrice.min;
    if (!fieldMinPrice.value.length) {
      priceValidity = validities.required;
      console.log(1);
    } else if (fieldMinPrice.value < minPrice && fieldMinPrice.value > maxPrice) {
      priceValidity = validities.minPricePrefix + minPrice + ' – ' + maxPrice;
      console.log(2);

    } else {
      priceValidity = '';
      console.log(3);

    }
    fieldMinPrice.setCustomValidity(priceValidity);
  };

  // Object.keys выбирает список вариантов комнат (ключи) из библиотеки
  var rooms = Object.keys(window.data.ROOMS_TO_GUESTS);
  var roomsChangeHandler = function () {
    var currentRoomValue = fieldRoomNumber.value;
    var currentCapacityValue = +fieldCapacity.value;
    var currentRooms = window.data.ROOMS_TO_GUESTS[rooms.find(function (item) {
      return item === currentRoomValue;
    })];
    if (currentRooms.indexOf(currentCapacityValue) === -1) {
      capacityValidity = validities.capacityPrefix + currentRooms.join(', ');
    } else {
      capacityValidity = '';
    }
    fieldCapacity.setCustomValidity(capacityValidity);
  };

  var resetHandler = function () {
    setTimeout(function () {
      fieldAddress.value = window.data.startAddress;
    }, 0);
  };

  var successPostHandler = function (res) {
    console.log(res); // eslint-disable-line
    adForm.reset();
    resetHandler();
  };

  fieldTitle.addEventListener('input', titleInputHandler);

  fieldRent.addEventListener('change', function () {
    // применяем к полю  минимальной цены - мин.цену,
    // соответствую типу жилья в поле которое слушаем
    changeMinPrice(getRentPrice(fieldRent.value));
  });

  fieldRoomNumber.addEventListener('change', roomsChangeHandler);
  fieldCapacity.addEventListener('change', roomsChangeHandler);

  submitButton.addEventListener('click', function (evt) {
    titleInputHandler();
    priceInputHandler();
    roomsChangeHandler();
    if (adForm.checkValidity()) {
      evt.preventDefault();
      window.ajax(url, successPostHandler, 'post', new FormData(adForm));
    }
  });

  resetButton.addEventListener('click', resetHandler);

  // в поле цены записать мин.цену стартого жилья
  fieldMinPrice.placeholder = getRentPrice(fieldRent.value);

  // синхронизируем время заезда с выездом
  window.utils.setSynchronizeValue(fieldTimein, fieldTimeout);
  window.utils.setSynchronizeValue(fieldTimeout, fieldTimein);

  window.utils.setElementsDisabled(adForm);

  window.form = {
    node: adForm,
    fieldAddress: fieldAddress
  };
})();
