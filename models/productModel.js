const { readJsonFile, writeJsonFile } = require('../utils/fileUtils');
const { v4: uuidv4 } = require('uuid');

class ProductModel {
    static async getAll(category = null) {
        const products = await readJsonFile('products.json');
        if (category) {
            return products.filter(p => p.category === category);
        }
        return products;
    }

    static async getById(id) {
        const products = await readJsonFile('products.json');
        return products.find(p => p.id === id);
    }

    static async create(productData) {
        const products = await readJsonFile('products.json');
        const newProduct = {
            id: uuidv4(),
            ...productData,
            createdAt: new Date().toISOString()
        };
        products.push(newProduct);
        await writeJsonFile('products.json', products);
        return newProduct;
    }

    static async update(id, updateData) {
        const products = await readJsonFile('products.json');
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return null;
        
        products[index] = { ...products[index], ...updateData };
        await writeJsonFile('products.json', products);
        return products[index];
    }

    static async delete(id) {
        const products = await readJsonFile('products.json');
        const filteredProducts = products.filter(p => p.id !== id);
        await writeJsonFile('products.json', filteredProducts);
    }
}

module.exports = ProductModel; 