# DnD-character
A simple DnD Character Generator


Current Notes:
To test CouchDB run:
    curl http://127.0.0.1:5984/

The reply should look like:
    {"couchdb":"Welcome","uuid":"....","version":"1.6.1","vendor":{"version":"1.6.1-1","name":"Homebrew"}}

To have launchd start couchdb at login:
  ln -sfv /usr/local/opt/couchdb/*.plist ~/Library/LaunchAgents
Then to load couchdb now:
  launchctl load ~/Library/LaunchAgents/homebrew.mxcl.couchdb.plist
Or, if you don't want/need launchctl, you can just run:
  couchdb

https://cwiki.apache.org/confluence/display/COUCHDB/Configuring+CouchDB
http://stackoverflow.com/questions/20802798/angularjs-code-naming-conventions


get list of DBs:
curl -X GET http://localhost:5984/_all_dbs

create new database:
curl -X PUT http://localhost:5984/dnd_5e

delete database:
curl -X DELETE http://localhost:5984/dnd_5e

Fulton: built-in db admin
http://localhost:5984/_utils/

Add new document:
curl -X POST http://localhost:5984/dnd_5e/<id tag>/ -d '<JSON doc contents>'

get document:
curl -X GET http://localhost:5984/dnd_5e/rock_gnome_race_traits


---------------- ---------------- ---------------- ---------------- ---------------- ----------------


echo "Adding race traits"
curl -X PUT http://localhost:5984/dnd_5e/dragonborn_race_traits -d '{ "race":"Dragonborn", "str":"2", "cha":"1", "size":"Medium", "height":"66", "weight":"175", "heightdice":"2d8", "weightdice":"2d6", "age":"80 years", "speed":"30", "lang":"Common, Draconic", "special":"Breath Weapon, Damage Resistance" } '
curl -X PUT http://localhost:5984/dnd_5e/dwarf_race_traits -d ' { "race":"Dwarf", "con":"2", "size":"Medium", "height":"44", "weight":"115", "heightdice":"2d4", "weightdice":"2d6", "age":"350 years", "speed":"30", "lang":"Common, Dwarf", "special":"Darkvision, Dwarven Resistane, Dwarven Combat Training, Tool Proficiency, Stone-cunning" }'
curl -X PUT http://localhost:5984/dnd_5e/elf_race_traits -d ' { "race":"Elf", "dex":"2", "size":"Medium", "height":"54", "weight":"90", "heightdice":"2d10", "weightdice":"1d4", "age":"750 years", "speed":"30", "lang":"Common, Elvish", "special":"Darkvision, Keen Senses, Fey Ancestry, Trance" }'
curl -X PUT http://localhost:5984/dnd_5e/gnome_race_traits -d ' { "race":"Gnome", "int":"2", "size":"Small", "height":"35", "weight":"35", "heightdice":"2d4", "weightdice":"1d1", "age":"350-500 years", "speed":"25", "lang":"Common, Gnomish", "special":"Darkvision, Gnome Cunning" }'
curl -X PUT http://localhost:5984/dnd_5e/halfling_race_traits -d ' { "race":"Halfling", "dex":"2", "size":"Small", "height":"31", "weight":"35", "heightdice":"2d4", "weightdice":"1d1", "age":"250 years", "speed":"25", "lang":"Common, Halfling", "special":"Lucky, Brave, Halfling Nimbleness" }'
curl -X PUT http://localhost:5984/dnd_5e/half_elf_race_traits -d ' { "race":"Half-Elf", "cha":"2", "size":"Medium", "height":"57", "weight":"110", "heightdice":"2d8", "weightdice":"2d4", "age":"180 years", "speed":"30", "lang":"Common, Elvish", "special":"2x(+1 Ability Score Increase), Darkvision, Fey Ancestry, Skill Versitility" }'
curl -X PUT http://localhost:5984/dnd_5e/half_orc_race_traits -d ' { "race":"Half-Orc", "str":"2", "con":"1", "size":"Medium", "height":"58", "weight":"140", "heightdice":"2d10", "weightdice":"2d6", "age":"75 years", "speed":"30", "lang":"Common, Orc", "special":"Darkvision, Menacing, Relentless Endurance, Savage Attacks" }'
curl -X PUT http://localhost:5984/dnd_5e/human_race_traits -d ' { "race":"Human", "str":"1", "dex":"1", "con":"1", "int":"1", "wis":"1", "cha":"1", "size":"Medium", "height":"56", "weight":"110", "heightdice":"2d10", "weightdice":"2d4", "age":"90 years", "speed":"30", "lang":"Common, +1 language" }'
curl -X PUT http://localhost:5984/dnd_5e/tiefling_race_traits -d ' { "race":"Tiefling", "int":"1", "cha":"2", "size":"Medium", "height":"57", "weight":"110", "heightdice":"2d8", "weightdice":"2d4", "age":"100 years", "speed":"30", "lang":"Common, Infernal", "special":"Darkvision, Hellish Resistance, Infernal Legacy" }'

echo "Adding sub-race traits"
curl -X PUT http://localhost:5984/dnd_5e/hill_dwarf_race_traits -d '{"race":"Dwarf", "subrace":"Hill Dwarf", "wis":"1", "special":", Dwarven Toughness" }'
curl -X PUT http://localhost:5984/dnd_5e/mountain_dwarf_race_traits -d '{"race":"Dwarf", "subrace":"Mountain Dwarf", "str":"2", "special":", Dwarven Armor Training" }'
curl -X PUT http://localhost:5984/dnd_5e/dark_elf_race_traits -d '{"race":"Elf", "subrace":"Dark Elf", "cha":"1", "special":", Superior Darkvision, Sunlight Sensitivity, Drow Magic, Drow Weapon Training" }'
curl -X PUT http://localhost:5984/dnd_5e/eladrin_race_traits -d '{"race":"Elf", "subrace":"Eladrin", "int":"1", "special":", Elf Weapon Training, Fey Step" }'
curl -X PUT http://localhost:5984/dnd_5e/high_elf_race_traits -d '{"race":"Elf", "subrace":"High Elf", "int":"1", "lang":", +1 language", "special":", Elf Weapon Training, +1 Cantrip" }'
curl -X PUT http://localhost:5984/dnd_5e/wood_elf_race_traits -d '{"race":"Elf", "subrace":"Wood Elf", "wis":"1", "speed":"+5", "special":", Elf Weapon Training, Mask of the Wild" }'
curl -X PUT http://localhost:5984/dnd_5e/forest_gnome_race_traits -d '{"race":"Gnome", "subrace":"Forest Gnome", "dex":"1", "special":", Minor Illusion Cantrip, Speak with Small Beasts" }'
curl -X PUT http://localhost:5984/dnd_5e/rock_gnome_race_traits -d '{"race":"Gnome", "subrace":"Rock Gnome", "con":"1", "special":", Artificers Lore, Tinker" }'
curl -X PUT http://localhost:5984/dnd_5e/lightfoot_halfling_race_traits -d '{"race":"Halfling", "subrace":"Lightfoot Halfling", "cha":"1", "special":", Naturally Stealthy" }'
curl -X PUT http://localhost:5984/dnd_5e/stout_halfling_race_traits -d '{"race":"Halfling", "subrace":"Stout Halfling", "con":"1", "special":", Stout Resilience" }'
curl -X PUT http://localhost:5984/dnd_5e/half_moon_sun_elf_race_traits -d '{"race":"Half-Elf", "subrace":"Half Moon/Sun Elf", "special":", (Skill Versitility) Elf Weapon Training, or Cantrip" }'
curl -X PUT http://localhost:5984/dnd_5e/half_wood_elf_race_traits -d '{"race":"Half-Elf", "subrace":"Half Wood Elf", "special":", (Skill Versitility) Elf Weapon Training, or Fleet of Foot, or Mask of the Wild" }'

echo "Done"



---------------- ---------------- ---------------- ---------------- ---------------- ----------------

dnd.dataservice.js


angular
  .module('DnDApp')
  .dataservice('DnDDataService', function($http) {

    var dbUrl = "http://localhost:5984/dnd_5e/";
    var _finalUrl = dbUrl;
    var dndDataService = this;

    dndDataService.getDbVal = function() {
      var deferred = $q.defer();
      $http({
        method: 'JSONP',
        url: _finalUrl
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(){
        deferred.reject('There was an error')
      })
      return deferred.promise;
    }
  });

