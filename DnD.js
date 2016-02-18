
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
  ["Elf", "Eladrin", "High Elf", "Wood Elf" ],
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
{ race:"Dragonborn", str:2, cha:1, size:"M", speed:"25-HA", lang:"Common, Draconic", other:"Breath Weapon, Damage Resistance" },
{ race:"Dwarf", con:2, size:"M", speed:"30", lang:"Common, Dwarf", other:"Darkvision, Dwarven Resistane, Dwarven Combat Training, Tool Proficiency, Stone-cunning" },
{ race:"Elf", dex:2, size:"M", speed:"30", lang:"Common, Elvish", other:"Darkvision, Keen Senses, Fey Ancestry, Trance" },
{ race:"Gnome", int:2, size:"S", speed:"25", lang:"Common, Gnomish", other:"Darkvision, Gnome Cunning" },
{ race:"Halfling", dex:2, size:"S", speed:"25", lang:"Common, Halfling", other:"Lucky, Brave, Halfling Nimbleness" },
{ race:"Half-Elf", cha:2, size:"M", speed:"30", lang:"Common, Elvish", other:"2x(+1 ASI), Darkvision, Fey Ancestry, Skill Versitility" },
{ race:"Half-Orc", str:2, con:1, size:"M", speed:"30", lang:"Common, Orc", other:"Darkvision, Menacing, Relentless Endurance, Savage Attacks" },
{ race:"Human", str:1, dex:1, con:1, int:1, wis:1, cha:1, size:"M", speed:"30", lang:"Common, +1 language", other:"" },
{ race:"Tiefling", int:1, cha:2, size:"M", speed:"30", lang:"Common, Infernal", other:"Darkvision, Hellish Resistance, Infernal Legacy" }
];

var subRaceTraits = [ 
 [ {race:"Dragonborn"} ],
 [ {race:"Dwarf"},
   {  race:"Hill Dwarf", wis:1, other:", Dwarven Toughness" },
   {  race:"Mountain Dwarf", str:2, other:", Dwarven Armor Training" } ],
 [ {race:"Elf"},
   {  race:"Eladrin", int:1, other:", Elf Weapon Training, Fey Step" },
   {  race:"High Elf", int:1, lang:", +1 language", other:", Elf Weapon Training, +1 Cantrip" },
   {  race:"Wood Elf", wis:1, speed:"+5ft", other:", Elf Weapon Training, Mask of the Wild" } ],
 [ {race:"Gnome"},
   {  race:"Forest Gnome", dex:1, other:", Minor Illusion Cantrip, Speak with Small Beasts" },
   {  race:"Rock Gnome", con:1, other:", Artificer's Lore, Tinker" } ],
 [ {race:"Halfling"},
   {  race:"Lightfoot Halfling", cha:1, other:", Naturally Stealthy" },
   {  race:"Stout Halfling", con:1, other:", Stout Resilience" } ],
 [ {race:"Half-Elf"},
   {  race:"Half Wood Elf", other:", (-Skill Versitility) Elf Weapon Training, or Fleet of Foot, or Mask of the Wild" },
   {  race:"Half Moon/Sun Elf", other:", (-Skill Versitility) Elf Weapon Training, or Cantrip" } ],
 [ {race:"Half-Orc"} ],
 [ {race:"Human"} ],
 [ {race:"Tiefling"} ]
];

var classTraits = [ 
  { class:"Barbarian", armr:"Medium or 10+CON+DEX", weap:"Martial", hitd:"D12", prim:"STR+CON", savt:"STR+CON" },
  { class:"Bard", armr:"Light", weap:"Simple +4", hitd:"D8", prim:"CHA", savt:"DEX+CHA" },
  { class:"Cleric", armr:"Medium", weap:"Simple", hitd:"D8", prim:"WIS", savt:"WIS+CHA" },
  { class:"Druid", armr:"Medium Nature", weap:"10 specific", hitd:"D8", prim:"WIS", savt:"INT+WIS" },
  { class:"Fighter", armr:"Heavy", weap:"Martial", hitd:"D10", prim:"(STR or DEX)", savt:"STR+CON" },
  { class:"Monk", armr:"10+WIS+DEX", weap:"Simple +1", hitd:"D8", prim:"DEX+WIS", savt:"STR+DEX,  All(14th)" },
  { class:"Paladin", armr:"Heavy", weap:"Martial", hitd:"D10", prim:"STR+CHA", savt:"WIS+CHA" },
  { class:"Ranger", armr:"Medium", weap:"Martial", hitd:"D10", prim:"(DEX or STR)+WIS", savt:"STR+DEX" },
  { class:"Rogue", armr:"Light", weap:"Simple +4", hitd:"D8", prim:"DEX", savt:"DEX+INT" },
  { class:"Sorcerer", armr:"None", weap:"5 specific", hitd:"D6", prim:"CHA", savt:"CON+CHA" },
  { class:"Warlock", armr:"Light", weap:"Simple (+PoB)", hitd:"D8", prim:"CHA", savt:"WIS+CHA" },
  { class:"Wizard", armr:"None", weap:"5 specific", hitd:"D6", prim:"INT", savt:"INT+WIS" }
];

