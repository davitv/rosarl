
export interface IMemberAuthData {
    date_joined: number;
    email: string;
    first_name: string;
    id: number;
    is_active: boolean;
    is_staff: boolean;
    last_login: number | null;
    last_name: string;
    token: string;
}

export interface IAuth {
    id: number;
    token: string;
}