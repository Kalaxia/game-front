
import Dictionnary from './core/dictionnary.js';
import Ship from './model/ship/ship.js';



export const getHTMLShipArrayStringHangar = (ships) => {
	/*
	 * Return an HTML string to display the ships in an hangar
	 */
	
	// header
	var stringHTMLToReturn = `<div class="flex-row"> <div class="model-number"> ${Dictionnary.translations.general.number} </div> <div class="model-name"> ${Dictionnary.translations.general.name} </div><div class="model-type" > ${Dictionnary.translations.ships.type} </div> <div class="model-frame" > ${Dictionnary.translations.ships.frame}  </div></div>`;
	
	if (ships == null || ships == undefined || ships.length == 0) {
		
		stringHTMLToReturn +=  `<div class="flex-row-error"> <div class="no-ships">${Dictionnary.translations.fleet.view.single.no_ship_hangar} </div> </div>`;
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
	var stringHTMLToReturn = `<div class="flex-row"> <div class="model-number"> ${Dictionnary.translations.general.number} </div> <div class="model-name"> ${Dictionnary.translations.general.name} </div><div class="model-type" > ${Dictionnary.translations.ships.type}</div> <div class="model-frame" > ${Dictionnary.translations.ships.frame}  </div></div>`;
	
	if (ships == null || ships == undefined || ships.length == 0) {
		
		stringHTMLToReturn +=  `<div class="flex-row-error"> <div class="no-ships"> ${Dictionnary.translations.fleet.view.single.no_ship_fleet} </div> </div>`;
		return stringHTMLToReturn;
	}
	//Else
	stringHTMLToReturn += getHTMLShipArrayString(ships);
	
	return stringHTMLToReturn;
};

export class UniqueModelList{
	/*
	 * Conains array of model and number of this model
	 */
	constructor(ships){
		/*
		 * Construct this form a array of ships
		 */
		this.numbers = [];
		this.models = [];
		this.shipsId=[]; //< array of arry which list the ships id associated with the model
		
		if (ships != null && ships != undefined && ships.length != 0) {
			
			for (var i in ships){
				this.addNewShip(ships[i]);
			}
		}
		
	}
	
	/*constructor(modelP,numberP){
		this.numbers = numberP;
		this.models = modelP;
	}*/
	
	addNewShip(ship){
		for (var i in this.models){
			var isAlreadyInside = false;
			if (ship.model.id == this.models[i].id) {
				++this.numbers[i];
				this.shipsId[i].push(ship.id);
				isAlreadyInside = true;
				break; //< at this point there sould be only one time the same model
			}
		}
		if ( ! isAlreadyInside) {
			this.models.push(ship.model)
			this.numbers.push(1);
			this.shipsId.push([ship.id]);
		}
	}
	
	removeShip(ship){
		for (var i in this.models){
			if (ship.model.id == this.models[i].id) {
				if (this.numbers[i] > 0) {
					--this.numbers[i];
					this.shipsId.pop();
				}
				if (this.numbers[i] == 0) {
					this.models.splice(i,1); //< detelte the position i in the array
					this.numbers.splice(i,1);
					this.shipsId.splice(i,1);
				}
				break; //< at this point there sould be only one time the same model
			}
		}
	}
	
	
	getShipsIdFromModelId(id){
		/*
		 * return a the liste of ships with the model id given in input
		 * if this id does not exist resturn an empty array
		 */
		for (var i in this.models){
			if (this.models[i].id == id){
				return this.shipsId[i];
			}
		}
		return [];
	}
	
}

const getHTMLShipArrayString = (ships) => {
	/*
	 * return a HTML string for the ships. This does not give the header. It need to have a non empty ship array 
	 */
	
	if (ships == null || ships == undefined || ships.length == 0) {
		throw "there is no ship data";
	}
	
	var stringHTMLToReturn = "";
	
	var modelsList = new UniqueModelList(ships);
	
	for (var i in modelsList.models){
		stringHTMLToReturn += `<div class="flex-row">${getHTMLShipModelData(modelsList.models[i],modelsList.numbers[i])}</div>`; 
	}
	
	return stringHTMLToReturn;
}


const getHTMLShipModelData = (model,number) => {
	/*
	 * Return an string describing a single ship model
	 */
	
	if (model == null || model == undefined ){
		throw "model is empty";
	}
	
	// TODO modules
	var stringHTMLToReturn = `<div class="model-number" model-id-data="${model.id}">${number}</div><div class="model-name">${model.name}</div><div class="model-type" >${Dictionnary.translations.ships.types[model.type]}</div><div class="model-frame">${Dictionnary.translations.ships.frames[model.frame]}</div>`;
	return stringHTMLToReturn;

};
