           //delete dndDataService.myData._id;
           //delete dndDataService.myData._rev;

//TODO: combine all calls into one promise for init

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



    // ----------------------------------------
    // Initialization Function
    // ----------------------------------------
    dndDataService.init = function () {
      var deferred = $q.defer();

      dndDataService.myData = {};
      dndDataService.myData.races = {};
      dndDataService.myData.racetraits = {};
      dndDataService.myData.classes = {};
      dndDataService.myData.classtraits = {};
      dndDataService.myData.raceList = [];
      dndDataService.myData.classList = [];

      dndDataService.initRaces()
        .then(
          function(result) {
            dndDataService.genRaceList();
            return dndDataService.initClasses();
          },
          function(result, status) {
            console.log("Could not initialize race. Response: "+response+"; Status: " + status);
            deferred.reject(response);
          })
        .then(
          function(result) {
            dndDataService.genClassList();
            deferred.resolve(dndDataService.myData);
          },
          function(result, status) {
            console.log("Could not initialize class. Response: "+response+"; Status: " + status);
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

            $q.all(traitCalls)
              .then(function(traitresult){
                    deferred.resolve(dndDataService.myData);
               });
           }
        })
        .error(function(response, status) {
           console.log("Could not get races. Response: "+response+"; Status: " + status);
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

    dndDataService.getRaceList = function() {
      return dndDataService.myData.raceList;
    }


    dndDataService.initClasses = function () {
      var deferred = $q.defer();

      dndFactory.getClasses()
        .success(function(result) {
          dndDataService.myData.classes = result.classes;
          deferred.resolve(dndDataService.myData);
        })
        .error(function(response, status) {
           console.log("Could not get classes. Response: "+response+"; Status: " + status);
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

    dndDataService.getClassList = function() {
      return dndDataService.myData.classList;
    }


//Loop over races 
//  get traits of main race
//  If sub races defined, loop over sub races
//    get traits of sub race

// var promise1 = $http({method: 'GET', url: '/api-one-url', cache: 'true'});
// var promise2 = $http({method: 'GET', url: '/api-two-url', cache: 'true'});
// $q.all([promise1, promise2]).then(function(data){console.log(data[0], data[1]);});

// Or maybe (if it works)
// $.when (
//    // Get the HTML
//    $.get("/feature/", function(html) { globalStore.html = html;}),
//    // Get the CSS
//    $.get("/assets/feature.css", function(css) { globalStore.css = css;}),
//    // Get the JS
//    $.get("/assets/feature.js")
// ).then(function() {
//    // All is ready now, so ...
//    // Add css to page
//   $("<style />").html(globalStore.css).appendTo("head");
//    // Add HTML to page
//   $("body").append(globalStore.html);
// });

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
             console.log("The request failed. Response: "+response+"; Status: " + status);
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

    //JMG: for testing purposes
    dndDataService.getAll = function () {
      return dndDataService.myData;
    }

    dndDataService.getRaceTraits = function (theRace) {
      var deferred = $q.defer();
      var theDbRace = theRace.toLowerCase();
      theDbRace = theDbRace.replace(/-/g, '_');
      theDbRace = theDbRace.replace(/ /g, '_');
      theDbRace = theDbRace.replace(/\//g, '_');

      if (typeof dndDataService.myData.racetraits[theRace] == "undefined") {
        dndFactory.getRaceTraits(theDbRace)
          .success(function(result) {
             dndDataService.myData.racetraits[theRace] = result;
             delete dndDataService.myData.racetraits[theRace]._id;
             delete dndDataService.myData.racetraits[theRace]._rev;
             deferred.resolve(dndDataService.myData.racetraits[theRace]);
          })
          .error(function(response, status) {
             console.log("The request failed. Response: "+JSON.stringify(response)+"; Status: " + status);
             deferred.reject(response);
          });
      } else {
        deferred.resolve(dndDataService.myData.racetraits[theRace]);
      }
      return deferred.promise;
    };

    dndDataService.getClassTraits = function (theClass) {
      var deferred = $q.defer();
      var theDbClass = theClass.toLowerCase();
      theDbClass = theDbClass.replace(/-/g, '_');
      theDbClass = theDbClass.replace(/ /g, '_');
      theDbClass = theDbClass.replace(/\//g, '_');

      if (typeof dndDataService.myData.classtraits[theClass] == "undefined") {
        dndFactory.getClassTraits(theDbClass)
          .success(function(result) {
             dndDataService.myData.classtraits[theClass] = result;
             delete dndDataService.myData.classtraits[theClass]._id;
             delete dndDataService.myData.classtraits[theClass]._rev;
             deferred.resolve(dndDataService.myData.classtraits[theClass]);
          })
          .error(function(response, status) {
             console.log("The request failed. Response: "+JSON.stringify(response)+"; Status: " + status);
             deferred.reject(response);
          });
      } else {
        deferred.resolve(dndDataService.myData.classtraits[theClass]);
      }
      return deferred.promise;

    };

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


    return dndDataService;
}]);

