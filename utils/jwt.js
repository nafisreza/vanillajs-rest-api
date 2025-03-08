// Import the 'crypto' module for cryptographic operations (e.g., hashing, HMAC)
const crypto = require('crypto');

// Define a secret key for signing and verifying tokens
const SECRET_KEY = 'your-secret-key';

// Function to generate a JWT (JSON Web Token)

const generateToken = (payload) => {

    // Create the JWT header as a base64-encoded JSON string
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');

    // Create the JWT payload (content) as a base64-encoded JSON string
    const content = Buffer.from(JSON.stringify(payload)).toString('base64');

    // Create the signature using HMAC SHA-256
    const signature = crypto
        .createHmac('sha256', SECRET_KEY) // Use HMAC with SHA-256 and the secret key
        .update(`${header}.${content}`) // Hash the combined header and content
        .digest('base64'); // Encode the hash as a base64 string

    // Return the complete JWT in the format: header.content.signature    
    return `${header}.${content}.${signature}`;

};

// Function to verify a JWT and extract its  payload
const verifyToken = (token) => {

    // Split the token into its three parts: header, content, and signature
    const [header, content, signature] = token.split('.');

    // Recreate the signature using the same method as in generateToken
    const expectedSignature = crypto
        .createHmac('sha256', SECRET_KEY) // Use HMAC with SHA-256 and the secret key
        .update(`${header}.${content}`) // Hash the combined header and content
        .digest('base64'); // Encode the hash as a base64 string

    // Compare the recreated signature with the provided signature
    if (signature !== expectedSignature) {

        // If they don't match, throw an error (invalid token)
        throw new Error('Invalid token');

    }

    // If the signature is valid, decode the content (payload) and return it as an object
    return JSON.parse(Buffer.from(content, 'base64').toString());

};

// Export the functions for use in other modules
module.exports = { 
    generateToken, // Exporting the generateToken function
    verifyToken  // Exporting the verifyToken function
}; 