import { IdName } from "domain/model/IdName";
import Adapter from "../adapters/jsonserverAdapter";

export interface CompanyTypeDTO extends IdName {fakeField?: string}

export interface ICompanyType {
    get: <T>(url: string) => Promise<{status: number, data: T}>;
}

const CompanyTypeAdapter: ICompanyType = Adapter;

const CompanyTypeRepository = {
    get: async () => {
        const res = await CompanyTypeAdapter.get<CompanyTypeDTO[]>(
            "company_type"
        );
        // Here we can adapt the DTO to the domain model.
        // In this case, they are identical
        return [...res.data] as IdName[];
    }
}

export default CompanyTypeRepository;