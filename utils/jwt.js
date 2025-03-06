const crypto = require('crypto');

const SECRET_KEY = 'your-secret-key';

const generateToken = (payload) => {

    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');

    const content = Buffer.from(JSON.stringify(payload)).toString('base64');

    const signature = crypto
        .createHmac('sha256', SECRET_KEY)
        .update(`${header}.${content}`)
        .digest('base64');

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