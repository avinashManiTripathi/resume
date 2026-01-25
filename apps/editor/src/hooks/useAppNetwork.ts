import { useNetwork } from '@repo/utils-client';
import { ENV } from '../app/env';

/**
 * Hook to get the network client with the API URL pre-configured
 * @returns Network client
 */
export const useAppNetwork = () => {
    return useNetwork(ENV.API_URL);
};
