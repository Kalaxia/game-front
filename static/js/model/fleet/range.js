export default class FleetRange {
    constructor(data) {
        this.intraSystem = data.same_system;
        this.planetToPlanet = data.planet_to_planet;
        this.planetToPosition = data.planet_to_position;
        this.positionToPlanet = data.position_to_planet;
        this.positionToPosition = data.position_to_position;
    }
}