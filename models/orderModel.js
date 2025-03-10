const { readJsonFile, writeJsonFile } = require('../utils/fileUtils');

const { v4: uuidv4 } = require('uuid');

class OrderModel {

    static async create(orderData) {

        const orders = await readJsonFile('orders.json');

        const newOrder = {id: uuidv4(),...orderData,status: 'pending',createdAt: new Date().toISOString()};

        orders.push(newOrder);
        
        await writeJsonFile('orders.json', orders);
        
        return newOrder;
    
    }

    static async getById(id) {

        const orders = await readJsonFile('orders.json');
        
        return orders.find(o => o.id === id);
    
    }

    static async update(id, updateData) {

        const orders = await readJsonFile('orders.json');
        
        const index = orders.findIndex(o => o.id === id);
        
        if (index === -1) {

            return null;
        
        }
        
        orders[index] = { ...orders[index], ...updateData };
        
        await writeJsonFile('orders.json', orders);
        
        return orders[index];
    
    }

    static async delete(id) {

        const orders = await readJsonFile('orders.json');
        
        const filteredOrders = orders.filter(o => o.id !== id);
        
        await writeJsonFile('orders.json', filteredOrders);
    
    }

    static async getAllByUserId(userId) {
        const orders = await readJsonFile('orders.json');
        return orders.filter(o => o.userId === userId);
    }

}

module.exports = OrderModel;