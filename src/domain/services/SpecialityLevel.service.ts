import { IdName } from "domain/model/IdName";
import SpecialityLevelRepository from "infrastructure/repositories/specialityLevel";

export const SpecialityLevelService = {
    get: async (): Promise<IdName[]> => SpecialityLevelRepository.get()
};
