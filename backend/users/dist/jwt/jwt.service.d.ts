export declare class JwtService {
    config: {
        auth: {
            secret: string;
            expiresIn: string;
        };
        refresh: {
            secret: string;
            expiresIn: string;
        };
    };
    generateToken(payload: {
        email: string;
        role: string;
    }, type?: 'refresh' | 'auth'): string;
    refreshToken(refreshToken: string): {
        accessToken: string;
        refreshToken: string;
    } | {
        accessToken: string;
        refreshToken?: undefined;
    };
    getPayload(token: string, type?: 'refresh' | 'auth'): any;
}
