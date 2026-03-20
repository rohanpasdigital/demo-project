export declare class AuthResponseDto {
    token: string;
    refreshToken?: string;
    user: {
        id: string;
        username: string;
        email: string;
        avatar?: string;
    };
}
