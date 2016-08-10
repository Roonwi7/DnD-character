angular.module('DnDApp')
  .controller('DnDController', ['$q', 'dndDataService', function($q, dndDataService) {

    var dndController = this;

    dndController.setTest = setTest;
    function setTest()
    {
      dndController.test="Hi: " + JSON.stringify( dndDataService.getAll() );
    }

//  TODO:
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
    dndController.raceTypes = raceTypes;
// JMG: TODO create raceTypes from dataservice, not from hard-coded values
    dndController.raceSelect = null;
    dndController.raceTable = null;
    dndController.raceInfo = [];

    dndController.classTitle = "Class Characteristics";
    dndController.classDesc = "";
    dndController.classTypes = classTypes;
    dndController.classSelect = null;
    dndController.classTable = null;
    dndController.classInfo = [];

    dndController.charBgTitle = "Character Background";
    dndController.charBgSelect = null;
    dndController.charBackgrounds = bgDetails;

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
//dndDataService.getRaceTraits("Half-Elf")
//dndDataService.getRaces()
//dndDataService.getSubRaces("Half-Elf")
      dndDataService.init()
        .then(
          function(result) { 
                   //dndController.test="Initial test subject";
                   //dndController.test="Hi: " + JSON.stringify(result);
                   //dndController.test="Hi: " + result.race + ". I see you speak " + result.lang + "."; 
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

      randIndex = Math.floor(Math.random() * dndController.raceTypes.length);
      dndController.raceSelect = dndController.raceTypes[randIndex];
      //dndController.raceSelect = dndDataService.getRandomRace();
//console.log("JMG: raceSelect = "+JSON.stringify(dndController.raceSelect));
      updateRace();

      randIndex = Math.floor(Math.random() * dndController.classTypes.length);
      dndController.classSelect = dndController.classTypes[randIndex];
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

    function updateRace()
    {
      // Clear race information
      dndController.raceTable = [];
      dndController.raceInfo = [];

      var theRace = findRace(dndController.raceSelect.race);
      var theSubRace = findSubRace(theRace, dndController.raceSelect.subr);

      // Set title for racial characteristics
      //dndController.raceTitle = raceTraits[theRace][theSubRace].race + " Racial Characteristics";
      dndController.raceTitle = dndController.raceSelect.subr + " Racial Characteristics";
      
      dndDataService.getRaceTraits(dndController.raceSelect.subr)
        .then(
          function(result) { 
//dndController.test="Title: " +dndController.raceTitle+ ";  " + JSON.stringify(result);
//JMG 
            // Add Size race trait
            //JMG dndController.raceTable.push({attr:"Size",value:result[0].size});
            dndController.raceTable.push({attr:"Size",value:result.size});

      // Add Speed race trait
      if (typeof raceTraits[theRace][0].speed !== "undefined") {
        var speed = raceTraits[theRace][0].speed;
        if (theSubRace > 0 && typeof (raceTraits[theRace][theSubRace]).speed !== "undefined") {
          speed = speed + (raceTraits[theRace][theSubRace]).speed;
        }
        dndController.raceTable.push({attr:"Speed",value:speed});
      }

      // Calculate and add Height race trait
      var addinches = calcHeight(theRace);
      var inches = raceTraits[theRace][0].height + addinches;
      var feet = Math.floor(inches / 12);
      inches = inches - (feet * 12);
      dndController.raceTable.push({attr:"Height",value:feet+" ft, "+inches+" in"});

      // Calculate and add Weight race trait
      var pounds = calcWeight(theRace, addinches) + raceTraits[theRace][0].weight;
      dndController.raceTable.push({attr:"Weight",value:pounds+" lbs"});

      // Add Languages race trait
      if (typeof raceTraits[theRace][0].lang !== "undefined") {
        var langs = raceTraits[theRace][0].lang;
        if (theSubRace > 0 && typeof (raceTraits[theRace][theSubRace]).lang !== "undefined") {
          langs = langs + (raceTraits[theRace][theSubRace]).lang;
        }
        dndController.raceInfo.push({lbl:"Languages:",val:langs});
      }

      // Add Specials race trait
      if (typeof raceTraits[theRace][0].special !== "undefined") {
        var spec = raceTraits[theRace][0].special;
        if (theSubRace > 0 && 
            typeof (raceTraits[theRace][theSubRace]).special !== "undefined") {
          spec = spec + (raceTraits[theRace][theSubRace]).special;
        }
        dndController.raceInfo.push({lbl:"Special Traits:",val:spec});
      }

      // Add Attribute Modifiers race trait
      for (i=0; i<statTypes.length; i++)
      {
        if (typeof raceTraits[theRace][0][statTypes[i]] !== "undefined")
        {
          (dndController.attributes[i]).basemod = Number(raceTraits[theRace][0][statTypes[i]]);
        } else {
          (dndController.attributes[i]).basemod = 0;
        }
        if (theSubRace > 0 && typeof (raceTraits[theRace][theSubRace])[statTypes[i]] !== "undefined")
        {
          (dndController.attributes[i]).basemod = 
                      Number(raceTraits[theRace][theSubRace][statTypes[i]])
                    + Number((dndController.attributes[i]).basemod);
        }
      }

      dndController.calcTotal();
      dndController.hasRace = true;
      dndController.hasChar = true;
          },
          function(result) {
                   console.log("Failed to get race info: " + JSON.stringify(result));
          });
    }

    function updateClass() 
    {
      // Clear class information
      dndController.classTable = [];
      dndController.classInfo = [];

      var theClass = findClass(dndController.classSelect.class);
      var theSubClass = findSubClass(theClass, dndController.classSelect.subc);

      // Set title for racial characteristics
      dndController.classTitle = classTraits[theClass][0].class + " ("
                         + classTraits[theClass][theSubClass].class +")"
                         + " Class Characteristics";

      dndController.classDesc = classTraits[theClass][0].desc;

      dndController.classTable.push({attr:"Wealth",value: calcWealth(theClass) + " gp" });
      dndController.classTable.push({attr:"Hit Die",value:classTraits[theClass][0].hitd}); 

      if (typeof classTraits[theClass][0].armr !== "undefined") {
        var armr = classTraits[theClass][0].armr;
        if (theSubClass > 0 && 
            typeof (classTraits[theClass][theSubClass]).armr !== "undefined") {
          armr = armr + (classTraits[theClass][theSubClass]).armr;
        }
        dndController.classTable.push({attr:"Armor",value:armr});
      }

      if (typeof classTraits[theClass][0].weap !== "undefined") {
        var wpn =  classTraits[theClass][0].weap;
        if (theSubClass > 0 && 
            typeof (classTraits[theClass][theSubClass]).weap !== "undefined") {
          wpn = wpn + (classTraits[theClass][theSubClass]).weap;
        }
        dndController.classTable.push({attr:"Weapon",value:wpn});
      }

      if (typeof classTraits[theClass][0].prim !== "undefined") {
        var primary = classTraits[theClass][0].prim;
        if (theSubClass > 0 && 
            typeof (classTraits[theClass][theSubClass]).prim !== "undefined") {
          primary = primary + (classTraits[theClass][theSubClass]).prim;
        }
        dndController.classInfo.push({lbl:"Primary Abilities:",val:primary});
      }

      if (typeof classTraits[theClass][0].savt !== "undefined") {
        var saveThrow = classTraits[theClass][0].savt; 
        dndController.classInfo.push({lbl:"Saving Throws:",val:saveThrow});
      }
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

      dndController.charBgTitle = dndController.charBgSelect.name + " Character Background";

      var theBkGrnd = findBg(dndController.charBgSelect.name);
      var index = (Math.floor(Math.random() * (bgDetails[theBkGrnd].personality).length));
      dndController.charBgT1 = ((bgDetails[theBkGrnd]).personality)[index];
      var index2 = index;
      while (index2 == index) {
        index2 = (Math.floor(Math.random() * (bgDetails[theBkGrnd].personality).length));
      }
      dndController.charBgT2 = ((bgDetails[theBkGrnd]).personality)[index2];

      index = (Math.floor(Math.random() * (bgDetails[theBkGrnd].ideal).length));
      dndController.charBgI = ((bgDetails[theBkGrnd]).ideal)[index];

      index = (Math.floor(Math.random() * (bgDetails[theBkGrnd].bond).length));
      dndController.charBgB = ((bgDetails[theBkGrnd]).bond)[index];

      index = (Math.floor(Math.random() * (bgDetails[theBkGrnd].flaw).length));
      dndController.charBgF = ((bgDetails[theBkGrnd]).flaw)[index];

      if (typeof bgDetails[theBkGrnd].bgspec !== "undefined") {
        index = (Math.floor(Math.random() * (bgDetails[theBkGrnd].bgspec).length));
        dndController.charBgSpShow = true;
        dndController.charBgSpLbl = (bgDetails[theBkGrnd]).specdesc;
        dndController.charBgSp = ((bgDetails[theBkGrnd]).bgspec)[index];
      }
      dndController.hasBg = true;
    }


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
function findBg(bgName) {
      var theBg = 0;
      for (var i=0; i<bgDetails.length; i++)
      { theBg = i; 
        if (bgDetails[i].name === bgName) { break; } 
      }
      if (theBg >= bgDetails.length) { theBg = 0; }
      return theBg;
}

function calcHeight(theRace) {
  var inches = 0;
  var dice, numdie, valdie;
  if (typeof raceTraits[theRace][0].heightdice !== "undefined") {
    dice = raceTraits[theRace][0].heightdice;
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

function calcWeight(theRace, inches) {
  var pounds = 0;
  if (typeof raceTraits[theRace][0].weightdice !== "undefined") {
    var dice = raceTraits[theRace][0].weightdice;
    var numdie = Number(dice[0]);
    var valdie = Number(dice[2]);
    for (i=0; i<numdie; i++) {
      pounds = pounds + (Math.floor(Math.random() * valdie) + 1);
    }
    pounds = inches * pounds;
  }
  return (pounds);
}

function calcWealth(theClass) {
  var gold = 0;
  if (typeof classTraits[theClass][0].wealth !== "undefined") {
    var dice = classTraits[theClass][0].wealth;

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
