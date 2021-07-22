import PersonalProfileRepository from "infrastructure/repositories/personalProfile";

const PersonalProfileService = {
    get: async (url: string): Promise<any> => PersonalProfileRepository.get()
};

export default PersonalProfileService;
