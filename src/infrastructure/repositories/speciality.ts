import { IdName } from "domain/model/IdName";
import Adapter from "../adapters/jsonserverAdapter";

export interface SpecialityDTO {}

export interface ISpeciality {
    get: <T>(url: string) => Promise<{status: number, data: T}>;
}

const SpecialityAdapter: ISpeciality = Adapter;

const SpecialityRepository = {
    get: async () => {
        const res = await SpecialityAdapter.get<SpecialityDTO[]>(
            "speciality"
        );
        // Here we can adapt the DTO to the domain model.
        // In this case, they are identical
        return [...res.data] as IdName[];
    }
}

export default SpecialityRepository;