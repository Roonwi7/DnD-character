angular.module('DnDApp')
  .factory('dndFactory', ['$http', 'DND_5E_DB', function($http, DND_5E_DB) {

    var dndFactory = {};

    dndFactory.getRaces = function () {
      return $http.get(DND_5E_DB + "race_info");
    };

    dndFactory.getRaceTraits = function (theRace) {
      return $http.get(DND_5E_DB + theRace.toLowerCase() + "_race_traits");
    };

    dndFactory.getClasses = function () {
      return $http.get(DND_5E_DB + "class_info");
    };

    dndFactory.getClassTraits = function (theClass) {
      return $http.get(DND_5E_DB + theClass.toLowerCase() + "_class_traits");
    };

    return dndFactory;

}]);
