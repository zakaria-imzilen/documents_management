export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    image: string
}

export interface IUserStateConn {
    isConnected: true,
    data: IUser
}

export interface IUserStateNotConn {
    isConnected: false,
    data: null
}