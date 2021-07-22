import NuweProfileRepository from "infrastructure/repositories/nuweProfile";

const NuweProfileService = {
    get: async (url: string): Promise<any> => NuweProfileRepository.get()
    // .then(res => {console.log("SVC OK", res); return res})
    // .catch(err => {console.log("SVC KO", err); return Promise.reject(err)})
};

export default NuweProfileService;
