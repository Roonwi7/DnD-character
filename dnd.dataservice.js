
angular.module('DnDApp')
  .service('dndDataService', ['$q', 'dndFactory', function($q, dndFactory) {
    var dndDataService = {};

    // myData contains all info related to the races and sub-races
    //   races: array of objects with main and sub items
    //     races.main: string of main race name
    //     races.sub: array of strings of sub-race names
    //   traits: object with subset of racial traits
    //           size, height, weight, heightdice, weightdice, 
    //           age, speed, lang, special, 
    //           str, dex, con, int, wis, cha


    //JMG: for testing purposes
    dndDataService.getAll = function () {
      return dndDataService.myData;
    }


    // ----------------------------------------
    // Initialization Function
    // ----------------------------------------
    dndDataService.init = function () {
      var deferred = $q.defer();

      dndDataService.myData = {};

      dndDataService.myData.attributes = [];
      dndDataService.myData.raceList = [];
      dndDataService.myData.classList = [];
      dndDataService.myData.backgrounds = [];
      dndDataService.myData.languages = [];

      dndDataService.myData.races = {};
      dndDataService.myData.raceTraits = {};

      dndDataService.myData.classes = {};
      dndDataService.myData.classTraits = {};

      dndDataService.myData.backgroundTraits = {};

      dndDataService.initAttributes()
        .then(
          function(result) {
            return dndDataService.initRaces();
          },
          function(result, status) {
            console.log("Could not initialize attributes. Response: "+JSON.stringify(response)+"; Status: " + status);
            deferred.reject(response);
          })
        .then(
          function(result) {
            dndDataService.genRaceList();
            return dndDataService.initClasses();
          },
          function(result, status) {
            console.log("Could not initialize race. Response: "+JSON.stringify(response)+"; Status: " + status);
            deferred.reject(response);
          })
        .then(
          function(result) {
            dndDataService.genClassList();
            return dndDataService.initBackgrounds();
          },
          function(result, status) {
            console.log("Could not initialize class. Response: "+JSON.stringify(response)+"; Status: " + status);
            deferred.reject(response);
          })
        .then(
          function(result) {
            return dndDataService.initLanguages();
          },
          function(result, status) {
            console.log("Could not initialize backgrounds. Response: "+JSON.stringify(response)+"; Status: " + status);
            deferred.reject(response);
          })
        .then(
          function(result) {
            deferred.resolve(dndDataService.myData);
          },
          function(result, status) {
            console.log("Could not initialize languages. Response: "+JSON.stringify(response)+"; Status: " + status);
            deferred.reject(response);
          });

      return deferred.promise;
    }





    dndDataService.initRaces = function () {
      var deferred = $q.defer();

      dndFactory.getRaces()
        .success(function(result) {
          dndDataService.myData.races = result.races;

          var traitCalls = [];
          for (race in result.races) {
            var racename = dndDataService.myData.races[race]["main"];
            traitCalls.push(dndDataService.getRaceTraits(racename));
            for (subrace in dndDataService.myData.races[race]["sub"]) {
              var subracename = dndDataService.myData.races[race]["sub"][subrace];
              traitCalls.push(dndDataService.getRaceTraits( subracename ));
            }
          }

          $q.all(traitCalls)
            .then(function(traitresult){
                  deferred.resolve(dndDataService.myData);
             });
        })
        .error(function(response, status) {
           console.log("Could not get races. Response: "+JSON.stringify(response)+"; Status: " + status);
           deferred.reject(response);
        });

      return deferred.promise;
    };

    dndDataService.genRaceList = function() {
      dndDataService.myData.raceList = [];
      for (race in dndDataService.myData.races) {
        var r = {
                  "race":(dndDataService.myData.races[race].main), 
                  "subrace":(dndDataService.myData.races[race].main) };
        dndDataService.myData.raceList.push(r);
        for (subrace in dndDataService.myData.races[race].sub) {
          r = {
                "race":(dndDataService.myData.races[race].main), 
                "subrace":(dndDataService.myData.races[race].sub[subrace]) };
          dndDataService.myData.raceList.push(r);
        }
      }
    }


    dndDataService.initClasses = function () {
      var deferred = $q.defer();

      dndFactory.getClasses()
        .success(function(result) {
          dndDataService.myData.classes = result.classes;
          deferred.resolve(dndDataService.myData);
        })
        .error(function(response, status) {
           console.log("Could not get classes. Response: "+JSON.stringify(response)+"; Status: " + status);
           deferred.reject(response);
        });
      return deferred.promise;
    };

    dndDataService.genClassList = function() {
      dndDataService.myData.classList = [];
      for (cls in dndDataService.myData.classes) {
        var c = {
                  "class":(dndDataService.myData.classes[cls].main), 
                  "subclass":(dndDataService.myData.classes[cls].main) };
        dndDataService.myData.classList.push(c);
        for (subclass in dndDataService.myData.classes[cls].sub) {
          c = {
                "class":(dndDataService.myData.classes[cls].main), 
                "subclass":(dndDataService.myData.classes[cls].sub[subclass]) };
          dndDataService.myData.classList.push(c);
        }
      }
    }

    dndDataService.initBackgrounds = function () {
      var deferred = $q.defer();

      dndFactory.getBackgrounds()
        .success(function(result) {
          dndDataService.myData.backgrounds = result.backgrounds;

          var traitCalls = [];
          for (background in result.backgrounds) {
            var backgroundname = dndDataService.myData.backgrounds[background];
            traitCalls.push(dndDataService.getBackgroundTraits(backgroundname));
          }

          $q.all(traitCalls)
            .then(function(traitresult){
                  deferred.resolve(dndDataService.myData);
             });
        })
        .error(function(response, status) {
           console.log("Could not get backgrounds. Response: "+JSON.stringify(response)+"; Status: " + status);
           deferred.reject(response);
        });

      return deferred.promise;
    };

    dndDataService.initAttributes = function () {
      var deferred = $q.defer();

      dndFactory.getAttributes()
        .success(function(result) {
          dndDataService.myData.attributes = result.attributes;
          deferred.resolve(dndDataService.myData);
        })
        .error(function(response, status) {
           console.log("Could not get attributes. Response: "+JSON.stringify(response)+"; Status: " + status);
           deferred.reject(response);
        });
      return deferred.promise;
    };

    dndDataService.initLanguages = function () {
      var deferred = $q.defer();

      dndFactory.getLanguages()
        .success(function(result) {
          dndDataService.myData.languages = result.list;
          deferred.resolve(dndDataService.myData);
        })
        .error(function(response, status) {
           console.log("Could not get languages. Response: "+JSON.stringify(response)+"; Status: " + status);
           deferred.reject(response);
        });
      return deferred.promise;
    };


    dndDataService.getRaces = function () {
      if (dndDataService.myData.length === 0) {
        dndDataService.init();
      }
      return(dndDataService.myData.races);
    };

    dndDataService.getSubRaces = function (theRace) {
      var deferred = $q.defer();
        dndDataService.getRaces()
          .then(function(result) {
             var subRace = dndDataService.parseSubRaces(theRace);
             deferred.resolve(subRace);
          },
          function(response, status) {
             console.log("The request failed. Response: "+JSON.stringify(response)+"; Status: " + status);
             deferred.reject(response);
          });
      return deferred.promise;
    };

    dndDataService.parseSubRaces = function (theRace) {
      var subRaces = [];
      for (index = 0; index < dndDataService.myData.races.length; index++) {
        if (dndDataService.myData.races[index].main == theRace) {
          subRaces = dndDataService.myData.races[index].sub;
          break;
        }
      }
      return (subRaces);
    };

    dndDataService.getRaceTraits = function (theRace) {
      var deferred = $q.defer();
      var theDbRace = theRace.toLowerCase();
      theDbRace = theDbRace.replace(/-/g, '_');
      theDbRace = theDbRace.replace(/ /g, '_');
      theDbRace = theDbRace.replace(/\//g, '_');

      if (typeof dndDataService.myData.raceTraits[theRace] == "undefined") {
        dndFactory.getRaceTraits(theDbRace)
          .success(function(result) {
             dndDataService.myData.raceTraits[theRace] = result;
             delete dndDataService.myData.raceTraits[theRace]._id;
             delete dndDataService.myData.raceTraits[theRace]._rev;
             deferred.resolve(dndDataService.myData.raceTraits[theRace]);
          })
          .error(function(response, status) {
             console.log("The request failed. Response: "+JSON.stringify(response)+"; Status: " + status);
             deferred.reject(response);
          });
      } else {
        deferred.resolve(dndDataService.myData.raceTraits[theRace]);
      }
      return deferred.promise;
    };

    dndDataService.getClassTraits = function (theClass) {
      var deferred = $q.defer();
      var theDbClass = theClass.toLowerCase();
      theDbClass = theDbClass.replace(/-/g, '_');
      theDbClass = theDbClass.replace(/ /g, '_');
      theDbClass = theDbClass.replace(/\//g, '_');

      if (typeof dndDataService.myData.classTraits[theClass] == "undefined") {
        dndFactory.getClassTraits(theDbClass)
          .success(function(result) {
             dndDataService.myData.classTraits[theClass] = result;
             delete dndDataService.myData.classTraits[theClass]._id;
             delete dndDataService.myData.classTraits[theClass]._rev;
             deferred.resolve(dndDataService.myData.classTraits[theClass]);
          })
          .error(function(response, status) {
             console.log("The request failed. Response: "+JSON.stringify(response)+"; Status: " + status);
             deferred.reject(response);
          });
      } else {
        deferred.resolve(dndDataService.myData.classTraits[theClass]);
      }
      return deferred.promise;

    };

    dndDataService.getBackgroundTraits = function (theBackground) {
      var deferred = $q.defer();
      var theDbBackground = theBackground.toLowerCase();
      theDbBackground = theDbBackground.replace(/-/g, '_');
      theDbBackground = theDbBackground.replace(/ /g, '_');
      theDbBackground = theDbBackground.replace(/\//g, '_');

      if (typeof dndDataService.myData.backgroundTraits[theBackground] == "undefined") {
        dndFactory.getBackgroundTraits(theDbBackground)
          .success(function(result) {
             dndDataService.myData.backgroundTraits[theBackground] = result;
             delete dndDataService.myData.backgroundTraits[theBackground]._id;
             delete dndDataService.myData.backgroundTraits[theBackground]._rev;
             deferred.resolve(dndDataService.myData.backgroundTraits[theBackground]);
          })
          .error(function(response, status) {
             console.log("The request failed. Response: "+JSON.stringify(response)+"; Status: " + status);
             deferred.reject(response);
          });
      } else {
        deferred.resolve(dndDataService.myData.backgroundTraits[theBackground]);
      }
      return deferred.promise;

    };


    dndDataService.getAttributes = function() {
      return dndDataService.myData.attributes;
    }

    dndDataService.getLanguages = function() {
      return dndDataService.myData.languages;
    }

    dndDataService.getRaceList = function() {
      return dndDataService.myData.raceList;
    }

    dndDataService.getClassList = function() {
      return dndDataService.myData.classList;
    }

    dndDataService.getBackgrounds = function() {
      return dndDataService.myData.backgrounds;
    }


    dndDataService.getRandomRace = function () {
      var raceKeys = Object.keys(dndDataService.myData.raceList);
      var rdmIndx = Math.floor(Math.random() * raceKeys.length);
      var rdmRace = raceKeys[rdmIndx];
      return (dndDataService.myData.raceList[rdmRace]);
    };

    dndDataService.getRandomClass = function () {
      var classKeys = Object.keys(dndDataService.myData.classList);
      var rdmIndx = Math.floor(Math.random() * classKeys.length);
      var rdmClass = classKeys[rdmIndx];
      return (dndDataService.myData.classList[rdmClass]);
    };

    dndDataService.getRandomBackground = function () {
      var rdmIndx = Math.floor(Math.random() * dndDataService.myData.backgrounds.length);
      return (dndDataService.myData.backgrounds[rdmIndx]);
    };


    return dndDataService;
}]);

