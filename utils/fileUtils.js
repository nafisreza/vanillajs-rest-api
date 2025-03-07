// Import the 'fs' module with promises for asynchronous file operations
const fs = require('fs').promises;

// Import the 'path' module to handle and transform file paths
const path = require('path');

// Function to read and parse a JSON file asynchronously
const readJsonFile = async (filename) => {

    try {
    
        // Read the file asynchronously from the 'data' directory
        const data = await fs.readFile(
    
            // Construct the file path using '__dirname' (current directory) and 'filename'
            path.join(__dirname, '..', 'data', filename) 
    
        );
    
        return JSON.parse(data);
    
    } 
    catch (error) {
    
        return [];
    
    }

};

const writeJsonFile = async (filename, data) => {

    await fs.writeFile(
    
        path.join(__dirname, '..', 'data', filename),
    
        JSON.stringify(data, null, 2)
    
    );

};

module.exports = {

    readJsonFile,

    writeJsonFile

}; 