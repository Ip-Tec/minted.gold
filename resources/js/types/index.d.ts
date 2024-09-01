import { Config } from "ziggy-js";

export interface User {
    id: number;
    name: string;
    DOB?: string;
    email: string;
    state?: string;
    gender?: string;
    avatar?: string;
    address?: string;
    country?: string;
    email_verified_at: string;

    first_name?: string;
    last_name?: string;
    phone_number?: number;
    isActive?: boolean;
    isDeleted?: boolean;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
