interface IHardSkill {
    readonly name: string;
    readonly points: number;
    readonly topPct: number;
}

class HardSkill implements IHardSkill {
    #name: string;
    #points: number;
    #topPct: number

    constructor(theName: string, thePoints?: number, theTopPct?: number) {
        this.#name = theName;
        this.#points = thePoints || 0;
        this.#topPct = theTopPct || 0;
    }

    get name(): string {
        return this.#name;
    }

    get points(): number {
        return this.#points;
    }

    get topPct(): number {
        return this.#topPct;
    }

    get type(): string {
        return "HardSkill";
    }
}
export default HardSkill;
