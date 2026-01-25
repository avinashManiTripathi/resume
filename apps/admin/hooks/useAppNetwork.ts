import { useNetwork, API_ENDPOINTS } from "@repo/utils-client";
import { ENV } from "@/app/env";

export const useAppNetwork = () => {
    return useNetwork(ENV.API_URL);
};

export { API_ENDPOINTS };
