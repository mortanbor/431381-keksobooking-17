'use strict';

(function () {
  var map = document.querySelector('.map');
  var widthMap = map.offsetWidth;

  window.map = {
    node: map,
    width: widthMap
  };
})();
