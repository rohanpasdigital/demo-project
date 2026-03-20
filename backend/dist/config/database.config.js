"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_CONFIG = exports.getDatabaseConfig = void 0;
const getDatabaseConfig = () => {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/chat-app';
    return {
        uri: mongoUri,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    };
};
exports.getDatabaseConfig = getDatabaseConfig;
exports.DATABASE_CONFIG = (0, exports.getDatabaseConfig)();
//# sourceMappingURL=database.config.js.map