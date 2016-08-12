angular.module('DnDApp')
  .controller('DnDController', ['$q', 'dndDataService', function($q, dndDataService) {

    var dndController = this;

    dndController.setTest = setTest;
    function setTest()
    {
      dndController.test="Hi: " + JSON.stringify( dndDataService.getAll() );
    }

var genTypes=[ "3d6", "4d6 - 1", "5d6 - 2", 
               "Non-Elite Array", "Elite Array", 
               "Basic Stats", "Max Stats" ];
var genType3d6=0;
var genType4d6=1;
var genType5d6=2;
var genTypeNonEl=3;
var genTypeElite=4;
var genTypeBasic=5;
var genTypeMax=6;

var statTypes=[ "str", "dex", "con", "int", "wis", "cha" ];


//  TODO:
//    update to use background from database
//    figure out if TODO below is needed anymore
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
//dndController.test=theSubRace;
//if (isNaN(x.innerHTML)) 

    dndController.curGenType = genType3d6;
    dndController.genType = genTypes[dndController.curGenType];
    dndController.points = 27;
    dndController.attributes = [];
    dndController.strength;
    dndController.dexterity;
    dndController.constitution;
    dndController.wisdom;
    dndController.intelligence;
    dndController.charisma;
    dndController.hasChar = false;
    dndController.hasRace = false;
    dndController.hasClass = false;
    dndController.hasBg = false;

    dndController.raceTitle = "Racial Characteristics";
    dndController.raceTypes = null;
    dndController.raceSelect = null;
    dndController.raceTable = null;
    dndController.raceInfo = [];

    dndController.classTitle = "Class Characteristics";
    dndController.classDesc = "";
    dndController.classTypes = null;
    dndController.classSelect = null;
    dndController.classTable = null;
    dndController.classInfo = [];

    dndController.charBgTitle = "Character Background";
    dndController.charBgSelect = null;
    dndController.charBackgrounds = null;

    // Functions
    dndController.initialize = initialize;
    dndController.createAtts = createAtts;
    dndController.genAll = genAll;
    dndController.genRaceClass = genRaceClass;
    dndController.genStats = genStats;
    dndController.generateStat = generateStat;
    dndController.genCharBg = genCharBg;
    dndController.updateCharBg = updateCharBg;
    dndController.changeGen = changeGen;
    dndController.updateRace = updateRace;
    dndController.updateClass = updateClass;
    dndController.getCurrentRaceInfo = getCurrentRaceInfo;
    dndController.getCurrentClassInfo = getCurrentClassInfo;
    dndController.calcTotal = calcTotal;
    dndController.calcPoints = calcPoints;

    dndController.initialize();

    function initialize()
    {
      dndController.createAtts();
      dndController.attributes.push(dndController.strength);
      dndController.attributes.push(dndController.dexterity);
      dndController.attributes.push(dndController.constitution);
      dndController.attributes.push(dndController.wisdom);
      dndController.attributes.push(dndController.intelligence);
      dndController.attributes.push(dndController.charisma);
      dndDataService.init()
        .then(
          function(result) { 
                   dndController.raceTypes = dndDataService.getRaceList();
                   dndController.classTypes = dndDataService.getClassList();
                   dndController.charBackgrounds = dndDataService.getBackgrounds();
          },
          function(result) {
                   console.log("Failed to initialize data: " + result);
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
      dndController.genCharBg();
    }

    function genRaceClass() 
    {
      var randIndex = 0;

      dndController.raceSelect = dndDataService.getRandomRace();
      updateRace();

      dndController.classSelect = dndDataService.getRandomClass();
      updateClass();
    }

    function genStats()
    {
      for (i in statTypes)
      {
        (dndController.attributes[i]).base = dndController.generateStat(Number(i));
      }
      dndController.calcTotal();
      dndController.hasChar = true;
    }

    function createAtts()
    {
      dndController.strength = { attr:"Strength", mod:0, total:8, base:8, basemod:0 };
      dndController.dexterity = { attr:"Dexterity", mod:0, total:8, base:8, basemod:0 };
      dndController.constitution = { attr:"Constitution", mod:0, total:8, base:8, basemod:0 };
      dndController.wisdom = { attr:"Wisdom", mod:0, total:8, base:8, basemod:0 };
      dndController.intelligence = { attr:"Intelligence", mod:0, total:8, base:8, basemod:0 };
      dndController.charisma = { attr:"Charisma", mod:0, total:8, base:8, basemod:0 };
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
        case genTypeNonEl:
               switch (attribute) {
                 case 0:
                   total = 13;
                   break;
                 case 1:
                   total = 12;
                   break;
                 case 2:
                   total = 11;
                   break;
                 case 3:
                   total = 10;
                   break;
                 case 4:
                   total = 9;
                   break;
                 case 5:
                 default:
                   total = 8;
                   break;
               }
          break;
        case genTypeElite:
               switch (attribute) {
                 case 0:
                   total = 15;
                   break;
                 case 1:
                   total = 14;
                   break;
                 case 2:
                   total = 13;
                   break;
                 case 3:
                   total = 12;
                   break;
                 case 4:
                   total = 10;
                   break;
                 case 5:
                 default:
                   total = 8;
                   break;
               }
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
        switch (dndController.attributes[i].base) {
          case 9:
            pnts += 1;
            break;
          case 10:
            pnts += 2;
            break;
          case 11:
            pnts += 3;
            break;
          case 12:
            pnts += 4;
            break;
          case 13:
            pnts += 5;
            break;
          case 14:
            pnts += 7;
            break;
          case 15:
            pnts += 9;
            break;
          case 16:
            pnts += 12;
            break;
          case 17:
            pnts += 15;
            break;
          case 18:
            pnts += 19;
            break;
          default:
            pnts += 0;
            break;
        }
      }
      dndController.points = pnts;
      //JMG: TODO: ??  sumAttributes();
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
      // Clear race information
      dndController.raceTable = [];
      dndController.raceInfo = [];

      // Set title for racial characteristics
      dndController.raceTitle = dndController.raceSelect.subrace + " Racial Characteristics";

      dndController.getCurrentRaceInfo()
        .then(
          function(result) { 
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

            // Add Languages race trait
            if (typeof result.main.lang !== "undefined") {
              var langs = result.main.lang;
              if (typeof result.sub.lang !== "undefined") {
                langs = langs + result.sub.lang;
              }
              dndController.raceInfo.push({lbl:"Languages:",val:langs});
            }

            // Add Specials race trait
            if (typeof result.main.special !== "undefined") {
              var spec = result.main.special;
              if (typeof result.sub.special !== "undefined") {
                spec = spec + result.sub.special;
              }
              dndController.raceInfo.push({lbl:"Special Traits:",val:spec});
            }

            // Add Attribute Modifiers race trait
            for (i=0; i<statTypes.length; i++)
            {
              if (typeof result.main[statTypes[i]] !== "undefined")
              {
                (dndController.attributes[i]).basemod = Number(result.main[statTypes[i]]);
              } else {
                (dndController.attributes[i]).basemod = 0;
              }
              if (typeof result.sub[statTypes[i]] !== "undefined")
              {
                (dndController.attributes[i]).basemod = 
                            Number(result.sub[statTypes[i]])
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

    function genCharBg() 
    {
      randIndex = Math.floor(Math.random() * dndController.charBackgrounds.length);
      dndController.charBgSelect = dndController.charBackgrounds[randIndex];
      updateCharBg();
    }

    function updateCharBg() 
    {
      dndController.charBgSpShow = false;
      dndController.charBgSpLbl = "";
      dndController.charBgSp = "";

      dndController.charBgTitle = dndController.charBgSelect + " Character Background";

      dndDataService.getBackgroundTraits(dndController.charBgSelect)
        .then(
          function(result) {

      var index = (Math.floor(Math.random() * (result.personality).length));
      dndController.charBgT1 = (result.personality)[index];

      var index2 = index;
      while (index2 == index) {
        index2 = (Math.floor(Math.random() * (result.personality).length));
      }
      dndController.charBgT2 = (result.personality)[index2];

      index = (Math.floor(Math.random() * (result.ideal).length));
      dndController.charBgI = (result.ideal)[index];

      index = (Math.floor(Math.random() * (result.bond).length));
      dndController.charBgB = (result.bond)[index];

      index = (Math.floor(Math.random() * (result.flaw).length));
      dndController.charBgF = (result.flaw)[index];

      if (typeof result.special !== "undefined") {
        index = (Math.floor(Math.random() * (result.special).length));
        dndController.charBgSpShow = true;
        dndController.charBgSpLbl = result.specialTitle;
        dndController.charBgSp = (result.special)[index];
      }

      dndController.hasBg = true;

          },
          function(response, status) {
            console.log("Failed to get race traits. Response: "+JSON.stringify(response)+"; Status: "+status);
            deferred.reject(response);
          });
    }


/*
function findRace(race) {
      var theRace = 0;
      for (var i=0; i<raceTraits.length; i++)
      { theRace = i; 
        if (raceTraits[i][0].race === race) { break; } 
      }
      if (theRace >= raceTraits.length) { theRace = 0; }
      return theRace;
}

function findSubRace(theRace, subr) {
      var theSubRace = 0;
      for (var i=0; i<raceTraits[theRace].length; i++)
      { theSubRace = i; 
        if (raceTraits[theRace][i].race === subr) { break; } 
        theSubRace++;
      }
      if (theSubRace >= raceTraits[theRace].length) { theSubRace = 0; }
      return theSubRace;
}

function findClass(aClass) {
      var theClass = 0;
      for (var i=0; i<classTraits.length; i++)
      { theClass = i; 
        if (classTraits[i][0].class === aClass) { break; } 
      }
      if (theClass >= classTraits.length) { theClass = 0; }
      return theClass;
}

function findSubClass(theClass, subc) {
      var theSubClass = 0;
      for (var i=0; i<classTraits[theClass].length; i++)
      { theSubClass = i; 
        if (classTraits[theClass][i].class === subc) { break; } 
        theSubClass++;
      }
      if (theSubClass >= classTraits[theClass].length) { theSubClass = 0; }
      return theSubClass;
}

//function findBg(bgName) {
function findBg(bgName) {
      var theBg = 0;
      //for (var i=0; i<bgDetails.length; i++)
      for (var i=0; i<dndController.charBackgrounds.length; i++)
      { theBg = i; 
        //if (bgDetails[i].name === bgName) { break; } 
        if (dndController.charBackgrounds[i].name === bgName) { break; } 
      }
      //if (theBg >= bgDetails.length) { theBg = 0; }
      if (theBg >= dndController.charBackgrounds.length) { theBg = 0; }
      return theBg;
}
*/

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
  var mod;
// JMG TODO
// mod = Floor(point/2) - 5;
  switch (point) {
    case 1:
        mod = -5;
      break;
    case 2:
    case 3:
        mod = -4;
      break;
    case 4:
    case 5:
        mod = -3;
      break;
    case 6:
    case 7:
        mod = -2;
      break;
    case 8:
    case 9:
        mod = -1;
      break;
    case 10:
    case 11:
        mod = 0;
      break;
    case 12:
    case 13:
        mod = 1;
      break;
    case 14:
    case 15:
        mod = 2;
      break;
    case 16:
    case 17:
        mod = 3;
      break;
    case 18:
    case 19:
        mod = 4;
      break;
    case 20:
    case 21:
        mod = 5;
      break;
    case 22:
    case 23:
        mod = 6;
      break;
  }
  return (mod);
}

}]);
