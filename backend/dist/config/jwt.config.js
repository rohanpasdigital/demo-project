"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_CONFIG = exports.getJwtConfig = void 0;
const getJwtConfig = () => {
    const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const expiresIn = process.env.JWT_EXPIRES_IN || '24h';
    return {
        secret,
        signOptions: {
            expiresIn,
        },
    };
};
exports.getJwtConfig = getJwtConfig;
exports.JWT_CONFIG = (0, exports.getJwtConfig)();
//# sourceMappingURL=jwt.config.js.map