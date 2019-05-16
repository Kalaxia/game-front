import JourneyStep from '~/model/fleet/journeyStep';

export default class Journey {
    constructor(data) {
        this.id = data.id;
        this.steps = new Array();
        this.createdAt = data.created_at;
        this.endedAt = data.ended_at;
        this.currentStep = (data.current_step !== null) ? new JourneyStep(data.current_step) : null;
        if (data.steps) {
            this.steps = [];
            for (const step of data.steps) {
                this.steps.push(new JourneyStep(step));
            }
        }
    }

    format() {
        const data = {
            steps: new Array()
        };
        for (const step of this.steps) {
            data.steps.push({
                x: step.endX,
                y: step.endY,
                planetId: (step.endLocation !== null) ? step.endLocation.id : 0,
                order: step.order
            })
        }
        return data;
    }
};
