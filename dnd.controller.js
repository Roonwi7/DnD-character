angular.module('DnDApp')
  //.controller('DnDController', [ '$q', 'dndDataService', function( $q, dndDataService ) {
  .controller('DnDController', [ '$q', 'dndDataService', '$uibModal', function( $q, dndDataService, $uibModal) {

    var dndController = this;

    dndController.setTest = setTest;
    dndController.opts = {};
    function setTest()
    {

      const modalInstance = $uibModal.open ({ 
        templateUrl: 'modal.html',
        resolve: {
          items: function() {
            return ({abc:'Hello'});
          }
        }
      });

      var myText = {};
      modalInstance.result.then(function (selectedItem) {
        myText = selectedItem;
      }, function() {
        console.log('JMG: modal dismissed at: ' + new Date());
      });
      dndController.test="Hi: " + JSON.stringify( myText );

      //const modalInstance = $uibModal.open ({ 'template': '<div><h1>Hello, this is template.</h1></div>'});
/*
      var r = confirm("Press a button");
      if (r == true) {
        x = "You pressed OK!";
      } else {
        x = "You pressed Cancel!";
      }
      dndController.test="Hi: " + JSON.stringify( x );
*/
      //dndController.test="Hi: " + JSON.stringify( dndDataService.getAll() );
      //dndController.test="Hi: " + JSON.stringify( dndController.languageList );
    }

    var genTypes=[ "3d6", "4d6 - 1", "5d6 - 2", 
                   "Non-Elite Array", "Elite Array", 
                   "Basic Stats", "Max Stats" ];
    var genTypeEliteArray = [8,10,12,13,14,15];
    var genTypeNonEliteArray = [8,9,10,11,12,13];
    var genType3d6=0;
    var genType4d6=1;
    var genType5d6=2;
    var genTypeNonElite=3;
    var genTypeElite=4;
    var genTypeBasic=5;
    var genTypeMax=6;

    dndController.users = [ {"id": 1, "name": "Ali" },
                            {"id": 2, "name": "Sara" },
                            {"id": 3, "name": "Babak" },
                            {"id": 4, "name": "Sanaz" },
                            {"id": 5, "name": "Dariush" }, ];
    dndController.selectedUserIds = [3, 5];


//  TODO:
//    Add Armor Class
//    Add Hit Points
//    Add Proficiency for Saving Throws & Skills (checklist)
//    Add Alignment
//    Allow selection of Ideal based on Alignment
//    Add picklist for Languages
//    Add Age/Sex/Eyes/Skin/Hair
//    Add Name Generator
//    Add more info under character backgrounds
//    Add Spell selections

    dndController.curGenType = genType3d6;
    dndController.genType = genTypes[dndController.curGenType];
    dndController.points = 27;

    dndController.attributes = [];
    dndController.attributeList = [];
    dndController.attributeInfo = [];

    dndController.languageList = [];
    dndController.languageList1 = [];
    dndController.languageAvail = 0;
    dndController.languageToSelectRace = 0;
    dndController.languageToSelectBackground = 0;

    dndController.hasChar = false;

    dndController.raceTitle = "Racial Characteristics";
    dndController.raceTypes = null;
    dndController.raceSelect = null;
    dndController.raceTable = null;
    dndController.raceInfo = [];
    dndController.hasRace = false;

    dndController.classTitle = "Class Characteristics";
    dndController.classDesc = "";
    dndController.classTypes = null;
    dndController.classSelect = null;
    dndController.classTable = null;
    dndController.classInfo = [];
    dndController.hasClass = false;

    dndController.backgroundTitle = "Character Background";
    dndController.backgroundSelect = null;
    dndController.backgrounds = null;
    dndController.backgroundTable = null;
    dndController.hasBackground = false;

    // Functions
    dndController.initialize = initialize;
    dndController.createAtts = createAtts;
    dndController.genAll = genAll;
    dndController.genRaceClass = genRaceClass;
    dndController.genStats = genStats;
    dndController.generateStat = generateStat;
    dndController.genBackground = genBackground;
    dndController.updateBackground = updateBackground;
    dndController.changeGen = changeGen;
    dndController.updateRace = updateRace;
    dndController.updateClass = updateClass;
    dndController.getCurrentRaceInfo = getCurrentRaceInfo;
    dndController.getCurrentClassInfo = getCurrentClassInfo;
    dndController.calcTotal = calcTotal;
    dndController.calcPoints = calcPoints;
    dndController.setLanguage = setLanguage;
    dndController.resetLanguage = resetLanguage;
    dndController.recalcLanguageAvail = recalcLanguageAvail;
    dndController.languageSelected = languageSelected;

    dndController.initialize();

    function initialize()
    {
      dndDataService.init()
        .then(
          function(result) { 
                   dndController.attributeList = dndDataService.getAttributes();
                   dndController.languageList = dndDataService.getLanguages();
                   dndController.raceTypes = dndDataService.getRaceList();
                   dndController.classTypes = dndDataService.getClassList();
                   dndController.backgrounds = dndDataService.getBackgrounds();
                   dndController.createAtts();
          },
          function(result) {
                   console.log("Failed to initialize data: " + JSON.stringify(result));
          });
    }

    function changeGen()
    {
      dndController.curGenType = dndController.curGenType + 1;
      if (dndController.curGenType > genTypeMax)
      {
        dndController.curGenType = genType3d6;
      }
      dndController.genType = genTypes[dndController.curGenType];
    }

    function genAll()
    {
      dndController.genRaceClass();
      dndController.genStats();
      dndController.genBackground();
    }

    function genRaceClass() 
    {
      var randIndex = 0;

      dndController.raceSelect = dndDataService.getRandomRace();
      updateRace();

      dndController.classSelect = dndDataService.getRandomClass();
      updateClass();

      dndController.backgroundSelect = dndDataService.getRandomBackground();
      updateBackground();
    }

    function genStats()
    {
      for (i in dndController.attributeList)
      {
        (dndController.attributes[i]).base = dndController.generateStat(Number(i));
      }
      dndController.calcTotal();
      dndController.hasChar = true;
    }

    function createAtts()
    {
      var attributes = dndController.attributeList;
      for (var attribute in dndController.attributeList ) {
        attributeName = dndController.attributeList[attribute];
        dndController.attributes.push({ attr:attributeName, mod:0, total:8, base:8, basemod:0 });
      }
    }

    function generateStat(attribute)
    {
      var d1, d2, d3, d4, total;
      var pts = [];
      var type = dndController.curGenType;
      pts.push (Math.floor((Math.random() * 6) + 1));
      pts.push (Math.floor((Math.random() * 6) + 1));
      pts.push (Math.floor((Math.random() * 6) + 1));
      total = 0;

      switch (type) {
        case genType3d6:
          total = pts[0]+pts[1]+pts[2];
          break;
        case genType4d6:
          pts.push (Math.floor((Math.random() * 6) + 1));
          pts.sort(function(a,b) {return b-a;});
          total = pts[0]+pts[1]+pts[2];
          break;
        case genType5d6:
          pts.push (Math.floor((Math.random() * 6) + 1));
          pts.push (Math.floor((Math.random() * 6) + 1));
          pts.sort(function(a,b) {return b-a;});
          total = pts[0]+pts[1]+pts[2];
          break;
        case genTypeNonElite:
          total = genTypeNonEliteArray[attribute];
          break;
        case genTypeElite:
          total = genTypeEliteArray[attribute];
          break;
        case genTypeMax:
          total = 18;
          break;
        case genTypeBasic:
        default: 
          total = 8;
          break;
      }
      return total;
    }

    function calcTotal()
    {
      for (i=0; i<dndController.attributes.length; i++) {
        (dndController.attributes[i]).total = 
          Number((dndController.attributes[i]).base) 
          + Number((dndController.attributes[i]).basemod);
        (dndController.attributes[i]).mod = calcModifier((dndController.attributes[i]).total);
      }
      dndController.calcPoints();
    }

    function calcPoints()
    {
      var pnts = 0;

      for (i=0; i<dndController.attributes.length; i++) {
        pnts += dndController.attributes[i].base - 8;
        if (dndController.attributes[i].base > 13) {
          pnts += (dndController.attributes[i].base - 13);
        }
        if (dndController.attributes[i].base > 15) {
          pnts += (dndController.attributes[i].base - 15);
        }
        if (dndController.attributes[i].base > 17) {
          pnts += (dndController.attributes[i].base - 17);
        }
      }
      dndController.points = pnts;
    }

    function getCurrentRaceInfo()
    {
      var deferred = $q.defer();

      dndDataService.getRaceTraits(dndController.raceSelect.race)
        .then(
          function(result1) {
            if (dndController.raceSelect.subrace != dndController.raceSelect.race) {
              dndDataService.getRaceTraits(dndController.raceSelect.subrace)
                .then(
                  function(result2) {
                    deferred.resolve({main:result1, sub:result2});
                  },
                  function(response, status) {
                    console.log("Failed to get subrace traits. Response: "+JSON.stringify(response)+"; Status: "+status);
                    deferred.reject(response);
                  });
            } else {
              deferred.resolve({main:result1, sub:{} });
            }
          },
          function(response, status) {
            console.log("Failed to get race traits. Response: "+JSON.stringify(response)+"; Status: "+status);
            deferred.reject(response);
          });

      return deferred.promise;
    }

    function updateRace()
    {
      dndController.getCurrentRaceInfo()
        .then(
          function(result) { 

            // Clear race information
            dndController.raceTable = [];
            dndController.raceInfo = [];
            dndController.resetLanguage();

            // Set title for racial characteristics
            dndController.raceTitle = dndController.raceSelect.subrace + " Racial Characteristics";

            // Add Size race trait
            if (result.main.size != null) {
              dndController.raceTable.push({attr:"Size",value:result.main.size});
            }

            // Add Speed race trait
            if (result.main.speed != null) {
              var speed = result.main.speed;
              if (result.sub.speed != null) {
                speed = speed + result.sub.speed;
              }
              dndController.raceTable.push({attr:"Speed",value:speed});
            }

            // Calculate and add Height race trait
            var addinches = Number(calcHeight(result.main.heightdice));
            var inches = Number(result.main.height) + Number(addinches);
            var feet = Number(Math.floor(inches / 12));
            inches = Number(inches - (feet * 12));
            dndController.raceTable.push({attr:"Height",value:feet+" ft, "+inches+" in"});

            // Calculate and add Weight race trait
            var pounds = Number(calcWeight(result.main.weightdice, addinches)) + Number(result.main.weight);
            dndController.raceTable.push({attr:"Weight",value:pounds+" lbs"});

            // Add Languages for race trait
            dndController.languageToSelectRace = 0;
            if (typeof result.main.lang !== "undefined") {
              for (var lang in result.main.lang) {
                if (result.main.lang[lang] == "1") {
                  dndController.languageToSelectRace += 1;
                }
                else if (result.main.lang[lang] == "2") {
                  dndController.languageToSelectRace += 2;
                }
                else {
                  dndController.languageToSelectRace += 1;
                  dndController.setLanguage(result.main.lang[lang], true);
                }
              }
              if (typeof result.sub.lang !== "undefined") {
                for (var lang in result.sub.lang) {
                  if (result.sub.lang[lang] == "1") {
                    dndController.languageToSelectRace += 1;
                  }
                  else if (result.sub.lang[lang] == "2") {
                    dndController.languageToSelectRace += 2;
                  }
                  else {
                    dndController.languageToSelectRace += 1;
                    dndController.setLanguage(result.sub.lang[lang], true);
                  }
                }
              }
            }
            dndController.recalcLanguageAvail();

            // Add Specials race trait
            if (typeof result.main.special !== "undefined") {
              var spec = result.main.special;
              if (typeof result.sub.special !== "undefined") {
                spec = spec + result.sub.special;
              }
              dndController.raceInfo.push({lbl:"Special Traits:",val:spec});
            }

            // Add Attribute Modifiers race trait
            var attributes = dndController.attributeList;
            for (i=0; i<attributes.length; i++)
            {
              if (typeof result.main[attributes[i]] !== "undefined")
              {
                (dndController.attributes[i]).basemod = Number(result.main[attributes[i]]);
              } else {
                (dndController.attributes[i]).basemod = 0;
              }
              if (typeof result.sub[attributes[i]] !== "undefined")
              {
                (dndController.attributes[i]).basemod = 
                            Number(result.sub[attributes[i]])
                          + Number((dndController.attributes[i]).basemod);
              }
            }

            dndController.calcTotal();
            dndController.hasRace = true;
            dndController.hasChar = true;

          });
    }

    function getCurrentClassInfo()
    {
      var deferred = $q.defer();

      dndDataService.getClassTraits(dndController.classSelect.class)
        .then(
          function(result1) {
            if (dndController.classSelect.subclass != dndController.classSelect.class) {
              dndDataService.getClassTraits(dndController.classSelect.subclass)
                .then(
                  function(result2) {
                    deferred.resolve({main:result1, sub:result2});
                  },
                  function(response, status) {
                    console.log("Failed to get subclass traits. Response: "+JSON.stringify(response)+"; Status: "+status);
                    deferred.reject(response);
                  });
            } else {
              deferred.resolve({main:result1, sub:{} });
            }
          },
          function(response, status) {
            console.log("Failed to get class traits. Response: "+JSON.stringify(response)+"; Status: "+status);
            deferred.reject(response);
          });
      return deferred.promise;
    }

    function updateClass() 
    {
      // Clear class information
      dndController.classTable = [];
      dndController.classInfo = [];

      // Set title for racial characteristics
      dndController.classTitle = dndController.classSelect.class + " ("
                         + dndController.classSelect.subclass +")"
                         + " Class Characteristics";

      dndController.getCurrentClassInfo()
        .then(
          function(result) {
              dndController.classDesc = result.main.desc;

              dndController.classTable.push({attr:"Hit Die",value: result.main.hitd}); 

              if (typeof result.main.armr !== "undefined") {
                var armr = result.main.armr;
                if (typeof result.sub.armr !== "undefined") {
                  armr = armr + result.sub.armr;
                }
                dndController.classTable.push({attr:"Armor",value:armr});
              }

              if (typeof result.main.weap !== "undefined") {
                var wpn =  result.main.weap;
                if (typeof result.sub.weap !== "undefined") {
                  wpn = wpn + result.sub.weap;
                }
                dndController.classTable.push({attr:"Weapon",value:wpn});
              }

              dndController.classTable.push({attr:"Wealth",value: calcWealth(result.main.wealth) + " gp" });

              if (typeof result.main.prim !== "undefined") {
                var primary = result.main.prim;
                if (typeof result.sub.prim !== "undefined") {
                  primary = primary + result.sub.prim;
                }
                dndController.classInfo.push({lbl:"Primary Abilities:",val:primary});
              }

              if (typeof result.main.savt !== "undefined") {
                var saveThrow = result.main.savt;
                dndController.classInfo.push({lbl:"Saving Throws:",val:saveThrow});
              }
        });
      dndController.hasClass = true;
    }

    function genBackground() 
    {
      dndController.backgroundSelect = dndDataService.getRandomBackground();
      updateBackground();
    }

                
    function updateBackground() 
    {

      dndDataService.getBackgroundTraits(dndController.backgroundSelect)
        .then(
          function(result) {

            dndController.backgroundSpShow = false;
            dndController.backgroundSpLbl = "";
            dndController.backgroundSp = "";
            dndController.backgroundTitle = dndController.backgroundSelect + " Character Background";

            var index = (Math.floor(Math.random() * (result.personality).length));
            dndController.backgroundT1 = (result.personality)[index];

            var index2 = index;
            while (index2 == index) {
              index2 = (Math.floor(Math.random() * (result.personality).length));
            }
            dndController.backgroundT2 = (result.personality)[index2];

            index = (Math.floor(Math.random() * (result.ideal).length));
            dndController.backgroundI = (result.ideal)[index];

            index = (Math.floor(Math.random() * (result.bond).length));
            dndController.backgroundB = (result.bond)[index];

            index = (Math.floor(Math.random() * (result.flaw).length));
            dndController.backgroundF = (result.flaw)[index];

            if (typeof result.special !== "undefined") {
              index = (Math.floor(Math.random() * (result.special).length));
              dndController.backgroundSpShow = true;
              dndController.backgroundSpLbl = result.specialTitle;
              dndController.backgroundSp = (result.special)[index];
            }

            dndController.languageToSelectBackground = 0;
            if (typeof result.benefits.Languages !== "undefined") {
              if (result.benefits.Languages == "1") {
                dndController.languageToSelectBackground += 1;
              }
              else if (result.benefits.Languages == "2") {
                dndController.languageToSelectBackground += 2;
              }
              else {
                dndController.languageToSelectBackground += 1;
                dndController.setLanguage(result.benefits.Languages, true);
              }
            }
            dndController.recalcLanguageAvail();


            dndController.backgroundTable = [];
            if (typeof result.benefits.skillprof !== "undefined") {
              dndController.backgroundTable.push({attr:"Skill Proficiencies",value: result.benefits.skillprof}); 
            }

            if (typeof result.benefits.toolprof !== "undefined") {
              dndController.backgroundTable.push({attr:"Tool Proficiencies",value: result.benefits.toolprof}); 
            }

            for (var equip in result.benefits.equipment) {
              if (equip > 0) {
                dndController.backgroundTable.push({attr:"",value: result.benefits.equipment[equip]}); 
              } else {
                dndController.backgroundTable.push({attr:"Equipment",value: result.benefits.equipment[equip]}); 
              }
            }

            dndController.hasBackground = true;

          },
          function(response, status) {
            console.log("Failed to get race traits. Response: "+JSON.stringify(response)+"; Status: "+status);
            deferred.reject(response);
          });
    }

    function setLanguage(inLanguage, inSelected)
    {
      for (var lang in dndController.languageList) {
        if (inLanguage == dndController.languageList[lang].language) {
          dndController.languageList[lang].selected = inSelected;
        }
      }
    }

    function resetLanguage()
    {
      for (var lang in dndController.languageList) {
        dndController.languageList[lang].selected = false;
      }
    }

    function recalcLanguageAvail()
    {
      dndController.languageAvail = dndController.languageToSelectRace + dndController.languageToSelectBackground;
console.log("JMG: total languageAvail = "+dndController.languageAvail);
      for (var lang in dndController.languageList) {
        if (dndController.languageList[lang].selected == true) {
          dndController.languageAvail -= 1;
console.log("JMG: updated languageAvail = "+dndController.languageAvail);
        }
      }
console.log("JMG: final languageAvail = "+dndController.languageAvail);
    }

    function languageSelected (langState)
    {
      if (langState) {
        dndController.languageAvail -= 1;
      } else {
        dndController.languageAvail += 1;
      }
    }


function calcHeight(heightdice) {
  var inches = 0;
  var dice, numdie, valdie;
  if (typeof heightdice !== "undefined") {
    dice = heightdice;
    numdie = Number(dice[0]);
    if (dice.length == 3) {
      valdie = Number(dice[2]);
    } else {
      valdie = Number(dice[2]+dice[3]);
    }
    for (i=0; i<numdie; i++) {
      inches = inches + (Math.floor(Math.random() * valdie) + 1);
    }
  }
  return (inches);
}

function calcWeight(weightdice, inches) {
  var pounds = 0;
  if (typeof weightdice !== "undefined") {
    var dice = weightdice;
    var numdie = Number(dice[0]);
    var valdie = Number(dice[2]);
    for (i=0; i<numdie; i++) {
      pounds = pounds + (Math.floor(Math.random() * valdie) + 1);
    }
    pounds = inches * pounds;
  }
  return (pounds);
}

function calcWealth(wealth) {
  var gold = 0;
  if (typeof wealth !== "undefined") {
    var dice = wealth;

    var numdie = Number(dice[0]);
    var valdie = Number(dice[2]);
    var valmult = Number(dice[4] + dice[5]);
    for (i=0; i<numdie; i++) {
      gold = gold + (Math.floor(Math.random() * valdie) + 1);
    }
    gold = valmult * gold;
  }
  return (gold);
}

function calcModifier(point) {
  var mod = Math.floor(point/2) - 5;
  return (mod);
}

}]);
