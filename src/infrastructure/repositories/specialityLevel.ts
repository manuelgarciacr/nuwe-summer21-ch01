import { IdName } from "domain/model/IdName";
import Adapter from "../adapters/jsonserverAdapter";

export interface SpecialityLevelDTO extends IdName {fakeField?: string}

export interface ISpecialityLevel {
    get: <T>(url: string) => Promise<{status: number, data: T}>;
}

const SpecialityLevelAdapter: ISpecialityLevel = Adapter;

const SpecialityLevelRepository = {
    get: async () => {
        const res = await SpecialityLevelAdapter.get<SpecialityLevelDTO[]>(
            "speciality_level"
        );
        // Here we can adapt the DTO to the domain model.
        // In this case, they are identical
        return [...res.data] as IdName[];
    }
}

export default SpecialityLevelRepository;