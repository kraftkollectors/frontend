export type ServerActionParams<T = any> = {
    isPublic?: boolean;
    throwsError?: boolean;
    redirect?: boolean;
    params?: T;
}