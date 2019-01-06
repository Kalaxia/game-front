export default {
    namespaced: true,
    
    state: {
        selectedSystemId: null,
        fleet: null,
        scale: 80,
        size: 0
    },

    getters: {
        lastStep: function(state) {
            if (state.fleet === null || state.fleet.journey === null || state.fleet.journey.steps.length === 0) {
                return null;
            }
            return state.fleet.journey.steps[state.fleet.journey.steps.length - 1];
        },

        previousX: function(state, getters) {
            if (state.fleet === null) {
                return null;
            }
            const lastStep = getters.lastStep;

            return (lastStep !== null)
                ? lastStep.endX
                : (state.fleet.location !== null)
                    ? state.fleet.location.system.x
                    : state.fleet.map_pos_x;
        },
        
        previousY: function(state, getters) {
            if (state.fleet === null) {
                return null;
            }
            const lastStep = getters.lastStep;

            return (lastStep !== null)
                ? lastStep.endY
                : (state.fleet.location !== null)
                    ? state.fleet.location.system.y
                    : state.fleet.map_pos_y;
        },
        
        previousPlanet: function(state, getters) {
            if (state.fleet === null) {
                return null;
            }
            const lastStep = getters.lastStep;
            
            return (lastStep !== null)
                ? lastStep.endLocation
                : (state.fleet.location !== null)
                    ? state.fleet.location
                    : null;
        },

        range: function(state, getters) {
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
    },

    mutations: {
        setScale: function(state, scale) {
            state.scale = scale;
        },

        setSize: function(state, size) {
            state.size = size;
        },

        addStep: function(state, step) {
            state.fleet.journey.steps.push(step);
            state.selectedSystemId = null;
        },
    
        removeLastStep: function(state) {
            if (state.fleet === null || state.fleet.journey === null || state.fleet.journey.steps.length === 0) {
                return;
            }
            state.fleet.journey.steps.pop();
        }
    }
};