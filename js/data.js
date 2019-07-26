'use strict';

(function () {
  // статичные исходные данные
  window.data = {
    TYPES: ['palace', 'flat', 'house', 'bungalo'],
    TYPES_PRICES: ['10000', '1000', '5000', '0'],
    NUMBERS_OF_PINS: 8,
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
    isActive: false // активирована ли страница
  };
})();
