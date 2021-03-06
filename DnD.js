
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


function initOptions() {
  initRace();
  initClass();
  initBack();
}

function initRace() {
  var e = document.getElementById("mrace");
  e.options.length = 0;

  var opt = document.createElement("option");
  opt.value = "";
  opt.text = "-- select one --";
  e.options.add(opt);

  for (i=0; i<raceTypes.length; i++) {
    opt = document.createElement("option");
    opt.value = i;
    opt.text = raceTypes[i][0];
    e.options.add(opt);
  }
}

function initClass() {
  var e = document.getElementById("mclass");
  e.options.length = 0;

  var opt = document.createElement("option");
  opt.value = "";
  opt.text = "-- select one --";
  e.options.add(opt);

  for (i=0; i<classTypes.length; i++) {
    opt = document.createElement("option");
    opt.value = i;
    opt.text = classTypes[i][0];
    e.options.add(opt);
  }
}

function initBack() {
  var e = document.getElementById("backgrnd");
  e.options.length = 0;

  var opt = document.createElement("option");
  opt.value = "";
  opt.text = "-- select one --";
  e.options.add(opt);

  for (i=0; i<bgDetails.length; i++) {
    opt = document.createElement("option");
    opt.value = i;
    opt.text = bgDetails[i].name;
    e.options.add(opt);
  }
}


onload = initOptions;

function charName(val) {
  if (val !== "") {
    document.getElementById("name").innerHTML = val + "\'s Attributes";
  }
  else {
    document.getElementById("name").innerHTML = "Character Attributes";
  }
}

function genAll() {
  genRaceClass();
  genStats();
  genBack();
}

