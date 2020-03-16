import FleetRange from '~/model/fleet/range';

export const state = () => ({
    isDragging: false,
    targetedSystemId: null,
    selectedPlanets: [],
    fleet: null,
    scale: 80,
    size: 0
});

export const getters = {
    lastStep(state) {
        if (state.fleet === null || state.fleet.journey === null || state.fleet.journey.steps.length === 0) {
            return null;
        }
        return state.fleet.journey.steps[state.fleet.journey.steps.length - 1];
    },

    previousX(state, getters) {
        if (state.fleet === null) {
            return null;
        }
        const lastStep = getters.lastStep;

        return (lastStep !== null)
            ? lastStep.endPlace.coordinates.x
            : (state.fleet.place.planet !== null)
                ? state.fleet.place.planet.system.x
                : state.fleet.place.coordinates.x;
    },
    
    previousY(state, getters) {
        if (state.fleet === null) {
            return null;
        }
        const lastStep = getters.lastStep;

        return (lastStep !== null)
            ? lastStep.endPlace.coordinates.y
            : (state.fleet.place.planet !== null)
                ? state.fleet.place.planet.system.y
                : state.fleet.place.coordinates.y;
    },
    
    previousPlanet(state, getters) {
        if (state.fleet === null) {
            return null;
        }
        const lastStep = getters.lastStep;
        
        return (lastStep !== null)
            ? (lastStep.endPlace.planet) ? lastStep.endPlace.planet : null
            : (state.fleet.place.planet !== null)
                ? state.fleet.place.planet
                : null;
    },

    range(state, getters) {
        return (x, y, planetId) => {
            const rangeData = state.fleet.range;
            if (getters.previousPlanet !== null) {
                if (planetId !== null) {
                    return (getters.previousX === x && getters.previousY === y)
                        ? rangeData.same_system
                        : rangeData.planet_to_planet;
                }
                return rangeData.planet_to_position;
            }
            return (planetId != 0)
                ? rangeData.position_to_planet
                : rangeData.position_to_position;
        };
    },

    selectedPlanets: state => state.selectedPlanets,
    
    fleet: state => state.fleet,
};

export const mutations = {
    drag(state, isDragging) {
        state.isDragging = isDragging;
    },

    setScale(state, scale) {
        state.scale = scale;
    },

    setSize(state, size) {
        state.size = size;
    },

    setTargetedSystemId(state, id) {
        state.targetedSystemId = id;
    },

    setFleet(state, fleet) {
        state.fleet = fleet;
        if (fleet === null) {
            return;
        }
        if (fleet.place !== null && fleet.place.planet !== null) {
            state.targetedSystemId = fleet.place.planet.system.id;
        }
        if (fleet.journey !== null && fleet.journey.currentStep !== null && fleet.journey.currentStep.startPlace.planet !== null) {
            state.targetedSystemId = fleet.journey.currentStep.startPlace.planet.system.id;
        }
    },

    addStep(state, step) {
        state.fleet.journey.steps.push(step);
        if (step.endPlace.planet !== null) {
            state.selectedPlanets.push(step.endPlace.planet.id);
        }
    },

    selectedPlanets: (state, planets) => { state.planets = planets; }, 

    stepOrder (state, payload) {
        const index = state.fleet.journey.steps.findIndex(s => s.id === payload.step.id);
        if (typeof payload.step.data !== 'undefined') {
            state.fleet.journey.steps[index].data = payload.step.data;
        }
        state.fleet.journey.steps[index].order = payload.order;
    },

    updateStepDataResource (state, payload) {
        const index = state.fleet.journey.steps.findIndex(s => s.id === payload.step.id);
        if (typeof payload.step.data !== 'undefined') {
            state.fleet.journey.steps[index].data.resources[payload.index].quantity = parseInt(payload.quantity);
        }
    },

    updateStepTime(state, payload) {
        const index = state.fleet.journey.steps.findIndex(s => s.id === payload.id);
        state.fleet.journey.steps[index].restTime = payload.restTime;
        state.fleet.journey.steps[index].travelTime = payload.travelTime;
    },

    removeLastStep(state) {
        if (state.fleet === null || state.fleet.journey === null || state.fleet.journey.steps.length === 0) {
            return;
        }
        state.fleet.journey.steps.pop();
    },

    fleetRange(state, range) {
        state.fleet.range = new FleetRange(range);
    },

    fleetJourney(state, journey) {
        state.fleet.journey = journey;
    }
};