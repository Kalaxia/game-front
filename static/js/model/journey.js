import Api from '../core/api.js';

export default class Journey {
    constructor(data) {
        this.id = data.id;
        this.createdAt = data.created_at;
        this.endedAt = data.ended_at;
        this.currentStep = data.current_step;
    }
	
    static sendOnJourney(fleetId, stepObject) {
        return fetch(`/api/fleets/${fleetId}/journey`, {
            method: 'POST',
            body: JSON.stringify(stepObject),
            headers: Api.headers
        }).then(Api.responseMiddleware);
    }
};
