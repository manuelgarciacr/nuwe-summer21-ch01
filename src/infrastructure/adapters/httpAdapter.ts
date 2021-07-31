import { INuweProfile } from "infrastructure/repositories/nuweProfile";
import { IPersonalProfile, PersonalProfileDTO } from "infrastructure/repositories/personalProfile";


const fakeFetch  = async <T>(url: string): Promise<{status: number, data: T}> => new Promise((resolve, reject) => 
    {setTimeout( () => {
        if (url.startsWith('personal_profiles'))
            resolve({status: 200, data: PERSONAL_PROFILE as T});
        else if (url.startsWith('nuwe_profiles'))
            resolve({status: 200, data: NUWE_PROFILE as T});
        reject({status: 404, data: "Not found"})
    }, 4000)} ) 

const get = async <T>(url: string) => {
    return fakeFetch<T>(url);
};

const put = async <T>(url: string, data: T) => {
    return Promise.reject({status: 500, data: "Internal Server Error"});
};

interface IHttpAdapter extends IPersonalProfile, INuweProfile {};

const Adapter: IHttpAdapter = {
    get,
    put
}

export default Adapter

const NUWE_PROFILE: PersonalProfileDTO = {
    points: 6000,
    hardSkills: [{name: "Javascript", points: 1200, topPct: 10}, {name: "Java", points: 900, topPct: 10}, {name: "React", points: 900, topPct: 10}, {name: "Angular", points: 850, topPct: 10}, {name: "CSS3", points: 800, topPct: 10}, {name: "Java", points: 1200, topPct: 10}, {name: "Java", points: 1200, topPct: 10}, {name: "Java", points: 1200, topPct: 10}, {name: "Java", points: 1200, topPct: 10}, {name: "Java", points: 1200, topPct: 10}, {name: "Java", points: 1200, topPct: 10}],
    softSkills: [{name: "Teamwork", points: 800, topPoints: 5}, {name: "Comunicación", points: 750, topPoints: 5}, {name: "Lo que sea que fuere", points: 300, topPoints: 5}, {name: "Resolución problemas", points: 275, topPoints: 5}], //{name: "Capacidad analítica", points: 4, topPoints: 5}, {name: "Capacidad analítica", points: 4, topPoints: 5}, {name: "Capacidad analítica", points: 4, topPoints: 5}],//, {name: "Capacidad analítica", points: 4, topPoints: 5}, {name: "Capacidad analítica", points: 4, topPoints: 5}, {name: "Capacidad analítica", points: 4, topPoints: 5}],
    rankingPosition: 17,
    totalUsers: 2500,
    //
    position: 1,
    country: "España",
    europe: 157,
    global: 1245,
    hackathons: 12,
    challenges: 56,
    projectsOS: 3,
    pins: 78
}

const PERSONAL_PROFILE: PersonalProfileDTO = {
    fullname: "Manuel García",
    username: "Manuel",
    email: "manuel@micorreo.com",
    tel: "+34 666 666 666",
    //
    headerImage: "https://nuwe.io/banner_default.png",
    //
    avatar: "https://i.im.ge/2021/07/22/aNpWm.png",
    speciality: 4,
    specialityLevel: 0,
    biography: "Fullstack. Más de 15 años programando software de gestión para grandes empresas. Estos últimos años he estado reciclando mis conocimientos: Angular, React, React native, Cordova, Java, Android, Nodejs, BBDD, etc.",
    linkedin: "www.linkedin.com/in/manuelgacr",
    github: "https://github.com/manuelgarciacr",
    gitlab: "https://gitlab.com/manuelgarciacr",
    behance: "",
    city: "Barcelona",
    country: "España",
    lastConnection: "2021-06-30T14:48:00.000Z",
    website: "",
    createdAt: "2021-06-30T14:48:00.000Z",
    updatedAt: "2021-06-30T14:48:00.000Z",
    //
    stack: ["React", "Angular", "Java", "Android", "MongoDB", "MySQL", "Node.js", "HTML5", "CSS3", "React Native", "Typescript"],
    //
    getOffers: true,
    job: "Programador o Project Manajer",
    jobPlace: "Barcelona",
    companyType: 0,
    minimumSalary: 20000,
    optimalSalary: 30000,
    remotelyWork: true,
    tripAvailability: true,
    immediateIncorporation: true
}
