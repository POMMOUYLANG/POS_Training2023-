/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable eol-last */
export interface ListUsers {
    data: User[];
    current_page: number;
    total: number;
    per_page: number;
}

export interface User {
    id: number;
    name: string;
    phone: string;
    email?: string | null;
    is_active: 1 | 0;
    type?: Type | null;
}

interface Type {
    id: number;
    name: string;
}