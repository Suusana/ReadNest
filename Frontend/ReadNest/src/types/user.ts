
// login user with token
export interface UserState {
    token: string
    userId: string
    username: string
    name: string
    email: string
    password: string
}

//registering user with their provided info
export interface AuthState {
    username:string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string
}

export interface UserType {
    userId: string
    username: string
    name: string
    email: string
    password: string
}

export interface RootUser {
    user: UserType[];
}

// the root state
export interface RootState {
    user: UserState;
}


