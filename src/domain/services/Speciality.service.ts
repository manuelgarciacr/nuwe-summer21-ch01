import { IdName } from "domain/model/IdName";
import SpecialityRepository from "infrastructure/repositories/speciality";

export const SpecialityService = {
    get: async (): Promise<IdName[]> => SpecialityRepository.get()
};

