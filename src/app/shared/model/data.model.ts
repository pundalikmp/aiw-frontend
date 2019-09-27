
export interface Profile {
    firstName: string;
    lastName: string;
    mobile: number;
    address: Address;
    avatar?: string;
    email?: string;
    work?: string;
}

export interface Address {
    country: string;
    state: string;
    city: string;
    zip: number;
    street?: string;
    // house?: number;
}

export interface DialogData {
    message: string;
    status: boolean;
}

export interface ProfileAuth {
    username: string;
    pass: string;
}

export enum Status {
    OK = 'OK',
    NOK = 'NOK'
}

export interface RegisterStatus {
    message: string;
}

export interface AvatarPayload {
    data: UploadAvatar[];
}

export interface UploadAvatar {
    avatar: string;
    status: Status;
}

export interface UploadPayload {
    avatar: string;
    status: Status;
}

export interface Avatar {
    avatar: string;
    status: Status;
}

export interface Order {
    username: String;
    user: User;
    address: Address;
    vehicle: String;
    price: Number;
    date : Date;
    desc: String;
}

export interface User {
    firstName: string;
    lastName: string;
    mobile: number;
    email?: string;
}

export interface Register {
    username: string;
    pass: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    mobile?: string;
    address?: string;
}

export interface FeedbackInput {
    username: string;
    vehicle: string;
    vehicleFeedback: string;
    driverFeedback: string;
    appFeedback: string;
    desc: string;
}

export interface RegisterPayload {
    profile: Register;
    path: string;
}