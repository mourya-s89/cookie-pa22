// Example of using the JWT functions
const { encrypt, verify } = require('./script');

// Secret key for signing the token
const SECRET_KEY = 'your-secret-key';

// Sample user data for the payload
const userData = {
  id: 123,
  username: 'john_doe',
  role: 'user'
};

// Create a token with 10 seconds expiry for demonstration
console.log('Creating JWT token...');
const token = encrypt(userData, SECRET_KEY, { expiresIn: '10s' });
console.log('Generated Token:', token);

// Verify the token immediately
console.log('\nVerifying token...');
try {
  const decoded = verify(token, SECRET_KEY);
  console.log('Decoded payload:', decoded);
  console.log('Token is valid and not expired');

  // Show when the token will expire
  const expiryDate = new Date(decoded.exp * 1000);
  console.log(`Token will expire at: ${expiryDate.toLocaleString()}`);
} catch (error) {
  console.error('Token verification failed:', error.message);
}

// Example of how to handle token expiry
console.log('\nTo test token expiry, wait for 10 seconds and then run:');
console.log('const expiredTokenTest = () => {');
console.log('  try {');
console.log('    const decoded = verify(token, SECRET_KEY);');
console.log('    console.log("Token is still valid:", decoded);');
console.log('  } catch (error) {');
console.log('    console.error("Token verification failed:", error.message);');
console.log('  }');
console.log('};');
console.log('setTimeout(expiredTokenTest, 11000); // Wait just over 10 seconds');

// Automatically test token expiry after 11 seconds
console.log('\nAutomatically testing token expiry in 11 seconds...');
setTimeout(() => {
  console.log('\n--- Testing token after 11 seconds ---');
  try {
    const decoded = verify(token, SECRET_KEY);
    console.log("Token is still valid:", decoded);
  } catch (error) {
    console.error("Token verification failed:", error.message);
    console.log("As expected, the token has expired after 10 seconds!");
  }
}, 11000);
