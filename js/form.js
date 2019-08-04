'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var fieldAddress = adForm.querySelector('#address');
  var fieldRent = adForm.querySelector('#type');
  var fieldMinPrice = adForm.querySelector('#price');
  var fieldTimein = adForm.querySelector('#timein');
  var fieldTimeout = adForm.querySelector('#timeout');
  var fieldRoomNumber = adForm.querySelector('#room_number');
  var fieldCapacity = adForm.querySelector('#capacity');
  var capacityOptions = fieldCapacity.querySelectorAll('option');

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


  // Object.keys выбирает список вариантов комнат (ключи) из библиотеки
  var rooms = Object.keys(window.data.ROOMS_TO_GUESTS);
  var roomsChangeHandler = function () {
    var currentValue = fieldRoomNumber.value;
    var currentRooms = window.data.ROOMS_TO_GUESTS[rooms.find(function (item) {
      return item === currentValue;
    })];
    for (var i = 0; i < capacityOptions.length; i++) {
      var currentCapacity = capacityOptions[i];
      if (currentRooms.indexOf(+currentCapacity.value) > -1) {
        currentCapacity.removeAttribute('disabled');
      } else {
        currentCapacity.setAttribute('disabled', 'disabled');
      }
    }
  };

  fieldRent.addEventListener('change', function () {
    // применяем к полю  минимальной цены - мин.цену,
    // соответствую типу жилья в поле которое слушаем
    changeMinPrice(getRentPrice(fieldRent.value));
  });

  fieldRoomNumber.addEventListener('change', roomsChangeHandler);

  roomsChangeHandler();

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
