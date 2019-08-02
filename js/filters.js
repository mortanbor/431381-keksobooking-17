'use strict';

(function () {
  var housingTypesNode = window.map.filtersBlock.querySelector('#housing-type');

  housingTypesNode.addEventListener('change', function () {
    var currentType = housingTypesNode.value;
    var payload = window.pins.data;
    if (currentType !== 'any') {
      payload = window.pins.data.filter(function (item) {
        return item.offer.type === currentType;
      });
    }
    window.pins.collectFragment(payload);
  });
})();
