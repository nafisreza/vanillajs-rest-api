// Importing the OrderModel to interact with the database
const OrderModel = require("../models/orderModel");

class OrderController {

    /**
     * Create a new order
     */
    static async create(req, res) {
        try {
            // Extract order data from request body and attach user ID from authenticated user
            const orderData = { ...req.body, userId: req.user.id };

            // Create a new order in the database
            const order = await OrderModel.create(orderData);
            
            // Set response status to 201 (Created)
            res.statusCode = 201;

            // Send the created order as JSON response
            res.end(JSON.stringify(order));
        } 
        catch (error) {
            // Handle errors (e.g., validation issues)
            res.statusCode = 400;
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    /**
     * Get an order by ID
     */
    static async getById(req, res) {
        try {
            // Extract order ID from request URL path
            const id = req.path.split("/")[2];

            // Fetch the order from the database
            const order = await OrderModel.getById(id);
            
            // If order not found, return 404 (Not Found)
            if (!order) {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: "Order not found" }));
                return;
            }
            
            // Check if the user is authorized to access this order
            // Only admins or the owner of the order can access it
            if (req.user.role !== 'admin' && order.userId !== req.user.id) {
                res.statusCode = 403; // Forbidden
                res.end(JSON.stringify({ error: "Unauthorized" }));
                return;
            }
            
            // Send the order data as JSON response
            res.end(JSON.stringify(order));
        }
        catch (error) {
            // Handle server errors
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    /**
     * Get all orders placed by the authenticated user
     */
    static async getAllByUser(req, res) {
        try {
            // Fetch all orders for the authenticated user
            const orders = await OrderModel.getAllByUserId(req.user.id);
            
            // Send the orders data as JSON response
            res.end(JSON.stringify(orders));
        }
        catch (error) {
            // Handle server errors
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    /**
     * Update an existing order
     */
    static async update(req, res) {
        try {
            // Extract order ID from request URL path
            const id = req.path.split("/")[2];

            // Update the order in the database with new data from request body
            const order = await OrderModel.update(id, req.body);
            
            // If order not found, return 404 (Not Found)
            if (!order) {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: "Order not found" }));
                return;
            }
            
            // Send updated order data as JSON response
            res.end(JSON.stringify(order));
        }
        catch (error) {
            // Handle errors (e.g., validation issues)
            res.statusCode = 400;
            res.end(JSON.stringify({ error: error.message }));
        }
    }

    /**
     * Delete an order by ID
     */
    static async delete(req, res) {
        try {
            // Extract order ID from request URL path
            const id = req.path.split("/")[2];

            // Delete the order from the database
            await OrderModel.delete(id);
            
            // Set response status to 204 (No Content) indicating successful deletion
            res.statusCode = 204;
            res.end();
        }
        catch (error) {
            // Handle server errors
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error.message }));
        }
    }
}

// Export the OrderController class to be used in other parts of the application
module.exports = OrderController;
