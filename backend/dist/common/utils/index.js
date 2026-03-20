"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlug = exports.paginate = exports.sleep = exports.formatSuccessResponse = exports.formatErrorResponse = exports.isValidUsername = exports.isValidEmail = exports.generateToken = exports.comparePasswords = exports.hashPassword = void 0;
const hashPassword = (password) => {
    const bcrypt = require('bcrypt');
    return bcrypt.hash(password, 10);
};
exports.hashPassword = hashPassword;
const comparePasswords = (password, hash) => {
    const bcrypt = require('bcrypt');
    return bcrypt.compare(password, hash);
};
exports.comparePasswords = comparePasswords;
const generateToken = (length = 32) => {
    const crypto = require('crypto');
    return crypto.randomBytes(length).toString('hex');
};
exports.generateToken = generateToken;
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.isValidEmail = isValidEmail;
const isValidUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_-]{3,50}$/;
    return usernameRegex.test(username);
};
exports.isValidUsername = isValidUsername;
const formatErrorResponse = (error) => {
    return {
        statusCode: error.statusCode || 500,
        message: error.message || 'Internal server error',
        error: error.error || 'Error',
        timestamp: new Date().toISOString(),
    };
};
exports.formatErrorResponse = formatErrorResponse;
const formatSuccessResponse = (data, message = 'Success') => {
    return {
        statusCode: 200,
        message,
        data,
        timestamp: new Date().toISOString(),
    };
};
exports.formatSuccessResponse = formatSuccessResponse;
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
exports.sleep = sleep;
const paginate = (items, page, limit) => {
    const total = items.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
        data: items.slice(start, end),
        total,
        page,
        limit,
    };
};
exports.paginate = paginate;
const generateSlug = (text) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};
exports.generateSlug = generateSlug;
//# sourceMappingURL=index.js.map