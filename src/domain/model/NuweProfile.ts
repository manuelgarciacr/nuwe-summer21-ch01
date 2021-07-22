import SoftSkill from "./SoftSkill";
import HardSkill from "./HardSkill";

type NuweProfile = {
    points: number,
    hardSkills: HardSkill[],
    softSkills: SoftSkill[],
    rankingPosition: number,
    totalUsers: number
}

export default NuweProfile;
