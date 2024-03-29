'use strict';

(function () {
  // статичные исходные данные
  window.data = {
    TYPES: [
      {
        id: 'palace',
        name: 'Дворец',
        price: 10000
      },
      {
        id: 'flat',
        name: 'Квартира',
        price: 1000
      },
      {
        id: 'house',
        name: 'Дом',
        price: 5000
      },
      {
        id: 'bungalo',
        name: 'Бунгало',
        price: 0
      }
    ],
    NUMBERS_OF_PINS: 5,
    MIN_MAP_Y: 130,
    MAX_MAP_Y: 630,
    PIN_WIDTH: 40,
    PIN_HEIGHT: 44,
    MAIN_PIN_WIDTH: 65,
    MAIN_PIN_HEIGHT: 65,
    ROOMS_TO_GUESTS: {
      '1': [1],
      '2': [1, 2],
      '3': [1, 2, 3],
      '100': [0]
    },
    CURRENCY_PER_NIGHT: '₽/ночь',
    TEMPLATE_CAPACITY: '{{rooms}} комнаты для {{guests}} гостей',
    TEMPLATE_CHECK: 'Заезд после {{checkin}}, выезд до {{checkout}}',
    ENDPOINT: 'https://js.dump.academy/keksobooking/data',
    isActive: false // активирована ли страница
  };
})();
