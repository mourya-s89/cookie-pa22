const jwt = require('jsonwebtoken');

/**
 * Creates a JWT token with the provided payload and secret
 * @param {Object} payload - The data to be encoded in the token
 * @param {string} secret - The secret key used to sign the token
 * @param {Object} options - Optional parameters (e.g., expiresIn)
 * @returns {string} - The generated JWT token
 */
const encrypt = (payload, secret, options = { expiresIn: '1h' }) => {
  try {
    // Generate the JWT token with payload, secret, and expiry
    const token = jwt.sign(payload, secret, options);
    return token;
  } catch (error) {
    console.error('Error generating JWT:', error.message);
    throw error;
  }
};

/**
 * Verifies a JWT token and returns the decoded payload
 * @param {string} token - The JWT token to verify
 * @param {string} secret - The secret key used to verify the token
 * @returns {Object} - The decoded payload if valid
 */
const verify = (token, secret) => {
  try {
    // Verify the token and get the decoded payload
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('Token has expired');
    } else {
      console.error('Error verifying token:', error.message);
    }
    throw error;
  }
};

module.exports = { encrypt, verify };
