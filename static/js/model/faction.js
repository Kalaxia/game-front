import Api from '../core/api.js';

class Faction {
    constructor(data) {
        this.id = data.id
        this.name = data.name;
        this.description = data.description;
        this.banner = data.banner;
        this.color = data.color;
        this.members = data.members;
        this.relations = data.relations;
    }

    static fetch(id) {
        return fetch(`/api/factions/${id}`, {
            method: 'GET',
            headers: Api.headers
        })
        .then(Api.responseMiddleware)
        .then(data => {
            return new Faction(data);
        });
    }

    static fetchAll() {
        return fetch('/api/factions', {
              method: 'GET',
              headers: Api.headers
          })
          .then(Api.responseMiddleware)
          .then(data => {
              const factions = new Array();
              for (const factionData of data) {
                  factions.push(new Faction(factionData));
              }
              return factions;
          }).catch(error => console.log(error))
    }

    fetchMembers() {
        const self = this;
        console.log(self.id);
        return fetch(`/api/factions/${self.id}/members`, {
            method: 'GET',
            headers: Api.headers
        })
        .then(Api.responseMiddleware)
        .then(members => {
            self.members = members;
            return members;
        });
    }
}

export default Faction;
