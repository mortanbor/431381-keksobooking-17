'use strict';

(function () {
  var filters = window.map.filtersBlock;
  var pricePoints = window.data.PRICE_BREAKPOINTS;

  var typesNode = filters.querySelector('#housing-type');
  var priceNode = filters.querySelector('#housing-price');
  var roomsNode = filters.querySelector('#housing-rooms');
  var guestsNode = filters.querySelector('#housing-guests');
  var featuresNodes = filters.querySelectorAll('.map__checkbox');
  var filteredData = [];

  var applyFilter = function(node, key) {
    if (node.value !== 'any') {
      filteredData = filteredData.filter(function (item) {
        return item.offer[key].toString() === node.value;
      });
    }
  };

  var filtersHandler = function () {
    var featuresValues = [];

    filteredData = window.pins.data.slice();
    if (priceNode.value !== 'any') {
      filteredData = filteredData.filter(function (item) {
        if (priceNode.value === 'low') {
          return item.offer.price > 0 && item.offer.price < pricePoints.middle;
        } else if (priceNode.value === 'middle') {
          return item.offer.price >= pricePoints.middle && item.offer.price < pricePoints.high;
        }
        return item.offer.type >= pricePoints.high;
      });
    }
    applyFilter(typesNode, 'type');
    applyFilter(roomsNode, 'rooms');
    applyFilter(guestsNode, 'guests');

    for (var i = 0; i < featuresNodes.length; i++) {
      if (featuresNodes[i].checked) {
        featuresValues.push(featuresNodes[i].value);
      }
    }
    if (!featuresValues.length) {
      featuresValues = window.data.FEATURES.slice();
    }

    if (featuresValues.length !== window.data.FEATURES.length) {
      // эта фильтрация не работает, разобраться!
      filteredData = filteredData.filter(function (item) {
        var features = item.offer.features;
        for (var i = 0; i < features.length; i++) {
          if (!featuresValues.find(function (item) {
            return item === features[i];
          })) {
            return false;
          }
        }
        return true;
      });
    }

    window.pins.filteredData = filteredData;
    window.pins.collectFragment(window.pins.filteredData);
    window.cards.hideCard();
  };

  typesNode.addEventListener('change', filtersHandler);
  priceNode.addEventListener('change', filtersHandler);
  roomsNode.addEventListener('change', filtersHandler);
  guestsNode.addEventListener('change', filtersHandler);
  for (var i = 0; i < featuresNodes.length; i++) {
    featuresNodes[i].addEventListener('change', filtersHandler);
  }
})();
