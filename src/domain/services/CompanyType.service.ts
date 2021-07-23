import { IdName } from "domain/model/IdName";
import CompanyTypeRepository from "infrastructure/repositories/companyType";

export const CompanyTypeService = {
    get: async (): Promise<IdName[]> => CompanyTypeRepository.get()
};
