import Player from './player.js';

class Faction {
    constructor(data) {
        this.id = data.id
        this.name = data.name;
        this.description = data.description;
        this.banner = data.banner;
        this.color = data.color;
        this.relations = data.relations;
        this.members = new Array();
    }

    static fetch(id) {
        return fetch(`/api/factions/${id}`, {
            method: 'GET'
        })
        .then(data => {
            return new Faction(data);
        });
    }

    static fetchAll() {
        return fetch('/api/factions', {
              method: 'GET'
          })
          .then(data => {
              const factions = new Array();
              for (const factionData of data) {
                  factions.push(new Faction(factionData));
              }
              return factions;
          }).catch(error => console.log(error))
    }
}

export default Faction;
