import Adapter from "../adapters/httpAdapter";
import NuweProfile from "domain/model/NuweProfile";

export interface NuweProfileDTO {}

export interface INuweProfile {
    get: <T>(url: string) => Promise<T>;
}

const NuweProfileAdapter: INuweProfile = Adapter;

const NuweProfileRepository = {
    // It can use, for instance, a cookie with tokens for authenticate and identificate the user.
    get: async () => {
        const profile = await NuweProfileAdapter.get<NuweProfileDTO>(
            "users/profiles/nuwe"
        );
        // Here we can adapt the DTO to the domain model.
        // In this case, they are identical
        return { ...profile } as NuweProfile;
    },
};

export default NuweProfileRepository;
