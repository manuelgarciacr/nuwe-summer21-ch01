export type PersonalProfile = {
    fullname: string;
    username: string;
    email: string;
    tel: string;
    password: string;
    //
    headerImage: string;
    //
    avatar: string;
    avatarMedium: string;
    avatarFull: string;
    speciality: number;
    specialityLevel: number;
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
    companyType: number;
    minimumSalary: number;
    optimalSalary: number;
    remotelyWork: boolean;
    tripAvailability: boolean;
    immediateIncorporation: boolean;
}

