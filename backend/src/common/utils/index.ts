/**
 * Utility functions
 */

/**
 * Hash password
 */
export const hashPassword = (password: string): Promise<string> => {
  const bcrypt = require('bcrypt');
  return bcrypt.hash(password, 10);
};

/**
 * Compare passwords
 */
export const comparePasswords = (
  password: string,
  hash: string,
): Promise<boolean> => {
  const bcrypt = require('bcrypt');
  return bcrypt.compare(password, hash);
};

/**
 * Generate random token
 */
export const generateToken = (length: number = 32): string => {
  const crypto = require('crypto');
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Validate email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate username
 */
export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,50}$/;
  return usernameRegex.test(username);
};

/**
 * Format error response
 */
export const formatErrorResponse = (error: any) => {
  return {
    statusCode: error.statusCode || 500,
    message: error.message || 'Internal server error',
    error: error.error || 'Error',
    timestamp: new Date().toISOString(),
  };
};

/**
 * Format success response
 */
export const formatSuccessResponse = (
  data: any,
  message: string = 'Success',
) => {
  return {
    statusCode: 200,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Sleep function for promises
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Paginate array
 */
export const paginate = <T>(
  items: T[],
  page: number,
  limit: number,
): { data: T[]; total: number; page: number; limit: number } => {
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

/**
 * Generate slug from string
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};
