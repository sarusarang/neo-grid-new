
// check login response
export interface User {
    id: number;
    username: string;
    email: string;
    phone: string;
}


// check login response
export interface AuthResponse {
    is_logged_in: boolean;
    user: User;
}