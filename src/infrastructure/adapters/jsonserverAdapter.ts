import { ICompanyType } from "infrastructure/repositories/companyType";
import { INuweProfile } from "infrastructure/repositories/nuweProfile";
import { IPersonalProfile } from "infrastructure/repositories/personalProfile";
import { ISpeciality } from "infrastructure/repositories/speciality";
import { ISpecialityLevel } from "infrastructure/repositories/specialityLevel";

let BASE_URL: string;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    BASE_URL="http://192.168.1.240:3001/";
} else {
    BASE_URL="http://manuelgc.eu:3001/";
}
const get = async <T>(url: string) => 
    fetch(BASE_URL + url, {
        method: 'GET',
    }).then(res1 => res1.json().then(res => ({status: res1.status, data: res as T})))

const put = async <T>(url: string, data: T) =>
    fetch(BASE_URL + url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }    
    }).then(res1 => res1.json().then(res => ({status: res1.status, data: res as T})))

interface IHttpAdapter extends IPersonalProfile, INuweProfile, 
    ISpeciality, ISpecialityLevel, ICompanyType {};

const Adapter: IHttpAdapter = {
    get,
    put
}

export default Adapter

