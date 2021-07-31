//import Adapter from "../adapters/httpAdapter";
import Adapter from "../adapters/jsonserverAdapter";
import { PersonalProfile } from "domain/model/PersonalProfile";

export interface PersonalProfileDTO extends PersonalProfile {fakeField?: string}

export interface IPersonalProfile {
    get: <T>(url: string) => Promise<{status: number, data: T}>;
    put: <T>(url: string, data: T) => Promise<{status: number, data: T}>;
}

const PersonalProfileAdapter: IPersonalProfile = Adapter;

// It can be retrieve from a cookie with tokens
const user = "Manuel";

const PersonalProfileRepository = {

    get: async () => {
        // The user identifier can be sended in a cookie with a token
        const res = await PersonalProfileAdapter.get<PersonalProfileDTO>(
            "personal_profiles/" + user
        );
        // Here we can adapt the DTO to the domain model.
        // In this case, they are identical
        return { ...res.data } as PersonalProfile;
    },
    put: async (data: PersonalProfile) => {
        // Here we can adapt the domain model to the DTO.
        // In this case, they are identical
        const res = await PersonalProfileAdapter.put<PersonalProfileDTO>(
            "personal_profiles/" + user, data as PersonalProfileDTO
        );
        return { ...res.data } as PersonalProfile;
    },
};

export default PersonalProfileRepository;
