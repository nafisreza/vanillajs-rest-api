const ProductModel = require('../models/productModel');

class ProductController {
    
    static async getAll(req, res) {
    
        try {
    
            const products = await ProductModel.getAll(req.query.filter)
    
            res.end(JSON.stringify(products));
    
        }
        catch (error) {
        
            res.statusCode = 500;
        
            res.end(JSON.stringify({ error: error.message }));
        
        }
    
    }

    static async helloWorld(req, res) {
            
        res.end('Hello, World!');
    }

    static async getById(req, res) {
    
        try {
    
            const id = req.params.id;
    
            const product = await ProductModel.getById(id);
            
            if (!product) {
    
                res.statusCode = 404;
    
                res.end(JSON.stringify({ error: 'Product not found' }));
    
                return;
    
            }
            
            res.end(JSON.stringify(product));
    
        }
        catch (error) {
        
            res.statusCode = 500;
        
            res.end(JSON.stringify({ error: error.message }));
        
        }
    
    }

    static async create(req, res) {
    
        try {
    
            const product = await ProductModel.create(req.body);
    
            res.statusCode = 201;
    
            res.end(JSON.stringify(product));
    
        }
        catch (error) {
        
            res.statusCode = 400;
        
            res.end(JSON.stringify({ error: error.message }));
        
        }
    
    }

    static async update(req, res) {
    
        try {
    
            const id = req.params.id; // Use req.params instead of parsing path
    
            const product = await ProductModel.update(id, req.body);
            
            if (!product) {
    
                res.statusCode = 404;
    
                res.end(JSON.stringify({ error: 'Product not found' }));
    
                return;
    
            }
            
            res.end(JSON.stringify(product));
        }
        catch (error) {
        
            res.statusCode = 400;
        
            res.end(JSON.stringify({ error: error.message }));
        
        }
    
    }

    static async delete(req, res) {
        
        try {
        
            const id = req.params.id; // Use req.params instead of parsing path
        
            await ProductModel.delete(id);
        
            res.statusCode = 200;
        
            res.end(JSON.stringify({ success: 'Product deleted successfully' }));
        
        }
        catch (error) {
        
            res.statusCode = 500;
        
            res.end(JSON.stringify({ error: error.message }));
        
        }
    
    }

}

module.exports = ProductController;