const { readJsonFile, writeJsonFile } = require('../utils/fileUtils');

const { v4: uuidv4 } = require('uuid');

const crypto = require('crypto');

class UserModel {

    static async create(userData) {

        const users = await readJsonFile('users.json');
        
        // Check if username already exists

        if (users.find(u => u.username === userData.username)) {

            throw new Error('Username already exists');

        }

        const salt = crypto.randomBytes(16).toString('hex');

        const hash = crypto
            .pbkdf2Sync(userData.password, salt, 1000, 64, 'sha512')
            .toString('hex');

        const newUser = {id: uuidv4(),username: userData.username,hash,salt,role: userData.role || 'user',createdAt: new Date().toISOString()};
        
        users.push(newUser);
        
        await writeJsonFile('users.json', users);
        
        return { 
            id: newUser.id, 
            username: newUser.username, 
            role: newUser.role 
        };
    
    }

    static async authenticate(username, password) {
        
        const users = await readJsonFile('users.json');
        
        const user = users.find(u => u.username === username);
        
        if (!user) {

            return null;
            
        }

        const hash = crypto
            .pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
            .toString('hex');

        if (hash === user.hash) {

            return { id: user.id, username: user.username, role: user.role };
        
        }
        
        return null;
    
    }

}

module.exports = UserModel; 