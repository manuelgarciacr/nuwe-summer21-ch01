import { ICompanyType } from "infrastructure/repositories/companyType";
import { INuweProfile } from "infrastructure/repositories/nuweProfile";
import { IPersonalProfile } from "infrastructure/repositories/personalProfile";
import { ISpeciality } from "infrastructure/repositories/speciality";
import { ISpecialityLevel } from "infrastructure/repositories/specialityLevel";

const get = async <T>(url: string) => 
    fetch('http://localhost:3001/' + url, {
        method: 'GET',
    }).then(res1 => res1.json().then(res => ({status: res1.status, data: res as T})))

const put = async <T>(url: string, data: T) => 
    fetch('http://localhost:3001/' + url, {
        method: 'PUT',
        body: JSON.stringify(data)
    }).then(res1 => res1.json().then(res => ({status: res1.status, data: res as T})))

interface IHttpAdapter extends IPersonalProfile, INuweProfile, 
    ISpeciality, ISpecialityLevel, ICompanyType {};

const Adapter: IHttpAdapter = {
    get,
    put
}

export default Adapter

