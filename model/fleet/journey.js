export default class Journey {
    constructor(data) {
        this.id = data.id;
        this.steps = new Array();
        this.createdAt = data.created_at;
        this.endedAt = data.ended_at;
    }

    format() {
        const data = {
            steps: new Array()
        };
        for (const step of this.steps) {
            console.log(step);
            data.steps.push({
                x: step.endX,
                y: step.endY,
                planetId: (step.endLocation !== null) ? step.endLocation.id : 0,
            })
        }
        return data;
    }
};
