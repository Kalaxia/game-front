
import Dictionnary from './core/dictionnary.js';
import Ship from './model/ship/ship.js';



export const getHTMLShipArrayStringHangar = (ships) => {
	/*
	 * Return an HTML string to display the ships in an hangar
	 */
	
	// header
	var stringHTMLToReturn = `<div class="flex-row-header"> <div class="model-number-header"> ${Dictionnary.translations.general.number} </div> <div class="model-name-header"> ${Dictionnary.translations.general.name} </div><div class="model-type-header" > ${Dictionnary.translations.ships.type}  </div> <div class="model-frame-header" > ${Dictionnary.translations.ships.frame}  </div></div>`;
	
	if (ships == null || ships == undefined || ships.length == 0) {
		
		stringHTMLToReturn +=  `<div class="flex-row-error"> <div class="no-ships">  ${Dictionnary.translations.fleet.view.single.no_ship_hangar} </div> </div>`;
		return stringHTMLToReturn;
	}
	//Else
	
	stringHTMLToReturn += getHTMLShipArrayString(ships);
	
	return stringHTMLToReturn;
};

export const getHTMLShipArrayStringFleet = (ships) => {
	/*
	 * Return an HTML string to display the ships in a fleet
	 */
	// header
	var stringHTMLToReturn = `<div class="flex-row-header"> <div class="model-number-header"> ${Dictionnary.translations.general.number} </div> <div class="model-name-header"> ${Dictionnary.translations.general.name} </div><div class="model-type-header" > ${Dictionnary.translations.ships.type}  </div> <div class="model-frame-header" > ${Dictionnary.translations.ships.frame}  </div></div>`;
	
	if (ships == null || ships == undefined || ships.length == 0) {
		
		stringHTMLToReturn +=  `<div class="flex-row-error"> <div class="no-ships">  ${Dictionnary.translations.fleet.view.single.no_ship_fleet} </div> </div>`;
		return stringHTMLToReturn;
	}
	//Else
	stringHTMLToReturn += getHTMLShipArrayString(ships);
	
	return stringHTMLToReturn;
};

class UniqueModelList{
	/*
	 * Conains array of model and number of this model
	 */
	constructor(ships){
		/*
		 * Construct this form a array of ships
		 */
		this.numbers = [];
		this.models = [];
		if (ships != null && ships != undefined && ships.length != 0) {
			
			for (var i in ships){
				addNewShip(ships[i]);
			}
		}
		
	}
	
	/*constructor(modelP,numberP){
		this.numbers = numberP;
		this.models = modelP;
	}*/
	
	addNewShip(ship){
		for (var i in models){
			var isAlreadyInside = false;
			if (ship.model.slug == models[i].slug) {
				++numbers[i];
				isAlreadyInside = true;
				break; //< at this point there sould be only one time the same model
			}
		}
		if ( ! isAlreadyInside) {
			this.models.push(ship.model)
			this.number.push(1);
		}
	}
	
	removeShip(ship){
		for (var i in models){
			if (ship.model.slug == models[i].slug) {
				if (numbers[i] > 0) {
					--numbers[i];
				}
				if (numbers[i] == 0) {
					this.models.splice(i,1); //< detelte the position i in the array
					this.numbers.splice(i,1);
				}
				break; //< at this point there sould be only one time the same model
			}
		}
	}
	
	
	
	
}

const getHTMLShipArrayString = (ships) => {
	/*
	 * return a HTML string for the ships. This does not give the header. It need to have a non empty ship array 
	 */
	
	if (ships == null || ships == undefined || ships.length == 0) {
		throw "there is no ship data";
	}
	
	var modelsList = new UniqueModelList(ships);
	
	for (var i in models){
		stringHTMLToReturn += `<div class="flex-row"> ${getHTMLShipModelData(modelsList.models[i],modelsList.numbers[i])}  </div>`; 
	}
}


const getHTMLShipModelData = (model,number) => {
	/*
	 * Return an string describing a single ship model
	 */
	
	if (model == null || model == undefined ){
		throw "model is empty";
	}
	
	// TODO modules
	var stringHTMLToReturn = `<div class="model-number"> ${number} </div> <div class="model-name"> ${model.name} </div><div class="model-type" > ${Dictionnary.translations.ships.types[model.type]}  </div> <div class="model-frame" > ${Dictionnary.translations.ships.frames[model.frame.slug]}  </div>`;	
	return stringHTMLToReturn;

};
