// Import the ProductModel which handles the database operations for products
const ProductModel = require('../models/productModel');

class ProductController {
 // Retrieve all products with optional filtering via query parameters
    static async getAll(req, res) {
        try {
        // Fetch products from the database, optionally using filters from the request query
            const products = await ProductModel.getAll(req.query.filter);
             // Send the list of products as a JSON response
            res.end(JSON.stringify(products));
        } catch (error) {
        // Handle unexpected errors
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    // Retrieve a single product by its ID
    static async getById(req, res) {
        try {
            const id = req.params.id;
             // Fetch the product by ID
            const product = await ProductModel.getById(id);
            
            if (!product) {
             // If the product is not found, return 404 Not Found
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Product not found' }));
                return;
            }
             // Send the found product as a JSON response
            res.end(JSON.stringify(product));
        } catch (error) {
        // Handle unexpected errors
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error.message }));
        }
    }
 // Create a new product
    static async create(req, res) {
        try {
        // Create a new product using the request body data
            const product = await ProductModel.create(req.body);
            // Send the created product with status 201 Created
            res.statusCode = 201;
            res.end(JSON.stringify(product));
        } catch (error) {
        // Handle validation or bad request errors
            res.statusCode = 400;
            res.end(JSON.stringify({ error: error.message }));
        }
    }
  // Update an existing product by its ID
    static async update(req, res) {
        try {
            const id = req.params.id; // Use req.params instead of parsing path
            // Update the product with the provided data
            const product = await ProductModel.update(id, req.body);
            
            if (!product) {
            // If the product doesn't exist, return 404 Not Found
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Product not found' }));
                return;
            }
             // Send the updated product as a JSON response
            res.end(JSON.stringify(product));
        } catch (error) {
        // Handle validation or bad request errors
            res.statusCode = 400;
            res.end(JSON.stringify({ error: error.message }));
        }
    }
// Delete a product by its ID
    static async delete(req, res) {
        try {
            const id = req.params.id; // Use req.params instead of parsing path
             // Delete the product
            await ProductModel.delete(id);
             // Respond with success message
            res.statusCode = 200;
            res.end(JSON.stringify({ success: 'Product deleted successfully' }));
        } catch (error) {
        // Handle unexpected errors
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error.message }));
        }
    }
}
// Export the ProductController to be used in routes
module.exports = ProductController;