var subClassTraits = [ 
 [ { class:"Barbarian" },
   {   class:"Berserker",prim:"+CHA" },
   {   class:"Totem" } ],
 [ { class:"Bard" },
   {   class:"Lore" },
   {   class:"Valor",armr:", Medium",prim:"+(STR or DEX)" } ],
 [ { class:"Cleric" },
   {   class:"Knowledge" },
   {   class:"Life",armr:", Heavy" },
   {   class:"Light" },
   {   class:"Nature",armr:", Heavy" },
   {   class:"Tempest",armr:", Heavy",weap:", Martial" },
   {   class:"Trickery" },
   {   class:"War",armr:", Heavy",weap:", Martial" },
   {   class:"Death",weap:", Martial" } ],
 [ { class:"Druid" },
   {   class:"Land" },
   {   class:"Moon" } ],
 [ { class:"Fighter" },
   {   class:"Champion" },
   {   class:"Battle Master" },
   {   class:"Eldritch Knight",prim:"+INT" } ],
 [ { class:"Monk" },
   {   class:"Open Hand" },
   {   class:"Shadow" },
   {   class:"Four Elements" } ],
 [ { class:"Paladin" },
   {   class:"Devotion" },
   {   class:"Ancients" },
   {   class:"Vengeance" },
   {   class:"Oath-Breaker" } ],
 [ { class:"Ranger" },
   {   class:"Hunter" },
   {   class:"Beast Master" } ],
 [ { class:"Rogue" },
   {   class:"Thief" },
   {   class:"Assassin" },
   {   class:"Arcane Trickster",prim:"+INT" },
   {   class:"Swashbuckler",prim:"+CHA" } ],
 [ { class:"Sorcerer" },
   {   class:"Draconic",armr:", 13+DEX" },
   {   class:"Wild Magic" },
   {   class:"Favoured Soul",armr:", Medium",weap:", Simple" },
   {   class:"Storm" } ],
 [ { class:"Warlock" },
   {   class:"Arch-Fey" },
   {   class:"Fiend" },
   {   class:"GOO" } ],
 [ { class:"Wizard" },
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

  //var a=[];
  //var b,c,d,e,f,g;
  //if (isNaN(x.innerHTML)) {

function genStats() {
  //do {
  for (i=0; i<statTypes.length; i++) {
    generateStat(i);
  }
    calcPoints();
  //} while (27 < calcPoints());
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
  //document.getElementById("test").innerHTML = ("Generated " + a[i].toString());
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
  return (pnts);
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
  changeSubRace();
}

function updateSubRace() {
  var t;
  var e = document.getElementById("mrace");
  var e2 = document.getElementById("srace");
  var theRace = e.options[e.selectedIndex].value;
  var theSubRace = e2.options[e2.selectedIndex].value;
  if (typeof raceTraits[theRace].speed !== "undefined") {
    t = "<strong>Speed:</strong> " + raceTraits[theRace].speed;
    if (typeof (subRaceTraits[theRace][theSubRace]).speed !== "undefined") {
      t = t + (subRaceTraits[theRace][theSubRace]).speed;
    }
    t = t + "<br>";
  }
  if (typeof raceTraits[theRace].lang !== "undefined") {
    t = t + "<strong>Languages:</strong> " + raceTraits[theRace].lang;
    if (typeof (subRaceTraits[theRace][theSubRace]).lang !== "undefined") {
      t = t + (subRaceTraits[theRace][theSubRace]).lang;
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

  if (typeof raceTraits[theRace].str !== "undefined") {
    t = "+" + raceTraits[theRace].str;
  }
  if (typeof (subRaceTraits[theRace][theSubRace]).str !== "undefined") {
    t = t + "+" + (subRaceTraits[theRace][theSubRace]).str;
  }
  document.getElementById("strmod").innerHTML = t;

  t = "";
  if (typeof raceTraits[theRace].dex !== "undefined") {
    t = "+" + raceTraits[theRace].dex;
  }
  if (typeof (subRaceTraits[theRace][theSubRace]).dex !== "undefined") {
    t = t + "+" + (subRaceTraits[theRace][theSubRace]).dex;
  }
  document.getElementById("dexmod").innerHTML = t;

  t = "";
  if (typeof raceTraits[theRace].con !== "undefined") {
    t = "+" + raceTraits[theRace].con;
  }
  if (typeof (subRaceTraits[theRace][theSubRace]).con !== "undefined") {
    t = t + "+" + (subRaceTraits[theRace][theSubRace]).con;
  }
  document.getElementById("conmod").innerHTML = t;

  t = "";
  if (typeof raceTraits[theRace].int !== "undefined") {
    t = "+" + raceTraits[theRace].int;
  }
  if (typeof (subRaceTraits[theRace][theSubRace]).int !== "undefined") {
    t = t + "+" + (subRaceTraits[theRace][theSubRace]).int;
  }
  document.getElementById("intmod").innerHTML = t;

  t = "";
  if (typeof raceTraits[theRace].wis !== "undefined") {
    t = "+" + raceTraits[theRace].wis;
  }
  if (typeof (subRaceTraits[theRace][theSubRace]).wis !== "undefined") {
    t = t + "+" + (subRaceTraits[theRace][theSubRace]).wis;
  }
  document.getElementById("wismod").innerHTML = t;

  t = "";
  if (typeof raceTraits[theRace].cha !== "undefined") {
    t = "+" + raceTraits[theRace].cha;
  }
  if (typeof (subRaceTraits[theRace][theSubRace]).cha !== "undefined") {
    t = t + "+" + (subRaceTraits[theRace][theSubRace]).cha;
  }
  document.getElementById("chamod").innerHTML = t;
}

function changeSubRace() {
  var e = document.getElementById("mrace");
  var theRace = e.options[e.selectedIndex].value;
  //document.getElementById("test").innerHTML = theRace;

  var e2 = document.getElementById("srace");
  e2.options.length = 0;

  var opt = document.createElement('option');
  opt.value = "0";
  opt.text = "None";
  e2.options.add(opt);

  for (i=1; i<raceTypes[theRace].length; i++) {
    opt = document.createElement('option');
    opt.value = i;
    opt.text = raceTypes[theRace][i];
    e2.options.add(opt);
  }

  updateSubRace();
}


function updateClass() {
  changeSubClass();
}

function changeSubClass() {
  var e = document.getElementById("mclass");
  var theClass = e.options[e.selectedIndex].value;
  //document.getElementById("test").innerHTML = theClass;

  var e2 = document.getElementById("sclass");
  e2.options.length = 0;

  var opt = document.createElement('option');
  opt.value = "0";
  opt.text = "None";
  e2.options.add(opt);

  for (i=1; i<classTypes[theClass].length; i++) {
    opt = document.createElement('option');
    opt.value = i;
    opt.text = classTypes[theClass][i];
    e2.options.add(opt);
  }

  updateSubClass();
}

function updateSubClass() {
  var t = "";
  var e = document.getElementById("mclass");
  var e2 = document.getElementById("sclass");
  var theClass = e.options[e.selectedIndex].value;
  var theSubClass = e2.options[e2.selectedIndex].value;
  if (typeof classTraits[theClass].hitd !== "undefined") {
    t = t + "<strong>Hit Die:</strong> " + classTraits[theClass].hitd + "<br>";
  }
  if (typeof classTraits[theClass].armr !== "undefined") {
    t = t + "<strong>Armor:</strong> " + classTraits[theClass].armr;
    if (typeof (subClassTraits[theClass][theSubClass]).armr !== "undefined") {
      t = t + (subClassTraits[theClass][theSubClass]).armr;
    }
    t = t + "<br>";
  }
  if (typeof classTraits[theClass].weap !== "undefined") {
    t = t + "<strong>Weapons:</strong> " + classTraits[theClass].weap;
    if (typeof (subClassTraits[theClass][theSubClass]).weap !== "undefined") {
      t = t + (subClassTraits[theClass][theSubClass]).weap;
    }
    t = t + "<br>";
  }
  if (typeof classTraits[theClass].prim !== "undefined") {
    t = t + "<strong>Primary Abilities:</strong> " + classTraits[theClass].prim;
    if (typeof (subClassTraits[theClass][theSubClass]).prim !== "undefined") {
      t = t + (subClassTraits[theClass][theSubClass]).prim;
    }
    t = t + "<br>";
  }
  if (typeof classTraits[theClass].savt !== "undefined") {
    t = t + "<strong>Saving Throws:</strong> " + classTraits[theClass].savt + "<br>";
  }
  document.getElementById("classInfo").innerHTML = t;
}


