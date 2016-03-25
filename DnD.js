
  //if (isNaN(x.innerHTML)) {

function initOptions() {
  initRace();
  initClass();
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


onload = initOptions;

function genStats() {

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

  //var abc = document.getElementById("test").innerHTML;
  //document.getElementById("test").innerHTML = abc + attribute + genTypes[genType3d6];

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
    case genTypeBasic:
    default: 
      total = 8;
      break;
  }

  //document.getElementById("test").innerHTML = attribute;
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
  document.getElementById("strmod2").innerHTML = calcModifier(t3);
  document.getElementById("strtot").innerHTML = "Total = " + t3;

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
  document.getElementById("dexmod2").innerHTML = calcModifier(t3);
  document.getElementById("dextot").innerHTML = "Total = " + t3;

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
  document.getElementById("conmod2").innerHTML = calcModifier(t3);
  document.getElementById("contot").innerHTML = "Total = " + t3;

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
  document.getElementById("intmod2").innerHTML = calcModifier(t3);
  document.getElementById("inttot").innerHTML = "Total = " + t3;

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
  document.getElementById("wismod2").innerHTML = calcModifier(t3);
  document.getElementById("wistot").innerHTML = "Total = " + t3;

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
  document.getElementById("chamod2").innerHTML = calcModifier(t3);
  document.getElementById("chatot").innerHTML = "Total = " + t3;

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

  if (typeof raceTraits[theRace][0].size !== "undefined") {
    t = "<strong>Size:</strong> " + raceTraits[theRace][0].size;
    if (theSubRace > 0 && typeof (raceTraits[theRace][theSubRace]).size !== "undefined") {
      t = t + (raceTraits[theRace][theSubRace]).size;
    }
    t = t + "<br>";
  }

  if (typeof raceTraits[theRace][0].height !== "undefined") {
    t = t + "<strong>Height:</strong> " + raceTraits[theRace][0].height;
    if (theSubRace > 0 && typeof (raceTraits[theRace][theSubRace]).height !== "undefined") {
      t = t + (raceTraits[theRace][theSubRace]).height;
    }
    t = t + "<br>";
  }

  if (typeof raceTraits[theRace][0].weight !== "undefined") {
    t = t + "<strong>Average Weight:</strong> " + raceTraits[theRace][0].weight;
    if (theSubRace > 0 && typeof (raceTraits[theRace][theSubRace]).weight !== "undefined") {
      t = t + (raceTraits[theRace][theSubRace]).weight;
    }
    t = t + "<br>";
  }

  if (typeof raceTraits[theRace][0].speed !== "undefined") {
    t = t + "<strong>Speed:</strong> " + raceTraits[theRace][0].speed;
    if (theSubRace > 0 && typeof (raceTraits[theRace][theSubRace]).speed !== "undefined") {
      t = t + (raceTraits[theRace][theSubRace]).speed;
    }
    t = t + "<br>";
  }

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
  //document.getElementById("test").innerHTML = theRace;

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
  //document.getElementById("test").innerHTML = theClass;

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
  if (typeof classTraits[theClass][0].hitd !== "undefined") {
    t = t + "<strong>Hit Die:</strong> " + classTraits[theClass][0].hitd + "<br>";
  }
  if (typeof classTraits[theClass][0].armr !== "undefined") {
    t = t + "<strong>Armor:</strong> " + classTraits[theClass][0].armr;
    if (theSubClass > 0 && typeof (classTraits[theClass][theSubClass]).armr !== "undefined") {
      t = t + (classTraits[theClass][theSubClass]).armr;
    }
    t = t + "<br>";
  }
  if (typeof classTraits[theClass][0].weap !== "undefined") {
    t = t + "<strong>Weapons:</strong> " + classTraits[theClass][0].weap;
    if (theSubClass > 0 && typeof (classTraits[theClass][theSubClass]).weap !== "undefined") {
      t = t + (classTraits[theClass][theSubClass]).weap;
    }
    t = t + "<br>";
  }
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


var genTypes=[ "3d6", "4d6 - 1", "5d6 - 2", "Non-Elite Array", "Elite Array", "Basic Array" ];
var genType3d6=0;
var genType4d6=1;
var genType5d6=2;
var genTypeNonEl=3;
var genTypeElite=4;
var genTypeBasic=5;

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
           height:"well over 6\'",
           weight:"\~250 lbs",
           age:"80 years",
           speed:"30", 
           lang:"Common, Draconic", 
           special:"Breath Weapon, Damage Resistance" } ],
 [ { race:"Dwarf", 
           con:2, 
           size:"Medium",
           height:"4\' to 5\'",
           weight:"\~150 lbs",
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
           height:"less than 5\' to just over 6\'",
           weight:"\~150 lbs",
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
           speed:"+5ft", 
           special:", Elf Weapon Training, Mask of the Wild" } ],
 [ { race:"Gnome", 
           int:2, 
           size:"Small", 
           height:"3\' to 4\'",
           weight:"\~40 lbs",
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
           height:"\~3\'",
           weight:"\~40 lbs",
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
           height:"5\' to 6\'",
           weight:"\~175 lbs",
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
           height:"5\' to well over 6\'",
           weight:"\~175 lbs",
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
           height:"5\' to well over 6\'",
           weight:"\~180 lbs",
           age:"90 years",
           speed:"30", 
           lang:"Common, +1 language"
           /* , special:"" */ 
           } ],
 [ { race:"Tiefling", 
           int:1, 
           cha:2, 
           size:"Medium", 
           height:"5\' to well over 6\'",
           weight:"\~180 lbs",
           age:"100 years",
           speed:"30", 
           lang:"Common, Infernal", 
           special:"Darkvision, Hellish Resistance, Infernal Legacy" } ]
];

