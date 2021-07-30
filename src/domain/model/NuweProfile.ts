import SoftSkill from "./SoftSkill";
import HardSkill from "./HardSkill";

export type NuweProfile = {
    points: number,
    hardSkills: HardSkill[],
    softSkills: SoftSkill[],
    rankingPosition: number,
    totalUsers: number
    //
    position: number,
    rango: string,
    europe: number,
    hackathons: number,
    challenges: number,
    projectsOS: number,
    pins: number,
    country: string,
    continent: string
}

