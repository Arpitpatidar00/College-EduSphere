import jwt from "jsonwebtoken";
import { ERROR } from "../../lib/responseHelper.js";

class JwtUtils {
  static instance = null;
  secretKey;
  accessTokenExpiry;
  refreshTokenExpiry;

  constructor(secretKey, accessTokenExpiry = "1d", refreshTokenExpiry = "7d") {
    this.secretKey = secretKey;
    this.accessTokenExpiry = accessTokenExpiry;
    this.refreshTokenExpiry = refreshTokenExpiry;
  }

  static getInstance(
    secretKey,
    accessTokenExpiry = "1d",
    refreshTokenExpiry = "7d"
  ) {
    if (!JwtUtils.instance) {
      JwtUtils.instance = new JwtUtils(
        secretKey,
        accessTokenExpiry,
        refreshTokenExpiry
      );
    }
    return JwtUtils.instance;
  }

  /**
   * Generates an access token
   */
  generateAccessToken(payload) {
    return jwt.sign(payload, this.secretKey, {
      expiresIn: this.accessTokenExpiry,
    });
  }

  /**
   * Generates a refresh token
   */
  generateRefreshToken(payload) {
    return jwt.sign(payload, this.secretKey, {
      expiresIn: this.refreshTokenExpiry,
    });
  }

  /**
   * Verifies a token and returns the payload
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (err) {
      throw new ERROR("Invalid or expired token", err);
    }
  }

  /**
   * Decodes a token without verifying its signature
   */
  decodeToken(token) {
    try {
      return jwt.decode(token);
    } catch (err) {
      throw new ERROR("Invalid token", err);
    }
  }

  /**
   * Checks if a token is expired
   */
  isTokenExpired(token) {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime >= decoded.exp;
  }
}

export default JwtUtils.getInstance(
  process.env.JWT_SECRET || "your-secret-key"
);
