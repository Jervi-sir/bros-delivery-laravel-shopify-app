import { AxiosInstance } from 'axios';
import ziggyRoute from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
        __SHOPIFY_HOST: string;
    }

    var route: typeof ziggyRoute;
}
