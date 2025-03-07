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

const verifyToken = (token) => {

    const [header, content, signature] = token.split('.');

    const expectedSignature = crypto
        .createHmac('sha256', SECRET_KEY)
        .update(`${header}.${content}`)
        .digest('base64');

    if (signature !== expectedSignature) {

        throw new Error('Invalid token');

    }

    return JSON.parse(Buffer.from(content, 'base64').toString());

};

module.exports = { generateToken, verifyToken }; 