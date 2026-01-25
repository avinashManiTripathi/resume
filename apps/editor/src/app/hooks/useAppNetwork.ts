import { useNetwork, API_ENDPOINTS } from '@repo/utils-client';
import { ENV } from '../env';

export function useAppNetwork() {
    return useNetwork(ENV.API_URL);
}

export { API_ENDPOINTS };
