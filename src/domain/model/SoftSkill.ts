interface ISoftSkill {
    readonly name: string;
    readonly points: number;
    readonly topPoints: number;
}

class SoftSkill implements ISoftSkill {
    #name: string;
    #points: number;
    #topPoints: number

    constructor(theName: string, thePoints?: number, theTopPoints?: number) {
        this.#name = theName;
        this.#points = thePoints || 0;
        this.#topPoints = theTopPoints || 5;
    }

    get name(): string {
        return this.#name;
    }

    get points(): number {
        return this.#points;
    }

    get topPoints(): number {
        return this.#topPoints;
    }

    get type(): string {
        return "SoftSkill";
    }
}
export default SoftSkill;
