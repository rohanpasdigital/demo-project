"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppConfig = exports.APP_CONFIG = exports.getJwtConfig = exports.JWT_CONFIG = exports.getDatabaseConfig = exports.DATABASE_CONFIG = void 0;
var database_config_1 = require("./database.config");
Object.defineProperty(exports, "DATABASE_CONFIG", { enumerable: true, get: function () { return database_config_1.DATABASE_CONFIG; } });
Object.defineProperty(exports, "getDatabaseConfig", { enumerable: true, get: function () { return database_config_1.getDatabaseConfig; } });
var jwt_config_1 = require("./jwt.config");
Object.defineProperty(exports, "JWT_CONFIG", { enumerable: true, get: function () { return jwt_config_1.JWT_CONFIG; } });
Object.defineProperty(exports, "getJwtConfig", { enumerable: true, get: function () { return jwt_config_1.getJwtConfig; } });
var app_config_1 = require("./app.config");
Object.defineProperty(exports, "APP_CONFIG", { enumerable: true, get: function () { return app_config_1.APP_CONFIG; } });
Object.defineProperty(exports, "getAppConfig", { enumerable: true, get: function () { return app_config_1.getAppConfig; } });
//# sourceMappingURL=index.js.map