function genRaceClass() {

  var e = document.getElementById("mrace");
  var e2 = document.getElementById("srace");
  var theRace = e.selectedIndex ;
  var theSubRace = e2.selectedIndex ;
  theRace = (Math.floor(Math.random() * raceTraits.length) + 1);
  e.selectedIndex = theRace;
  initSubRace(e);
  theSubRace = 0;
  if (raceTraits[theRace-1].length > 0) {
    theSubRace = Math.floor( Math.random() * (raceTraits[theRace-1].length) );
  }
  e2.selectedIndex = theSubRace;

  var e3 = document.getElementById("mclass");
  var e4 = document.getElementById("sclass");
  var theClass = e3.selectedIndex ;
  var theSubClass = e4.selectedIndex ;
  theClass = (Math.floor(Math.random() * classTraits.length) + 1);
  e3.selectedIndex = theClass;
  initSubClass(e3);
  theSubClass = 0;
  if (classTraits[theClass-1].length > 0) {
    theSubClass = Math.floor( Math.random() * (classTraits[theClass-1].length) );
  }
  e4.selectedIndex = theSubClass;
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


function changeGen() {
  var type = document.getElementById("gentype").value;

  type = Number(type) + 1;
  if (type >= genTypes.length) {
    type = 0;
  }

  document.getElementById("gentype").value = type;
  document.getElementById("gentype").innerHTML = genTypes[type];
}

function updateRace() {
  initSubRace( document.getElementById("mrace") );
}

function determineRaceTraits() {
  var t;
  var e = document.getElementById("mrace");
  var e2 = document.getElementById("srace");
  var theRace = e.options[e.selectedIndex].value;
  var theSubRace = e2.options[e2.selectedIndex].value;


  t = t_open
      + tr_open_head
        + td_open_120 + "Item" + td_close
        + td_open_100 + "Value" + td_close
      + tr_close;

  var size = "Unknown";
  if (typeof raceTraits[theRace][0].size !== "undefined") {
    size = raceTraits[theRace][0].size;
  }
  t = t + tr_open_body
        + td_open + "Size" + td_close
        + td_open + size + td_close
      + tr_close;

  var addinches = calcHeight(theRace);
  var inches = addinches + raceTraits[theRace][0].height;
  var feet = Math.floor(inches / 12);
  inches = inches - (feet * 12);
  t = t + tr_open_body
        + td_open + "Height" + td_close
        + td_open + feet + " ft, " + inches + " in" + td_close
      + tr_close;

  var pounds = calcWeight(theRace, addinches) + raceTraits[theRace][0].weight;
  t = t + tr_open_body
        + td_open + "Weight" + td_close
        + td_open + pounds + " lbs" + td_close
      + tr_close;

  var speed = "";
  if (typeof raceTraits[theRace][0].speed !== "undefined") {
    speed = raceTraits[theRace][0].speed;
    if (theSubRace > 0 && typeof (raceTraits[theRace][theSubRace]).speed !== "undefined") {
      speed = speed + (raceTraits[theRace][theSubRace]).speed;
    }
  }
  t = t + tr_open_body
        + td_open + "Speed" + td_close
        + td_open + speed + td_close
      + tr_close;

  t = t + t_close;

  document.getElementById("raceTable").innerHTML = t;



  t = "";
  if (typeof raceTraits[theRace][0].lang !== "undefined") {
    t = t + "<strong>Languages:</strong> " + raceTraits[theRace][0].lang;
    if (theSubRace > 0 && typeof (raceTraits[theRace][theSubRace]).lang !== "undefined") {
      t = t + (raceTraits[theRace][theSubRace]).lang;
    }
    t = t + "<br>";
  }

  if (typeof raceTraits[theRace][0].special !== "undefined") {
    t = t + "<strong>Special Traits:</strong> " + raceTraits[theRace][0].special;
    if (theSubRace > 0 && typeof (raceTraits[theRace][theSubRace]).special !== "undefined") {
      t = t + (raceTraits[theRace][theSubRace]).special;
    }
    t = t + "<br>";
  }
  document.getElementById("raceInfo").innerHTML = t;
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

function initSubRace(raceElement) {
  var e = raceElement;
  var theRace = raceElement.options[raceElement.selectedIndex].value;

  var e2 = document.getElementById("srace");
  e2.options.length = 0;

  var opt = document.createElement("option");
  opt.value = "0";
  opt.text = "None";
  e2.options.add(opt);

  for (i=1; i<raceTypes[theRace].length; i++) {
    opt = document.createElement("option");
    opt.value = i;
    opt.text = raceTypes[theRace][i];
    e2.options.add(opt);
  }

  determineRaceTraits();
}


function updateClass() {
  initSubClass( document.getElementById("mclass") );
}

function initSubClass(classElement) {
  var e = classElement;
  var theClass = e.options[e.selectedIndex].value;

  var e2 = document.getElementById("sclass");
  e2.options.length = 0;

  var opt = document.createElement("option");
  opt.value = "0";
  opt.text = "None";
  e2.options.add(opt);

  for (i=1; i<classTypes[theClass].length; i++) {
    opt = document.createElement("option");
    opt.value = i;
    opt.text = classTypes[theClass][i];
    e2.options.add(opt);
  }

  determineClassTraits();
}

function determineClassTraits() {
  var t = "";
  var e = document.getElementById("mclass");
  var e2 = document.getElementById("sclass");
  var theClass = e.options[e.selectedIndex].value;
  var theSubClass = e2.options[e2.selectedIndex].value;

  document.getElementById("classchar").innerHTML = e.options[e.selectedIndex].text + " Class Characteristics";
  document.getElementById("desc").innerHTML = classTraits[theClass][0].desc;

  t = t_open
      + tr_open_head
        + td_open_120 + "Item" + td_close
        + td_open_100 + "Value" + td_close
      + tr_close;

  var wealth = calcWealth(theClass) + " gp";
  t = t + tr_open_body
        + td_open + "Wealth" + td_close
        + td_open + wealth + td_close
      + tr_close;

  var hitd = classTraits[theClass][0].hitd;
  t = t + tr_open_body
        + td_open + "Hit Die" + td_close
        + td_open + hitd + td_close
      + tr_close;

  if (typeof classTraits[theClass][0].armr !== "undefined") {
    var armr = classTraits[theClass][0].armr;
    if (theSubClass > 0 && typeof (classTraits[theClass][theSubClass]).armr !== "undefined") {
      armr = armr + (classTraits[theClass][theSubClass]).armr;
    }
    t = t + tr_open_body
          + td_open + "Armor" + td_close
          + td_open + armr + td_close
        + tr_close;
  }

  if (typeof classTraits[theClass][0].weap !== "undefined") {
    var wpn =  classTraits[theClass][0].weap;
    if (theSubClass > 0 && typeof (classTraits[theClass][theSubClass]).weap !== "undefined") {
      wpn = wpn + (classTraits[theClass][theSubClass]).weap;
    }
    t = t + tr_open_body
          + td_open + "Weapon" + td_close
          + td_open + wpn + td_close
        + tr_close;
  }

  t = t + t_close;
  document.getElementById("classTable").innerHTML = t;


  t = "";
  if (typeof classTraits[theClass][0].prim !== "undefined") {
    t = t + "<strong>Primary Abilities:</strong> " + classTraits[theClass][0].prim;
    if (theSubClass > 0 && typeof (classTraits[theClass][theSubClass]).prim !== "undefined") {
      t = t + (classTraits[theClass][theSubClass]).prim;
    }
    t = t + "<br>";
  }
  if (typeof classTraits[theClass][0].savt !== "undefined") {
    t = t + "<strong>Saving Throws:</strong> " + classTraits[theClass][0].savt + "<br>";
  }

  document.getElementById("classInfo").innerHTML = t;

  calcPoints()
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


var t_open = "<table border=3>";
var t_close = "<\/table>";

var tr_open_head = "<tr class=\"head\">";
var tr_open_body = "<tr class=\"body\">";
var tr_close = "<\/tr>";

var td_open = "<td>";
var td_open_120 = "<td width=\"120px\">";
var td_open_100 = "<td width=\"100px\">";
var td_close = "<\/td>";


var genTypes=[ "3d6", "4d6 - 1", "5d6 - 2", "Non-Elite Array", "Elite Array", "Basic Stats", "Max Stats" ];
var genType3d6=0;
var genType4d6=1;
var genType5d6=2;
var genTypeNonEl=3;
var genTypeElite=4;
var genTypeBasic=5;
var genTypeMax=6;

var statTypes=[ "str", "dex", "con", "int", "wis", "cha" ];

var raceTypes= [ 
  ["Dragonborn" ],
  ["Dwarf", "Hill Dwarf", "Mountain Dwarf" ],
  ["Elf", "Dark Elf", "Eladrin", "High Elf", "Wood Elf" ],
  ["Gnome", "Forest Gnome", "Rock Gnome" ],
  ["Halfling", "Lightfoot Halfling", "Stout Halfling" ],
  ["Half-Elf", "Half Wood Elf", "Half Moon/Sun Elf" ],
  ["Half-Orc" ],
  ["Human" ],
  ["Tiefling" ]
];

var classTypes= [
  ["Barbarian", "Berserker", "Totem" ],
  ["Bard", "Lore", "Valor" ],
  ["Cleric", "Knowledge", "Life", "Light", "Nature", "Tempest", "Trickery", "War", "Death" ],
  ["Druid", "Land", "Moon" ],
  ["Fighter", "Champion", "Battle Master", "Eldritch Knight" ],
  ["Monk", "Open Hand", "Shadow", "Four Elements" ],
  ["Paladin", "Devotion", "Ancients", "Vengeance", "Oath-Breaker" ],
  ["Ranger", "Hunter", "Beast Master" ],
  ["Rogue", "Thief", "Assassin", "Arcane Trickster", "Swashbuckler" ],
  ["Sorcerer", "Draconic", "Wild Magic", "Favoured Soul", "Storm" ],
  ["Warlock", "Arch-Fey", "Fiend", "GOO" ],
  ["Wizard", "Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation", "Artificer" ]
];

var raceTraits = [ 
 [ { race:"Dragonborn", 
           str:2, 
           cha:1, 
           size:"Medium", 
           /* height:"well over 6\'", weight:"\~250 lbs", */
           height:66,
           weight:175,
           heightdice:"2d8",
           weightdice:"2d6",
           age:"80 years",
           speed:"30", 
           lang:"Common, Draconic", 
           special:"Breath Weapon, Damage Resistance" } ],
 [ { race:"Dwarf", 
           con:2, 
           size:"Medium",
           /*height:"4\' to 5\'", weight:"\~150 lbs",*/
           height:44,
           weight:115,
           heightdice:"2d4",
           weightdice:"2d6",
           age:"350 years",
           speed:"30", 
           lang:"Common, Dwarf", 
           special:"Darkvision, Dwarven Resistane, Dwarven Combat Training, Tool Proficiency, Stone-cunning" },
   {  race:"Hill Dwarf", 
           wis:1, 
           special:", Dwarven Toughness" },
   {  race:"Mountain Dwarf", 
           str:2, 
           special:", Dwarven Armor Training" } ],
 [ { race:"Elf", 
           dex:2, 
           size:"Medium",
           /*height:"less than 5\' to just over 6\'", weight:"\~150 lbs",*/
           height:54,
           weight:90,
           heightdice:"2d10",
           weightdice:"1d4",
           age:"750 years",
           speed:"30", 
           lang:"Common, Elvish", 
           special:"Darkvision, Keen Senses, Fey Ancestry, Trance" },
   {  race:"Dark Elf", 
           cha:1, 
           special:", Superior Darkvision, Sunlight Sensitivity, Drow Magic, Drow Weapon Training" },
   {  race:"Eladrin", 
           int:1, 
           special:", Elf Weapon Training, Fey Step" },
   {  race:"High Elf", 
           int:1, 
           lang:", +1 language", 
           special:", Elf Weapon Training, +1 Cantrip" },
   {  race:"Wood Elf", 
           wis:1, 
           speed:"+5", 
           special:", Elf Weapon Training, Mask of the Wild" } ],
 [ { race:"Gnome", 
           int:2, 
           size:"Small", 
           /*height:"3\' to 4\'", weight:"\~40 lbs",*/
           height:35,
           weight:35,
           heightdice:"2d4",
           weightdice:"1d1",
           age:"350-500 years",
           speed:"25", 
           lang:"Common, Gnomish", 
           special:"Darkvision, Gnome Cunning" },
   {  race:"Forest Gnome", 
           dex:1, 
           special:", Minor Illusion Cantrip, Speak with Small Beasts" },
   {  race:"Rock Gnome", 
           con:1, 
           special:", Artificer's Lore, Tinker" } ],
 [ { race:"Halfling", 
           dex:2, 
           size:"Small", 
           /*height:"\~3\'", weight:"\~40 lbs",*/
           height:31,
           weight:35,
           heightdice:"2d4",
           weightdice:"1d1",
           age:"250 years",
           speed:"25", 
           lang:"Common, Halfling", 
           special:"Lucky, Brave, Halfling Nimbleness" },
   {  race:"Lightfoot Halfling", 
           cha:1, 
           special:", Naturally Stealthy" },
   {  race:"Stout Halfling", 
           con:1, 
           special:", Stout Resilience" } ],
 [ { race:"Half-Elf", 
           cha:2, 
           size:"Medium", 
           /*height:"5\' to 6\'", weight:"\~175 lbs",*/
           height:57,
           weight:110,
           heightdice:"2d8",
           weightdice:"2d4",
           age:"180 years",
           speed:"30", 
           lang:"Common, Elvish", 
           special:"2x(+1 Ability Score Increase), Darkvision, Fey Ancestry, Skill Versitility" },
   {  race:"Half Wood Elf", 
           special:", (-Skill Versitility) Elf Weapon Training, or Fleet of Foot, or Mask of the Wild" },
   {  race:"Half Moon/Sun Elf", 
           special:", (-Skill Versitility) Elf Weapon Training, or Cantrip" } ],
 [ { race:"Half-Orc", 
           str:2, 
           con:1, 
           size:"Medium", 
           /*height:"5\' to well over 6\'", weight:"\~175 lbs",*/
           height:58,
           weight:140,
           heightdice:"2d10",
           weightdice:"2d6",
           age:"75 years",
           speed:"30", 
           lang:"Common, Orc", 
           special:"Darkvision, Menacing, Relentless Endurance, Savage Attacks" } ],
 [ { race:"Human", 
           str:1, 
           dex:1, 
           con:1, 
           int:1, 
           wis:1, 
           cha:1, 
           size:"Medium", 
           /*height:"5\' to well over 6\'", weight:"\~180 lbs",*/
           height:56,
           weight:110,
           heightdice:"2d10",
           weightdice:"2d4",
           age:"90 years",
           speed:"30", 
           lang:"Common, +1 language"
           /* , special:"" */ 
           } ],
 [ { race:"Tiefling", 
           int:1, 
           cha:2, 
           size:"Medium", 
           /*height:"5\' to well over 6\'", weight:"\~180 lbs",*/
           height:57,
           weight:110,
           heightdice:"2d8",
           weightdice:"2d4",
           age:"100 years",
           speed:"30", 
           lang:"Common, Infernal", 
           special:"Darkvision, Hellish Resistance, Infernal Legacy" } ]
];

var classTraits = [ 
 [ { class:"Barbarian",
          desc:"A fierce warrior of primitive background who can enter a battle rage.",
          armr:"Medium or 10+CON+DEX",
          weap:"Martial",
          hitd:"d12",
          wealth:"2d4x10",
          prim:"STR+CON",
          savt:"STR+CON" },
   {   class:"Berserker",
          prim:"+CHA" },
   {   class:"Totem" } ],
 [ { class:"Bard",
          desc:"An inspiring magician whose power echoes the music of creation.",
          armr:"Light",
          weap:"Simple +4",
          hitd:"d8",
          wealth:"5d4x10",
          prim:"CHA",
          savt:"DEX+CHA" },
   {   class:"Lore" },
   {   class:"Valor",
          armr:", Medium",
          prim:"+(STR or DEX)" } ],
 [ { class:"Cleric",
          desc:"A priestly champion who wields divine magic in service of a higher power.",
          armr:"Medium",
          weap:"Simple",
          hitd:"d8",
          wealth:"5d4x10",
          prim:"WIS",
          savt:"WIS+CHA" },
   {   class:"Knowledge" },
   {   class:"Life",
          armr:", Heavy" },
   {   class:"Light" },
   {   class:"Nature",
          armr:", Heavy" },
   {   class:"Tempest",
          armr:", Heavy",
          weap:", Martial" },
   {   class:"Trickery" },
   {   class:"War",
          armr:", Heavy",
          weap:", Martial" },
   {   class:"Death",
          weap:", Martial" } ],
 [ { class:"Druid",
          desc:"A priest of the Old Faith, wielding the powers of nature -- moonlight and plant growth, fire and lightning -- and adopting animal forms.",
          armr:"Medium Nature",
          weap:"10 specific",
          hitd:"d8",
          wealth:"2d4x10",
          prim:"WIS",
          savt:"INT+WIS" },
   {   class:"Land" },
   {   class:"Moon" } ],
 [ { class:"Fighter",
          desc:"A master of martial combat, skilled with a variety of weapons and armor.",
          armr:"Heavy",
          weap:"Martial",
          hitd:"d10",
          wealth:"5d4x10",
          prim:"(STR or DEX)",
          savt:"STR+CON" },
   {   class:"Champion" },
   {   class:"Battle Master" },
   {   class:"Eldritch Knight",
          prim:"+INT" } ],
 [ { class:"Monk",
          desc:"A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection.",
          armr:"10+WIS+DEX",
          weap:"Simple +1",
          hitd:"d8",
          wealth:"5d4x01",
          prim:"DEX+WIS",
          savt:"STR+DEX, All(14th)" },
   {   class:"Open Hand" },
   {   class:"Shadow" },
   {   class:"Four Elements" } ],
 [ { class:"Paladin",
          desc:"A holy warrior bound to a sacred oath.",
          armr:"Heavy",
          weap:"Martial",
          hitd:"d10",
          wealth:"5d4x10",
          prim:"STR+CHA",
          savt:"WIS+CHA" },
   {   class:"Devotion" },
   {   class:"Ancients" },
   {   class:"Vengeance" },
   {   class:"Oath-Breaker" } ],
 [ { class:"Ranger",
          desc:"A warrior who uses martial prowess and nature magic to combat threats on the edges of civilization.",
          armr:"Medium",
          weap:"Martial",
          hitd:"d10",
          wealth:"5d4x10",
          prim:"(DEX or STR)+WIS",
          savt:"STR+DEX" },
   {   class:"Hunter" },
   {   class:"Beast Master" } ],
 [ { class:"Rogue",
          desc:"A scoundrel who uses stealth and trickery to overcome obstacles and enemies.",
          armr:"Light",
          weap:"Simple +4",
          hitd:"d8",
          wealth:"4d4x10",
          prim:"DEX",
          savt:"DEX+INT" },
   {   class:"Thief" },
   {   class:"Assassin" },
   {   class:"Arcane Trickster",
          prim:"+INT" },
   {   class:"Swashbuckler",
          prim:"+CHA" } ],
 [ { class:"Sorcerer",
          desc:"A spellcaster who draws on inherent magic from a gift or bloodline.",
          armr:"None",
          weap:"5 specific",
          hitd:"d6",
          wealth:"3d4x10",
          prim:"CHA",
          savt:"CON+CHA" },
   {   class:"Draconic",
          armr:", 13+DEX" },
   {   class:"Wild Magic" },
   {   class:"Favoured Soul",
          armr:", Medium",
          weap:", Simple" },
   {   class:"Storm" } ],
 [ { class:"Warlock",
          desc:"A wielder of magic that is derived from a bargain with an extraplanar entity.",
          armr:"Light",
          weap:"Simple (+PoB)",
          hitd:"d8",
          wealth:"4d4x10",
          prim:"CHA",
          savt:"WIS+CHA" },
   {   class:"Arch-Fey" },
   {   class:"Fiend" },
   {   class:"GOO" } ],
 [ { class:"Wizard",
          desc:"A scholarly magic-user capable of manipulating the structures of reality.",
          armr:"None",
          weap:"5 specific",
          hitd:"d6",
          wealth:"4d4x10",
          prim:"INT",
          savt:"INT+WIS" },
   {   class:"Abjuration" },
   {   class:"Conjuration" },
   {   class:"Divination" },
   {   class:"Enchantment" },
   {   class:"Evocation" },
   {   class:"Illusion" },
   {   class:"Necromancy" },
   {   class:"Transmutation" },
   {   class:"Artificer" } ]
];

var bgDetails = [  
  { name:"Acolyte",
    personality:[ 
      "I idolize a particular hero of my faith, and constantly refer to that person\'s deeds and example.",
      "I can find common ground between the fiercest enemies, empathizing with them and always working toward peace.",
      "I see omens in every event and action. The gods try to speak to us, we just need to listen.",
      "Nothing can shake my optimistic attitude.",
      "I quote (or misquote) sacred texts and proverbs in almost every situation.",
      "I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods.",
      "I\'ve enjoyed fine food, drink, and high society among my temple\'s elite. Rough living grates on me.",
      "I\'ve spent so long in the temple that I have little practical experience dealing with people in the outside world." 
    ], 
    ideal:[ 
      "Tradition. The ancient traditions of worship and sacrifice must be preserved and upheld. (Lawful)",
      "Charity. I always try to help those in need, no matter what the personal cost. (Good)",
      "Change. We must help brind about the changes the gods are constantly working in the world. (Chaotic)",
      "Power. I hope to one day rise to the top of my faith\'s religious hierarchy. (Lawful)",
      "Faith. I trust that my deity will guide my actions. I have faith that if I work hard, things will go well. (Lawful)",
      "Aspiration. I seek to prove myself worthy of my god\'s favor by matching my actions against his or her teachings. (Any)"
    ],
    bond:[ 
      "I would die to recover an ancient relic of my faith that was lost long ago.",
      "I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.",
      "I owe my life to the priest who took me in when my parents died.",
      "Everything I do is for the common people.",
      "I will do anything to protect the temple where I served.",
      "I seek to preserve a sacred text that my enemies consider heretical and seek to destroy." 
    ],
    flaw:[ 
      "I judge others harshly, and myself even more severely.",
      "I put too much trust in those who wield power within my temple\'s hierarchy.",
      "My piety sometimes leads me to blindly trust those that profess faith in my god.",
      "I am inflexible in my thinking.",
      "I am suspicious of strangers and expect the worst of them.",
      "Once I pick a goal, I become obsessed with it to the detriment of everything else in my life."
    ]
  }, 
  { name:"Charlatan",
    personality:[ 
      "I fall in and out of love easily, and am always pursuing someone.",
      "I have a joke for every occasion, especially occasions where humor is inappropriate",
      "Flattery is my preferred trick for getting what I want.",
      "I\'m a born gambler who can't resist taking a risk for a potential payoff.",
      "I lie about almost everything, even when there\'s no good reason to.",
      "Sarcasm and insults are my weapons of choice.",
      "I keep multiple holy symbols on me and invoke whatever deity might come in useful at any given moment.",
      "I pocket anything I see that might have some value."
    ], 
    ideal:[ 
      "Independence. I am a free spirit -- no one tells me what to do. (Chaotic)",
      "Fairness. I never target people who can\'t afford to lose a few coins. (Lawful)",
      "Charity. I distribute the money I acquire to the people who really need it. (Good)",
      "Creativity. I never run the same con twice. (Chaotic)",
      "Friendship. Material goods come and go. Bonds of friendship last forever. (Good)",
      "Aspiration. I\'m determined to make something of myself. (Any)"
    ],
    bond:[ 
      "I fleeced the wrong person and must work to ensure that this individual never crosses paths with me or those I care about.",
      "I owe everything to my mentor -- a horrible person who\'s probably rotting in jail somewhere.",
      "Somewhere out there, I have a child who doesn\'t know me. I\'m making the world better for him or her.",
      "I come from a noble family, and one day I\'ll reclaim my lands and title from those who stole them from me.",
      "A powerful person killed someone I love. Some day soon, I\'ll have my revenge.",
      "I swindled and ruined a person who didn't deserve it. I seek to atone for my misdeeds but might never be able to forgive myself."
    ],
    flaw:[ 
      "I can\'t resist a pretty face.",
      "I\'m always in dept. I spend my ill-gotten gains on decadent luxuries faster than I bring them in.",
      "I\'m convinced that no one could ever fool me the way I fool others.",
      "I\'m too greedy for my own good. I can\'t resist taking a risk if there\'s money involved.",
      "I can\'t resist swindling people who are more powerful than me.",
      "I hate to admit it and will hate myself for it, but I\'ll run and preserve my own hide if the going gets tough."
    ],
    specdesc:"Scam",
    bgspec:[ 
      "I cheat at games of chance.",
      "I shave coins or forge documents.",
      "I insinuate myself into people\'s lives to prey on their weakness and secure their fortunes.",
      "I put on new identities like clothes.",
      "I run sleight-of-hand cons on street corners.",
      "I convince people that worthless junk is worth their hard-earned money."
    ]
  }, 
  { name:"Criminal",
    personality:[ 
      "I always have a plan for what to do when things go wrong.",
      "I am always calm, no matter what the situation. I never raise my voice or let my emotions control me.",
      "The first thing I do in a new place is note the locations of everything valuable -- or where such things could be hidden.",
      "I would rather make a new friend than a new enemy.",
      "I am increadibly slow to trust. Those who seem the fairest often have the most to hide.",
      "I don't pay attention to the risks in a situation. Never tell me the odds.",
      "The best way to get me to do something is to tell me I can\'t do it.",
      "I blow up at the slightest insult."
    ], 
    ideal:[ 
      "Honor. I don\'t steal from others in the trade. (Lawful)",
      "Freedom. Chains are meant to be broken, as are those who would forge them. (Chaotic)",
      "Charity. I steal from the wealthy so that I can help people in need. (Good)",
      "Greed. I will do whatever it takes to become wealthy. (Evil)",
      "People. I\'m loyal to my friends, not to any ideals, and everyone else can take a trip down the Styx for all I care. (Neutral)",
      "Redemption. There\'s a spark of good in everyone. (Good)"
    ],
    bond:[ 
      "I\'m trying to pay off an old debt I owe to a generous benefactor.",
      "My ill-gotten gains go to support my family.",
      "Something important was taken from me, and I aim to steal it back.",
      "I will become the greatest thief that ever lived.",
      "I\'m guilty of a terrible crime. I hope I can redeem myself for it.",
      "Someone I loved died because of a mistake I made. That will never happen again."
    ],
    flaw:[ 
      "When I see something valuable, I can\'t think about anything but how to steal it.",
      "When faced with a choice between money and my friends, I usually choose the money.",
      "If there\'s a plan, I\'ll forget it. If I don\'t forget it, I\'ll ignore it.",
      "I have a \"tell\" that reveals when I\'m lying.",
      "I turn tail and run when things look bad.",
      "An innocent person is in prison for a crime that I committed. I\'m okay with that."
    ],
    specdesc:"Specialty",
    bgspec:[ 
      "Blackmailer",
      "Burglar",
      "Enforcer",
      "Fence",
      "Highway robber",
      "Hired killer",
      "Pickpocket",
      "Smuggler"
    ]
  }, 
  { name:"Entertainer",
    personality:[ 
      "I know a story relevant to almost every situation.",
      "Whenever I come to a new place, I collect local rumors and spread gossip.",
      "I\'m a hopeless romantic, always searching for that \"special someone.\"",
      "Nobody stays angry at me or around me for long, since I can defuse any amount of tension.",
      "I love a good insult, even one directed at me.",
      "I get bitter if I\'m not the center of attention.",
      "I\'ll settle for nothing less than perfection.",
      "I change my mood or my mind as quickly as I change key in a song."
    ], 
    ideal:[ 
      "Beauty. When I perform, I make the world better than it was. (Good)",
      "Tradition. The stories, legends, and songs of the past must never be forgotten, for they teach us who we are. (Lawful)",
      "Creativity. The world is in need of new ideas and bold action. (Chaotic)",
      "Greed. I\'m only in it for the money and fame. (Evil)",
      "People. I like seeing the smiles on people\'s faces when I perform. That\'s all that matters. (Neutral)",
      "Honesty. Art should reflect the soul; it should come from within and reveal who we really are. (Any)"
    ],
    bond:[ 
      "My instrument is my most treasured possession, and it reminds me of someone I love.",
      "Someone stole my precious instrument, and someday I\'ll get it back.",
      "I want to be famous, whatever it takes.",
      "I idolize a hero of the old tales and measure my deeds against that person\'s.",
      "I will do anything to prove myself superior to my hated rival.",
      "I would do anything for the members of my old troupe."
    ],
    flaw:[ 
      "I\'ll do anything to win fame and renown.",
      "I\'m a sucker for a pretty face.",
      "A scandal prevents me from ever going home again. That kind of trouble seems to follow me around.",
      "I once satirized a noble who still wants my head. It was a mistake that I will likely repeat.",
      "I have trouble keeping my true feelings hidden. My sharp tongue lands me in trouble.",
      "Despite my best efforts, I am unreliable to my friends."
    ],
    specdesc:"Entertainer Routine",
    bgspec:[ 
      "Actor",
      "Dancer",
      "Fire-eater",
      "Jester",
      "Juggler",
      "Instrumentalist",
      "Poet",
      "Singer",
      "Storyteller",
      "Tumbler"
    ]
  }, 
  { name:"Folk Hero",
    personality:[ 
      "I judge people by their actions, not their words.",
      "If someone is in trouble, I\'m always ready to lend help.",
      "When I set my mind to something, I follow through no matter what gets in my way.",
      "I have a strong sense of fair play and always try to find the most equitable solution to arguments.",
      "I\'m confident in my own abilities and do what I can to instill confidence in others.",
      "Thinking is for other people. I prefer actions.",
      "I misuse long words in an attempt to sound smarter.",
      "I get bored easily. When am I going to get on with my destiny?"
    ], 
    ideal:[ 
      "Respect. People deserve to be treated with dignity and respect. (Good)",
      "Fairness. No one should get preferential treatment before the law, and no one is above the law. (Lawful)",
      "Freedom. Tyrants must not be allowed to oppress the people. (Chaotic)",
      "Might. If I become strong. I can take what I want -- what I deserve. (Evil)",
      "Sincerity. There\'s no good in pretending to be something I\'m not. (Neutral)",
      "Destiny. Nothing and no one can steer me away from my higher calling. (Any)"
    ],
    bond:[ 
      "I have a family, but I have no idea where they are. One day, I hope to see them again.",
      "I worked the land, I love the land, and I will protect the land.",
      "A proud noble once gave me a horrible beating, and I will take my revenge on any bully I encounter.",
      "My tools are symbols of my past life, and I carry them so that I will never forget my roots.",
      "I protect those who cannot protect themselves.",
      "I wish my childhood sweetheart had come with me to pursue my destiny."
    ],
    flaw:[ 
      "The tyrant who rules my land will stop at nothing to see me killed.",
      "I\'m convinced of the significance of my destiny, and blind to my shortcomings and the risk of failure.",
      "The people who knew me when I was young know my shameful secret, so I can never go home again.",
      "I have a weakness for the vices of the city, especially hard drink.",
      "Secretly, I believe that things would be better if I were a tyrant lording over the land.",
      "I have trouble trusting in my allies."
    ],
    specdesc:"Defining Event",
    bgspec:[ 
      "I stood up to a tyrant\'s agents.",
      "I saved people during a natural disaster.",
      "I stood alone against a terrible monster.",
      "I stole from a corrupt merchant to help the poor.",
      "I led a militia to fight off an invading army.",
      "I broke into a tyrant\'s castle and stole weapons to arm the people.",
      "I trained the peasantry to use farm implements as weapons against a tyrant\'s soldiers.",
      "A lord rescinded an unpopular decree after I led a symbolic act of protest against it.",
      "A celestrial, fey, or similar creature gave me a blessing or revealed my secret origin.",
      "Recruited into a lord\'s army, I rose to leadership and was commended for my heroism."
    ]
  }, 
  { name:"Guild Artisan",
    personality:[ 
      "I believe that anything worth doing is worth doing right. I can\'t help it -- I\'m a perfectionist.",
      "I\'m a snob who looks down on those who can\'t appreciate fine art.",
      "I always want to know how things work and what makes people tick.",
      "I\'m full of witty aphorisms and have a proverb for every occasion.",
      "I\'m rude to people who lack my commitment to hard work and fair play.",
      "I like to talk at length about my profession.",
      "I don\'t part with my money easily and will haggle tirelessly to get the best deal possible.",
      "I\'m well known for my work, and I want to make sure everyone appreciates it. I\'m always taken aback when people haven\'t heard of me."
    ], 
    ideal:[ 
      "Community. It is the duty of all civilized people to strengthen the bonds of community and the security of civilization. (Lawful)",
      "Generosity. My talents were given to me so that I could use them to benefit the world. (Good)",
      "Freedom. Everyone should be free to pursue his or her own livelihood. (Chaotic)",
      "Greed. I\'m only in it for the money. (Evil)",
      "People. I\'m committed to the people I care about, not to ideals. (Neutral)",
      "Aspiration. I work hard to be the best there is at my craft. (Any)"
    ],
    bond:[ 
      "The workshop where I learned my trade is the most important place in the world to me.",
      "I created a gret work for someone, and then found them unworthy to receive it. I\'m still looking for someone worthy.",
      "I owe my guild a great debt for forging me into the person I am today.",
      "I pursue wealth to secure someone\'s love.",
      "One day I will return to my guild and prove that I am the greatest artisan of them all.",
      "I will get revenge on the evil forces that destroyed my place of business and ruined my livelihood."
    ],
    flaw:[ 
      "I\'ll do anything to get my hands on something rare or priceless.",
      "I\'m quick to assume that someone is trying to cheat me.",
      "No one must ever learn that I once stole money from guild coffers.",
      "I\'m never satisfied with what I have -- I always want more.",
      "I would kill to acquire a noble title.",
      "I\'m horribly jealous of anyone who can outshine my handiwork. Everywhere I go, I\'m surrounded by rivals."
    ],
    specdesc:"Guild Business",
    bgspec:[ 
      "Alchemists and apothecaries",
      "Armorers, locksmiths, and finesmiths",
      "Brewers, distillers, and vintners",
      "Calligraphers, scribes, and scriveners",
      "Carpenters, roofers, and plasterers",
      "Cartographers, surveyors, and chart-makers",
      "Cobblers and shoemakers",
      "Cooks and bakers",
      "Glassblowers and glaziers",
      "Jewelers and gemcutters",
      "Leatherworkers, skinners, and tanners",
      "Masons and stonecutters",
      "Painters, limners, and sign-makers",
      "Potters and tile-makers",
      "Shipwrights and sailmakers",
      "Smiths and metal-forgers",
      "Tinkers, pewterers, and casters",
      "Wagon-makers and wheelwrights",
      "Weavers and dyers",
      "Woodcarvers, coopers, and bowyers"
    ]
  }, 
  { name:"Hermit",
    personality:[ 
      "I\'ve been isolated for so long that I rarely speak, preferring gestures and the occasional grunt.",
      "I am utterly serene, even in the face of disaster.",
      "The leader of my community had something wise to say on every topic, and I am eager to share that wisdom.",
      "I feel tremendous empathy for all who suffer.",
      "I\'m oblivious to etiquette and social expectations.",
      "I connect everything that happens to me to a grand cosmic plan.",
      "I often get lost in my own thoughts and contemplation, becoming oblivious to my surroundings.",
      "I am working on a grand philosophical theory and love sharing my ideas."
    ], 
    ideal:[ 
      "Greater Good. My gifts are meant to be shared with all, not used for my own benefit. (Good)",
      "Logic. Emotions must not cloud our sense of what is right and true, or our logical thinking. (Lawful)",
      "Free Thinking. Inquiry and curiosity are the pillars of progress. (Chaotic)",
      "Power. Solitude and contemplation are paths toward mystical or magical power. (Evil)",
      "Live and Let Live. Meddling in the affairs of others only causes trouble. (Neutral)",
      "Self-Knowledge. If you know yourself, there\'s nothing left to know. (Any)"
    ],
    bond:[ 
      "Nothing is more important than the other members of my hermitage, order, or association.",
      "I entered seclusion to hide from the ones who might still be hunting me. I must someday confront them.",
      "I\'m still seeking the enlightenment I pursued in my seclusion, and it still eludes me.",
      "I entered seculsion because I loved someone I could not have.",
      "Should my discovery come to light, it could bring ruin to the world.",
      "My isolation gave me great insight into a great evil that only I can destory."
    ],
    flaw:[ 
      "Now that I\'ve returned to the world, I enjoy its delights a little too much.",
      "I harbor dark, bloodthirsty thoughts that my isolation and meditation failed to quell.",
      "I am dogmatic in my thoughts and philosophy.",
      "I let my need to win arguments overshadow friendships and harmony.",
      "I\'d risk too much to uncover a lost bit of knowledge.",
      "I like keeping secrets and won\'t share them with anyone."
    ],
    specdesc:"Life of Seclusion",
    bgspec:[ 
      "I was searching for spiritual enlightenment.",
      "I was partaking of communal living in accordance with the dictates of a religious order.",
      "I was exiled for a crime I didn\'t commit.",
      "I retreated from society after a life-altering event.",
      "I needed a quite place to work on my art, literature, music, or manifesto.",
      "I needed to communicate with nature, far from civilization.",
      "I was the caretaker of an ancient ruin or relic.",
      "I was a pilgrim in search of a person, place, or relic of spiritual significance."
    ]
  }, 
  { name:"Noble",
    personality:[ 
      "My elequent flattery makes everyone I talk to feel like the most wonderful and important person in the world.",
      "The common folk love me for my kindness and generosity.",
      "No one could doubt by looking at my regal bearing that I am a cut above the unwashed masses.",
      "I take great pains to always look my best and follow the latest fasions.",
      "I don\'t like to get my hands dirty and I won\'t be caught dead in unsuitable accommodations.",
      "Despite my noble birth, I do not place myself above other folk. We all have the same blood.",
      "My favor, once lost, is lost forever.",
      "If you do me an injury, I will crush you, ruin your name, and salt your fields."
    ], 
    ideal:[ 
      "Respect. Respect is due to me because of my position, but all people, regardless of station, deserve to be treated with dignity. (Good)",
      "Responsibility. It is my duty to respect the authority of those above me just as those below me must respect mine. (Lawful)",
      "Independence. I must prove that I can handle myself without the coddling of my family. (Chaotic)",
      "Power. If I can attain more power, no one will tell me what to do. (Evil)",
      "Family. Blood runs thicker than water. (Any)",
      "Noble Obligation. It is my duty to protect and care for the people beneath me. (Good)"
    ],
    bond:[ 
      "I will face any challenge to win the approval of my family.",
      "My house's alliance with another noble family must be sustained at all costs.",
      "Nothing is more important than the other members of my family.",
      "I am in love with the heir of a family that my family despises.",
      "My loyalty to my sovereign is unwavering.",
      "The common folk must see me as a hero of the people."
    ],
    flaw:[ 
      "I secretly believe that everyone is beneath me.",
      "I hide a scandalous secret that could ruin my family forever.",
      "I too often hear veiled insults and threats in every word addressed to me and I am quick to anger.",
      "I have an insatiable desire for carnal pleasures.",
      "In fact the world does revolve around me.",
      "By my words and actions, I often bring shame to my family."
    ]
  }, 
  { name:"Outlander",
    personality:[ 
      "I am driven by wanderlust that led me away from home.",
      "I watch over my friends as if they were a litter of newborn pups.",
      "I once ran 25 miles without stopping to warn my clan of an approaching hoard. I would do it again if I had to.",
      "I have a lesson for every situation drawn from observing nature.",
      "I place no stock in wealthy or well-mannared folk. Money and manners won\'t save you from a hungry owl-bear.",
      "I am always picking things up, absently fiddling with them and sometimes accidently breaking them.",
      "I feel far more comfortable around animals than people.",
      "I was, in fact, raised by wolves."
    ], 
    ideal:[ 
      "Change. Life is like seasons, in constant change and we must change with it. (Chaotic)",
      "Greater Good. It is each person\'s responsibility to make the most happiness for the whole tribe. (Good)",
      "Honor. If I dishonor myself, I dishonor the whole clan. (Lawful)",
      "Might. The strongest are meant to rule. (Evil)",
      "Nature. The natural world is more important than the constructs of civilization. (Neutral)",
      "Glory. I must earn glory in battle for myself and for my clan. (Any)"
    ],
    bond:[ 
      "My family clan or tribe is the most important thing in my life even when they are far from me.",
      "An injury to the unspoiled wilderness of my home is an injury to me.",
      "I will bring terrible wrath down on the evildoers who destroy my homeland.",
      "I am the last of my tribe and it is up to me to ensure their names enter legend.",
      "I suffer awful visions of upcoming disaster and will do anything to prevent it.",
      "It is my duty to provide children to sustain my tribe."
    ],
    flaw:[ 
      "I am too enamored of ale, wine, and other intoxicants.",
      "There\'s no room for caution in a life lived to the fullest.",
      "I remember every insult I received and nurse a silent resentment to anyone who has every wronged me.",
      "I am slow to trust members of other races, tribes, and societies.",
      "Violence is my answer to almost any challenge.",
      "Don\'t expect me to save those who can\'t save themselves. It is natures way that the strong thrive and the weak perish."
    ],
    specdesc:"Origin",
    bgspec:[ 
      "Forester",
      "Trapper",
      "Homesteader",
      "Guide",
      "Exile or outcast",
      "Bounty Hunter",
      "Pilgrim",
      "Tribal Nomad",
      "Hunter-gatherer",
      "Tribal Marauder"
    ]
  }, 
  { name:"Sage",
    personality:[ 
      "I use polysyllabic words that convey the impression of great erudition.",
      "I\'ve read every book in the world\'s greatest libraries or I like to boast that I have.",
      "I\'m used to helping out those who aren\'t as smart as I am and I patiently explain anything and everything to others.",
      "There\'s nothing I like more than a good mystery.",
      "I\'m willing to listen to every side of an argument before I make my own judgment.",
      "I... speak... slowly... when talking... to idiots... which... almost... everyone... is... compared... to me.",
      "I\'m horribly, horribly awkward in social situations.",
      "I\'m convinced that people are always trying to steal my secrets."
    ], 
    ideal:[ 
      "Knowledge. The path to power and self-improvement is through knowledge. (Neutral)",
      "Beauty. What is beautiful points us beyond itself toward what is true. (Good)",
      "Logic. Emotions must not cloud our logical thinking. (Lawful)",
      "No Limits. Nothing should fetter the infinite possibility inherent in all existence. (Chaotic)",
      "Power. Knowledge is the path to power and domination. (Evil)",
      "Self-Improvement. The goal of a life of study is the betterment of one\'s self. (Any)"
    ],
    bond:[ 
      "It is my duty to protect my students.",
      "I have an ancient text that holds terrible secrets that must not fall into the wrong hands.",
      "I work to preserve a library, university, scriptorium or monastery.",
      "My life\'s work is a series of tomes related to a specific field of lore.",
      "I have been searching my whole life for the answer to a certain question.",
      "I sold my soul for knowledge. I hope to do great deeds and win it back."
    ],
    flaw:[ 
      "I am easily distracted by the promise of information.",
      "Most people scream and run when they see a demon. I stop and take notes on it\'s anatomy.",
      "Unlocking an ancient mystery is worth the price of a civilization.",
      "I overlook obvious solutions in favor of complicated ones.",
      "I speak without really thinking through my words invariably insulting others.",
      "I can\'t keep a secret to save my life or anyone else\'s."
    ],
    specdesc:"Specialty",
    bgspec:[ 
      "Alchemist",
      "Astronomer",
      "Discredited Academic",
      "Librarian",
      "Professor",
      "Researcher",
      "Wizard\'s Apprentice",
      "Scribe"
    ]
  }, 
  { name:"Sailor",
    personality:[ 
      "My friends know they can rely on me no matter what.",
      "I work hard so that I can play hard when the work is over.",
      "I enjoy sailing into new ports and making new friends over a flagon of ale.",
      "I stretch the truth for the sake of a good story.",
      "To me a tavern brawl is a nice way to get to know a new city.",
      "I never pass up a friendly wager.",
      "My language is as foul as an otyugh nest.",
      "I like a job well done, especially if I can convince somebody else to do it."
    ], 
    ideal:[ 
      "Respect. The thing that keeps the ship together is mutual respect between captain and crew. (Good)",
      "Fairness. We all do the work so we all share the rewards. (Lawful)",
      "Freedom. The sea is freedom -- freedom to go anywhere and do anything. (Chaotic)",
      "Mastery. I am a predator and the other ships on the sea are my prey. (Evil)",
      "People. I am committed to my crewmates not to ideals. (Neutral)",
      "Aspiration. Some day I\'ll own my own ship and chart my own destiny. (Any)"
    ],
    bond:[ 
      "I am loyal to my captain first. Everything else is second.",
      "The ship is most important -- shipmates and captains come and go.",
      "I\'ll always remember my first ship.",
      "In a harbor town, I have a paramour who\'s eyes nearly stole me from the sea.",
      "I was cheated out of my fair share of the profits and I want to get my due.",
      "Ruthless pirates murdered my captain and crewmates, plundered our ship, and left me to die. Vengence will be mine."
    ],
    flaw:[ 
      "I follow orders even if I think they\'re wrong.",
      "I\'ll say anything to avoid having to do extra work.",
      "Once someone questions my courage, I never back down no matter how dangerous the situation.",
      "Once I start drinking, it\'s hard for me to stop.",
      "I can\'t help but pocket loose coins and trinkets I come across.",
      "My pride will probably lead to my destruction."
    ]
  }, 
  { name:"Soldier",
    personality:[ 
      "I\'m always polite and respectful.",
      "I\'m haunted by memories of war. I can\'t get the images of violence out of my mind.",
      "I\'ve lost too many friends, and I\'m slow to make new ones.",
      "I\'m full of inspiring and cautionary tales from my military experience relevant to almost every combat situation.",
      "I can stare down a hell hound without flinching.",
      "I enjoy being strong and like breaking things.",
      "I have a crude sense of humor.",
      "I face problems head-on. A simple, direct solution is the best path to success."
    ], 
    ideal:[ 
      "Greater Good. Our lot is to lay down our lives in defense of others. (Good)",
      "Responsibility. I do what I must and obey just authority. (Lawful)",
      "Independence. When people follow orders blindly, they embrace a kind of tyranny. (Chaotic)",
      "Might. In life as in war, the stronger force wins. (Evil)",
      "Live and Let Live. Ideals aren\'t worth killing over or going to war for. (Neutral)",
      "Nation. My city, nation, or people are all that matter. (Any)"
    ],
    bond:[ 
      "I would still lay down my life for the people I served with.",
      "Someone saved my life on the battlefield. To this day, I will never leave a friend behind.",
      "My honor is my life.",
      "I\'ll never forget the crushing defeat my company suffered or the enemies who dealt it.",
      "Those who fight beside me are those worth dying for.",
      "I fight for those who cannot fight for themselves."
    ],
    flaw:[ 
      "The monstrous enemy we faced in battle still leaves me quivering with fear.",
      "I have little respect for anyone who is not a proven warrior.",
      "I made a terrible mistake in battle that cost many lives, and I would do anything to keep that mistake secret.",
      "My hatred of my enemies is blind and unreasoning.",
      "I obey the law, even if the law causes misery.",
      "I\'d rather eat my armor than admit when I\'m wrong."
    ],
    specdesc:"Specialty",
    bgspec:[ 
      "Officer",
      "Scout",
      "Infantry",
      "Cavalry",
      "Healer",
      "Quartermaster",
      "Standard Bearer",
      "Support Staff (Cook, Blacksmith or the like)"
    ]
  }, 
  { name:"Urchin",
    personality:[ 
      "I hide scraps of food and trinkets away in my pockets.",
      "I ask a lot of questions.",
      "I like to squeeze into small places where no one else can get to me.",
      "I sleep with my back to a wall or tree, with everything I own wrapped in a bundle in my arms.",
      "I eat like a pig and have bad manners.",
      "I think anyone who\'s nice to me is hiding evil intent.",
      "I don\'t like to bathe.",
      "I bluntly say what other people are hinting at or hiding."
    ], 
    ideal:[ 
      "Respect. All people, rich or poor, deserve respect. (Good)",
      "Community. We have to take care of each other because no one else is going to do it. (Lawful)",
      "Change. The low are lifted up and the high and mighty are brought down. Change is the nature of things. (Chaotic)",
      "Retribution. The rich need to be shown what life and death are like in the gutters. (Evil)",
      "People. I help the people who help me. That\'s what keeps us alive. (Neutral)",
      "Aspiration. I\'m going to prove that I\'m worthy of a better life. (Any)"
    ],
    bond:[ 
      "My town or city is my home and I\'ll fight to defend it.",
      "I sponsor an orphanage to keep others from enduring what I was forced to endure.",
      "I owe my survival to another urchin who taught me to live on the streets.",
      "I owe a debt I can never repay to the person who took pity on me.",
      "I escaped my life of poverty by robbing an important person, now I\'m wanted for it.",
      "No one else should have to endure the hardships I\'ve been through."
    ],
    flaw:[ 
      "If I\'m outnumbered, I will run away from a fight.",
      "Gold seems like a lot of money to me and I\'ll do just about anything for more of it.",
      "I will never fully trust anyone other than myself.",
      "I\'d rather kill someone in their sleep than fight fair.",
      "It\'s not stealing if I need it more than someone else.",
      "People who can\'t take care of themselves get what they deserve."
    ]
  }
];
