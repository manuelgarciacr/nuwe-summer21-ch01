import Adapter from "../adapters/httpAdapter";
import PersonalProfile from "domain/model/PersonalProfile";

export interface PersonalProfileDTO {}

export interface IPersonalProfile {
    get: <T>(url: string) => Promise<T>;
}

const PersonalProfileAdapter: IPersonalProfile = Adapter;

const PersonalProfileRepository = {
    // It can use, for instance, a cookie with tokens for authenticate and identificate the user.
    get: async () => {
        const profile = await PersonalProfileAdapter.get<PersonalProfileDTO>(
            "users/profiles/personal"
        );
        // Here we can adapt the DTO to the domain model.
        // In this case, they are identical
        return { ...profile } as PersonalProfile;
    },
};

export default PersonalProfileRepository;
