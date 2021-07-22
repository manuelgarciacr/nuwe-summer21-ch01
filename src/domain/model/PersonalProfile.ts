import CompanyEnum from "./CompanyEnum";
import LevelEnum from "./LevelEnum";
import SpecialityEnum from "./SpecialityEnum";

type PersonalProfile = {
    fullname: string;
    username: string;
    email: string;
    tel: string;
    password: string;
    //
    headerImage: string;
    //
    avatar: string;
    speciality: SpecialityEnum;
    level: LevelEnum;
    biography: string;
    linkedin: string;
    github: string;
    gitlab: string;
    behance: string;
    city: string;
    country: string;
    lastConnection: string,
    
    website: string;
    createdAt: string;
    updatedAt: string;
    //
    stack: string[];
    //
    getOffers: boolean;
    job: string;
    jobPlace: string,
    companyType: CompanyEnum;
    minimumSalary: number;
    optimalSalary: number;
    remotelyWork: boolean;
    tripAvailability: boolean;
    immediateIncorporation: boolean;
}

export default PersonalProfile;
