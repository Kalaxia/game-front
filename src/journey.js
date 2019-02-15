import System from './model/system.js';

const planetAddToJourney = (event) => {
	
	//console.log(`you added a planet`);
	closeMenu();
	stepUtils.addPlanet(event.currentTarget.getAttribute("planet-id"));
	if (event.type == "contextmenu"){
		event.preventDefault(); // DO not show contexte menue
	}
};