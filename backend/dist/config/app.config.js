"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_CONFIG = exports.getAppConfig = void 0;
const getAppConfig = () => {
    return {
        port: parseInt(process.env.PORT || '3000', 10),
        environment: process.env.NODE_ENV || 'development',
        isDevelopment: process.env.NODE_ENV === 'development',
        isProduction: process.env.NODE_ENV === 'production',
        corsOrigin: process.env.CORS_ORIGIN || '*',
    };
};
exports.getAppConfig = getAppConfig;
exports.APP_CONFIG = (0, exports.getAppConfig)();
//# sourceMappingURL=app.config.js.map