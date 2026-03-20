export declare const getJwtConfig: () => {
    secret: string;
    signOptions: {
        expiresIn: string;
    };
};
export declare const JWT_CONFIG: {
    secret: string;
    signOptions: {
        expiresIn: string;
    };
};
export interface JwtPayload {
    sub: string;
    email: string;
    username: string;
    iat?: number;
    exp?: number;
}
