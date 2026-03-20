export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePasswords: (password: string, hash: string) => Promise<boolean>;
export declare const generateToken: (length?: number) => string;
export declare const isValidEmail: (email: string) => boolean;
export declare const isValidUsername: (username: string) => boolean;
export declare const formatErrorResponse: (error: any) => {
    statusCode: any;
    message: any;
    error: any;
    timestamp: string;
};
export declare const formatSuccessResponse: (data: any, message?: string) => {
    statusCode: number;
    message: string;
    data: any;
    timestamp: string;
};
export declare const sleep: (ms: number) => Promise<void>;
export declare const paginate: <T>(items: T[], page: number, limit: number) => {
    data: T[];
    total: number;
    page: number;
    limit: number;
};
export declare const generateSlug: (text: string) => string;
