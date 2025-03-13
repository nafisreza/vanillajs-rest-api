const UserModel = require("../models/userModel");

const { generateToken } = require("../utils/jwt");

class AuthController {

    static async register(req, res) {

        try {

            const user = await UserModel.create(req.body);

            res.statusCode = 201;

            res.end(JSON.stringify(user));

        }
        catch (error) {
        
            res.statusCode = 400;
        
            res.end(JSON.stringify({ error: error.message }));
            
        }
    
    }

    static async login(req, res) {
    
        try {
    
            const { username, password } = req.body;
    
            const user = await UserModel.authenticate(username, password);
            
            if (!user) {
    
                res.statusCode = 401;
    
                res.end(JSON.stringify({ error: "Invalid credentials" }));
    
                return;
    
            }

            const token = generateToken(user);
    
            res.end(JSON.stringify({

                status: "success",
                
                data: {
                    token,
                    user
                }

            }));

        } 
        catch (error) {
        
            res.statusCode = 400;
        
            res.end(JSON.stringify({ error: error.message }));
        
        }
    
    }

    static async logout(req, res) {
        try {

            res.end(JSON.stringify({ status: "success", message: "Logged out successfully" }));
        
        }
        catch (error){

            res.statusCode = 500;

            res.end(JSON.stringify({ error: error.message }));

        }
        
    }

}

module.exports = AuthController;