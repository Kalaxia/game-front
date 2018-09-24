import Api from '../core/api.js';
import Ship from './ship/ship.js';

class Journey {
    constructor(data) {
        this.id = data.id;
        this.created_at = data.created_at;
        this.ended_at = data.ended_at;
        this.current_step = data.current_step;
		
    }
	
    
    static sendOnJourney (fleetId, stepObject){
        return fetch(`/api/fleets/${fleetId}/journey`, {
            method: 'POST',
            body: JSON.stringify(stepObject),
            headers: Api.headers
        }).then(Api.responseMiddleware)
        .then(JourneySteps => { return JourneySteps; });
    }
}

export default Journey;
