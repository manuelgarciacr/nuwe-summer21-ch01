import CompanyEnum from "domain/model/CompanyEnum";
import LevelEnum from "domain/model/LevelEnum";
import SpecialityEnum from "domain/model/SpecialityEnum";
import { IPersonalProfile, PersonalProfileDTO } from "infrastructure/repositories/personalProfile";


const fakeFetch  = async <T>(url: string): Promise<T> => new Promise((resolve, reject) => 
    {setTimeout( () => {
        if (url === 'users/profiles/personal')
            resolve(PERSONAL_PROFILE as T);
        else if (url === 'users/profiles/nuwe')
            resolve(NUWE_PROFILE as T);
        reject("Error 404 not found")
    }, 4000)} ) 

const get = async <T>(url: string) => {
    return fakeFetch<T>(url);
};

interface IHttpAdapter extends IPersonalProfile {};

const Adapter: IHttpAdapter = {
    get
}

export default Adapter

const NUWE_PROFILE: PersonalProfileDTO = {
    points: 6000,
    hardSkills: [{name: "Java", points: 1200, topPct: 10}, {name: "Java", points: 1200, topPct: 10}, {name: "Java", points: 1200, topPct: 10}, {name: "Java", points: 1200, topPct: 10}, {name: "Java", points: 1200, topPct: 10}],
    softSkills: [{name: "Teamwork", points: 4, topPoints: 5}, {name: "Comunicación", points: 4, topPoints: 5}, {name: "Lo que sea", points: 4, topPoints: 5}, {name: "Resolución problemas", points: 4, topPoints: 5}, {name: "Capacidad analítica", points: 4, topPoints: 5}],
    rankingPosition: 17,
    totalUsers: 2500
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
    speciality: SpecialityEnum["Web developper"],
    level: LevelEnum.Junior,
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
    companyType: CompanyEnum.Startup,
    minimumSalary: 20000,
    optimalSalary: 30000,
    remotelyWork: true,
    tripAvailability: true,
    immediateIncorporation: true
}