var classTraits = [ 
 [ { class:"Barbarian",
          armr:"Medium or 10+CON+DEX",
          weap:"Martial",
          hitd:"D12",
          prim:"STR+CON",
          savt:"STR+CON" },
   {   class:"Berserker",
          prim:"+CHA" },
   {   class:"Totem" } ],
 [ { class:"Bard",
          armr:"Light",
          weap:"Simple +4",
          hitd:"D8",
          prim:"CHA",
          savt:"DEX+CHA" },
   {   class:"Lore" },
   {   class:"Valor",
          armr:", Medium",
          prim:"+(STR or DEX)" } ],
 [ { class:"Cleric",
          armr:"Medium",
          weap:"Simple",
          hitd:"D8",
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
          armr:"Medium Nature",
          weap:"10 specific",
          hitd:"D8",
          prim:"WIS",
          savt:"INT+WIS" },
   {   class:"Land" },
   {   class:"Moon" } ],
 [ { class:"Fighter",
          armr:"Heavy",
          weap:"Martial",
          hitd:"D10",
          prim:"(STR or DEX)",
          savt:"STR+CON" },
   {   class:"Champion" },
   {   class:"Battle Master" },
   {   class:"Eldritch Knight",
          prim:"+INT" } ],
 [ { class:"Monk",
          armr:"10+WIS+DEX",
          weap:"Simple +1",
          hitd:"D8",
          prim:"DEX+WIS",
          savt:"STR+DEX, All(14th)" },
   {   class:"Open Hand" },
   {   class:"Shadow" },
   {   class:"Four Elements" } ],
 [ { class:"Paladin",
          armr:"Heavy",
          weap:"Martial",
          hitd:"D10",
          prim:"STR+CHA",
          savt:"WIS+CHA" },
   {   class:"Devotion" },
   {   class:"Ancients" },
   {   class:"Vengeance" },
   {   class:"Oath-Breaker" } ],
 [ { class:"Ranger",
          armr:"Medium",
          weap:"Martial",
          hitd:"D10",
          prim:"(DEX or STR)+WIS",
          savt:"STR+DEX" },
   {   class:"Hunter" },
   {   class:"Beast Master" } ],
 [ { class:"Rogue",
          armr:"Light",
          weap:"Simple +4",
          hitd:"D8",
          prim:"DEX",
          savt:"DEX+INT" },
   {   class:"Thief" },
   {   class:"Assassin" },
   {   class:"Arcane Trickster",
          prim:"+INT" },
   {   class:"Swashbuckler",
          prim:"+CHA" } ],
 [ { class:"Sorcerer",
          armr:"None",
          weap:"5 specific",
          hitd:"D6",
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
          armr:"Light",
          weap:"Simple (+PoB)",
          hitd:"D8",
          prim:"CHA",
          savt:"WIS+CHA" },
   {   class:"Arch-Fey" },
   {   class:"Fiend" },
   {   class:"GOO" } ],
 [ { class:"Wizard",
          armr:"None",
          weap:"5 specific",
          hitd:"D6",
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


