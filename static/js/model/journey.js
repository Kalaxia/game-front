import Api from '../core/api.js';
import Ship from './ship/ship.js';

class Journey {
    constructor(data) {
        //TODO 
		for (var i in data) {
			this[i] = data[i];
		}
		
    };
	
}

export default Journey;
