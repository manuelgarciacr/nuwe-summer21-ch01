import Adapter from "../adapters/httpAdapter";
import { NuweProfile } from "domain/model/NuweProfile";

export interface NuweProfileDTO extends NuweProfile {}

export interface INuweProfile {
    get: <T>(url: string) => Promise<{status: number, data: T}>;
}

const NuweProfileAdapter: INuweProfile = Adapter;

// It can be retrieve from a cookie with tokens
const user = "Manuel";

const NuweProfileRepository = {
    // The user identifier can be sended in a cookie with a token
    get: async () => {
        const res = await NuweProfileAdapter.get<NuweProfileDTO>(
            "nuwe_profiles/" + user
        );
        // Here we can adapt the DTO to the domain model.
        // In this case, they are identical
        return {...res.data} as NuweProfile;
    }
}

export default NuweProfileRepository;
