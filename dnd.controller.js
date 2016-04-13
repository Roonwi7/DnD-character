angular
  .module('DnDApp')
  .controller('DnDController', DnDCtlr);

      //dndCtlr.test=theSubRace;
      //dndCtlr.error = !(dndCtlr.error);

  function DnDCtlr()
  {
    var dndCtlr = this;
    dndCtlr.error = false;

    dndCtlr.curGenType = genType3d6;
    dndCtlr.genType = genTypes[dndCtlr.curGenType];
    dndCtlr.points = 27;

    dndCtlr.raceTypes = raceTypes;
    dndCtlr.raceSelect = dndCtlr.raceTypes[0];
    dndCtlr.raceTable = [];
    dndCtlr.raceInfo = [];

    dndCtlr.classDesc = "";
    dndCtlr.classTypes = classTypes;
    dndCtlr.classSelect = dndCtlr.classTypes[0];
    dndCtlr.classTable = [];
    dndCtlr.classInfo = [];

    //dndCtlr.playName = "Michael";
    //dndCtlr.charName = "Gray";

    // Functions
    dndCtlr.genAll = genAll;
    dndCtlr.genRaceClass = genRaceClass;
    dndCtlr.genStats = genStats;
    dndCtlr.changeGen = changeGen;
    dndCtlr.updateRace = updateRace;
    dndCtlr.updateClass = updateClass;


    function changeGen()
    {
      dndCtlr.curGenType = dndCtlr.curGenType + 1;
      if (dndCtlr.curGenType > genTypeMax)
      {
        dndCtlr.curGenType = genType3d6;
      }
      dndCtlr.genType = genTypes[dndCtlr.curGenType];
    }



    function updateRace()
    {
      var t = "";
      dndCtlr.raceTable = [];
      dndCtlr.raceInfo = [];

      var theRace = findRace(dndCtlr.raceSelect.race);
      var theSubRace = findSubRace(theRace, dndCtlr.raceSelect.subr);

      dndCtlr.raceTable.push({attr:"Size",value:raceTraits[theRace][0].size});

      if (typeof raceTraits[theRace][0].speed !== "undefined") {
        var speed = raceTraits[theRace][0].speed;
        if (theSubRace > 0 && typeof (raceTraits[theRace][theSubRace]).speed !== "undefined") {
          speed = speed + (raceTraits[theRace][theSubRace]).speed;
        }
        dndCtlr.raceTable.push({attr:"Speed",value:speed});
      }

      var addinches = calcHeight(theRace);
      var inches = raceTraits[theRace][0].height + addinches;
      var feet = Math.floor(inches / 12);
      inches = inches - (feet * 12);
      dndCtlr.raceTable.push({attr:"Height",value:feet+" ft, "+inches+" in"});

      var pounds = calcWeight(theRace, addinches) + raceTraits[theRace][0].weight;
      dndCtlr.raceTable.push({attr:"Weight",value:pounds+" lbs"});

      if (typeof raceTraits[theRace][0].lang !== "undefined") {
        t = raceTraits[theRace][0].lang;
        if (theSubRace > 0 && typeof (raceTraits[theRace][theSubRace]).lang !== "undefined") {
          t = t + (raceTraits[theRace][theSubRace]).lang;
        }
        dndCtlr.raceInfo.push({lbl:"Languages:",val:t});
      }

      if (typeof raceTraits[theRace][0].special !== "undefined") {
        t = raceTraits[theRace][0].special;
        if (theSubRace > 0 && 
            typeof (raceTraits[theRace][theSubRace]).special !== "undefined") {
          t = t + (raceTraits[theRace][theSubRace]).special;
        }
        dndCtlr.raceInfo.push({lbl:"Special Traits:",val:t});
      }

/*
function determineRaceTraits() {

  document.getElementById("racechar").innerHTML = e.options[e.selectedIndex].text + " Racial Characteristics";

  t = "";
  document.getElementById("strmod").innerHTML = t;
  document.getElementById("dexmod").innerHTML = t;
  document.getElementById("conmod").innerHTML = t;
  document.getElementById("intmod").innerHTML = t;
  document.getElementById("wismod").innerHTML = t;
  document.getElementById("chamod").innerHTML = t;

  if (typeof raceTraits[theRace][0].str !== "undefined") {
    t = "+" + raceTraits[theRace][0].str;
  }
  if (theSubRace > 0 && typeof (raceTraits[theRace][theSubRace]).str !== "undefined") {
    t = t + "+" + (raceTraits[theRace][theSubRace]).str;
  }
  document.getElementById("strmod").innerHTML = t;

  t = "";
  if (typeof raceTraits[theRace][0].dex !== "undefined") {
    t = "+" + raceTraits[theRace][0].dex;
  }
  if (theSubRace > 0 && typeof (raceTraits[theRace][theSubRace]).dex !== "undefined") {
    t = t + "+" + (raceTraits[theRace][theSubRace]).dex;
  }
  document.getElementById("dexmod").innerHTML = t;

  t = "";
  if (typeof raceTraits[theRace][0].con !== "undefined") {
    t = "+" + raceTraits[theRace][0].con;
  }
  if (theSubRace > 0 && typeof (raceTraits[theRace][theSubRace]).con !== "undefined") {
    t = t + "+" + (raceTraits[theRace][theSubRace]).con;
  }
  document.getElementById("conmod").innerHTML = t;

  t = "";
  if (typeof raceTraits[theRace][0].int !== "undefined") {
    t = "+" + raceTraits[theRace][0].int;
  }
  if (theSubRace > 0 && typeof (raceTraits[theRace][theSubRace]).int !== "undefined") {
    t = t + "+" + (raceTraits[theRace][theSubRace]).int;
  }
  document.getElementById("intmod").innerHTML = t;

  t = "";
  if (typeof raceTraits[theRace][0].wis !== "undefined") {
    t = "+" + raceTraits[theRace][0].wis;
  }
  if (theSubRace > 0 && typeof (raceTraits[theRace][theSubRace]).wis !== "undefined") {
    t = t + "+" + (raceTraits[theRace][theSubRace]).wis;
  }
  document.getElementById("wismod").innerHTML = t;

  t = "";
  if (typeof raceTraits[theRace][0].cha !== "undefined") {
    t = "+" + raceTraits[theRace][0].cha;
  }
  if (theSubRace > 0 && typeof (raceTraits[theRace][theSubRace]).cha !== "undefined") {
    t = t + "+" + (raceTraits[theRace][theSubRace]).cha;
  }
  document.getElementById("chamod").innerHTML = t;
  calcPoints()
}
*/

    }

    function updateClass() {
      var t = "";
      dndCtlr.classTable = [];
      dndCtlr.classInfo = [];

      var theClass = findClass(dndCtlr.classSelect.class);
      var theSubClass = findSubClass(theClass, dndCtlr.classSelect.subc);

      dndCtlr.classDesc = classTraits[theClass][0].desc;

      dndCtlr.classTable.push({attr:"Wealth",value: calcWealth(theClass) + " gp" });
      dndCtlr.classTable.push({attr:"Hit Die",value:classTraits[theClass][0].hitd}); 

      if (typeof classTraits[theClass][0].armr !== "undefined") {
        var armr = classTraits[theClass][0].armr;
        if (theSubClass > 0 && 
            typeof (classTraits[theClass][theSubClass]).armr !== "undefined") {
          armr = armr + (classTraits[theClass][theSubClass]).armr;
        }
        dndCtlr.classTable.push({attr:"Armor",value:armr});
      }

      if (typeof classTraits[theClass][0].weap !== "undefined") {
        var wpn =  classTraits[theClass][0].weap;
        if (theSubClass > 0 && 
            typeof (classTraits[theClass][theSubClass]).weap !== "undefined") {
          wpn = wpn + (classTraits[theClass][theSubClass]).weap;
        }
        dndCtlr.classTable.push({attr:"Weapon",value:wpn});
      }

      if (typeof classTraits[theClass][0].prim !== "undefined") {
        t = classTraits[theClass][0].prim;
        if (theSubClass > 0 && 
            typeof (classTraits[theClass][theSubClass]).prim !== "undefined") {
          t = t + (classTraits[theClass][theSubClass]).prim;
        }
        dndCtlr.classInfo.push({lbl:"Primary Abilities:",val:t});
      }

      if (typeof classTraits[theClass][0].savt !== "undefined") {
        t = classTraits[theClass][0].savt; 
        dndCtlr.classInfo.push({lbl:"Saving Throws:",val:t});
      }


/*
function determineClassTraits() {

  document.getElementById("classchar").innerHTML = e.options[e.selectedIndex].text + " Class Characteristics";

  calcPoints()
}
*/
    }

    function genAll()
    {
      dndCtlr.genRaceClass();
      //dndCtlr.genStats();
      //genBack();

    }

    function genRaceClass() {
      var randIndex = 0;

      randIndex = Math.floor(Math.random() * dndCtlr.raceTypes.length);
      dndCtlr.raceSelect = dndCtlr.raceTypes[randIndex];
      updateRace();

      randIndex = Math.floor(Math.random() * dndCtlr.classTypes.length);
      dndCtlr.classSelect = dndCtlr.classTypes[randIndex];
      updateClass();
    }

    function genStats()
    {
      dndCtlr.error = !(dndCtlr.error);
    }

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




/* Original javascript

  //document.getElementById("test").innerHTML = attribute;
  //if (isNaN(x.innerHTML)) {


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


function charName(val) {
  if (val !== "") {
    document.getElementById("name").innerHTML = val + "\'s Attributes";
  }
  else {
    document.getElementById("name").innerHTML = "Character Attributes";
  }
}

function genStats() {

  for (i=0; i<statTypes.length; i++) {
    generateStat(i);
  }
  calcPoints();

}

function generateStat(attribute) {
  var d1, d2, d3, d4, total;
  var pts = [];
  var type = Number(document.getElementById("gentype").value);
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

  document.getElementById(statTypes[attribute]).value = total;
}

function calcPoints() {
  var a = [];
  var pnts = 0;
  a.push( document.getElementById("str").value);
  a.push( document.getElementById("con").value);
  a.push( document.getElementById("dex").value);
  a.push( document.getElementById("int").value);
  a.push( document.getElementById("wis").value);
  a.push( document.getElementById("cha").value);
  for (i=0; i<a.length; i++) {
    switch (a[i]) {
      case "9":
        pnts += 1;
        break;
      case "10":
        pnts += 2;
        break;
      case "11":
        pnts += 3;
        break;
      case "12":
        pnts += 4;
        break;
      case "13":
        pnts += 5;
        break;
      case "14":
        pnts += 7;
        break;
      case "15":
        pnts += 9;
        break;
      case "16":
        pnts += 12;
        break;
      case "17":
        pnts += 15;
        break;
      case "18":
        pnts += 19;
        break;
      default:
        pnts += 0;
        break;
    }
  }
  document.getElementById("pnts").innerHTML = pnts;
  sumAttributes();

  return (pnts);
}

function sumAttributes() {

  var e = document.getElementById("mrace");
  var e2 = document.getElementById("srace");
  var theRace = e.options[e.selectedIndex].value;
  var theSubRace = e2.options[e2.selectedIndex].value;

  var t0 = Number((raceTraits[theRace][0]).str);
  var t1 = 0;
  var t2 = 0;
  var t3 = 0;
  if (isNaN(t0)) { t0 = 0; }
  if (theSubRace > 0)
  {
    t1 = Number((raceTraits[theRace][theSubRace]).str);
    if (isNaN(t1)) { t1 = 0; }
  }
  t2 = Number(document.getElementById("str").value);
  if (isNaN(t2)) { t2 = 0; }
  t3 = Number(t0 + t1 + t2);
  document.getElementById("strtot").innerHTML = t3;
  document.getElementById("strmod2").innerHTML = calcModifier(t3);

  t0 = Number((raceTraits[theRace][0]).dex);
  if (isNaN(t0)) { t0 = 0; }
  t1 = 0;
  if (theSubRace > 0)
  {
    t1 = Number((raceTraits[theRace][theSubRace]).dex);
    if (isNaN(t1)) { t1 = 0; }
  }
  t2 = Number(document.getElementById("dex").value);
  if (isNaN(t2)) { t2 = 0; }
  t3 = Number(t0 + t1 + t2);
  document.getElementById("dextot").innerHTML = t3;
  document.getElementById("dexmod2").innerHTML = calcModifier(t3);

  t0 = Number((raceTraits[theRace][0]).con);
  if (isNaN(t0)) { t0 = 0; }
  t1 = 0;
  if (theSubRace > 0)
  {
    t1 = Number((raceTraits[theRace][theSubRace]).con);
    if (isNaN(t1)) { t1 = 0; }
  }
  t2 = Number(document.getElementById("con").value);
  if (isNaN(t2)) { t2 = 0; }
  t3 = Number(t0 + t1 + t2);
  document.getElementById("contot").innerHTML = t3;
  document.getElementById("conmod2").innerHTML = calcModifier(t3);

  t0 = Number((raceTraits[theRace][0]).int);
  if (isNaN(t0)) { t0 = 0; }
  t1 = 0;
  if (theSubRace > 0)
  {
    t1 = Number((raceTraits[theRace][theSubRace]).int);
    if (isNaN(t1)) { t1 = 0; }
  }
  t2 = Number(document.getElementById("int").value);
  if (isNaN(t2)) { t2 = 0; }
  t3 = Number(t0 + t1 + t2);
  document.getElementById("inttot").innerHTML = t3;
  document.getElementById("intmod2").innerHTML = calcModifier(t3);

  t0 = Number((raceTraits[theRace][0]).wis);
  if (isNaN(t0)) { t0 = 0; }
  t1 = 0;
  if (theSubRace > 0)
  {
    t1 = Number((raceTraits[theRace][theSubRace]).wis);
    if (isNaN(t1)) { t1 = 0; }
  }
  t2 = Number(document.getElementById("wis").value);
  if (isNaN(t2)) { t2 = 0; }
  t3 = Number(t0 + t1 + t2);
  document.getElementById("wistot").innerHTML = t3;
  document.getElementById("wismod2").innerHTML = calcModifier(t3);

  t0 = Number((raceTraits[theRace][0]).cha);
  if (isNaN(t0)) { t0 = 0; }
  t1 = 0;
  if (theSubRace > 0)
  {
    t1 = Number((raceTraits[theRace][theSubRace]).cha);
    if (isNaN(t1)) { t1 = 0; }
  }
  t2 = Number(document.getElementById("cha").value);
  if (isNaN(t2)) { t2 = 0; }
  t3 = Number(t0 + t1 + t2);
  document.getElementById("chatot").innerHTML = t3;
  document.getElementById("chamod2").innerHTML = calcModifier(t3);

}

function calcModifier(point) {
  var mod;
  switch (point) {
    case 1:
        mod = "-5";
      break;
    case 2:
    case 3:
        mod = "-4";
      break;
    case 4:
    case 5:
        mod = "-3";
      break;
    case 6:
    case 7:
        mod = "-2";
      break;
    case 8:
    case 9:
        mod = "-1";
      break;
    case 10:
    case 11:
        mod = "0";
      break;
    case 12:
    case 13:
        mod = "+1";
      break;
    case 14:
    case 15:
        mod = "+2";
      break;
    case 16:
    case 17:
        mod = "+3";
      break;
    case 18:
    case 19:
        mod = "+4";
      break;
    case 20:
    case 21:
        mod = "+5";
      break;
    case 22:
    case 23:
        mod = "+6";
      break;
  }
  return (mod);
}

function updateTrait() {
  var i1, i2;
  var t1 = "Default";
  var t2 = "Default";
  var e = document.getElementById("backgrnd");
  var theBkGrnd = e.selectedIndex ;

  i1 = (Math.floor(Math.random() * (bgDetails[theBkGrnd-1].personality).length));
  t1 = ((bgDetails[theBkGrnd-1]).personality)[i1];
  document.getElementById("ptrait1").value = t1;

  if ((bgDetails[theBkGrnd-1].personality).length > 1) {
    i2 = i1;
    while (i2 == i1) {
      i2 = (Math.floor(Math.random() * (bgDetails[theBkGrnd-1].personality).length));
    }
    t2 = ((bgDetails[theBkGrnd-1]).personality)[i2];
  }
  document.getElementById("ptrait2").value = t2;

  i1 = (Math.floor(Math.random() * (bgDetails[theBkGrnd-1].ideal).length));
  t1 = ((bgDetails[theBkGrnd-1]).ideal)[i1];
  document.getElementById("ideal").value = t1;

  i1 = (Math.floor(Math.random() * (bgDetails[theBkGrnd-1].bond).length));
  t1 = ((bgDetails[theBkGrnd-1]).bond)[i1];
  document.getElementById("bond").value = t1;

  i1 = (Math.floor(Math.random() * (bgDetails[theBkGrnd-1].flaw).length));
  t1 = ((bgDetails[theBkGrnd-1]).flaw)[i1];
  document.getElementById("flaw").value = t1;

  if (typeof bgDetails[theBkGrnd-1].bgspec !== "undefined") {
    i1 = (Math.floor(Math.random() * (bgDetails[theBkGrnd-1].bgspec).length));
    t1 = ((bgDetails[theBkGrnd-1]).bgspec)[i1];
    t2 = (bgDetails[theBkGrnd-1]).specdesc;
    t1 = t2 + ": <input type=\"text\" class=\"sentence\" value=\"" + t1 + "\"> <\/input>";
    document.getElementById("backInfo").innerHTML = t1;
  }
  else {
    document.getElementById("backInfo").innerHTML = "";
  }

}

function genBack() {
  var i, t;
  var e = document.getElementById("backgrnd");
  i = Math.floor(Math.random() * bgDetails.length);
  t = (bgDetails[i]).name;
  e.selectedIndex = i+1;
  updateTrait();
}

*/
