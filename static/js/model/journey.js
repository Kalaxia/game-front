import Api from '../core/api.js';
import Ship from './ship/ship.js';

class Journey {
    constructor(data) {
        //TODO 
		for (var i in data) {
			this[i] = data[i];
		}
		
    }
	
    
    static sendOnJourney (fleetId, stepObject){
        return fetch(`/fleets/${fleetId}/journey`, {
            method: 'POST',
            body: JSON.stringify(stepObject),
            headers: Api.headers
        }).then(Api.responseMiddleware)
        .then(JourneySteps => { return JourneySteps; })
    }
}

export default Journey;
