'use strict';

(function () {
  var map = document.querySelector('.map');
  var filtersBlock = map.querySelector('.map__filters');
  var filtersNodes = filtersBlock.querySelectorAll('.map__filter');
  var widthMap = map.offsetWidth;

  window.map = {
    node: map,
    filtersBlock: filtersBlock,
    filtersNodes: filtersNodes,
    width: widthMap
  };
})();
