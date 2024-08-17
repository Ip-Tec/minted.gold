import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    day?: string;
    email: string;
    year?: string;
    month?: string;
    gender?: string;
    avatar?: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
