/**
 * JWT configuration
 * Manages JWT secret and expiration settings
 */

export const getJwtConfig = () => {
  const secret =
    process.env.JWT_SECRET || 'your-secret-key-change-in-production';
  const expiresIn = process.env.JWT_EXPIRES_IN || '24h';

  return {
    secret,
    signOptions: {
      expiresIn,
    },
  };
};

export const JWT_CONFIG = getJwtConfig();

/**
 * JWT Payload Interface
 */
export interface JwtPayload {
  sub: string; // User ID
  email: string;
  username: string;
  iat?: number;
  exp?: number;
}
