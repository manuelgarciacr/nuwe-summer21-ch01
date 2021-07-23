import { PersonalProfile } from "domain/model/PersonalProfile";
import PersonalProfileRepository from "infrastructure/repositories/personalProfile";

export const PersonalProfileService = {
    get: async (): Promise<PersonalProfile> => PersonalProfileRepository.get(),
    put: async (data: PersonalProfile): Promise<PersonalProfile> => PersonalProfileRepository.put(data)
};
