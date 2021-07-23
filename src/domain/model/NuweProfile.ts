import SoftSkill from "./SoftSkill";
import HardSkill from "./HardSkill";

export type NuweProfile = {
    points: number,
    hardSkills: HardSkill[],
    softSkills: SoftSkill[],
    rankingPosition: number,
    totalUsers: number
}

