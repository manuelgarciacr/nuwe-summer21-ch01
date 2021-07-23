import { NuweProfile } from "domain/model/NuweProfile";
import NuweProfileRepository from "infrastructure/repositories/nuweProfile";

export const NuweProfileService = {
    get: async (): Promise<NuweProfile> => NuweProfileRepository.get(),
};
